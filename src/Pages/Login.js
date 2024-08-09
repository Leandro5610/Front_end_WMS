import React, { useState } from "react";
import styles from '../Styles/Login.module.css'
import { Button } from "../Components/Button"
import { Input } from "../Components/Inputs/InputText"
import { InputSenha } from "../Components/Inputs/InputSenha"
import logo from "../IMG/Logo WMS.png"
import api from "../Services/api";
import { erro, sucesso } from "../Components/Avisos/Alert";
import { getAluno, getProfessor, refresh, sendIdAluno, sendIdProf } from "../Services/gets";
import { RecuperacaoSenha } from "../Components/Avisos/RecuperacaoSenha";

export default function Login() {


    const [codMatricula, setCodMatricula] = useState("")
    const [nif, setNif] = useState("")
    const [senhaAluno, setSenhaAluno] = useState("")
    const [senhaProf, setSenhaProf] = useState("")

    const [email, setEmail] = useState("")

    function LogAluno(e) {
        e.preventDefault()

        if (localStorage.getItem("token")) {
            erro("Você já está logado")
        } else {

            const body = {
                codMatricula, "senha": senhaAluno
            }

            api.post("api/aluno/login", body).then(
                async response => {
                    localStorage.setItem("token", response.data.token)
                    const idAluno = await sendIdAluno()
                    localStorage.setItem("idAluno", idAluno)
                    let aluno = (await getAluno(idAluno)).data
                    localStorage.setItem("aluno", true)
                    if (aluno.turma == null || aluno.turma == undefined) {
                        localStorage.clear()
                        refresh("semTurma")
                    } else {
                        localStorage.setItem("idTurma", aluno.turma.id)
                        window.location.href = "/Loading"
                    }
                },
                err => {
                    erro("Erro ao Realizar o Login, não foi encontrado um usuário com essas informaçoes, verifique se os dados estão corretos e tente novamente")
                }
            )
        }
    }

    function LogProf(e) {
        e.preventDefault()

        if (localStorage.getItem("token")) {
            erro("Você já está logado")
        } else {

            const body = {
                nif, "senha": senhaProf
            }

            api.post("api/professor/login", body).then(
                async response => {
                    localStorage.setItem("token", response.data.token)
                    const idProf = await sendIdProf()
                    localStorage.setItem("idProf", idProf)
                    let professor = await getProfessor(idProf)
                    professor = professor.data
                    localStorage.setItem("professor", true)
                    refresh("login")
                    window.location.href = "/Turmas"
                },
                err => {
                    erro("Erro ao Realizar o Login, não foi encontrado um usuário com essas informações, verifique se os dados estão corretos e tente novamente")
                }
            )
        }
    }

    function VerificarEmail(e) {
        e.preventDefault()
        const user = document.getElementById("user").value

        if (user == "aluno") {

            const aluno = { "email": email }
            api.post(`api/aluno/buscarEmail/${email}`, aluno, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }, onUploadProgress() {
                    document.getElementById("loading").style.visibility = "visible"
                }
            }).then(
                response => {
                    const codeDiv = document.getElementById("codDiv")
                    const emailDiv = document.getElementById("emailDiv")

                    if (codeDiv.style.top == "-350px") {
                        codeDiv.style.top = "-130px"
                        emailDiv.style.top = "350px"
                        document.getElementById("loading").style.visibility = "hidden"
                    }
                },
                err => {
                    document.getElementById("loading").style.visibility = "hidden"
                    document.getElementById("close").removeAttribute("disabled")
                    erro("Email não encontrado, verifique se digitou corretamente e tente novamente")
                }
            )
        } else if (user == "professor") {
            const professor = { "email": email }
            api.post(`api/professor/buscarEmail/${email}`, professor, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }, onUploadProgress() {
                    document.getElementById("loading").style.visibility = "visible"
                }
            }).then(
                response => {
                    const codeDiv = document.getElementById("codDiv")
                    const emailDiv = document.getElementById("emailDiv")

                    if (codeDiv.style.top == "-350px") {
                        codeDiv.style.top = "-130px"
                        emailDiv.style.top = "350px"
                        document.getElementById("loading").style.visibility = "hidden"
                    }
                },
                err => {
                    document.getElementById("loading").style.visibility = "hidden"
                    document.getElementById("close").removeAttribute("disabled")
                    erro("Email não encontrado, verifique se digitou corretamente e tente novamente")
                }
            )
        }
    }

    return (
        <div className={styles.container}>
            <RecuperacaoSenha onClick={VerificarEmail} onChange={(e) => setEmail(e.target.value)}></RecuperacaoSenha>
            <header className={styles.headerLogin}>
                <img src={logo} className={styles.logo}></img>
                <a href="/Home"><i className="fa-solid fa-house"></i></a>
            </header>

            <div className={styles.Login_Cubo}>

                <div className={styles.LoginContainer}>
                    <div className={styles.base}>
                        <div className={styles.btns}>
                            <button id="btnAluno" type="button" className={styles.btnOn} onClick={loginAluno}>Aluno</button>
                            <button id="btnProf" type="button" className={styles.btn} onClick={loginProf}>Professor</button>
                        </div>
                        <span className={styles.title}>Gerenciamento de estoque nunca foi tão fácil</span>
                        <div className={styles.base_form} method="post">
                            <form id="loginAluno" className={styles.alunoOn} onSubmit={LogAluno} >
                                <Input width={"100%"} onChange={(e) => setCodMatricula(e.target.value)} id="numero" label="Número de Matrícula" type="number" placeholder="Digite o Número de Matricula" name="numero" />
                                <InputSenha user={"aluno"} esqueceu={true} width={"100%"} onChange={(e) => setSenhaAluno(e.target.value)} id="senhaAluno" id_eye="eye1" label="Senha" type="password" placeholder="Digite a senha" name="senhaAluno" />
                                <Button>Entrar</Button>
                                <p className={styles.telaCadastro}>Não tem uma conta? <a href="../CadastroAlunos" className={styles.btnCadastro}>Crie aqui!</a></p>
                            </form>

                            <form id="loginProf" className={styles.profOff} onSubmit={LogProf} method="post">
                                <Input onChange={(e) => setNif(e.target.value)} id="nif" label="Nif" type="number" placeholder="Digite o Número de Matricula" name="numero" />
                                <InputSenha user={"professor"} esqueceu={true} onChange={(e) => setSenhaProf(e.target.value)} id="senhaProf" id_eye="eye2" label="Senha" type="password" placeholder="Digite a senha" name="senhaProf" />
                                <Button>Entrar</Button>
                                <p className={styles.telaCadastro}>Não tem uma conta? <a href="../CadastroProfessores" className={styles.btnCadastro}>Crie aqui!</a></p>
                            </form>
                        </div>
                    </div>
                </div>

                <div className={styles.cuboContainer}>

                    <div className={styles.div_title}>
                        <a className="navigation-link navigation-link-1" href="#">
                            <span data-text="Warehouse Management System" className={styles.span}>Warehouse Management System</span>
                        </a>
                    </div>

                    <div className={styles.cubo}>
                        <iframe src='https://my.spline.design/untitled-da98f9f4bfe0d99057aa680c0c7ba3e8/' frameBorder='0' width='100%' height='100%'></iframe>
                    </div>

                </div>

            </div>
        </div>
    );

    function loginProf() {
        const aluno = document.getElementById('loginAluno')
        const prof = document.getElementById('loginProf')

        const btnAluno = document.getElementById('btnAluno')
        const btnProf = document.getElementById('btnProf')

        aluno.classList.replace(styles.alunoOn, styles.alunoOff)
        prof.classList.replace(styles.profOff, styles.profOn)

        btnAluno.classList.replace(styles.btnOn, styles.btn)
        btnProf.classList.replace(styles.btn, styles.btnOn)
    }

    function loginAluno() {
        const aluno = document.getElementById('loginAluno')
        const prof = document.getElementById('loginProf')

        const btnAluno = document.getElementById('btnAluno')
        const btnProf = document.getElementById('btnProf')

        aluno.classList.replace(styles.alunoOff, styles.alunoOn)
        prof.classList.replace(styles.profOn, styles.profOff)

        btnAluno.classList.replace(styles.btn, styles.btnOn)
        btnProf.classList.replace(styles.btnOn, styles.btn)
    }
}