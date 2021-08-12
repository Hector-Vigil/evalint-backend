const { Joi } = require("koa-joi-router");
const objectIdFactory = require("joi-objectid");

Joi.objectId = objectIdFactory(Joi);

const router = require("koa-joi-router");


const umUsersRoutes = require("./umUser");


const umUser = router();
umUser.route(umUsersRoutes);

const routes = {
  umUser,
};

module.exports = routes;
