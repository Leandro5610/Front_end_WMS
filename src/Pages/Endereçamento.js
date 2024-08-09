import styles from "../Styles/TelaEnderecamento.module.css"
import styles2 from '../Styles/VerificarPedidos.module.css'
import Box from '../IMG/CaixaPedido.png'
import { createElement, useEffect, useState } from "react";
import api from "../Services/api";
import { ListaPedidos } from "../Components/InfoPedido/ListaPedidos";
import { PedidoItemCaixa } from "../Components/InfoPedido/PedidoItemCaixa";
import Edificio from "../Components/Edificio";
import { erro, sucesso } from "../Components/Avisos/Alert";
import { refresh } from "../Services/gets";
import { PopUpInfo } from "../Components/ItensHome/PopUpInfo";

export default function Enderecamento() {

    const [itens, setItens] = useState([])
    const [edificios, setEdificios] = useState([1, 2, 3, 4])
    const [enderecamentosCheck, setEndereçamentosCheck] = useState([])
    let [pedido, setPedido] = useState()

    async function getPedido(id) {

        if (id) {
            return api.get(`api/pedido/${id}`).then(
                response => {
                    if (response.data.enderecado == false) {
                        setItens(response.data.itens)
                        setPedido(response.data)
                    } else {
                        refresh("erroEnderecado")
                        window.history.back()
                    }
                }
            )
        } else {
            document.getElementById("body").style.height = "90%"
        }
    }

    function getEnderecamento() {
        var modulos = document.getElementsByClassName(styles.modulo)

        for (let i = 0; i < modulos.length; i++) {

            const modulo = modulos[i];
            const andar = modulo.parentElement
            const edificio = andar.parentElement
            const corredor = edificio.parentElement.id


            api.get("api/enderecamento/list").then(
                response => {
                    const endereco = response.data
                    endereco.map(e => {
                        if (e.corredor == corredor) {
                            if (e.edificio == edificio.id) {
                                if (e.andar == andar.id) {
                                    if (e.modulo == modulo.id) {
                                        let div = document.createElement("div")
                                        let img = document.createElement("img")
                                        let produto = `<div class=${styles2.nomeProduto3}><span title=${e.itens.nome} class=${styles2.titleProduto}>${e.itens.nome.length > 8 ? e.itens.nome.substring(0, 8) + "..." : e.itens.nome}</span></div>`
                                        img.src = Box
                                        img.classList.add(styles2.img)

                                        div.appendChild(img)
                                        div.innerHTML += (produto)
                                        div.classList.add(styles2.boxDiv2)
                                        modulo.addEventListener("click", () => ItemCall(e))
                                        modulo.appendChild(div)
                                    }
                                }
                            }
                        }
                    })
                })
        }
    }

    useEffect(() => {
        getPedido(localStorage.getItem('idPedido'))
        getEnderecamento()
        localStorage.removeItem('idProduto')
    }, [])

    function handleEndereco(endereco){
        enderecamentosCheck.map((e, index) => {
            if(e.id == endereco.id){
                enderecamentosCheck.splice(index, 1)
                setEndereçamentosCheck([...enderecamentosCheck])
            }
        })
        setEndereçamentosCheck(ender => [...enderecamentosCheck, endereco])
    }

    function ItemCall(item) {

        const codProduto = item.itens.codProduto
        localStorage.setItem('idProduto' , codProduto )

        const BasePoup = document.getElementById('BasePoup')
        const PopUpInfo = document.getElementById('PopUpInfo')
        BasePoup.style.display = 'flex'
        PopUpInfo.classList.add(styles2.alertOn)
        PopUpInfo.style.display = 'flex'

        let produto = document.getElementById('produto')
        let descricao = document.getElementById('descricao')
        let qnd = document.getElementById('qnd')
        let medida = document.getElementById('medida')
        let valor = document.getElementById('valor')
        let sku = document.getElementById('sku')
        let ncm = document.getElementById('ncm')
        let importado = document.getElementById('importado')
        let valorImportado = document.getElementById('valorImportado')
        let valorTotal = document.getElementById('valorTotal')
        let imgItemPedido = document.getElementById('imgItemPedido')

        valorImportado.style.fontSize = '35px'
        valorImportado.style.fontWeight = '500'

        if (item.itens != undefined) {
            if (item.itens.imagem == null || item.itens.imagem == undefined) {
                imgItemPedido.setAttribute("src", "https://cdns.iconmonstr.com/wp-content/releases/preview/2019/240/iconmonstr-product-3.png")
            } else {
                imgItemPedido.setAttribute("src", item.itens.imagem)
            }

            produto.innerText = item.itens.nome
            descricao.innerText = item.itens.descricao

            qnd.innerText = item.quantidade
            medida.innerText = item.itens.medida.nome
            valor.innerText = item.itens.valorUnitario
            sku.innerText = item.itens.sku
            ncm.innerText = item.itens.ncm.ncm

            if (item.itens.importado == true) {
                importado.innerText = 'sim'
                importado.style.color = 'green'
            } else {
                importado.innerText = 'não'
                importado.style.color = 'red'
            }

            if (item.itens.valorImportacao == null) {
                valorImportado.innerText = '0'
            } else {
                valorImportado.innerText = item.itens.valorImportacao
            }

            /* valorImportado.innerText = item.produto.valorImportacao */
            valorTotal.innerText = item.quantidade * item.itens.valorUnitario
        } else {
            if (item.produto.imagem == null || item.produto.imagem == undefined) {
                imgItemPedido.setAttribute("src", "https://cdns.iconmonstr.com/wp-content/releases/preview/2019/240/iconmonstr-product-3.png")
            } else {
                imgItemPedido.setAttribute("src", item.produto.imagem)
            }

            produto.innerText = item.produto.nome
            descricao.innerText = item.produto.descricao

            qnd.innerText = item.quantidade
            medida.innerText = item.produto.medida.nome
            valor.innerText = item.produto.valorUnitario
            sku.innerText = item.produto.sku
            ncm.innerText = item.produto.ncm.ncm

            if (item.produto.importado == true) {
                importado.innerText = 'sim'
                importado.style.color = 'green'
            } else {
                importado.innerText = 'não'
                importado.style.color = 'red'
            }

            if (item.produto.valorImportacao == null) {
                valorImportado.innerText = '0'
            } else {
                valorImportado.innerText = item.produto.valorImportacao
            }

            /* valorImportado.innerText = item.produto.valorImportacao */
            valorTotal.innerText = item.quantidade * item.produto.valorUnitario
        }
    }

    function CadastrarEndereçamentos() {
        const divItensPedido = document.getElementById("DivItensPedido")
        if (divItensPedido.childElementCount == 0) {
            pedido.enderecado = true
            api.patch(`api/pedido/enderecado/${pedido.numPedido}`, pedido)
            enderecamentosCheck.map(e => {
                api.post("api/enderecamento/save", e.enderecamento).then(
                    response => {
                        if (response.status == 201 || response.status == 200) {
                            sessionStorage.setItem("reloading", "enderecamento");
                            window.location.href = "/Home"
                        }
                    },
                    err => {
                        erro("Ocorreu um erro ao Cadastrar este Endereçamento:" + err)
                    }
                )
            })
        } else {
            erro("É necessário endereçar todas as caixas do pedido para confirmar")
        }
    }

    function GerarQrCode(){
        window.location.href = `http://localhost:8080/api/pdf/qrCode/${localStorage.getItem("idProduto")}`
       
    }
    
    function GerarCodeBar(){
        window.location.href = `http://localhost:8080/api/pdf/barcode/${localStorage.getItem("idProduto")}`
    }

    return (
        <div className={styles.container}>

            <div className={styles2.BasePoup} id="BasePoup">
                <div className={styles2.PopUpInfo} id="PopUpInfo">
                    <span className={styles2.close} onClick={fechar}>
                        <i className="fa-regular fa-circle-xmark"></i>
                    </span>
                    <div className={styles2.BaseInfo}>
                        <div className={styles2.InfoProduto}>
                            <div className={styles2.ImgProduto}>
                                <img id='imgItemPedido' className={styles2.produtoImagem}></img>
                            </div>
                            <div className={styles2.TitleInfo}>
                                <span id='produto' className={styles2.NomeProduto}></span>
                                <span id='descricao' className={styles2.DescricaoProduto}></span>
                                <div className={styles2.cod}>
                                    <span onClick={GerarQrCode} className={styles2.Code} title='QrCode'>
                                        <i className="fa-solid fa-qrcode"></i>
                                    </span>
                                    <span onClick={GerarCodeBar} className={styles2.Code} title='Codigo de Barra'>
                                        <i className="fa-solid fa-barcode"></i>
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className={styles2.BaseInfoValores}>
                            <div className={styles2.InfoSobre}>
                                <div className={styles2.Impostos}>
                                    <span className={styles2.InfoImpostos}>
                                        <p className={styles2.titleImpor}>SKU :</p>
                                        <p id='sku' className={styles2.ResImpor}></p>
                                    </span>
                                    <span className={styles2.InfoImpostos}>
                                        <p className={styles2.titleImpor}>NCM :</p>
                                        <p id='ncm' className={styles2.ResImpor}></p>
                                    </span>
                                    <span className={styles2.InfoImpostos}>
                                        <p className={styles2.titleImpor}>Quantidade :</p>
                                        <p id='qnd' className={styles2.ResImpor}></p>
                                    </span>
                                    <span className={styles2.InfoImpostos}>
                                        <p className={styles2.titleImpor}>Medida:</p>
                                        <p id='medida' className={styles2.ResImpor}></p>
                                    </span>

                                </div>
                                <div className={styles2.Importacoes}>
                                    <span className={styles2.baseTitleImpor}>
                                        <p className={styles2.titleImpor}>Importado:</p>
                                        <p id='importado' className={styles2.ResImpor}></p>
                                    </span>
                                    <span className={styles2.ValorImportacao}>
                                        <span className={styles2.TitleValor}>
                                            <p className={styles2.textUnitario}>Valor Importação :</p>
                                        </span>
                                        <span className={styles2.Valor}>
                                            <p className={styles2.cifrao}>%</p>
                                            <p id='valorImportado' className={styles.Num}></p>
                                        </span>
                                    </span>
                                </div>
                            </div>
                            <div className={styles2.InfoValores}>
                                <div className={styles2.ValoreUnitario}>
                                    <span className={styles2.TitleValor}>
                                        <p className={styles2.textUnitario}>Valor Unitario :</p>
                                    </span>
                                    <span className={styles2.Valor}>
                                        <p className={styles2.cifrao}>R$</p>
                                        <p id='valor' className={styles2.Num}></p>
                                    </span>
                                </div>
                                <div className={styles2.ValoreTotal}>
                                    <span className={styles2.TitleValor}>
                                        <p className={styles2.textTotal}>Valor Final :</p>
                                    </span>
                                    <span className={styles2.Valor}>
                                        <p className={styles2.Totalcifrao}>R$</p>
                                        <p id='valorTotal' className={styles2.TotalNum}></p>
                                    </span>
                                </div>
                            </div>

                        </div>
                    </div>
                </div >
            </div >

            <header className={styles.header}>

                <button onClick={() => window.history.back()} className={localStorage.getItem("idPedido") ? styles.cancelarButton : styles.confirmarButton}>
                    {localStorage.getItem("idPedido") ? "Cancelar" : "Voltar"}
                </button>

                {localStorage.getItem("idPedido") ? <button onClick={CadastrarEndereçamentos} className={styles.confirmarButton}>Confirmar</button> : ""}

            </header>

            <div id={"body"} className={styles.body}>

                <div className={styles.corredor} id={"1"}>
                    {edificios.map((e, key) => <Edificio handleEndereco={handleEndereco} edifNum={e} key={key} edificio={"edificio" + e} />)}
                </div>

                <div className={styles.corredorSeparador}>
                    <span ><i className="fa-solid fa-left-long"></i> Corredor 1 <i className="fa-solid fa-right-long"></i></span>
                </div>

                <div className={styles.corredor} id={"2"}>
                    {edificios.map((e, key) => <Edificio handleEndereco={handleEndereco} edifNum={e} key={key} edificio={"edificio" + e} />)}
                </div>

                <div className={styles.corredorSeparador}>
                    <span ><i className="fa-solid fa-left-long"></i> Corredor 2 <i className="fa-solid fa-right-long"></i></span>
                </div>


                <div className={styles.corredor} id={"3"}>
                    {edificios.map((e, key) => <Edificio handleEndereco={handleEndereco} edifNum={e} key={key} edificio={"edificio" + e} />)}
                </div>

                <div className={styles.corredorSeparador}>
                    <span ><i className="fa-solid fa-left-long"></i> Corredor 3 <i className="fa-solid fa-right-long"></i></span>
                </div>

                <div className={styles.corredor} id={"4"}>
                    {edificios.map((e, key) => <Edificio handleEndereco={handleEndereco} edifNum={e} key={key} edificio={"edificio" + e} />)}
                </div>

                <div className={styles.corredorSeparador}>
                    <span ><i className="fa-solid fa-left-long"></i> Corredor 4 <i className="fa-solid fa-right-long"></i></span>
                </div>

                <div className={styles.corredor} id={"5"}>
                    {edificios.map((e, key) => <Edificio handleEndereco={handleEndereco} edifNum={e} key={key} edificio={"edificio" + e} />)}
                </div>

                <div className={styles.corredorSeparador}>
                    <span ><i className="fa-solid fa-left-long"></i> Corredor 5 <i className="fa-solid fa-right-long"></i></span>
                </div>

                <div className={styles.corredor} id={"6"}>
                    {edificios.map((e, key) => <Edificio handleEndereco={handleEndereco} edifNum={e} key={key} edificio={"edificio" + e} />)}
                </div>

                <div className={styles.corredorSeparador}>
                    <span ><i className="fa-solid fa-left-long"></i> Corredor 6 <i className="fa-solid fa-right-long"></i></span>
                </div>

            </div>

            {localStorage.getItem("idPedido") ? (<><span className={styles.pedidoId}>Pedido {localStorage.getItem("idPedido")}</span>
                <div id={"DivItensPedido"} className={styles.itensPedido}>
                    {itens.map((i, key) => <PedidoItemCaixa onClick={() => ItemCall(i)} key={key} item={i} />)}
                </div></>) : ""}
        </div>
    )

    function fechar() {
        const BasePoup = document.getElementById('BasePoup')
        const PopUpInfo = document.getElementById('PopUpInfo')
        BasePoup.style.display = 'none'
        PopUpInfo.style.display = 'none'

        localStorage.removeItem('idProduto')
    }
}