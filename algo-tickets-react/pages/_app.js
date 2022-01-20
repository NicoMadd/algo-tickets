import "../styles/globals.css"
import Head from "next/head"
import Image from "next/image"
import styles from "../styles/Home.module.css"
import axiosConfig from "../utils/axiosConfig"

function MyApp({ Component, pageProps }) {
	return (
		<>
			<Component {...pageProps} />
		</>
	)
}

export default MyApp
