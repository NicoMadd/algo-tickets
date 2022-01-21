import React, { useEffect } from "react"
import Login from "./Login"
import Logout from "./Logout"
import { useWallet, disconnect, walletManager } from "../utils/walletConnect.js"

export default function TopBar({ onLogin, onLogout }) {
	const [wallet, subscribe, unsubscribe] = useWallet("topbar")
	const handleLogout = () => {
		onLogout()
	}

	const handleLogin = (wallet) => {
		onLogin(wallet)
	}

	useEffect(() => {
		subscribe()
		console.log("topbar wallet", wallet)
		return unsubscribe()
	}, [wallet])

	return (
		<>
			<div>
				{!walletManager.isConnected() ? (
					<Login onLogin={handleLogin} />
				) : (
					<Logout onLogout={handleLogout} />
				)}
			</div>
		</>
	)
}
