import React from "react"
import style from "../../styles/CustomInput.module.scss"

export default function CustomButton({
	label = "",
	onClick = () => {},
	containerClass = null,
	buttonClass = null,
}) {
	return (
		<>
			<div className={containerClass || style.button_container}>
				<button
					className={buttonClass || style.button}
					onClick={onClick}
				>
					{label}
				</button>
			</div>
		</>
	)
}
