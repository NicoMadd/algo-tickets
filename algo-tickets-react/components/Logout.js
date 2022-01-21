import React from "react"
import { walletManager } from "../utils/walletConnect"

export default function Logout({ onLogout }) {
	const handleLogout = () => {
		walletManager.disconnect()
		onLogout()
	}

	return <button onClick={handleLogout}>Logout from account</button>
}
