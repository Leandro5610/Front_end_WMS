import React from "react"
import api from "../../Services/api"
import styles from "../../Styles/Relatorios.module.css"
import { erro } from "./Alert"
import loading from "../../IMG/loading.gif"
import { fazOptionsProdutos, fazOptionsProdutosSKU } from "../../Services/gets"
import { Input } from "../Inputs/InputText"
import { Select } from "../Inputs/Select"
import { dataFormatada } from "../../Services/formatter"

export class Relatorios extends React.Component {

    state = { dataC: '', dataF: '' };

    setDataC = (dataC) => this.setState({ dataC })

    setDataF = (dataF) => this.setState({ dataF })


    render() {

        function gerarRelatorioMovimentacao() {
            window.location.href = "http://localhost:8080/api/movimentacao/relatorioMovimentacoes"
        }

        function gerarRelatorioEstoque() {
            window.location.href = "http://localhost:8080/api/enderecamento/relatorio"
        }

        function gerarCurvaABC() {
            const relatoriosContainer = document.getElementById("relatoriosContainer")
            relatoriosContainer.style.cursor = "progress"
            document.getElementById("loading").style.display = "flex"
            api.get("api/enderecamento/relatorioABC").then(response => {

                setTimeout(() => {
                    window.location.href = `http://localhost:8080/relatorios/${response.data}`
                    relatoriosContainer.style.cursor = "auto"
                    document.getElementById("loading").style.display = "none"
                }, 6000);
            }, err => {
                erro("Ocorreu um erro ao gerar este relatório, tente novamente")
            })
        }

        function ampliarRelatorioData() {

            const relatorioDataDiv = document.getElementById("relatorioDataDiv")
            const section = document.querySelectorAll(".section")
            const selecioanarBtn = document.getElementById("selecioanarBtn")
            const divInputs = document.getElementById("divInputs")

            selecioanarBtn.style.display = "none"
            relatorioDataDiv.style.transform = "0.5s linear"
            relatorioDataDiv.style.position = "absolute"
            relatorioDataDiv.style.bottom = "50px"
            relatorioDataDiv.style.right = "50px"

            for (let i = 0; i < section.length; i++) {
                const s = section[i];
                s.style.opacity = "0"
                setTimeout(() => {
                    s.style.display = "none"
                }, 300);
            }
            divInputs.style.display = "flex"
            relatorioDataDiv.style.width = "500px"
            relatorioDataDiv.style.height = "450px"

            setTimeout(() => {
                divInputs.style.opacity = "100"
            }, 300);
        }

        const gerarRelatorioDP = (e) => {
            e.preventDefault()
            const sku = document.getElementById("produtoSku").value
            if(sku == "nenhum"){
                window.location.href = `http://localhost:8080/api/movimentacao/pdf/data/${dataFormatada(this.state.dataC).replaceAll("/", "-")}&${dataFormatada(this.state.dataF).replaceAll("/", "-")}`
            }else{
                window.location.href = `http://localhost:8080/api/movimentacao/pdf/${sku}&${dataFormatada(this.state.dataC).replaceAll("/", "-")}&${dataFormatada(this.state.dataF).replaceAll("/", "-")}`
            }
            
        }

        return (
            <div id="relatoriosContainer" className={styles.container}>
                <div id="relatoriosDiv" className={styles.relatoriosDiv}>
                    <div className={styles.header}>
                        <span className={styles.title}>
                            <lord-icon
                                src="https://cdn.lordicon.com/frjgvxce.json"
                                trigger="hover"
                                colors="primary:#000000"
                                state="hover-1"
                                style={{ width: 32, height: 32 }}>
                            </lord-icon>
                            Relatórios
                        </span>
                        <button onClick={fecharRelatorio} className={styles.close} id="closeRelatorio"><i className="fa-regular fa-circle-xmark"></i></button>
                    </div>
                    <div className={styles.relatoriosContainer}>
                        <div className={`${styles.relatorioSection} section`}>
                            <p>Relatório Movimentações</p>
                            <button className={styles.gerar} onClick={gerarRelatorioMovimentacao}>Gerar</button>
                        </div>
                        <div className={`${styles.relatorioSection} section`}>
                            <p>Relatório Estoque</p>
                            <button className={styles.gerar} onClick={gerarRelatorioEstoque}>Gerar</button>
                        </div>
                        <div className={`${styles.relatorioSection} section`}>
                            <p>Relatório Curva ABC</p>
                            <div className={styles.relatoriobtns}>
                                <button className={styles.gerar} onClick={gerarCurvaABC}>Gerar</button>
                                <img title={"Aguarde..."} id="loading" className={styles.loading} src={loading}></img>
                            </div>
                        </div>
                        <div id={"relatorioDataDiv"} className={styles.relatorioSection}>
                            <p>Relatório por Data / Produto</p>
                            <div className={styles.relatoriobtns}>
                                <button className={styles.gerar} id={"selecioanarBtn"} onClick={ampliarRelatorioData}>Selecionar</button>
                                <div id={"divInputs"} className={styles.divInputs}>
                                    <Select children={<option value={"nenhum"}>Selecione para filtrar por um produto</option>} data={fazOptionsProdutosSKU()} id="produtoSku" idArrow="arrow" title="Produto"></Select>
                                    <form onSubmit={gerarRelatorioDP}>
                                        <Input id="dataComeco" label="Data de Começo" onChange={(e) => this.setDataC(e.target.value)} type="date" name="dataC" placeholder="Selecione a Data de Inicial" ></Input>
                                        <Input id="dataFinal" label="Data Final" onChange={(e) => this.setDataF(e.target.value)} type="date" name="dataF" placeholder="Selecione a Data Final"></Input>
                                        <button className={styles.gerar} id={"selecioanarBtn"}>Gerar</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export function fecharRelatorio() {

    const relatorioDataDiv = document.getElementById("relatorioDataDiv")
    const section = document.querySelectorAll(".section")
    const selecioanarBtn = document.getElementById("selecioanarBtn")
    const divInputs = document.getElementById("divInputs")

    divInputs.style.display = "none"
    selecioanarBtn.style.display = "flex"
    relatorioDataDiv.style.position = "relative"
    relatorioDataDiv.style.bottom = "0"
    relatorioDataDiv.style.right = "0"

    for (let i = 0; i < section.length; i++) {
        const s = section[i];

        s.style.opacity = "100"
        setTimeout(() => {
            s.style.display = "flex"
        }, 300);

    }
    relatorioDataDiv.style.width = "40%"
    relatorioDataDiv.style.height = "40%"
    divInputs.style.opacity = "0"

    const container = document.getElementById("relatoriosContainer")
    const popup = document.getElementById("relatoriosDiv")
    popup.classList.remove(styles.alertOn)
    container.style.display = "none"
}

export function AbrirRelatorio() {
    const container = document.getElementById("relatoriosContainer")
    const popup = document.getElementById("relatoriosDiv")
    popup.classList.add(styles.alertOn)
    container.style.display = "flex"
}