import React, { useContext, useEffect, useRef, useState } from "react"
import AppContext from "../utils/AppContext"

export default function Logout({}) {
	const context = useContext(AppContext)
	const [wallet, setWallet] = useState(context.wallet)

	const handleLogout = async () => {
		console.log("Logout")

		context.wallet.disconnect()
	}

	useEffect(() => {
		setWallet(context.wallet)
	}, [context])
	return (
		<>
			<button onClick={handleLogout}>Logout from account </button>
		</>
	)
}
