import React, { useEffect, useState } from "react"
import { Button } from "../Components/Button"
import { Input } from "../Components/Inputs/InputText"
import { Select } from "../Components/Inputs/Select"
import { Foto } from "../Components/Inputs/InputFoto"
import logo from "../IMG/Logo WMS.png"
import styles from "../Styles/Cadastros/CadastroTurma.module.css"

import api from "../Services/api"
import { fazOptionsPeriodo, refresh } from "../Services/gets"
import { erro, sucesso } from "../Components/Avisos/Alert"

export default function CadastroTurma() {
    function getTurma() {
        const id = localStorage.getItem("idTurma")
        const periodo = document.getElementById("periodo")
        const participantes = document.getElementById("participantes")
        const img = document.getElementById("imgPhoto")
        const range = document.getElementById("myRange")
        const imagem = document.getElementById("imgPhoto")
        range.setAttribute("value", 1)

        if (id != undefined || id != null) {
            api.get(`api/turma/${id}`).then(
                response => {
                    const turma = response.data
                    participantes.innerHTML = turma.numParticipantes
                    setNome(turma.nome)
                    range.setAttribute("value", turma.numParticipantes)
                    setDataComeco(turma.dataInicio)
                    setDataFinal(turma.dataFinal)
                    imagem.setAttribute("src", turma.imagem)
                    periodo.value = turma.periodo
                    if (turma.imagem != null) {
                        img.setAttribute("src", `${turma.imagem}`)
                    }
                }
            )
        }

    }

    function CadastrarAlterar(event) {
        event.preventDefault()

        const periodo = document.getElementById("periodo").value
        const participantes = document.getElementById("participantes").textContent
        let imagem = document.getElementById("imgPhoto").getAttribute("src")

        const prof = { "id": localStorage.getItem("idProf") }
        const id = localStorage.getItem("idTurma")

        const body = {
            id,
            'nome': nome,
            'periodo': periodo,
            'dataInicio': dataC,
            'dataFinal': dataF,
            'numParticipantes': participantes,
            prof,
            imagem
        };

        if (id) {
            api.put(
                `api/turma/${id}`, body
            ).then(
                response => {
                    if (response.status == 201 || response.status == 200) {
                        refresh(`alteracao`)
                    }
                },
                err => {
                    erro("Ocorreu um erro ao Alterar esta Turma:" + err)
                }
            )
        } else {
            body.imagem = imagem
            api.post(
                "api/turma/save", body
            ).then(
                response => {
                    if (response.status == 201 || response.status == 200) {
                        refresh(`cadastro`)
                    }
                },
                err => {
                    erro("Ocorreu um erro ao Cadastrar esta Turma:" + err)
                }
            )
        }
    }

    useEffect(() => {
        getTurma()
    }, [])

    var [nome, setNome] = useState('')
    var [dataC, setDataComeco] = useState('')
    var [dataF, setDataFinal] = useState('')

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

            <div className={styles.baseForm}>
                <div className={styles.logo}>
                    <img src={logo} className={styles.logo}></img>
                </div>
                <div className={styles.AddFotos}>
                    <Foto />
                </div>
                <div className={styles.formContainer}>
                    <div className={styles.titles}>
                        <h1 className={styles.title}>Cadastro de Turmas</h1>
                        <span className={styles.subTitle}>Lógistica</span>
                    </div>
                    <form onSubmit={CadastrarAlterar}>
                        <Input id="nome" label="Nome da Turma" defaultValue={nome} onChange={(e) => setNome(e.target.value)} type="text" name="nome" placeholder="Digite o Nome"></Input>
                        <Select data={fazOptionsPeriodo()} id="periodo" idArrow="arrow" title="Periodo"></Select>
                        <Input id="dataComeco" label="Data de Começo" defaultValue={dataC} onChange={(e) => setDataComeco(e.target.value)} type="date" name="nome" placeholder="Selecione a Data" ></Input>
                        <Input id="dataFinal" label="Data Final" defaultValue={dataF} onChange={(e) => setDataFinal(e.target.value)} type="date" name="nome" placeholder="Selecione a Data"></Input>
                        <label>Número de Participantes</label>
                        <div className={styles.slidecontainer}>
                            <input type="range" min="1" max="45" id="myRange" onChange={numero} className={styles.slider} />
                            <p className={styles.value}><span id="participantes">1</span></p>
                        </div>
                        <Button>Criar Turma</Button>
                    </form>
                </div>
            </div>
        </div>
    )

}

function numero() {
    var slider = document.getElementById("myRange");
    var output = document.getElementById("participantes");
    output.innerHTML = slider.value;

    slider.oninput = function () {
        output.innerHTML = this.value;
    }
}

