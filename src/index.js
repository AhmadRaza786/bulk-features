const express = require("express");
const bodyParser = require("body-parser");
const { snakeCase } = require("snake-case");
const multer = require("multer");
const csv = require("csv-parser");
const fs = require("fs");
const cors = require("cors");
const { insert } = require("./supabase");
const { mapOrdersToSchema, validateOrder, isValidDate } = require("./helpers");

const app = express();
const PORT = process.env.PORT || 3002;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const upload = multer({ dest: "uploads/" });

app.post("/purchaseOrder", upload.single("file"), (req, res) => {
  const { name, date } = req.body;
  if (!name || !date || !isValidDate(date)) {
    return res
      .status(400)
      .json({ error: "name | date should have a valid value" });
  }
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  const orders = [];
  let validationError;
  // Reading the file
  fs.createReadStream(req.file.path)
    .pipe(
      csv({
        mapHeaders: ({ header }) => snakeCase(header),
      })
    )
    .on("data", (data) => {
      if (!validationError) {
        validationError = validateOrder(data);
        if (!validationError) {
          orders.push(data);
        }
      }
    })
    .on("end", async () => {
      fs.unlinkSync(req.file.path);
      if (validationError) {
        return res.status(400).json({ error: validationError });
      }

      const { error, data: vendors } = await insert("vendor", [{ name, date }]);
      if (error) {
        return res.status(500).json({ error });
      }
      const { error: orderError, data: savedOrders } = await insert(
        "orders",
        mapOrdersToSchema(orders, vendors[0].id)
      );
      if (orderError) {
        return res.status(500).json({ error: orderError });
      }
      res.json({
        name,
        date,
        orders: savedOrders,
      });
    })
    .on("error", (err) => {
      res.status(500).json({ error: "Internal server error" });
    });
});

app.listen(PORT, () => console.log(`Server is listening at port ${PORT}`));
