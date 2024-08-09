import React, { Component, createElement } from "react";
import { Button } from "../Button"
import { Input } from "../Inputs/InputText"
import logo from "../../IMG/Logo WMS.png"
import styles from "../../Styles/CadastroMedidas.module.css"

import api from '../../Services/api'
import { erro, sucesso } from "../Avisos/Alert";
import MedidaLinha from "./MedidaLinha";
import { refresh } from "../../Services/gets";

export default class CadastroMedidas extends React.Component {
    render() {

        function pegaId(id, idLinha) {
            const linha = document.getElementById(idLinha)
            const list = document.getElementById("listMedidas").children

            if (linha.style.backgroundColor != "black") {
                localStorage.setItem('idMedida', id)

                for (let i = 0; i < list.length; i++) {
                    const linha = list[i];

                    linha.style.backgroundColor = "white"
                    linha.style.color = "black"

                }

                const nome = document.getElementById('nomeMedida')
                const sigla = document.getElementById('sigla')

                const btn = document.getElementById('b')
                const btnAlterar = document.getElementById('btnAlterar')
                const btnExcluir = document.getElementById('btnExcluir')

                linha.style.backgroundColor = "black"
                linha.style.color = "white"

                btn.style.opacity = '0.5'
                btn.style.cursor = 'not-allowed'
                btn.style.pointerEvents = 'none'

                btnAlterar.style.cursor = 'pointer'
                btnAlterar.style.pointerEvents = 'auto'
                btnAlterar.style.opacity = '1'


                btnExcluir.style.cursor = 'pointer'
                btnExcluir.style.pointerEvents = 'auto'
                btnExcluir.style.opacity = '1'

                if (id) {
                    api.get(`api/unidade/${id}`).then(
                        response => {
                            const medida = response.data
                            nome.value = medida.nome
                            sigla.value = medida.sigla
                        }
                    )
                }
            } else {
                localStorage.removeItem('idMedida', id)

                const nome = document.getElementById('nomeMedida')
                const sigla = document.getElementById('sigla')

                const btn = document.getElementById('b')
                const btnAlterar = document.getElementById('btnAlterar')
                const btnExcluir = document.getElementById('btnExcluir')

                linha.style.backgroundColor = "white"
                linha.style.color = "black"

                btn.style.opacity = '1'
                btn.style.cursor = 'pointer'
                btn.style.pointerEvents = 'auto'

                btnAlterar.style.cursor = 'not-allowed'
                btnAlterar.style.pointerEvents = 'none'
                btnAlterar.style.opacity = '0.5'


                btnExcluir.style.cursor = 'not-allowed'
                btnExcluir.style.pointerEvents = 'none'
                btnExcluir.style.opacity = '0.5'

                nome.value = ""
                sigla.value = ""

            }
        }

        function excluir() {
            const id = localStorage.getItem('idMedida')
            

            api.delete(`api/unidade/${id}`).then(
                response => {
                    refresh("delete")
                },
                err => {
                    erro('Ocorreu um erro ao excluir esta medida, verifique se não existem produtos cadastrados com ela')
                }
            )

        }

        return (
            <div className={styles.conteiner} id='containerMedida'>
                <div className={styles.form__base} id='base'>
                    <span className={styles.close} onClick={Fechar} ><i className="fa-regular fa-circle-xmark"></i></span>
                    <div className={styles.logo}>
                        <img src={logo}></img>
                    </div>
                    <div className={styles.titles}>
                        <h1 className={styles.title}>Cadastro de Medida</h1>
                    </div>
                    <div className={styles.formContainer}>
                        <form onSubmit={CadastrarMedida}>
                            <Input id="nomeMedida" label="Nome" type="text" placeholder="Digite o Nome" ></Input>
                            <Input id="sigla" label="Sigla" type="text" placeholder="Digite a Sigla"></Input>

                            <Button id='b'>Criar Medida</Button>

                            <div className={styles.listaMedida}>
                                <div className={styles.labelMedida}>
                                    <span>Medidas Cadastradas</span>
                                    <div className={styles.btns}>
                                        <button type={"button"} id='btnAlterar' title={"Alterar"} onClick={CadastrarMedida} className={styles.btn} >
                                            <i className="fa-solid fa-pen-to-square"></i>
                                        </button>

                                        <button type={"button"} id='btnExcluir' title={"Excluir"} className={styles.btn} onClick={excluir} >
                                            <i className="fa-solid fa-trash"></i>
                                        </button>
                                    </div>
                                </div>
                                <ul id="listMedidas" className={styles.ListMedidas}>
                                    {medidas.map((m, index) => {
                                        return <MedidaLinha chamarBtns={pegaId}
                                            id={m.id}
                                            key={index}
                                            medida={m}
                                        />
                                    })}
                                </ul>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

let medidas = [];

export function getMedida() {
    return api.get(`api/unidade/list`).then(response => {
        medidas = response.data
    })
}


function CadastrarMedida(event) {
    event.preventDefault()

    const nomeMedida = document.getElementById('nomeMedida').value
    const siglaMedida = document.getElementById('sigla').value

    const id = localStorage.getItem('idMedida')

    var body = {
        id,
        "nome": nomeMedida,
        "sigla": siglaMedida
    }


    if (id) {
        api.put(`api/unidade/${id}`, body).then(
            response => {
                refresh('alteracao')
            },
            err => {
                erro("Ocorreu um erro ao Alterar a Medida:" + err)
            }
        )
    } else {
        api.post(
            "api/unidade/save", body
        ).then(
            response => {
                if (response.status == 201 || response.status == 200) {
                    refresh('cadastro')
                }
            },
            err => {
                erro("Ocorreu um erro ao Cadastrar a Medida:" + err)
            }
        )
    }
}

function Fechar() {
    const base = document.getElementById("base");
    const containerMedida = document.getElementById("containerMedida");
    const popUpMedidas = document.getElementById("popUpMedidas");

    base.style.display = "none"
    containerMedida.style.display = "none"
    popUpMedidas.style.zIndex = "-1"

    localStorage.removeItem('idMedida')
    document.getElementById('nomeMedida').value = ''
    document.getElementById('sigla').value = ''

    const btn = document.getElementById('b')

    btn.style.opacity = '1'
    btn.style.cursor = 'pointer'
    btn.style.pointerEvents = 'auto'

    const btnAlterar = document.getElementById('btnAlterar')
    const btnExcluir = document.getElementById('btnExcluir')

    btnAlterar.style.opacity = '0.5'
    btnAlterar.style.cursor = 'not-allowed'
    btnAlterar.style.pointerEvents = 'none'

    btnExcluir.style.opacity = '0.5'
    btnExcluir.style.cursor = 'not-allowed'
    btnExcluir.style.pointerEvents = 'none'

    base.classList.remove(styles.alertOn)

}

