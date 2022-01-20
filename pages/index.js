import { useEffect, useState } from "react"
import customStyles from "../styles/Custom.module.scss"
import Home from "../components/Home"
import Logout from "../components/Logout"
import TopBar from "../components/TopBar"
import axios from "axios"
import AsyncLocalStorage from "@createnextapp/async-local-storage"

const getAccountInfo = async (account) =>
	await axios.get(`/api/algorand/${account}/info`).then((res) => res.data)

export default function Index({ storedInfo }) {
	const [account, setAccount] = useState(storedInfo?.address)
	const [info, setInfo] = useState({})

	const handleLogin = async (account) => {
		setAccount(account)

		const info = await getAccountInfo(account)

		setInfo(info)
		await AsyncLocalStorage.setItem("accountInfo", account)
	}

	const handleLogout = async () => {
		console.log("index logout")
		await AsyncLocalStorage.removeItem("accountInfo")
		setAccount(null)
		setInfo({})
	}

	useEffect(async () => {
		AsyncLocalStorage.getItem("accountInfo").then((account) => {
			if (account) {
				setAccount(account)
				getAccountInfo(account).then((info) => setInfo(info))
			}
		})
	}, [])
	return (
		<>
			<TopBar
				account={account}
				onLogin={handleLogin}
				onLogout={handleLogout}
			/>
			<Home info={info} />
		</>
	)
}
