import { AlgorandAPI } from "../../../utils/algorand"

export default async function handler(req, res) {
	if (req.method !== "POST") {
		res.status(400).send({ message: "Only POST requests allowed" })
		return
	}

	const { mnemonic } = req.body

	try {
		// console.log(JSON.parse(req.body))
		res.status(200).json({
			...mnemonic,
		})
	} catch (err) {
		res.status(500).json({
			error: err.message,
		})
	}
}
