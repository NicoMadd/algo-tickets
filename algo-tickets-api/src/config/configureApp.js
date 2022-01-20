const express = require("express")
const config = require("./config")
const { expressLogger, logger } = require("./loggerConfig.js")
const { configureRoutes } = require("./configureRoutes.js")
const { validateToken } = require("../utils/middlewares")
var createError = require("http-errors")
const cors = require("cors")
const path = require("path")
const jwt = require("jsonwebtoken")

const configureBasics = (app) => {
	app.use(express.json())
	app.use(express.urlencoded({ extended: false }))
	app.use(cors())
	// app.use(expressLogger)
}

const configureHeaders = (app) => {
	app.use((req, res, next) => {
		res.header("Access-Control-Allow-Origin", req.headers.origin)
		res.header("Access-Control-Allow-Credentials", true)
		res.header(
			"Access-Control-Allow-Headers",
			"Origin, X-Requested-With, Content-Type, Accept, Authorization"
		)
		res.header(
			"Access-Control-Allow-Methods",
			"GET, POST, OPTIONS, PUT, DELETE"
		)
		next()
	})
}

const setTokenHeader = (app) => {
	app.use((req, res, next) => {
		req.token = req.headers["access-token"]
		next()
	})
}

const configureSecurity = (app) => {
	app.use((req, res, next) => {
		logger.info(`req.token: ${req.token}`)
		validateToken(req.token)
			? next()
			: next(createError(403, "Error! No posee credenciales validas."))
	})
	// app.use(cookieParser());
	// app.use(csrfProtection);
}

const configurePong = (app) => {
	app.use("/api/ping", async (req, res) => {
		;(await validateToken(req.token))
			? res
					.status(200)
					.send(
						`Hey there Beautiful! You are: ${
							jwt.decode(req.token).user
						}`
					)
			: res.status(200).send("pong")
	})
}

const configure = (app) => {
	configureBasics(app)
	configureHeaders(app)
	setTokenHeader(app)
	configurePong(app)
	configureSecurity(app)
	// app.use(cookieParser());
	// app.use(csrfProtection);

	//ruta de swagger + config
	// app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

	//Configuracion de rutas
	app = configureRoutes(app)

	return app
}

module.exports = { configure }
