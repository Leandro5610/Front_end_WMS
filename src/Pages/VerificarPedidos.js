import React, { useEffect, useState } from "react";
import styles from '../Styles/VerificarPedidos.module.css'
import logo from "../IMG/Logo WMS.png"
import { ListaPedidos } from "../Components/InfoPedido/ListaPedidos";
import api from "../Services/api";

import QrCode from '../IMG/QrCode.png'
import CodBarra from '../IMG/CodBarra.png'
import { PopUpInfo } from "../Components/ItensHome/PopUpInfo";
import { InputPesquisa } from "../Components/Inputs/InputPesquisa";
import { erro } from "../Components/Avisos/Alert";

export default function VerificarPedidos() {

    const [itens, setItens] = useState([])
    const [pedido, setPedido] = useState()

    async function getPedido(id) {
        return api.get(`api/pedido/${id}`).then(
            response => {
                setItens(response.data.itens)
                setPedido(response.data)
            }
        )
    }
 
    function GerarNota() {
        api.get(`api/notaFiscal/pega/${localStorage.getItem("idPedido")}`).then(response => {
            const notaFiscal = response.data
            window.location.href = `http://localhost:8080/api/pedido/teste/${notaFiscal.codigoNota}`
        })
    }

    function GerarQrCode(){
        window.location.href = `http://localhost:8080/api/pdf/qrCode/${localStorage.getItem("idProduto")}`
       
    }
    
    function GerarCodeBar(){
        window.location.href = `http://localhost:8080/api/pdf/barcode/${localStorage.getItem("idProduto")}`
    }

    function ItemCall(item) {

        const PopUpInfo = document.getElementById('PopUpInfo')
        PopUpInfo.classList.add(styles.alertOn)

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

        if(item.produto.imagem == null || item.produto.imagem == undefined){
            imgItemPedido.setAttribute("src", "https://cdns.iconmonstr.com/wp-content/releases/preview/2019/240/iconmonstr-product-3.png")
        }else{
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

    //function getProdutoItem() { } 

    async function search(texto) {
        const id = localStorage.getItem('idPedido')
        return api.get(`api/itemPedido/findbyall/${id}/${texto}`).then(response => {
            setItens(response.data)
        })
    }

    function verficaEnderecado() {
        if (pedido.enderecado == false) {
            window.location.href = "/Enderecamento"
        } else {
            erro("Este pedido já foi endereçado no Estoque")
        }
    }

    useEffect(() => {
        getPedido(localStorage.getItem('idPedido'))
        localStorage.removeItem("idProduto")
    }, [])

    return (
        <section className={styles.container}>
            <a className='voltar' href="Home">
                <lord-icon
                    src="https://cdn.lordicon.com/jxwksgwv.json"
                    trigger="hover"
                    colors="primary:#121331"
                    state="hover-1"
                    style={{ width: 32, height: 32 }}>
                </lord-icon>
            </a>
            <a className={styles.headerLogo} onClick={verficaEnderecado}>
                <lord-icon
                    src="https://cdn.lordicon.com/jxwksgwv.json"
                    trigger="hover"
                    colors="primary:#121331"
                    state="hover-1"
                    style={{ width: 32, height: 32 }}>
                </lord-icon>
            </a>
            <div className={styles.Pedidos}>
                <div className={styles.headerList}>
                    <span className={styles.Busca}>
                        <InputPesquisa placeholder={'Pesquise pelo Produdo'} search={search} />
                    </span>
                    <span className={styles.headerTitle}>
                        <p className={styles.SubTitle}>Pedido {localStorage.getItem('idPedido')}</p>
                    </span>
                    <a className={styles.notaFiscal} onClick={GerarNota}>
                        <p className={styles.notaFiscalTitle}>Nota Fiscal</p>
                        <i className="fa-solid fa-paper-plane"></i>
                    </a>
                </div>
                <div className={styles.lists}>
                    {itens && itens.map((i, index) => <ListaPedidos key={index} item={i} chamarItem={ItemCall} />)}
                </div >
                <div className={styles.enderecado}><span>Pedido Endereçado: {pedido ? pedido.enderecado == true ? <p style={{color: "green"}}>SIM</p> : <p style={{color: "red"}}>NÃO</p> : ""}</span></div>
            </div >
            

            <div className={styles.BasePoup} id="BasePoup">
                <div className={styles.PopUpInfo} id="PopUpInfo">
                    <span className={styles.close} onClick={fechar}>
                        <i className="fa-regular fa-circle-xmark"></i>
                    </span>
                    <div className={styles.BaseInfo}>
                        <div className={styles.InfoProduto}>
                            <div className={styles.ImgProduto}>
                                <img id='imgItemPedido' className={styles.produtoImagem}></img>
                            </div>
                            <div className={styles.TitleInfo}>
                                <span id='produto' className={styles.NomeProduto}></span>
                                <span id='descricao' className={styles.DescricaoProduto}></span>
                                <div className={styles.cod}>
                                    <span onClick={GerarQrCode} className={styles.Code} title='QrCode'>
                                        <i className="fa-solid fa-qrcode"></i>
                                    </span>
                                    <span onClick={GerarCodeBar} className={styles.Code} title='Codigo de Barra'>
                                        <i className="fa-solid fa-barcode"></i>
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className={styles.BaseInfoValores}>
                            <div className={styles.InfoSobre}>
                                <div className={styles.Impostos}>
                                    <span className={styles.InfoImpostos}>
                                        <p className={styles.titleImpor}>SKU :</p>
                                        <p id='sku' className={styles.ResImpor}></p>
                                    </span>
                                    <span className={styles.InfoImpostos}>
                                        <p className={styles.titleImpor}>NCM :</p>
                                        <p id='ncm' className={styles.ResImpor}></p>
                                    </span>
                                    <span className={styles.InfoImpostos}>
                                        <p className={styles.titleImpor}>Quantidade :</p>
                                        <p id='qnd' className={styles.ResImpor}></p>
                                    </span>
                                    <span className={styles.InfoImpostos}>
                                        <p className={styles.titleImpor}>Medida:</p>
                                        <p id='medida' className={styles.ResImpor}></p>
                                    </span>

                                </div>
                                <div className={styles.Importacoes}>
                                    <span className={styles.baseTitleImpor}>
                                        <p className={styles.titleImpor}>Importado:</p>
                                        <p id='importado' className={styles.ResImpor}></p>
                                    </span>
                                    <span className={styles.ValorImportacao}>
                                        <span className={styles.TitleValor}>
                                            <p className={styles.textUnitario}>Valor Importação :</p>
                                        </span>
                                        <span className={styles.Valor}>
                                            <p className={styles.cifrao}>%</p>
                                            <p id='valorImportado' className={styles.Num}></p>
                                        </span>
                                    </span>
                                </div>
                            </div>
                            <div className={styles.InfoValores}>
                                <div className={styles.ValoreUnitario}>
                                    <span className={styles.TitleValor}>
                                        <p className={styles.textUnitario}>Valor Unitario :</p>
                                    </span>
                                    <span className={styles.Valor}>
                                        <p className={styles.cifrao}>R$</p>
                                        <p id='valor' className={styles.Num}></p>
                                    </span>
                                </div>
                                <div className={styles.ValoreTotal}>
                                    <span className={styles.TitleValor}>
                                        <p className={styles.textTotal}>Valor Final :</p>
                                    </span>
                                    <span className={styles.Valor}>
                                        <p className={styles.Totalcifrao}>R$</p>
                                        <p id='valorTotal' className={styles.TotalNum}></p>
                                    </span>
                                </div>
                            </div>

                        </div>
                    </div>
                </div >
            </div >

            
        </section >
    )

    function fechar() {
        const BasePoup = document.getElementById('BasePoup')
        const PopUpInfo = document.getElementById('PopUpInfo')
        BasePoup.style.display = 'none'
        PopUpInfo.style.display = 'none'

        localStorage.removeItem("idProduto")
    }
} 