import styles from "../styles/Home.module.css"
import { useWallet, walletManager } from "../utils/walletConnect.js"

export default function Login({ account, onLogin }) {
	const [wallet, subscribe, unsubscribe] = useWallet()
	console.log("login wallet", wallet)

	const handleSubmit = (e) => {
		e.preventDefault()
		try {
			const wallet = walletManager.connect()
			console.log("logging wallet", wallet)
			if (walletManager.isConnected()) onLogin(wallet)
		} catch (err) {
			console.log(err)
		}
	}

	if (wallet) return <></>
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
