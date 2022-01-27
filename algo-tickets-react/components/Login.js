import styles from "../styles/Home.module.css"
import { useWallet, getWallet, walletManager } from "../utils/wallet.js"
import { useEffect, useState, useContext, useRef } from "react"
import { useDataManager } from "../utils/subscriptor test"
import AppContext from "../utils/AppContext"

export default function Login({}) {
	const context = useContext(AppContext)

	const handleSubmit = (e) => {
		e.preventDefault()
		try {
			console.log("login")
			context.wallet.connect()
		} catch (err) {
			console.log(err)
		}
	}

	return (
		<div>
			<div className={styles.container}>
				<div className={styles.content}>
					<form onSubmit={handleSubmit}>
						{/* <input type="text" placeholder="Enter account" /> */}
						<button type="submit">Connect to your Wallet</button>
					</form>
				</div>
			</div>
		</div>
	)
}
