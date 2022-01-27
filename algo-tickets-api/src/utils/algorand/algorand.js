const algosdk = require("algosdk")
const { encode } = require("../utils.js")
const { logger } = require("../../config/loggerConfig.js")
const { Algodv2 } = require("algosdk")

class AlgorandAPI {
	constructor(token, server, port, gid, gh) {
		this.token = token
		this.server = server
		this.port = port
		this.client = new algosdk.Algodv2(token, server, port)
		this.genesisID = gid
		this.genesisHash = gh
	}

	async getAccountInfo(account) {
		try {
			const info = await this.client.accountInformation(account).do()
			logger.info(`info: ${JSON.stringify(info)}`)
			return info
		} catch (err) {
			logger.error(`Error getting account info: ${err}`)
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

	async getStatus() {
		try {
			const status = await this.client.status().do()
			logger.info(`status: ${JSON.stringify(status)}`)
			return status
		} catch (err) {
			logger.error(`Error getting status: ${err}`)
		}
	}

	async getTransactionParams() {
		try {
			const params = await this.client.getTransactionParams().do()
			logger.info(`params: ${JSON.stringify(params)}`)
			return params
		} catch (err) {
			logger.error(`Error getting transaction params: ${err}`)
		}
	}

	async makeTransaction({ amount, fee, note, to, from }) {
		try {
			// log all params
			logger.info(
				`amount: ${amount}, fee: ${fee}, note: ${note}, to: ${to}, from: ${from}`
			)

			// get transaction params
			const { firstRound, lastRound, txnFee, flatFee } =
				await this.getTransactionParams()

			// create transaction
			const txn = algosdk.makePaymentTxn(
				from,
				to,
				fee ? parseInt(fee) : parseInt(txnFee),
				BigInt(amount),
				undefined,
				parseInt(firstRound) + 10,
				parseInt(lastRound) + 1000,
				encode(note),
				this.genesisHash,
				this.genesisID
			)
			// sign transaction

			// const signedTxn = txn.signTxn())
			// logger.info(`signedTxn: ${JSON.stringify(signedTxn)}`)
		} catch (err) {
			logger.error("Error making transaction")
			logger.error(err)
		}
	}

	async sendTransaction({ signedTxn }) {
		console.log(`utils signedTxn:`, Object.values(signedTxn[0]))
		try {
			const bytearray = new Uint8Array(Object.values(signedTxn[0]))
			const txId = await this.client.sendRawTransaction(bytearray).do()
			logger.info(`txId:`, txId)
			return txId
		} catch (err) {
			logger.error("Error inserting transaction")
			logger.error(err)
		}
	}
}

module.exports = { AlgorandAPI }
