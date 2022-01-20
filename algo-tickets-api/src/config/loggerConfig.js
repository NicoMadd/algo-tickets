const pino = require("pino");
const expressPino = require("express-pino-logger");

const logger = pino(
	{
		level: process.env.LOG_LEVEL || "info",
		prettyPrint: true,
		timestamp: () => {
			const date = new Date();
			console.log(date);
			return `: ${date} `;
		},
	}

	// pino.destination({
	// 	dest: "./src/logs/log.log",
	// 	minLength: 10,
	// 	sync: true,
	// })
);

const expressLogger = expressPino({ logger });

module.exports = { expressLogger, logger };
