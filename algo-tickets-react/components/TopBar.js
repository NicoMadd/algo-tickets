import React from "react"
import Login from "./Login"
import Logout from "./Logout"
import { useWallet, disconnect } from "../utils/walletConnect.js"

export default function TopBar({ onLogin, onLogout }) {
	const [wallet, subscribe, unsubscribe] = useWallet()
	const handleLogout = () => {
		disconnect()
		onLogout()
	}

	console.log("wallet", wallet)

	return (
		<>
			<div>
				{wallet == null ? (
					<Login onLogin={onLogin} />
				) : (
					<Logout onLogout={handleLogout} />
				)}
			</div>
		</>
	)
}
