const express = require("express");
const app = express();
const port = 5000;
const routes = require("./routes/cart-items.routes");
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use("/", routes);

app.listen(port, () => console.log(`Server is running on port: ${port}`));
