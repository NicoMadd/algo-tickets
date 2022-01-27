import React, { useState, useContext } from "react"
import styles from "../../styles/AssetTransfer.module.scss"
import CustomButton from "../Inputs/CustomButton"
import CustomInput from "../Inputs/CustomInput"
import AppContext from "../../utils/AppContext"

export default function AssetTransfer() {
	const context = useContext(AppContext)
	const [accountTo, setAccountTo] = useState("")
	const [amount, setAmount] = useState("")

	const makeTransaction = async () => {
		try {
			const signedTxn = await context.wallet.makeTransaction({
				to: accountTo,
				from: context.wallet.accounts[0],
				amount: amount,
			})

			const result = await context.wallet.sendTransaction({
				signedTxn: signedTxn,
			})

			console.log("resulat", result)
		} catch (e) {
			console.log("error", e)
		}
	}

	// form to make transaction
	return (
		<>
			<CustomInput
				id="accountTo"
				placeholder="Account to"
				label="Account to"
				value={accountTo}
				onChange={(e) => setAccountTo(e.target.value)}
				inputClass={styles["form-control"]}
				containerClass={styles["form-group"]}
			/>
			<CustomInput
				id="amount"
				placeholder="Amount"
				label="Amount"
				value={amount}
				onChange={(e) => setAmount(e.target.value)}
				inputClass={styles["form-control"]}
				containerClass={styles["form-group"]}
			/>

			<CustomButton label="Make transaction" onClick={makeTransaction} />
		</>
	)
}
