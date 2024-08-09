import React from "react";
import styles from '../../Styles/ItensHome/CadastroNcm.module.css'
import { Button } from "../../Components/Button"
import { Input } from "../../Components/Inputs/InputText"
import api from "../../Services/api"
import { getNcm, refresh } from "../../Services/gets";
import LinhaNcm from "./LinhaNcm";
import { erro, sucesso } from "../Avisos/Alert";


export class CadastroNcm extends React.Component {
    render() {

        const { ncms } = this.props


        function pegaIdNcm(id, idLinha) {
            const linha = document.getElementById(idLinha)
            const list = document.getElementById("listNcms").children

            if (linha.style.backgroundColor != "black") {
                localStorage.setItem('idNcm', id)

                for (let i = 0; i < list.length; i++) {
                    const linha = list[i];

                    linha.style.backgroundColor = "white"
                    linha.style.color = "black"

                }

                const nome = document.getElementById('ncm')

                const btn = document.getElementById('bNcm')
                const btnAlterar = document.getElementById('AlterarNcm')
                const btnExcluir = document.getElementById('ExcluirNcm')

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
                    api.get(`api/ncm/${id}`).then(
                        response => {
                            const ncm = response.data
                            nome.value = ncm.ncm
                        }
                    )
                }
            } else {
                localStorage.removeItem('idNcm', id)

                const nome = document.getElementById('ncm')

                const btn = document.getElementById('bNcm')
                const btnAlterar = document.getElementById('AlterarNcm')
                const btnExcluir = document.getElementById('ExcluirNcm')

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

            }
        }

        function excluirNcm() {
            const id = localStorage.getItem('idNcm')

            api.delete(`api/ncm/${id}`).then(
                response => {
                    refresh("deleteNCM")
                },
                err => {
                    erro('Ocorreu um erro ao excluir este NCM, verifique se não existem produtos cadastrados com ele')
                }
            )
        } 

        return (
            <div className={styles.principal} id="principal">
                <div className={styles.payment} id="payment">
                    <span className={styles.close} onClick={Fechar} ><i className="fa-regular fa-circle-xmark"></i></span>
                    <span className={styles.header}>
                        <a className={styles.iconNCM}>
                            <span className={styles.textNcm}>NCM</span>
                        </a>
                        <span className={styles.title}>Cadastro de NCM</span>
                    </span>
                    <form onSubmit={CadastroNCM}>
                        <Input caracter={8} id="ncm" label="NCM" type="number" placeholder="Digite o NCM" name="ncm" />
                        <Button id='bNcm' >Criar</Button>

                        {/* LISTA */}
                        <div className={styles.listaMedida}>
                            <div className={styles.labelMedida}>
                                <span>Ncms Cadastrados</span>
                                <div className={styles.btns}>
                                    <button type={"button"} id='AlterarNcm' title={"Alterar"} onClick={CadastroNCM} className={styles.btn} >
                                        <i className="fa-solid fa-pen-to-square"></i>
                                    </button>

                                    <button type={"button"} id='ExcluirNcm' title={"Excluir"} className={styles.btn} onClick={excluirNcm} >
                                        <i className="fa-solid fa-trash"></i>
                                    </button>
                                </div>
                            </div>
                            <ul id="listNcms" className={styles.ListMedidas}>
                                {ncms.map((n, index) => <LinhaNcm chamarIdNcm={pegaIdNcm}
                                    id={n.id}
                                    key={index}
                                    ncm={n}
                                />)}
                            </ul>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

function Fechar() {
    const payment = document.getElementById("payment");
    const principal = document.getElementById("principal");
    const popUp = document.getElementById("popUp");

    payment.style.display = "none"
    principal.style.display = "none"
    popUp.style.zIndex = "-1"

    localStorage.removeItem('idNcm')
    document.getElementById('ncm').value = ''

    const btn = document.getElementById('bNcm')

    btn.style.opacity = '1'
    btn.style.cursor = 'pointer'
    btn.style.pointerEvents = 'auto'

    const btnAlterar = document.getElementById('AlterarNcm')
    const btnExcluir = document.getElementById('ExcluirNcm')

    btnAlterar.style.opacity = '0.5'
    btnAlterar.style.cursor = 'not-allowed'
    btnAlterar.style.pointerEvents = 'none'

    btnExcluir.style.opacity = '0.5'
    btnExcluir.style.cursor = 'not-allowed'
    btnExcluir.style.pointerEvents = 'none'

    payment.classList.remove(styles.alertOn)
}

function CadastroNCM(event) {
    event.preventDefault()

    const ncm = document.getElementById('ncm').value

    const id = localStorage.getItem('idNcm')

    var body = { id, "ncm": ncm };

    if (id) {
        console.log("alterar");
        api.put(`api/ncm/${id}`, body).then(
            response => {
                if (response.status == 201 || response.status == 200) {
                    refresh('alteracao')
                }
            },
            err => {
                erro("Ocorreu um erro ao Alterar a Ncm:" + err)
            }
        )
    } else {
        api.post(
            "api/ncm/save", body
        ).then(response => {
            if (response.status == 201 || response.status == 200) {
                refresh('cadastro')
            }
        },
            err => {
                erro("Ocorreu um erro ao Cadastrar O Ncm:" + err)
            }
        )
    }

}
