import { AlgorandAPI } from "../../../../utils/algorand.js";

export default async function handler(req, res) {
	const { account } = req.query;
	// console.log(account);
	try {
		const balance = await AlgorandAPI.getAccountBalance(account);

		// console.log(balance);
		res.status(200).json({
			...balance,
		});
	} catch (err) {
		res.status(500).json({
			error: err.message,
		});
	}
}
