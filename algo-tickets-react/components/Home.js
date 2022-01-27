import MainInfo from "./MainInfo"
import Collapse from "./Collapse/Collapse"
import Operations from "./Operations/Operations"
import styles from "../styles/Home.module.css"

export default function Home({}) {
	return (
		<>
			<div className={styles.menu}>
				<Collapse sharedLabel="Account information">
					<MainInfo />
				</Collapse>
				<Collapse sharedLabel="Operations">
					<Operations />
				</Collapse>
			</div>
		</>
	)
}
