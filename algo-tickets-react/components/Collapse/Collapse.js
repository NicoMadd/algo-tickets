import React, { useEffect, useState } from "react"
import styles from "../../styles/Collapse.module.css"
import CustomButton from "../Inputs/CustomButton"

export default function Collapse({
	openLabel = "Expand",
	closeLable = "Collapse",
	sharedLabel = "",
	collapsed = true,
	children = {},
}) {
	openLabel = sharedLabel ? `Expand ${sharedLabel}` : "Expand"
	closeLable = sharedLabel ? `Collapse ${sharedLabel}` : "Collapse"
	const [isCollapsed, setIsCollapsed] = useState(collapsed)
	const [collapasableClass, setCollapasableClass] = useState(styles.collapse)

	useEffect(() => {
		console.log("collapsed", collapsed)
		setIsCollapsed(collapsed)
		if (isCollapsed) {
			setCollapasableClass(styles.collapse)
		} else {
			console.log("collapasableClass", collapasableClass)
			setCollapasableClass(styles.expand)
		}
	}, [])

	return (
		<>
			<div className={styles.collapsible_container}>
				<CustomButton
					label={isCollapsed ? openLabel : closeLable}
					onClick={() => setIsCollapsed(!isCollapsed)}
				/>
				<div
					className={`${styles.collapsible_children} ${
						isCollapsed ? styles.collapse : styles.expand
					}`}
				>
					{children}
				</div>
			</div>
		</>
	)
}
