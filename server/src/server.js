const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

const purchaseOrderRouter = require("./routes");

const app = express();
const PORT = process.env.PORT || 3002;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, "../../client/build")));

// Purchase Order routes
app.use("/api", purchaseOrderRouter());

// For any other routes, serve the React app
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../../client/build", "index.html"));
});

app.listen(PORT, () => console.log(`Server is listening at port ${PORT}`));
