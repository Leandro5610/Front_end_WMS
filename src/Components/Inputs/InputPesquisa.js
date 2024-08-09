import React from "react";
import styles from "../../Styles/Inputs/InputPesquisa.module.css"

export class InputPesquisa extends React.Component {

    state = {
        texto: ""
    }

    render() {
        const { name, id, placeholder, search, left } = this.props

        const onSearch = (e) => {
            e.preventDefault()
            search(this.state.texto)
        }

        return (
            <div className={styles.inputBox} style={{left : left}}>
                <form onSubmit={onSearch}>

                    <input id={id} className={styles.inputPesquisa} type="search" placeholder={placeholder} autoComplete="off" onChange={e => this.setState({ texto: e.target.value })} required name={name}></input>
                    <button className={styles.lupa}>
                        <lord-icon
                            src="https://cdn.lordicon.com/rlizirgt.json"
                            trigger="click"
                            colors="primary:#000000"
                            style={{width:32,height:32}}>
                        </lord-icon>
                    </button>
                </form>
            </div>
        );
    }
} 