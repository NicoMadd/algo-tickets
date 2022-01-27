import React, { useEffect, useContext, useRef, useState } from "react"
import Login from "../components/Login"
import Logout from "../components/Logout"
import { getWallet, walletManager } from "../utils/wallet.js"
import AppContext from "../utils/AppContext"

export default function TopBar({}) {
	const context = useContext(AppContext)
	const [isConnected, setIsConnected] = useState(false)

	useEffect(() => {
		setIsConnected(context.wallet.connected)
	}, [context.wallet.connected])

	return (
		<>
			{!isConnected ? (
				<>
					<Login />
				</>
			) : (
				<>
					Account connected: {context.wallet.accounts[0]}
					<Logout />
				</>
			)}
		</>
	)
}
