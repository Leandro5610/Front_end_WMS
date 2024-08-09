import React from "react";
import styles from "../../Styles/Inputs/InputText.module.css"

export class Input extends React.Component {
    render () {
        const {type, name, disabled, id, defaultValue, label, onChange, width, caracter, height} = this.props
        return(
            <div className={styles.inputBox} style={{width: width, height: height}}>
                <input id={id} defaultValue={defaultValue} type={type} min="0" maxLength={caracter} step="0.01" disabled={disabled} autoComplete="off" style={{width: width}} onChange={onChange} required name={name} ></input>
                <span className={styles.label}>{label}</span>
            </div>
        );
    }
}  