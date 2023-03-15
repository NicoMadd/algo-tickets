import React, { useState, useContext, useEffect } from "react"
import styles from "../../styles/AssetTransfer.module.scss"
import CustomButton from "../Inputs/CustomButton"
import CustomInput from "../Inputs/CustomInput"
import AppContext from "../../utils/AppContext"
import CustomSelect from "../Inputs/CustomSelect"

export default function AssetTransferTrx() {
	const context = useContext(AppContext)
	const [accountTo, setAccountTo] = useState("")
	const [amount, setAmount] = useState("")
	const [assetId, setAssetId] = useState("")
	const [assets, setAssets] = useState([])

	useEffect(async () => {
		const assets = await context.wallet.getAccountAssets()
		console.log("assets", assets)
		setAssets(assets)
	}, [context])

	const makeTransaction = async () => {
		try {
			console.log("makeTransaction", {
				to: accountTo,
				from: context.wallet.accounts[0],
				amount: amount,
				assetId: assetId,
			})
			// const signedTxn = await context.wallet.makeAssetTransferTransaction(
			// 	{
			// 		to: accountTo,
			// 		from: context.wallet.accounts[0],
			// 		amount: amount,
			// 	}
			// )

			// const result = await context.wallet.sendTransaction({
			// 	signedTxn: signedTxn,
			// })

			// console.log("resulat", result)
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
			<CustomSelect
				id="assetId"
				label="Asset Id"
				value={assetId}
				onChange={(e) => setAssetId(e.target.value)}
				selectClass={styles["form-control"]}
				containerClass={styles["form-group"]}
				onChange={(e) => setAssetId(e.target.value)}
				options={assets}
			/>

			<CustomButton label="Make transaction" onClick={makeTransaction} />
		</>
	)
}
