const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const purchaseOrderRouter = require("./routes");

const app = express();
const PORT = process.env.PORT || 3002;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Purchase Order routes
app.use("/api", purchaseOrderRouter());

app.listen(PORT, () => console.log(`Server is listening at port ${PORT}`));
