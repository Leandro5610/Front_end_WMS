import React from "react";
import styles from "../../Styles/Inputs/Select.module.css"
import arrowDown from "../../IMG/arrow-down.png"

export class Select extends React.Component {
    render() {

        const { title, data, id, idArrow, onChange, defaultValue, width, children } = this.props

        async function FazOptions() {
            const dados = await data
            const select = document.getElementById(id)
            select.innerHTML += dados
        }

        function arrow() {

            const arrow = document.getElementById(idArrow)
            if (arrow.classList.contains(styles.arrowDown)) {
                arrow.classList.replace(styles.arrowDown, styles.arrowUp)
            }else {
                arrow.classList.replace(styles.arrowUp, styles.arrowDown)
            }
        }

        return (
            <div onLoad={FazOptions} className={styles.select} onClick={arrow} style={{width}} onBlur={arrow}>
                <select onChange={onChange} id={id} required style={{width}}>{children}</select>
                <img src={arrowDown} id={idArrow} className={styles.arrowDown}></img>
            </div>
        );
    }
}

