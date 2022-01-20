import React from "react"
import Login from "./Login"
import Logout from "./Logout"

export default function TopBar({ account, onLogin, onLogout }) {
	const handleLogout = () => {
		onLogout()
	}

	return (
		<>
			<div>
				{account == null ? (
					<Login onLogin={onLogin} />
				) : (
					<Logout onLogout={handleLogout} />
				)}
			</div>
		</>
	)
}
