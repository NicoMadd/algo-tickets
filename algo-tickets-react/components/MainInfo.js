import React from "react"
import styles from "../styles/Home.module.css"
import { useState, useEffect, useContext } from "react"
import AppContext from "../utils/AppContext"
import algorandAPI from "../utils/algorand"

const interval = 1000 * 2

export default function MainInfo({}) {
	const [info, setInfo] = useState({})
	const context = useContext(AppContext)

	useEffect(() => {
		console.log("home", context.wallet)
		if (context.wallet.accounts.length > 0) {
			algorandAPI
				.getAccountInfo(context.wallet.accounts[0])
				.then((info) => {
					setInfo(info)
				})
		} else setInfo({})
	}, [context])

	return (
		<div className={styles.container}>
			<div className={styles.content}>
				<h1>Algorand</h1>
				<h2>Account</h2>
				<h3>{info.address}</h3>
				<h2>Balance</h2>
				<p>{info.amount}</p>
				<h2>Assets</h2>
				<p>{JSON.stringify(info.assets)}</p>
				<h2>Info</h2>
				<p>{JSON.stringify(info)}</p>
			</div>
		</div>
	)
}
