const algosdk = require("algosdk")
const { logger } = require("../../config/loggerConfig.js")

class AlgorandAPI {
	constructor(token, server, port) {
		this.token = token
		this.server = server
		this.port = port
		this.client = new algosdk.Algodv2(token, server, port)
	}

	async getAccountInfo(account) {
		try {
			const info = await this.client.accountInformation(account).do()
			logger.info(`info: ${JSON.stringify(info)}`)
			return info
		} catch {
			logger.error("Error getting account info")
		}
	}

	async getAccountBalance(account) {
		try {
			const info = await this.getAccountInfo(account)
			logger.info(`balance: ${info.amount}`)
			return info.amount
		} catch {
			logger.error("Error getting account balance")
		}
	}

	async loginWithMnemonic(mnemonic) {
		try {
			logger.info(`mnemonic: ${mnemonic}`)
			const account = await algosdk.mnemonicToSecretKey(mnemonic)
			return await this.getAccountInfo(account.addr)
		} catch {
			logger.error("Error logging in with mnemonic")
		}
	}
}

module.exports = { AlgorandAPI }
