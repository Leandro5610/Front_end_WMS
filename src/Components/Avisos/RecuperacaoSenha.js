import React, { useState } from "react";
import styles from "../../Styles/Recuperacao.module.css"
import { Input } from "../Inputs/InputText";
import loading from "../../IMG/loading.gif"
import OtpInput from "react-otp-input";
import api from "../../Services/api";
import { erro } from "./Alert";
import { InputSenha } from "../Inputs/InputSenha";
import { refresh } from "../../Services/gets";

export class RecuperacaoSenha extends React.Component {

    state = { codigo: '', senha: '', user: {} };

    handleChange = (codigo) => this.setState({ codigo });

    handleChangeSenha = (senha) => this.setState({ senha })

    setUser = (user) => this.setState({ user })

    render() {

        const enviarCodigo = (e) => {
            e.preventDefault()
            const user = document.getElementById("user").value
            const email = document.getElementById("email").value

            const codigo = this.state.codigo
            const body = { "email": email, "codigo": codigo }

            if (user == "aluno") {
                api.post("api/aluno/verificarCod", body).then(response => {
                    const codeDiv = document.getElementById("codDiv")
                    const divSenha = document.getElementById("divSenha")

                    codeDiv.style.top = "-350px"
                    divSenha.style.top = "-230px"
                    this.setUser(response.data)
                },
                    err => {
                        erro("Código incorreto")
                    })
            } else {
                api.post("api/professor/verificarCod", body).then(response => {
                    const codeDiv = document.getElementById("codDiv")
                    const divSenha = document.getElementById("divSenha")

                    codeDiv.style.top = "-350px"
                    divSenha.style.top = "-230px"
                    this.setUser(response.data)
                },
                    err => {
                        erro("Código incorreto")
                    })
            }
        }

        const RecuperarSenha = (e) => {
            e.preventDefault()
            const user = document.getElementById("user").value
            const senha = this.state.senha
            const usuario = this.state.user
            usuario.senha = senha

            if (user == "aluno") {
                api.put(`api/aluno/recuperarSenha/${this.state.user.id}`, usuario).then(response => {
                    refresh("alteracao")
                },
                    err => {
                        erro("Ocorreu um erro ao tentar alterar sua senha, tente novamente. " + err)
                    })
            } else {
                api.put(`api/professor/recuperarSenha/${this.state.user.id}`, usuario).then(response => {
                    refresh("alteracao")
                },
                    err => {
                        erro("Ocorreu um erro ao tentar alterar sua senha, tente novamente.")
                    })
            }
        }

        const { onChange, onClick } = this.props

        return (
            <div className={styles.container} id="recuperacaoDiv" >
                <div className={styles.recuperacao} id="recuperacao">

                    <header className={styles.header}>
                        <span className={styles.title}>Esqueceu a Senha?</span>
                        <span className={styles.close} id="close" onClick={fechar}><i className="fa-regular fa-circle-xmark"></i></span>
                    </header>

                    <div className={styles.emailDiv} id={"emailDiv"} style={{ top: "0" }}>
                        <div className={styles.recuperacaoContainer}>
                            <p>Não se preocupe, fizemos um sistema de recuperação de senha para pessoas como você que esquecem a própria senha que cadastrou. Digite seu email e um link será enviado para alterar sua senha</p>
                            <i className="fa-solid fa-key"></i>
                        </div>

                        <div className={styles.btn}>
                            <form onSubmit={onClick}>
                                <input type={"hidden"} id={"user"}></input>
                                <Input id={"email"} width={400} onChange={onChange} type={"email"} label={"Email"} ></Input>
                                <button className={styles.botao}>Enviar</button><img title={"Aguarde..."} id="loading" className={styles.loading} src={loading}></img>
                            </form>
                        </div>
                    </div>

                    <div id={"codDiv"} style={{ top: "-350px" }} className={styles.divCod}>

                        <div className={styles.codContainer}>
                            <OtpInput
                                value={this.state.codigo}
                                isInputNum={true}
                                onChange={this.handleChange}
                                numInputs={3}
                                className={styles.cod}
                                focusStyle={styles.focusCod}
                                inputStyle={styles.inputStyle}
                                separator={<span>-</span>}
                            />
                            <div className={styles.reenviarDiv}>O código não foi enviado? <a onClick={onClick} className={styles.reenviar}>Clique aqui para reeviar</a></div>
                        </div>

                        <div className={styles.btnCod}>
                            <button onClick={enviarCodigo} className={styles.botao}>Verificar</button>
                        </div>
                    </div>

                    <div id={"divSenha"} style={{ top: "350px" }} className={styles.divSenha}>
                        <span>Quase lá <strong className={styles.nome}>{this.state.user.nome}</strong>, agora digite sua nova senha e confirme para alterá-la. </span>
                        <form onSubmit={RecuperarSenha}>
                            <InputSenha id={"recuperacaoSenha"} type="password" label={"Senha"} id_eye={"eye4"} onChange={(e) => this.handleChangeSenha(e.target.value)}></InputSenha>
                            <button className={styles.botaoSenha}>Confirmar</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export function fechar() {

    if (document.getElementById("loading").style.visibility != "visible") {
        const container = document.getElementById("recuperacaoDiv")
        const popup = document.getElementById("recuperacao")

        popup.classList.remove(styles.alertOn)
        container.style.display = "none"
    }
}

export function abrirRecuperacao(usuario) {
    const container = document.getElementById("recuperacaoDiv")
    const popup = document.getElementById("recuperacao")
    const inputUser = document.getElementById("user")
    inputUser.value = usuario

    popup.style.display = "flex"
    popup.classList.add(styles.alertOn)
    container.style.display = "flex"
}