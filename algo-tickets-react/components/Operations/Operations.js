import React, { useContext, useState } from "react"
import AppContext from "../../utils/AppContext"
import Collapse from "../Collapse/Collapse"
import AssetTransferTrx from "./AssetTransferTrx"
import PaymentTrx from "./PaymentTrx"

export default function Operations() {
	const context = useContext(AppContext)

	return (
		<>
			<Collapse sharedLabel="Make Payment Transaction">
				<PaymentTrx />
			</Collapse>
			<Collapse sharedLabel="Make Asset Transfer Transaction ">
				<AssetTransferTrx />
			</Collapse>
		</>
	)
}
