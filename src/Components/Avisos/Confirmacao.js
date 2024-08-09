import React from "react";

import styles from "../../Styles/Confirmacao.module.css"

export class Confirmacao extends React.Component {
    render() {

        const {funcao} = this.props

        return (
            <div id="confirmacao" style={{display: "none"}}  className={styles.container}>
                <div className={styles.confirmacao} id="confirmacaoDiv">
                    <div className={styles.headerConfirmacao}>
                        <span className={styles.certeza}>Tem certeza?</span>
                        <span className={styles.closeConfirmacao} onClick={closeConfirmacao}><i className="fa-regular fa-circle-xmark"></i></span>
                    </div>

                    <div className={styles.mensagemBody}>

                        <span id="mensagem1" className={styles.mensagem1}>

                        </span>

                        <span id="mensagem2" className={styles.mensagem2}>

                        </span>

                    </div>

                    <div className={styles.confirmarBtn}>

                        <button onClick={closeConfirmacao} className={styles.voltarBtn}>
                            Voltar
                        </button>

                        <button onClick={funcao}  id="confirmacaoBtn" className={styles.confirmacaoBtn}>
                            Confirmar
                        </button>

                    </div>
                </div>
            </div>
        )
    }
}

export function openConfirmacao(mensagem1, mensagem2) {
    const confirmacaoContainer = document.getElementById("confirmacao")
    const confirmacaoDiv = document.getElementById("confirmacaoDiv")
    const mensagemSpan1 = document.getElementById("mensagem1")
    const mensagemSpan2 = document.getElementById("mensagem2") 

    mensagemSpan1.innerText = mensagem1
    mensagemSpan2.innerText = mensagem2
    confirmacaoContainer.style.display = "flex"
    confirmacaoDiv.classList.add(styles.confirmacaoOn)

    setTimeout(() => {
        confirmacaoDiv.classList.remove(styles.confirmacaoOn)
    }, 1000);
}

export function closeConfirmacao() {
    const confirmacaoContainer = document.getElementById("confirmacao")
    const mensagemSpan1 = document.getElementById("mensagem1")
    const mensagemSpan2 = document.getElementById("mensagem2")
    mensagemSpan1.innerText = ""
    mensagemSpan2.innerText = ""
    confirmacaoContainer.style.display = "none"
}