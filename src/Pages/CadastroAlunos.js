import React, { useEffect, useState } from "react"
import { Button } from "../Components/Button"
import { Input } from "../Components/Inputs/InputText"
import { InputSenha } from "../Components/Inputs/InputSenha"
import styles from "../Styles/Cadastros/Prof_Aluno.module.css"
import logo from "../IMG/Logo WMS.png"
import foto from "../IMG/image-icon.png"

import api from "../Services/api"
import { erro, sucesso } from "../Components/Avisos/Alert"
import { getAluno, refresh } from "../Services/gets"

export default function CadastroAlunos() {

    async function CadastrarAluno(event) {
        let imagem = document.getElementById("imgPhoto").getAttribute("src")
        event.preventDefault()
        var body = { "nome": nome, "codMatricula": matricula, imagem, "email": emailAluno, "senha": senha };

        if (localStorage.getItem("alterandoAluno")) {
            const id = localStorage.getItem("idAluno")
            const aluno = (await getAluno(id)).data
            body.id = id
            body.turma = aluno.turma
            api.put(
                `api/aluno/${id}`, body
            ).then(
                response => {
                    if (response.status == 201 || response.status == 200) {
                        refresh("alteracao")
                    }
                },
                err => {
                    erro("Ocorreu um erro ao Alterar o Usuario:" + err)
                }
            )
        } else {
            api.post(
                "api/aluno/save", body
            ).then(
                response => {
                    if (response.status == 201 || response.status == 200) {
                        refresh(`cadastro`)
                    }
                },
                err => {
                    erro("Ocorreu um erro ao Cadastrar o Usuario:" + err)
                }
            )
        }
    }

    function tirarFoto() {
        document.getElementById("imgPhoto").src = ""
    }

    async function getAlunoAlterar() {

        if (localStorage.getItem("alterandoAluno")) {
            const id = localStorage.getItem("idAluno")
            const aluno = (await getAluno(id)).data
            const imagem = document.getElementById("imgPhoto")

            setNome(aluno.nome)
            setMatricula(aluno.codMatricula)
            setEmailAluno(aluno.email)
            imagem.setAttribute("src", aluno.imagem)
        }
    }

    const [nome, setNome] = useState('')
    const [matricula, setMatricula] = useState('')
    const [emailAluno, setEmailAluno] = useState('')
    const [senha, setSenha] = useState('')

    //Fazendo o Perfil do Usuario
    useEffect(() => {
        const nome = document.getElementById('nome').value
        const matricula = document.getElementById('numMatricula').value
        const email = document.getElementById('emailAluno').value

        const nomeUser = document.getElementById('nomeUser')
        const iconEmal = document.getElementById('iconEmal')
        const iconMatricula = document.getElementById('iconMatricula')

        if (nome === '') {
            nomeUser.style.display = 'none'
        } else {
            nomeUser.style.display = 'flex'
        }

        if (email === '') {
            iconEmal.style.display = 'none'
        } else {
            iconEmal.style.display = 'block'
        }

        if (matricula === '') {
            iconMatricula.style.display = 'none'
        } else {
            iconMatricula.style.display = 'block'
        }

    }, [nome, matricula, emailAluno]);

    useEffect(() => {
        getAlunoAlterar()
    }, [])

    return (
        <div className={styles.container}>

            <a className='voltar' onClick={() => window.history.back()}>
                <lord-icon
                    src="https://cdn.lordicon.com/jxwksgwv.json"
                    trigger="hover"
                    colors="primary:#121331"
                    state="hover-1"
                    style={{ width: 32, height: 32 }}>
                </lord-icon>
            </a>

            <div className={styles.logoDiv}>
                <img src={logo} className={styles.logo}></img>
            </div>

            <div className={styles.baseForm}>
                <div className={styles.Form}>
                    <h1 className={styles.h1}>Cadastro de Aluno(a)</h1>
                    <form onSubmit={CadastrarAluno}>
                        <Input defaultValue={nome} caracter={15} label="Nome" id="nome" type="text" onChange={(e) => setNome(e.target.value)} placeholder="Digite o seu Nome" name="nome" />
                        <Input defaultValue={matricula} caracter={15} label="N° Matricula" id="numMatricula" type="number" onChange={(e) => setMatricula(e.target.value)} name="numMatricula" placeholder="Digite o N° Matrícula" />
                        <Input defaultValue={emailAluno} caracter={30} label="Email" id="emailAluno" type="email" onChange={(e) => setEmailAluno(e.target.value)} name="emailAluno" placeholder="Digite o Email" />
                        <InputSenha label="Senha" id="senha" id_eye="eye" type="password" onChange={(e) => setSenha(e.target.value)} name="senha" placeholder="Digite sua Senha" />
                        <Button>Cadastrar</Button>
                    </form>
                </div>
                <div className={styles.Perfil}>
                    {/* PERFIL */}
                    <div className={styles.Info}>
                        <div className={styles.fotoDiv}>
                            <div className={styles.personal_image}>
                                <label>
                                    <span onClick={tirarFoto} className={styles.btnFileRemove}>
                                        <i className="fa-regular fa-circle-xmark"></i>
                                    </span>
                                    <input type="file" id="fileImage" onChange={fileChange} accept=".jpg" />
                                    <span className={styles.btnFile}>
                                        <i className="fa-solid fa-file-circle-plus"></i>
                                    </span>
                                    <figure className={styles.personal_figure}>
                                        <img className={styles.personal_avatar} id="imgPhoto" />
                                    </figure>
                                </label>
                            </div>
                        </div>
                        <div id='nomeUser' className={styles.Nome}>
                            <span className={styles.titleNome}>Nome</span>
                            <span className={styles.InfoNome}>{nome}</span>
                        </div>
                        <div className={styles.info2}>
                            <span className={styles.titleEmail}>
                                <i id='iconEmal' className="fa-solid fa-at"></i>
                                {emailAluno}
                            </span>
                            <span className={styles.InfoNum}>
                                <i id='iconMatricula' className="fa-solid fa-address-card"></i>
                                {matricula}
                            </span>
                        </div>

                    </div>

                    <div className={styles.text_wrapper}>
                        <div className={styles.text}>
                            <p className={styles.font_Size}>Warehouse Management System Warehouse Management System</p>
                        </div>
                        <div className={styles.text}>
                            <p className={styles.font_Size}>Warehouse Management System Warehouse Management System</p>
                        </div>
                        <div className={styles.text}>
                            <p className={styles.font_Size}>Warehouse Management System Warehouse Management System</p>
                        </div>
                        <div className={styles.text}>
                            <p className={styles.font_Size}>Warehouse Management System Warehouse Management System</p>
                        </div>
                        <div className={styles.text}>
                            <p className={styles.font_Size}>Warehouse Management System Warehouse Management System</p>
                        </div>
                        <div className={styles.text}>
                            <p className={styles.font_Size}>Warehouse Management System Warehouse Management System</p>
                        </div>
                        <div className={styles.text}>
                            <p className={styles.font_Size}>Warehouse Management System Warehouse Management System</p>
                        </div>
                        <div className={styles.text}>
                            <p className={styles.font_Size}>Warehouse Management System Warehouse Management System</p>
                        </div>
                        <div className={styles.text}>
                            <p className={styles.font_Size}>Warehouse Management System Warehouse Management System</p>
                        </div>
                        <div className={styles.text}>
                            <p className={styles.font_Size}>Warehouse Management System Warehouse Management System</p>
                        </div>
                        <div className={styles.text}>
                            <p className={styles.font_Size}>Warehouse Management System Warehouse Management System</p>
                        </div>
                        <div className={styles.text}>
                            <p className={styles.font_Size}>Warehouse Management System Warehouse Management System</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

    function fileChange() {
        let photo = document.getElementById('imgPhoto');
        let file = document.getElementById('fileImage');

        if (file.files.length <= 0) {
            return;
        }

        let reader = new FileReader();

        reader.onload = () => {
            photo.src = reader.result;
        }

        reader.readAsDataURL(file.files[0]);
    }

    /* function perfil(){
        const nome = document.getElementById('nome')
    } */
}