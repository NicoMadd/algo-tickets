import WalletConnect from "@walletconnect/client"
import QRCodeModal from "@walletconnect/qrcode-modal"
import Subscriptor, { useSubscritor } from "./Subscriptor"
import { useState } from "react"
import { makeid } from "./utils"
import { storage } from "./storage"

class SubscriptorTest extends Subscriptor {
	constructor() {
		super()
		this.data = null
	}

	getData = () => this.data

	setData = (data) => {
		console.log("set data", this.data, data)
		this.data = data
		this.notify(this.getData())
	}
}

const dataManager = new SubscriptorTest()

const useDataManager = (customId) =>
	useSubscritor(customId, () => dataManager.getData(), dataManager)

export { dataManager, useDataManager }
