import { AlgorandAPI } from "../../../../utils/algorand.js";

export default async function handler(req, res) {
	const { account } = req.query;
	// console.log(account);
	try {
		const info = await AlgorandAPI.getAccountInfo(account);

		// console.log(info);
		res.status(200).json({
			...info,
		});
	} catch (err) {
		res.status(500).json({
			error: err.message,
		});
	}
}
