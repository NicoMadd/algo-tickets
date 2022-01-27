import "../styles/globals.css"
import { Wallet } from "../utils/wallet"
import AppContext from "../utils/AppContext"
import WalletConnect from "@walletconnect/client"
import QRCodeModal from "@walletconnect/qrcode-modal"

function MyApp({ Component, pageProps }) {
	const connector = new WalletConnect({
		bridge: "https://bridge.walletconnect.org", // Required
		qrcodeModal: QRCodeModal,
	})

	const wallet = new Wallet(connector)

	return (
		<>
			<AppContext.Provider value={{ wallet }}>
				<Component {...pageProps} />
			</AppContext.Provider>
		</>
	)
}

export default MyApp
