import axios from "axios"
import { useEffect, useState } from "react"
import styles from "../styles/Home.module.css"
import useSWR from "swr"

export default function Home({ info }) {
	const [account, setAccount] = useState(info?.address)
	const [infoData, setInfoData] = useState(info)
	const [balance, setBalance] = useState(infoData.amount)

	useEffect(() => {
		setAccount(info?.address)
		setInfoData(info)
		setBalance(infoData.amount)
	}, [info, account])
	return (
		<>
			<div className={styles.container}>
				<div className={styles.content}>
					<h1>Algorand</h1>
					<h2>Account</h2>
					<h3>{account}</h3>
					<h2>Balance</h2>
					<p>{balance}</p>
					<h2>Assets</h2>
					<p>{JSON.stringify(info.assets)}</p>
					<h2>Info</h2>
					<p>{JSON.stringify(info)}</p>
				</div>
			</div>
		</>
	)
}
