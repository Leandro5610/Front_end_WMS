import React from 'react'
import styles from '../../Styles/LinhaPesquisa.module.css'

export default class LinhaPesquisa extends React.Component {
    render() {

        const { membro, onCheck, offCheck } = this.props

        const idMembro = membro.id

        function clickCheck() {
            const checkbox = document.getElementById(idMembro)
            //console.log(checkbox)
            if (checkbox.checked == true) {
                onCheck(membro)
            } else {
                offCheck(membro)
            }
        }

        return (
            <li className={styles.linhaPesqusa}>
                <span className={styles.Membro}>
                    <div className={styles.imgMembro}>
                        <img src={membro.imagem == null ? "https://www.somadesenvolvimento.com.br/application/assets/img/male.png" : `${membro.imagem}`}></img>
                    </div>
                    <div className={styles.infoMembro}>
                        <span className={styles.nameMembro}>{membro.nome}</span>
                        <span className={styles.subTitle}>{membro.email}</span>
                    </div>
                </span>

                <div className={styles.checkboxAnimate}>
                    <label>
                        <input id={idMembro} className={styles.check} onClick={clickCheck} type="checkbox" name="check" />
                        <span className={styles.inputCheck}></span>
                    </label>
                </div>

            </li>
        );
    }
} 