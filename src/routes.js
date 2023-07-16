const { Router } = require("express");
const { snakeCase } = require("snake-case");
const multer = require("multer");
const csv = require("csv-parser");
const fs = require("fs");
const { insert, getAllVendors } = require("./utils/supabase");
const {
  mapOrdersToSchema,
  validateOrder,
  isValidDate,
} = require("./utils/helpers");
const { TABLE_NAME } = require("./utils/constants");

const upload = multer({ dest: "uploads/" });

const purchaseOrderRouter = () => {
  const router = Router();

  router.post("/", upload.single("file"), (req, res) => {
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
        // response in error if found any error in uploaded file
        if (validationError) {
          return res.status(400).json({ error: validationError });
        }

        const { error, data: vendors } = await insert(TABLE_NAME.VENDORS, [
          { name, date },
        ]);
        if (error) {
          return res.status(500).json({ error });
        }
        const { error: orderError, data: savedOrders } = await insert(
          TABLE_NAME.ORDERS,
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

  router.get("/", async (req, res) => {
    const { error, data } = await getAllVendors();
    if (error) {
      res.status(500).json({ error });
    }
    return res.json(data);
  });

  return router;
};

module.exports = purchaseOrderRouter;
