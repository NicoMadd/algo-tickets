import React, { useContext, useState } from "react"
import AppContext from "../../utils/AppContext"
import Collapse from "../Collapse/Collapse"
import PaymentTrx from "./PaymentTrx"

export default function Operations() {
	const context = useContext(AppContext)

	return (
		<>
			<Collapse sharedLabel="Make Transaction">
				<PaymentTrx />
			</Collapse>
		</>
	)
}
