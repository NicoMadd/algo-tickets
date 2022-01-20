import styles from "../styles/Home.module.css"
import { useRouter } from "next/router"

export default function Login({ account, onLogin }) {
	const handleSubmit = (e) => {
		e.preventDefault()
		onLogin(e.target[0].value)
	}

	if (account) return <></>
	return (
		<div>
			<div className={styles.container}>
				<div className={styles.content}>
					<form onSubmit={handleSubmit}>
						<input type="text" placeholder="Enter account" />
						<button type="submit">Submit</button>
					</form>
				</div>
			</div>
		</div>
	)
}
