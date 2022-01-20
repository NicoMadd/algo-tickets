// const { router: usuariosRoutes } = require("../routes/usuarios.js");
// const { router: repositoriosRoutes } = require("../routes/repositorios.js");
const { router: authRoutes } = require("../routes/auth.js");
const { router: algorandRoutes } = require("../routes/algorand.js");

const middlewares = require("../utils/middlewares");

const configureRoutes = (app) => {
	// get authorization token
	app.use("/api/auth", authRoutes);

	// algorand API routes
	app.use("/api/algorand", algorandRoutes);

	//errorhandlers
	app.use(middlewares.error404Handler);
	app.use(middlewares.errorsHandler);

	return app;
};

module.exports = { configureRoutes };
