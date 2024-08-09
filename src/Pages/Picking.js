import { useEffect, useState } from "react"
import { erro, sucesso } from "../Components/Avisos/Alert"
import { closeConfirmacao, Confirmacao, openConfirmacao } from "../Components/Avisos/Confirmacao"
import { InputPesquisa } from "../Components/Inputs/InputPesquisa"
import LinhaPicking from "../Components/LinhaPicking"
import api from "../Services/api"
import { refresh } from "../Services/gets"
import styles from "../Styles/Picking.module.css"

export default function Picking() {

    const [enderecamentos, setEnderecamentos] = useState([])
    const [enderecamentoSelecionados, setEnderecamentoSelecionados] = useState([])

    function getEnderecamento() {
        api.get("api/enderecamento/list").then(response =>
            setEnderecamentos(response.data)
        )
    }

    function onCheck(enderecamento, quantidade) {
        setEnderecamentoSelecionados(enderecamentoSelecionados => [...enderecamentoSelecionados, {
            enderecamento, quantidade
        }])
    }

    function unCheck(enderecamento) {

        enderecamentoSelecionados.map((e, index) => {
            const prod = e.enderecamento.itens

            if (prod.codProduto == enderecamento.itens.codProduto) {
                enderecamentoSelecionados.splice(index, 1)
            }
        })
    }

    function EnviarProdutos() {
        enderecamentoSelecionados.map(e => {
            e.enderecamento.quantidade = e.enderecamento.quantidade - e.quantidade
            api.put(`api/pedido/saida/${e.enderecamento.id}`, e.enderecamento).then(
                response => {
                    refresh(`Picking`)
                },
                err => {
                    erro("Ocorreu um erro ao Enviar os Produtos Selecionados: " + err)
                }
            )
        })

        closeConfirmacao()
    }

    function pesquisaPicking(texto) {
        api.get(`api/enderecamento/findbyall/${texto}`).then(response => {
            setEnderecamentos(response.data)
        })
    }

    useEffect(() => {
        getEnderecamento()
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

            <Confirmacao funcao={EnviarProdutos}></Confirmacao>
            <div className={styles.pickingContainer}>
                <header className={styles.header}>
                    <span className={styles.nameHeader}>
                        <i className="fa-solid fa-boxes-packing"></i> <span>Picking</span>
                    </span>
                    <InputPesquisa search={pesquisaPicking} placeholder={"Pesquise por Produto"} />
                </header>

                <div className={styles.tabelaContainer}>
                    <div className={styles.headerListH}>
                        <div className={styles.HeaderMovimentacao}>
                            <p colSpan="1"></p>
                            <p colSpan="1">Nome</p>
                            <p className={styles.sku} colSpan="1">SKU</p>
                            <span colSpan="1">Qtd Disponivel</span>
                            <p className={styles.valor} colSpan="1">Valor</p>
                            <p colSpan="1">Qtd Saida</p>
                            <p colSpan="1"></p>
                        </div>
                        <span className={styles.barra}></span>
                    </div>
                    <div className={styles.tabelaHistorico}>
                        <table className={styles.tabelaMovimentacao}>
                            <tbody className={styles.tabelaMovimentacaoBody}>
                                {enderecamentos.map((e, key) =>
                                    <LinhaPicking item={e} key={key} id={e.id} onCheck={onCheck} unCheck={unCheck} produto={e.itens}></LinhaPicking>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
                <button className={styles.enviarProdutos} onClick={() => openConfirmacao("Ao pressionar CONFIRMAR, sua lista de produtos separados saíram do estoque e serão enviados.", "Deseja enviar os produtos selecionados?")} id="btnEnviar">Enviar <i className="fa-solid fa-box-archive"></i><lord-icon
                    src="https://cdn.lordicon.com/zmkotitn.json"
                    trigger="hover"
                    colors="primary:#ffffff"
                    state="hover-1"
                    style={{ width: 24, height: 24 }}>
                </lord-icon>
                </button>
            </div>
        </div>
    )
}