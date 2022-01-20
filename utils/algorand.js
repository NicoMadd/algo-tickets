import axios from "axios"
const apiurl = "http://localhost:5000"
const api = {
	getAccountBalance: async (account) => {
		return await axios
			.get(`${apiurl}/api/algorand/balance/${account}`)
			.then((res) => {
				if (res.error) throw new Error(res.data)
				else return res.data
			})
			.catch((err) => {
				return err.response.data
			})
	},
	getAccountInfo: async (account) => {
		return await axios
			.get(`${apiurl}/api/algorand/info/${account}`)
			.then((res) => {
				if (res.error) throw new Error(res.data)
				else return res.data
			})
			.catch((err) => {
				return err.response.data
			})
	},
	loginWithMnemonic: async (mnemonic) => {
		return await axios
			.post(`${apiurl}/api/algorand/login`, { mnemonic })
			.then((res) => {
				if (res.error) throw new Error(res.data)
				else return res.data
			})
			.catch((err) => {
				return err.response.data
			})
	},
}

export { api as AlgorandAPI }
