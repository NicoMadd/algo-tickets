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
	const [wallet, subscribe, unsubscribe] = useWallet("index")
	const [info, setInfo] = useState({})

	const updateAccountInfo = async (wallet) => {
		const account = wallet.accounts[0]
		const info = await getAccountInfo(account)
		setInfo(info)
	}
	const handleLogin = async (wallet) => {
		console.log("index wallet", wallet)
		await updateAccountInfo(wallet)
	}

	const handleLogout = () => {
		console.log("index logout")
		setInfo({})
	}

	useEffect(async () => {
		console.log("index wallet", wallet)
		subscribe()

		if (walletManager.isConnected()) updateAccountInfo(wallet)

		return unsubscribe()
	}, [wallet])
	return (
		<>
			<TopBar onLogin={handleLogin} onLogout={handleLogout} />
			<Home info={info} />

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
