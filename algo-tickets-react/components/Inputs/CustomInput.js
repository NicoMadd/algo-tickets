import React from "react"
import style from "../../styles/CustomInput.module.scss"

export default function CustomInput({
	label = "",
	onClick = (e) => {},
	onChange = (e) => {},
	containerClass = style.button_container,
	inputClass = style.button,
	type = "text",
	id = "",
	placeholder = "",
	value = "",
}) {
	return (
		<>
			<div className={containerClass}>
				<label htmlFor={id}>{label}</label>
				<input
					id={id}
					type={type}
					className={inputClass}
					onClick={onClick}
					onChange={onChange}
					placeholder={placeholder}
					value={value}
				/>
			</div>
		</>
	)
}
