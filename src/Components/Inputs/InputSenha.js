import React from "react";
import styles from '../../Styles/Inputs/InputSenha.module.css'
import eye_off from '../../IMG/eye-off.png'
import eye_on from '../../IMG/eye-on.png'
import eye_open from '../../IMG/eye-open.gif'
import eye_close from '../../IMG/eye-close.gif'
import { abrirRecuperacao } from "../Avisos/RecuperacaoSenha";

export class InputSenha extends React.Component {
    render() {

        const { name, label, id, id_eye, onChange, width, esqueceu, user } = this.props

        function hash() {
            var senha = document.getElementById(id)
            var eye = document.getElementById(id_eye)
        
            if (senha.type === 'password' && eye.getAttribute("src")) {
                senha.type = 'text'
                eye.setAttribute("src", eye_open)
                setTimeout(() => {
                    eye.setAttribute("src", eye_on)
                }, 600);
            }
            else {
                senha.type = 'password'
                eye.setAttribute("src", eye_close)
                setTimeout(() => {
                    eye.setAttribute("src", eye_off)
                }, 600);
            }
        }

        return (
            <div className={styles.inputBox} style={{width: width}}>
                <input width={width} type="password" autoComplete="off" onChange={onChange} required name={name} id={id}></input>
                <label>{label}</label>
                <div onClick={hash} type="button" id="btn" className={styles.btn}>
                    <img id={id_eye} width="30px" height="30px" src={eye_off} ></img>
                </div>
                {esqueceu == true? <a className={styles.esqueceu} onClick={() => user == "professor" ? abrirRecuperacao("professor") : abrirRecuperacao("aluno")}>Esqueceu a <strong>Senha?</strong></a>: ""}
            </div>
        );
    }
}

