import { makeid } from "../utils/utils"
import { useState } from "react"
class Subscriptor {
	constructor() {
		this.subscribers = []
	}

	subscribe = (id, onNotify) => {
		this.subscribers = this.subscribers.filter(
			(subscriber) => subscriber.id !== id
		)
		this.subscribers.push({ id, onNotify })
		console.log("subscribed", id)
		this.onSubscribe(id)
	}

	onSubscribe = () => {}

	unsubscribe = (id) => {
		this.subscribers = this.subscribers.filter(
			(subscriber) => subscriber.id !== id
		)
		console.log("unsubscribed " + id)
		this.onUnsubscribe(id)
	}

	onUnsubscribe = () => {}

	notify = (data) => {
		console.log("notify", data)
		this.subscribers.forEach((subscriber) => {
			console.log("notifying", subscriber, data)
			subscriber.onNotify(data)
		})
	}
}

const useSubscritor = (customId, data, manager) => {
	const [state, setState] = useState(data)
	const id = customId || makeid(5)

	return [
		state,
		() => {
			manager.subscribe(id, setState)
		},
		() => {
			manager.unsubscribe(id)
		},
	]
}

export default Subscriptor
export { useSubscritor }
