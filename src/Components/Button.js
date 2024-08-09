import React from "react";
import styles from "../Styles/Button.module.css"

export class Button extends React.Component {
    render () {

        const { id, width } = this.props
        return(
            <button id={id} style={{width: width}} className={styles.botao} type="submit">
                {this.props.children}
            </button>
        );
    }
} 