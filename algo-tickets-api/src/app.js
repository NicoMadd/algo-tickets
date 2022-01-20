const express = require("express");
const { logger } = require("./config/loggerConfig.js");
const config = require("./config/config.js");
const { configure: ConfigureApp } = require("./config/configureApp.js");

const app = ConfigureApp(express());
app.listen(config.PORT, () => {
	logger.info(`Server is listening on port ${config.PORT}....`);
});
