const express = require("express")
const { logger } = require("../config/loggerConfig.js")
const router = express.Router()

const {
	getAccountBalance,
	getAccountInfo,
	loginWithMnemonic,
	makeTransaction,
	getStatus,
	getTransactionParams,
	sendTransaction,
} = require("../controllers/algorand.js")
const { decode, encode } = require("../utils/utils.js")

router.route("/node/status").get(getStatus)
router.route("/node/params").get(getTransactionParams)
router.route("/balance/:account").get(getAccountBalance)
router.route("/info/:account").get(getAccountInfo)
router.route("/login").post(loginWithMnemonic)
router.route("/operations/payment").post(makeTransaction)
router.route("/operations/send-transaction/").post(sendTransaction)
router.route("/test").post(sendTransaction)

module.exports = { router }
