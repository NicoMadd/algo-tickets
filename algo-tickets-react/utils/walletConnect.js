import WalletConnect from "@walletconnect/client"
import QRCodeModal from "@walletconnect/qrcode-modal"
import Subscriptor from "./Subcriptor"
import { useState } from "react"
import { makeid } from "../utils/utils"

class WalletManager extends Subscriptor {
	constructor() {
		super()
		this.wallet = null
	}

	getWallet = () => this.wallet

	setWallet = (wallet) => {
		this.wallet = wallet
		this.notify(wallet)
	}

	isConnected = () => {
		return this.getWallet()?.connected
	}

	disconnect = async () => {
		if (this.getWallet()?.connected) await this.getWallet().killSession()
	}

	onSubscribe = (wallet) => {
		this.subcribers.forEach((subscriber) => subscriber.updFunc(wallet))
	}

	connect = () => {
		if (this.isConnected()) return wallet
		try {
			var wallet = new WalletConnect({
				bridge: "https://bridge.walletconnect.org", // Required
				qrcodeModal: QRCodeModal,
			})
			this.setEvents(wallet)
			this.setWallet(wallet)
			return this.getWallet()
		} catch (e) {
			console.log(e)
		}
	}
	setEvents = (wallet) => {
		// Check if connection is already established
		if (!wallet.connected) {
			// create new session
			wallet.createSession()
		}

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
		})

		wallet.on("session_update", (error, payload) => {
			if (error) {
				throw error
			}

			// Get updated accounts and chainId
			const { accounts, chainId } = payload.params[0]
			const auxWallet = this.getWallet()
			auxWallet.accounts = accounts
			auxWallet.chainId = chainId
			this.setWallet(auxWallet)
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

const useWallet = () => {
	const [wallet, setWallet] = useState(walletManager.getWallet())
	const id = makeid(10)
	return [
		wallet,
		() => {
			walletManager.subscribe(id), setWallet
		},
		() => {
			walletManager.unsubscribe(id)
		},
	]
}

export { walletManager, useWallet }
