import React from "react";
import style from "../../styles/CustomSelect.module.scss";

export default function CustomSelect({
    id = "select",
    label = "Select",
    onClick = () => {},
    onChange = () => {},
    defaultOption = "Select option",
    selectedOption = null,
    containerClass = null,
    selectClass = null,
    options,
}) {
    return (
        <>
            <div className={containerClass || style.select_container}>
                <label for="select">{label}</label>
                <select
                    id="select"
                    className={selectClass || style.select}
                    onChange={onChange}
                    onClick={onClick}
                >
                    <option value="">{defaultOption}</option>
                    {console.log("options", options)}
                    {/* {options.map((option, index) => (
						<option selected={selectedOption == index} key={option}>
							{option}
						</option>
					))} */}
                </select>
            </div>
        </>
    );
}
