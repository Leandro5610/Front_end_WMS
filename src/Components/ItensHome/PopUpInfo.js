import React from "react";
import styles from '../../Styles/ItensHome/PopUpInfo.module.css'
import logo from "../../IMG/Logo WMS.png"
import api from "../../Services/api";
import { erro, sucesso } from "../Avisos/Alert";
import { refresh } from "../../Services/gets";

export class PopUpInfo extends React.Component {
    render() {

        function alterar() {
            let id = document.getElementById('id').value

            if (localStorage.getItem("idFornecedor")) {
                window.location.href = "/CadastroFornecedores"
            } else if (localStorage.getItem("idProduto")) {
                window.location.href = "/CadastroProduto"
            }
        }

        function excluir() {
            let id = document.getElementById('id').value

            if (localStorage.getItem("idFornecedor")) {
                api.delete(`api/fornecedor/${id}`).then(
                    response => {
                        refresh("delete")
                    },
                    err => {
                        refresh("erroFornecedor")
                    }
                )
            } else if (localStorage.getItem("idProduto")) {
                api.delete(`api/produto/${id}`).then(
                    response => {
                        refresh("delete")
                    },
                    err => {
                        refresh("erroProduto")
                    }
                )
            }
        }

        return (
            <div id="container" className={styles.container}>

                <div className={styles.PopUpInfo} id="PopUpInfo">
                    <span className={styles.close} onClick={Fechar}>
                        <i className="fa-regular fa-circle-xmark"></i>
                    </span>
                    <div className={styles.BaseInfo}>
                        <div className={styles.InfoProduto}>
                            <div className={styles.ImgProduto}>
                                <img id='imgItemPedido' className={styles.produtoImagem}></img>
                            </div>
                            <div className={styles.TitleInfo}>
                                <span id='nome' className={styles.NomeProduto}></span>
                                <span id='descricao' className={styles.DescricaoProduto}>
                                    <p id='info10Title' className={styles.info}></p>
                                    <br />
                                    <p id='info2' className={styles.info}></p>
                                </span>
                                <div id='cod' className={styles.cod}>
                                    <span onClick={alterar} className={styles.Code} title='Alterar'>
                                        <i className="fa-solid fa-pen-to-square"></i>
                                    </span>
                                    <span onClick={excluir} className={styles.Code} title='Excluir'>
                                        <i className="fa-solid fa-trash"></i>
                                    </span>
                                </div>
                            </div>
                        </div>
                        <input type="hidden" id='id'></input>
                        <div className={styles.BaseInfoValores}>
                            <div className={styles.InfoSobre}>
                                <div id='impostos' className={styles.Impostos}>
                                    <span className={styles.InfoImpostos}>
                                        <p id='info1Title' className={styles.titleImpor}></p>
                                        <p id='info1' className={styles.ResImpor}></p>
                                    </span>
                                    <span id='infoImposto' className={styles.InfoImpostos}>
                                        <p id='info2Title' className={styles.titleImpor}></p>
                                        <p id='info7' className={styles.ResImpor}></p>
                                    </span>
                                    <span className={styles.InfoImpostos}>
                                        <p id='info4Title' className={styles.titleImpor}></p>
                                        <p id='info4' className={styles.ResImpor}></p>
                                    </span>
                                    <span className={styles.InfoImpostos}>
                                        <p id='info5Title' className={styles.titleImpor}></p>
                                        <p id='info5' className={styles.ResImpor}></p>
                                    </span>

                                </div>
                                <div className={styles.Importacoes}>
                                    <span className={styles.baseTitleImpor}>
                                        <p id='info3Title' className={styles.titleImpor}>Importado:</p>
                                        <p id='info3' className={styles.ResImpor}></p>
                                    </span>
                                    <span id='importado' className={styles.ValorImportacao}>
                                        <span className={styles.TitleValor}>
                                            <p className={styles.textUnitario}>Valor Importação :</p>
                                        </span>
                                        <span className={styles.Valor}>
                                            <p className={styles.cifrao}>%</p>
                                            <p id='info8' className={styles.Num}></p>
                                        </span>
                                    </span>
                                </div>
                            </div>
                            <div className={styles.InfoValores}>
                                <div className={styles.ValoreUnitario}>
                                    <span className={styles.TitleValor}>
                                        <p id='info7Title' className={styles.textUnitario}></p>
                                    </span>
                                    <span className={styles.Valor}>
                                        <p id='info6Title' className={styles.cifrao}>R$</p>
                                        <p id='info6' className={styles.Num}></p>
                                    </span>
                                </div>
                                <div className={styles.ValoreTotal}>
                                    <span className={styles.TitleValor}>
                                        <p id="info8Title" className={styles.textTotal}></p>
                                    </span>
                                    <span className={styles.Valor}>
                                        <p id='info9Title' className={styles.Totalcifrao}></p>
                                        <p id='info9' className={styles.TotalNum}></p>
                                    </span>
                                </div>
                            </div>

                        </div>
                    </div>
                </div >

            </div>
        );

        function Fechar() {
            const container = document.getElementById("container");
            const PopUpInfo = document.getElementById("PopUpInfo");
            const popUpInformacoes = document.getElementById("popUpInformacoes");
            localStorage.removeItem("idFornecedor")
            localStorage.removeItem("idProduto")
            container.style.zIndex = "-1"
            PopUpInfo.style.display = 'none'
            PopUpInfo.classList.remove(styles.alertOn)
            popUpInformacoes.style.zIndex = '-1'

        }

    }

}
