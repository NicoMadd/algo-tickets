import WalletConnect from "@walletconnect/client"
import QRCodeModal from "@walletconnect/qrcode-modal"
import Subscriptor from "./Subscriptor"
import { useState } from "react"
import { makeid } from "../utils/utils"
import { storage } from "../utils/storage"

class WalletManager extends Subscriptor {
	constructor() {
		super()
		this.wallet = null
	}

	getWallet = () => this.wallet

	setWallet = (wallet) => {
		console.log("set wallet", this.wallet, wallet)
		this.wallet = wallet
		this.notify(wallet)
	}

	isConnected = () => {
		return this.getWallet()?.connected
	}

	disconnect = async () => {
		if (this.isConnected()) await this.getWallet().killSession()
	}

	onSubscribe = (wallet) => {}

	connect = () => {
		if (this.isConnected()) return this.getWallet()
		try {
			var wallet = new WalletConnect({
				bridge: "https://bridge.walletconnect.org", // Required
				qrcodeModal: QRCodeModal,
			})
			if (!wallet?.connected) wallet.createSession()
			this.setWallet(wallet)
			this.setEvents(this.getWallet())
			return this.getWallet()
		} catch (e) {
			console.log(e)
		}
	}
	setEvents = (wallet) => {
		wallet.on("connect", (error, payload) => {
			if (error) {
				throw error
			}
			// Get provided accounts and chainId
			const { accounts, chainId } = payload.params[0]
			const auxWallet = this.getWallet()
			auxWallet.accounts = accounts
			auxWallet.chainId = chainId
			this.setWallet(auxWallet)
			console.log("wallet connect", this.getWallet())
		})

		wallet.on("session_update", (error, payload) => {
			if (error) {
				throw error
			}

			// Get updated accounts and chainId
			const { accounts, chainId } = payload.params[0]
			// const auxWallet = this.getWallet()
			// auxWallet.accounts = accounts
			// auxWallet.chainId = chainId
			// this.setWallet(auxWallet)
		})

		wallet.on("disconnect", (error, payload) => {
			if (error) {
				throw error
			}
			this.setWallet(null)

			// Delete connector
		})
	}
}

const walletManager = new WalletManager()

const useWallet = (customId) => {
	const [wallet, setWallet] = useState(walletManager.getWallet())
	const id = customId || makeid(10)
	return [
		wallet,
		() => {
			walletManager.subscribe(id, setWallet)
		},
		() => {
			walletManager.unsubscribe(id)
		},
	]
}

export { walletManager, useWallet }
