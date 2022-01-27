import axios from "axios"
const apiurl = "http://localhost:5000"

const getAccountBalance = async (account) => {
	return await axios
		.get(`${apiurl}/api/algorand/balance/${account}`)
		.then((res) => {
			if (res.error) throw new Error(res.data)
			else return res.data
		})
		.catch((err) => {
			return err.response.data
		})
}
const getAccountInfo = async (account) => {
	return await axios
		.get(`${apiurl}/api/algorand/info/${account}`)
		.then((res) => {
			if (res.error) throw new Error(res.data)
			else return res.data
		})
		.catch((err) => {
			return err.response.data
		})
}
const loginWithMnemonic = async (mnemonic) => {
	return await axios
		.post(`${apiurl}/api/algorand/login`, { mnemonic })
		.then((res) => {
			if (res.error) throw new Error(res.data)
			else return res.data
		})
		.catch((err) => {
			return err.response.data
		})
}
const getSuggestedParams = async () => {
	return await axios
		.get(`${apiurl}/api/algorand/node/params`)
		.then((res) => {
			if (res.error) throw new Error(res.data)
			else return res.data
		})
		.catch((err) => {
			return err.response.data
		})
}

const sendTransaction = async ({ signedTxn }) => {
	console.log("signedTxn", signedTxn)
	return await axios
		.post(`${apiurl}/api/algorand/operations/send-transaction`, {
			signedTxn,
		})
		.then((res) => {
			if (res.error) throw new Error(res.data)
			else return res.data
		})
		.catch((err) => {
			return err.response.data
		})
}

export default {
	getAccountBalance,
	getAccountInfo,
	loginWithMnemonic,
	getSuggestedParams,
	sendTransaction,
}
