const express = require("express")
const { logger } = require("../config/loggerConfig.js")
const router = express.Router()

const {
	getAccountBalance,
	getAccountInfo,
	loginWithMnemonic,
	loginWithPrivateKey,
} = require("../controllers/algorand.js")

router.route("/balance/:account").get(getAccountBalance)
router.route("/info/:account").get(getAccountInfo)
router.route("/login").post(loginWithMnemonic)

module.exports = { router }
