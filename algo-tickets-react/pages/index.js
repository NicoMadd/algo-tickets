import { useEffect, useState, useContext } from "react"
import Home from "../components/Home"
import TopBar from "../components/TopBar"
import TestingButtons from "../components/TestingButtons"
import AppContext from "../utils/AppContext"

export default function Index() {
	const context = useContext(AppContext)
	useEffect(() => {
		console.log("index", context)
	}, [context.wallet])

	return (
		<>
			<div className="index">
				<TopBar />
				<Home />
				<TestingButtons />
			</div>
		</>
	)
}
