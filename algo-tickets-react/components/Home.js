import axios from "axios"
import { useEffect, useState } from "react"
import styles from "../styles/Home.module.css"
import useSWR from "swr"

export default function Home({ info }) {
	useEffect(() => {
		console.log("home")
	}, [info])
	return (
		<>
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
		</>
	)
}
