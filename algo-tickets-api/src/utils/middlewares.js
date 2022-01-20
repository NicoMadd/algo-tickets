var jwt = require("jsonwebtoken");
const { SECRET } = require("../config/config");
const { logger } = require("../config/loggerConfig.js");

const verifyToken = async (req, res, next) => {
	try {
		const token = req.token || null;
		const validToken = await validateToken(token);
		if (!validToken) next();
	} catch (error) {
		logger.error(error);
		next();
	}
};

const validateToken = async (token) => {
	if (!token) return false;

	try {
		const data = await jwt.verify(token, SECRET);
		// if (data.user !== "pepe") return false;
		logger.info(`token: ${token}`);
		logger.info("validateToken: OK");
		return true;
	} catch (error) {
		// logger.error(error);
		return false;
	}
};

const grantToken = async () => {
	const token = await jwt.sign({ user: "pepe" }, SECRET, {
		expiresIn: "10 days",
	});
	logger.info(`token: ${token}`);
	logger.info("grantToken: OK");
	return token;
};

/**
 * @swagger
 *  responses:
 *   #-------------------------------
 *   # Reusable responses (data models)
 *   #-------------------------------
 *    InternalServerError:                                # Can be referenced as '#/responses/InternalServerError'
 *      description: An error has occurred
 *    ForbiddenError:                                     # Can be referenced as '#/responses/ForbiddenError'
 *      description: Error in token, invalid credentials
 *      content:
 *        application/json:
 *          schema:
 *            example: {"error": {"status": 403,"message": "Error! No posee credenciales validas."}}
 *    UnprocessableEntityError:                           # Can be referenced as '#/responses/UnprocessableEntityError'
 *      description: Error, incorrect sintax
 *      content:
 *        application/json:
 *          schema:
 *            example: {  "error": {    "status": 422,    "message": "\"username\" must be a valid email"  }}
 *    UnauthorizedError:                                  # Can be referenced as '#/responses/UnauthorizedError'
 *      description: Error, UnauthorizedError
 *      content:
 *        application/json:
 *          schema:
 *            example: {"error": {"status": 403,"message": "Error! No posee credenciales validas."}}
 *
 */
const errorsHandler = async (err, req, res, next) => {
	// logger.error(err);
	res.status(err.status || 500);
	res.send({
		error: {
			status: err.status || 500,
			message: err.message,
		},
	});
};

const error404Handler = async (req, res, next) => {
	res.status(404).json({
		//TODO set error page
		error: "No existe ese recurso",
	});
};

module.exports = {
	grantToken,
	validateToken,
	errorsHandler,
	error404Handler,
};
