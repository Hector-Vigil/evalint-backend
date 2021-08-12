const Koa = require("koa");
const bodyParser = require("koa-body-parser");
const cors = require("@koa/cors");
const dotenv = require("dotenv");
dotenv.config();
//const errorHandler = require('errorhandler');
const getMatchWithAD = require("./lib/getMatchWithAd");
const buildTreeView = require("./lib/createTreeViewInformation");
const verifyUserWithAD = require("./lib/verifyUsersWithAD");
const buildPieChartOrganizationData = require("./lib/createPieChartData");

const { JWT_KEY } = process.env;

//require('./config/passport');

const app = new Koa();

const routes = require("./routes");

app.use(bodyParser());

app.use(
  cors({
    origin: "*",
    allowMethods: ["GET", "PUT", "POST", "PATCH", "DELETE"],
    exposeHeaders: ["X-Total-Count", "Link", "ETag"],
  })
);

app.use(routes.umUser.middleware());

//getMatchWithAD();
//verifyUserWithAD();
//buildPieChartOrganizationData();
buildTreeView();

app.listen(3300, () => {
  console.log("Server started successfully at port 3300");
});
