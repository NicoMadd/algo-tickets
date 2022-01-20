import AsyncLocalStorage from "@createnextapp/async-local-storage"

const asyncStorageManager = {
	getItem: async (key) => {
		return AsyncLocalStorage.getItem(key)
	},
	setItem: async (key, value) => {
		return AsyncLocalStorage.setItem(key, value)
	},
	removeItem: async (key) => {
		return AsyncLocalStorage.removeItem(key)
	},
}

export { asyncStorageManager as storage }
