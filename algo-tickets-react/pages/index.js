import { useEffect, useState } from "react"
import customStyles from "../styles/Custom.module.scss"
import Home from "../components/Home"
import TopBar from "../components/TopBar"
import axios from "axios"
import { storage } from "../utils/storage"
import { useWallet, walletManager } from "../utils/walletConnect.js"

const getAccountInfo = async (account) =>
	await axios.get(`/api/algorand/${account}/info`).then((res) => res.data)

export default function Index({ storedInfo }) {
	const [wallet, subscribe, unsubscribe] = useWallet()
	const [info, setInfo] = useState({})

	const handleLogin = async (wallet) => {
		console.log("wallet", wallet)
		// setAccount(account)
		// const info = await getAccountInfo(account)
		// setInfo(info)
		// await storage.setItem("accountInfo", account)
	}

	const handleLogout = async () => {
		// console.log("index logout")
		// await storage.removeItem("accountInfo")
		// setAccount(null)
		// setInfo({})
	}

	useEffect(async () => {
		console.log("index wallet", wallet)
		// storage.getItem("accountInfo").then((account) => {
		// 	if (account) {
		// 		setAccount(account)
		// 		getAccountInfo(account).then((info) => setInfo(info))
		// 	}
		// })
	}, [])
	return (
		<>
			<TopBar onLogin={handleLogin} onLogout={handleLogout} />
			<Home info={info} />
			{
				// button on click disconnect from walletconnect
			}
			<button
				className={customStyles.button}
				onClick={async () => walletManager.disconnect()}
			>
				Disconnect
			</button>

			{
				// button on click print walletconnect info
			}
			<button
				className={customStyles.button}
				onClick={() => {
					console.log(walletManager.getWallet())
				}}
			>
				Print WalletConnector Info
			</button>

			{
				// button is wallet connected
			}
			<button
				className={customStyles.button}
				onClick={() => {
					console.log(
						"connected: " + (walletManager.isConnected() || false)
					)
				}}
			>
				Is Wallet Connected
			</button>
		</>
	)
}
