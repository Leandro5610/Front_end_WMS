import React, { useEffect, useState } from "react"
import { Button } from "../Components/Button"
import { Input } from "../Components/Inputs/InputText"
import { InputSenha } from "../Components/Inputs/InputSenha"
import styles from "../Styles/Cadastros/Prof_Aluno.module.css"
import logo from "../IMG/Logo WMS.png"
import { Foto } from "../Components/Inputs/InputFoto"

import api from '../Services/api'
import { erro, sucesso } from "../Components/Avisos/Alert"
import { getProfessor, refresh } from "../Services/gets"

export default function CadastroProfessores() {

    const [nomeProf, setNome] = useState('')
    const [nif, setNif] = useState('')
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')

    async function CadastrarProf(event) {
        event.preventDefault()

        const nomeProf = document.getElementById('nome').value
        const nif = document.getElementById('nif').value
        const senha = document.getElementById('senha').value
        let imagem = document.getElementById("imgPhoto").getAttribute("src")

        const body = { 'nome': nomeProf, 'nif': nif, "email": email, 'senha': senha, imagem };

        if (localStorage.getItem("alterandoProf")) {
            const id = localStorage.getItem("idProf")
            const prof = (await getProfessor(id)).data
            body.id = id
            api.put(
                `api/professor/${id}`, body
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
                "api/professor/save", body
            ).then(
                response => {
                    if (response.status == 201 || response.status == 200) {
                        refresh(`cadastro`)
                    }
                },
                err => {
                    erro("Ocorreu um erro ao Cadastrar este Professor:" + err)
                }
            )
        }
    }

    async function getProfAlterar() {

        if (localStorage.getItem("alterandoProf")) {
            const id = localStorage.getItem("idProf")
            const prof = (await getProfessor(id)).data
            const imagem = document.getElementById("imgPhoto")

            setNome(prof.nome)
            setNif(prof.nif)
            setEmail(prof.email)
            imagem.setAttribute("src", prof.imagem)
        }
    }

    function tirarFoto() {
        document.getElementById("imgPhoto").src = ""
    }


    useEffect(() => {
        getProfAlterar()
    }, [])

    //Fazendo o Perfil do Usuario
    useEffect(() => {
        const nome = document.getElementById('nome').value
        const nif = document.getElementById('nif').value
        const email = document.getElementById('email').value

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

        if (nif === '') {
            iconMatricula.style.display = 'none'
        } else {
            iconMatricula.style.display = 'block'
        }

    }, [nomeProf, nif, email]);

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
                    <h1 className={styles.h1}>Cadastro de Professor(a)</h1>
                    <form onSubmit={CadastrarProf}>
                        <Input defaultValue={nomeProf} caracter={15} id="nome" type="text" onChange={(e) => setNome(e.target.value)} placeholder="Digite o seu Nome" name="nome" label="Nome" />
                        <Input defaultValue={nif} caracter={15} id="nif" type="number" onChange={(e) => setNif(e.target.value)} name="nif" placeholder="Digite seu NIF" label="Nif" />
                        <Input defaultValue={email} caracter={30} label="Email" id="email" type="email" onChange={(e) => setEmail(e.target.value)} name="email" placeholder="Digite o Email" />
                        <InputSenha id="senha" id_eye="eye" type="password" onChange={(e) => setSenha(e.target.value)} name="senha" placeholder="Digite sua Senha" label="Senha" />
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
                            <span className={styles.InfoNome}>{nomeProf}</span>
                        </div>
                        <div className={styles.info2}>
                            <span className={styles.titleEmail}>
                                <i id='iconEmal' className="fa-solid fa-at"></i>
                                {email}
                            </span>
                            <span className={styles.InfoNum}>
                                <i id='iconMatricula' className="fa-solid fa-address-card"></i>
                                {nif}
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

}


