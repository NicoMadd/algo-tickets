import React from "react"
import CustomButton from "./Inputs/CustomButton"
import AppContext from "../utils/AppContext"
import { useContext } from "react"
export default function TestingButtons() {
	const context = useContext(AppContext)

	return (
		<>
			{
				// button on click print walletconnect info
			}
			;
			<CustomButton
				onClick={() => {
					console.log(context.wallet)
				}}
				label={"Print Wallet Info"}
			/>
			;
			<CustomButton
				onClick={() => {
					console.log(context.wallet.connected())
				}}
				label={"Is Wallet Connected"}
			/>
			<CustomButton
				label="show subscribers"
				onClick={() => {
					console.log("subcribers", context.wallet.subscribers)
				}}
			/>
			<CustomButton
				label="show set"
				onClick={() => {
					console.log(context.setWallet)
				}}
			/>
			{/*
			<CustomButton
				label="show data"
				onClick={() => {
					console.log(dataManager.data)
				}}
			/>
			<CustomButton
				label={"change data"}
				onClick={() => {
					dataManager.setData(makeid(1))
				}}
			/> */}
		</>
	)
}
