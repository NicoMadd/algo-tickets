import WalletConnect from "@walletconnect/client"
import QRCodeModal from "@walletconnect/qrcode-modal"
import algosdk from "algosdk"
import { formatJsonRpcRequest } from "@json-rpc-tools/utils"
import api from "./algorand"

class Wallet {
	constructor() {
		this.connector = new WalletConnect({
			bridge: "https://bridge.walletconnect.org", // Required
			qrcodeModal: QRCodeModal,
		})
		this.accounts = this.connector.accounts
		this.chainId = this.connector.chainId

		this.connector.on("connect", (error, payload) => {
			if (error) {
				throw error
			}

			// Get provided accounts and chainId
			const { accounts, chainId } = payload.params[0]
			this.accounts = accounts
			this.chainId = chainId
			console.log("connect", accounts, chainId, this.connector)
		})

		this.connector.on("session_update", (error, payload) => {
			if (error) {
				throw error
			}

			// Get updated accounts and chainId
			const { accounts, chainId } = payload.params[0]
			this.accounts = accounts
			this.chainId = chainId
		})

		this.connector.on("disconnect", (error, payload) => {
			if (error) {
				throw error
			}

			// Delete connector
			this.accounts = []
			this.chainId = 0
		})
	}

	connected = () => {
		return this.connector.connected
	}

	connect = async () => {
		if (this.connected()) return this
		else this.connector.createSession()
	}

	disconnect() {
		if (this.connected()) this.connector.killSession()
	}

	async makeTransaction({ to, from, amount }) {
		try {
			console.log("makeTransaction", { to, from, amount })
			const suggestedParams = await api.getSuggestedParams()
			const txn = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
				from: from,
				to: to,
				amount: parseInt(amount),
				suggestedParams,
			})

			const txnsToSign = [txn].map((txn) => {
				const encodedTxn = Buffer.from(
					algosdk.encodeUnsignedTransaction(txn)
				).toString("base64")
				return {
					txn: encodedTxn,
					message: "Description of transaction being signed",
					// Note: if the transaction does not need to be signed (because it's part of an atomic group
					// that will be signed by another party), specify an empty singers array like so:
					// signers: [],
				}
			})
			const request = formatJsonRpcRequest("algo_signTxn", [txnsToSign])

			const result = await this.connector
				.sendCustomRequest(request)
				.then((response) => {
					return response
				})
				.catch((error) => {
					throw Error("Wallet Connection failed")
				})

			const signedTxn = result.map((element) => {
				return element
					? new Uint8Array(Buffer.from(element, "base64"))
					: null
			})
			return signedTxn
		} catch (err) {
			throw Error("Wallet Connection failed")
		}
	}

	async sendTransaction({ signedTxn }) {
		try {
			const { txId } = await api.sendTransaction({ signedTxn })
			return txId
		} catch (e) {
			console.log("error", e)
		}
	}
}

export { Wallet }
