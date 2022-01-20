const { logger } = require("../config/loggerConfig.js")
var createError = require("http-errors")
const { AlgorandAPI } = require("../utils/algorand/algorand")

const { ALGOD_TOKEN, ALGOD_SERVER, ALGOD_PORT } = require("../config/config.js")

const api = new AlgorandAPI(ALGOD_TOKEN, ALGOD_SERVER, ALGOD_PORT)

const getAccountBalance = async (req, res, next) => {
	try {
		const account = req.params.account
		logger.info(`account: ${account}`)
		await api.getAccountBalance(account).then((balance) => {
			res.json({
				balance,
			})
		})
	} catch (err) {
		err.message = "Error getting account balance"
		next(err)
	}
}

const getAccountInfo = async (req, res, next) => {
	try {
		const account = req.params.account
		logger.info(`account: ${account}`)
		await api.getAccountInfo(account).then((info) => {
			res.json({
				...info,
			})
		})
	} catch (err) {
		next(err)
	}
}

const loginWithMnemonic = async (req, res, next) => {
	try {
		const mnemonic = req.body.mnemonic || null
		if (!mnemonic) throw new Error("No mnemonic provided")
		await api.loginWithMnemonic(mnemonic.join(" ")).then((info) => {
			if (!info) throw new Error("Error logging in")
			res.json({
				...info,
			})
		})
	} catch (err) {
		next(err)
	}
}

module.exports = {
	getAccountBalance,
	getAccountInfo,
	loginWithMnemonic,
}
