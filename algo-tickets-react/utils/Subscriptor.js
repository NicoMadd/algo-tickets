class Subscriptor {
	constructor() {
		this.subcribers = []
	}

	subscribe = (id, updFunc) => {
		this.subcribers = this.subcribers.filter(
			(subscriber) => subscriber.id !== id
		)
		this.subcribers.push({ id, updFunc })
		this.onSubscribe(id)
	}

	onSubscribe = () => {}

	unsubscribe = (id) => {
		this.subcribers.filter((subscriber) => subscriber.id !== id)
		this.onUnsubscribe(id)
	}

	onUnsubscribe = () => {}

	notify = (data) => {
		this.subcribers.forEach((subscriber) => {
			console.log("notify", subscriber)
			subscriber.updFunc(data)
		})
	}
}

export default Subscriptor
