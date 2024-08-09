import React, { useState, useEffect, Children } from "react";
import styles from "../Styles/ItensHome/Home.module.css"
import { SideBar } from "../Components/ItensHome/SideBar";
import { ListHome } from "../Components/ItensHome/ListHome";
import { InputPesquisa } from "../Components/Inputs/InputPesquisa"
import { PopUpInfo } from "../Components/ItensHome/PopUpInfo"
import Caixas from '../IMG/Caixas.png'
import api from "../Services/api";
import { erro, sucesso } from "../Components/Avisos/Alert";
import { getAluno, getNcm, getProfessor, refresh, sendIdAluno } from "../Services/gets";
import CadastroMedidas, { getMedida, getPelaMedida } from "../Components/Forms/CadastroMedidas";
import { CadastroNcm, getListaNcm } from "../Components/ItensHome/CadastroNcm";
import { Perfil } from "../Components/ItensHome/Perfil";
import { AbrirRelatorio, Relatorios } from "../Components/Avisos/Relatorios";
import { dataHoraFormatter } from "../Services/formatter";
import Bruninha from "../IMG/BruninhaAnimation.gif"
import BruninhaSleep from "../IMG/BruninhaDormindo.gif"
import BruninhaClick from "../IMG/BruninhaClick.png"

export default function Home() {

    const [fornecedor, setFornecedor] = useState([])
    const [pedido, setPedido] = useState([])
    const [produto, setProduto] = useState([])
    const [movimentacoes, setMovimentacoes] = useState([])
    const [medidas, setMedidas] = useState([])
    const [ncms, setNcms] = useState([])

    const [nome, setNome] = useState()
    const [email, setEmail] = useState()
    const [nif, setNif] = useState()
    const [codMatricula, setCodMatricula] = useState()
    const [imagemUser, setImagemUser] = useState()

    const [qtdProfessores, setQtdProfessores] = useState()
    const [qtdAlunos, setQtdAlunos] = useState()
    let [saldo, setSaldo] = useState(0)
    const [qtdProdutos, setQtdProdutos] = useState()
    const [qtdPedidos, setQtdPedidos] = useState()
    const [qtdFornecedores, setQtdFornecedores] = useState()
    const [turma, setTurma] = useState({})
    const [professor, setProfessor] = useState({})



    async function getListaNcm() {
        const ncms = await getNcm()
        setNcms(ncms)
    }

    function getFornecedor() {
        api.get(`api/fornecedor/list`).then(
            response => {
                setFornecedor(response.data)
            }
        )
    }

    function getPedido() {
        const idAluno = localStorage.getItem("idAluno")

        if (idAluno) {
            api.get(`api/pedido/pedidosAluno/${idAluno}`).then(
                response => {
                    setPedido(response.data)
                }
            )

        } else {
            api.get(`api/pedido/list`).then(
                response => {
                    setPedido(response.data)
                }
            )
        }
    }

    function getProduto() {
        api.get(`api/produto/list`).then(
            response => {
                console.log(response.data);
                setProduto(response.data)
            }
        )
    }

    function getMovimentacao() {
        api.get(`api/movimentacao/list`).then(response => {
            setMovimentacoes(response.data)

        })
    }

    function search(texto) {

        const selectPesquisa = document.getElementById("pesquisaMov").value

        if (selectPesquisa == "tipo") {
            api.get(`api/movimentacao/findByTipo/${texto}`).then(response => {
                setMovimentacoes(response.data)
            })
        } else if (selectPesquisa == "data") {
            api.get(`api/movimentacao/findByData/${texto}`).then(response => {
                setMovimentacoes(response.data)
            })
        } else{
            api.get(`api/movimentacao/findByProduto/${texto}`).then(response => {
                setMovimentacoes(response.data)
            })
        }
    }

    function excluirMovimentacao(id) {
        api.delete(`api/movimentacao/${id}`).then(
            response => {
                refresh("delete")
            },
            err => {
                erro("Ocorreu um erro ao excluir a movimentação")
            })
    }

    async function getUserLogado() {

        const img = document.getElementById("ImgUser")
        const userNome = document.getElementById("UserNome")
        const userEmail = document.getElementById("UserEmail")

        if (localStorage.getItem("professor")) {
            let idProf = localStorage.getItem("idProf")
            let professor = (await getProfessor(idProf)).data

            img.setAttribute("src", professor.imagem == null ? "https://www.somadesenvolvimento.com.br/application/assets/img/male.png" : `${professor.imagem}`)
            userNome.innerText = professor.nome
            userEmail.innerText = professor.email

            setEmail(professor.email)
            setNome(professor.nome)
            setNif(professor.nif)
            professor.imagem == null ? setImagemUser("https://www.somadesenvolvimento.com.br/application/assets/img/male.png") : setImagemUser(`${professor.imagem}`)

        } else if (localStorage.getItem("aluno")) {
            let idAluno = localStorage.getItem("idAluno")
            let aluno = (await getAluno(idAluno)).data
            img.setAttribute("src", aluno.imagem == null ? "https://www.somadesenvolvimento.com.br/application/assets/img/male.png" : `${aluno.imagem}`)
            userNome.innerText = aluno.nome
            userEmail.innerText = aluno.email

            setEmail(aluno.email)
            setNome(aluno.nome)
            setCodMatricula(aluno.codMatricula)
            aluno.imagem == null ? setImagemUser("https://www.somadesenvolvimento.com.br/application/assets/img/male.png") : setImagemUser(`${aluno.imagem}`)
        }
    }

    async function getEstatisticas() {

        api.get('api/professor/list').then(response => {
            let count = 0
            response.data.map(p => {
                count = count + 1
            })
            setQtdProfessores(count)
        })

        api.get('api/aluno/list').then(response => {
            let count = 0
            response.data.map(a => {
                count = count + 1
            })
            setQtdAlunos(count)
        })

        api.get('api/produto/list').then(response => {
            let count = 0
            response.data.map(p => {
                count = count + 1
                setSaldo(saldo += p.saldo)
            })
            setQtdProdutos(count)
        })

        api.get('api/pedido/list').then(response => {
            let count = 0
            response.data.map(p => {
                count = count + 1
            })
            setQtdPedidos(count)
        })

        api.get('api/fornecedor/list').then(response => {
            let count = 0
            response.data.map(f => {
                count = count + 1
            })
            setQtdFornecedores(count)
        })

        api.get(`api/turma/${localStorage.getItem("idTurma")}`).then(response => {
            setTurma(response.data)
            setProfessor(response.data.prof)
        })
    }

    useEffect(() => {
        getEstatisticas()
        getUserLogado()
        getFornecedor()
        getPedido()
        getProduto()
        getMovimentacao()
        getMedida()
        getListaNcm()
        localStorage.removeItem('idMedida')
        localStorage.removeItem('alterandoProf')
        localStorage.removeItem('alterandoAluno')
        localStorage.removeItem('idNcm')
        localStorage.removeItem('idPedido')
        localStorage.removeItem('idFornecedor')
        localStorage.removeItem('idProduto')
    }, [])

    return (
        <section className={styles.components}>
            <div id="popUpInformacoes" className={styles.popUp}>
                <PopUpInfo />
            </div>
            <div id="popUpSobre" className={styles.popUp}>
                <Perfil nome={nome} email={email} nif={nif} matricula={codMatricula} img={imagemUser}></Perfil>
            </div>
            <div id="popUpMedidas" className={styles.popUp}>
                <CadastroMedidas />
            </div>
            <div id="popUp" className={styles.popUp}>
                <CadastroNcm ncms={ncms} />
            </div>
            <Relatorios></Relatorios>
            <div id='home' className={styles.home}>
                <SideBar />
                <div className={styles.home2} id={"home2"}>
                    <div className={styles.homeCenter} id="HomeCenter">
                        <div id='CardTutoria' className={styles.cardTutorial}>
                            <div className={styles.cardTutorialTexts}>
                                <h2 className={styles.titleCard}>Gerenciamento de estoque nunca foi tão fácil</h2>
                                <div className={styles.subCard}>
                                    <p className={styles.subTitle}>
                                        Está com duvidas?
                                    </p>
                                    <p className={styles.subTitle}>
                                        Venha Conhecer nosso tutorial rapido e fácil disponivel no Youtube!!
                                    </p>
                                    <p className={styles.subTitle}>
                                        Aprender nunca foi tão divertido
                                    </p>
                                </div>
                                <div className={styles.btns}>
                                    <a href={"https://www.youtube.com/watch?v=WF6QeWmaB5c"} className={styles.tutorial}>TUTORIAL</a>
                                </div>
                            </div>
                            <div className={styles.Caixa}>
                                <img className={styles.C1} id='C1' src={Caixas} />
                            </div>
                        </div>

                        <div id='ListHistorico' className={styles.listHistorico}>
                            <div className={styles.headerListMovimentacao}>
                                <span className={styles.headerTitleMovimentacao}>
                                    <lord-icon
                                        src="https://cdn.lordicon.com/ogkplaef.json"
                                        trigger="hover"
                                        colors="primary:#000"
                                        state="hover"
                                        style={{ width: 32, height: 32 }}>
                                    </lord-icon>
                                    <p className={styles.SubTitleMovimentacao}>Histórico de Estoque</p>
                                </span>
                                <button onClick={AbrirRelatorio} className={styles.relatoriosBtn}><p>Relatórios</p> <i className="fa-sharp fa-solid fa-file"></i></button>
                                <div className={styles.baseSelect}>
                                    <InputPesquisa placeholder={"Pesquise uma Movimentação"} left={0} search={search} />
                                    <select className={styles.select} id="pesquisaMov">
                                        <option value={"tipo"}>Tipo</option>
                                        <option value={"data"}>Data</option>
                                        <option value={"produto"}>Produto</option>
                                    </select>
                                </div>
                            </div>
                            <div className={styles.tabelaContainer}>
                                <div className={styles.headerListH}>
                                    <div className={styles.HeaderMovimentacao}>
                                        <p>Produto</p>
                                        <p>Data</p>
                                        <p>Movimento</p>
                                        <p>Tipo</p>
                                        <p className={styles.excluir}>Excluir</p>
                                    </div>
                                    <span className={styles.barra}></span>
                                </div>
                                <div className={styles.tabelaHistorico}>
                                    <table className={styles.tabelaMovimentacao}>
                                        <tbody className={styles.tabelaMovimentacaoBody}>
                                            {movimentacoes.map((m, key) =>
                                                <tr key={key} className={styles.trMovimentacao}>
                                                    <td className={styles.produtoNome}>{m.produto.nome}</td>
                                                    <td className={styles.data}>{dataHoraFormatter(m.data)}</td>
                                                    <td className={styles.produtoNome}>
                                                        <span style={m.tipo == 'SAIDA' ? { backgroundColor: '#F2C7C3' } : { backgroundColor: '#B2FBDE' }} className={styles.qntMovimento}>{m.tipo == 'ENTRADA' ? "+" + m.quantidade : "-" + m.quantidade}</span>
                                                    </td>
                                                    <td style={m.tipo == "ENTRADA" ? { color: "green" } : { color: "red" }} className={styles.tipo}>{m.tipo}</td>
                                                    <td className={styles.produtoNome}>
                                                        <div className={styles.excluirBtn} onClick={() => excluirMovimentacao(m.id)}>
                                                            <lord-icon
                                                                src="https://cdn.lordicon.com/jmkrnisz.json"
                                                                trigger="hover"
                                                                colors="primary:#121331"
                                                                state="hover-empty"
                                                                style={{ width: 32, height: 32 }}>
                                                            </lord-icon>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div id='HomeRight' className={styles.HomeRight}>

                        <div className={styles.estatisticas}>
                            <span>
                                Estátisticas
                            </span>

                            <div className={styles.statusContainer}>
                                <div className={styles.status1}>
                                    <div className={styles.statusHead}>
                                        <div className={styles.circleStatus}>
                                            <lord-icon
                                                src="https://cdn.lordicon.com/hbvyhtse.json"
                                                trigger="hover"
                                                colors="primary:#e4e4e4"
                                                state="hover"
                                                style={{ width: 32, height: 32 }}>
                                            </lord-icon>
                                        </div>
                                        <p className={styles.titleStatus}>Usuários</p>
                                    </div>

                                    <p><strong>Professores:</strong> {qtdProfessores}</p>
                                    <p><strong>Alunos:</strong> {qtdAlunos}</p>
                                </div>

                                <div className={styles.status2}>
                                    <div className={styles.statusHead}>
                                        <div className={styles.circleStatus}>
                                            <lord-icon
                                                src="https://cdn.lordicon.com/slduhdil.json"
                                                trigger="hover"
                                                colors="primary:#ffffff"
                                                style={{ width: 32, height: 32 }}>
                                            </lord-icon></div>
                                        <p className={styles.titleStatus}>Estoque</p>
                                    </div>
                                    <p className={styles.saldo}><strong>Saldo:</strong> {saldo}</p>
                                </div>

                                <div className={styles.status3}>
                                    <div className={styles.statusHead}>
                                        <div className={styles.circleStatus}>
                                            <lord-icon
                                                src="https://cdn.lordicon.com/zvllgyec.json"
                                                trigger="hover"
                                                colors="primary:#ffffff"
                                                state="hover"
                                                style={{ width: 32, height: 32 }}>
                                            </lord-icon>
                                        </div>
                                        <p className={styles.titleStatus}>Cadastros</p>
                                    </div>
                                    <p><strong>Produtos:</strong> {qtdProdutos}</p>
                                    <p><strong>Pedidos:</strong> {qtdPedidos}</p>
                                    <p><strong>Fornecedores:</strong> {qtdFornecedores}</p>
                                </div>

                                <div className={styles.status4}>
                                    <div className={styles.statusHead}>
                                        <div className={styles.circleStatus}>
                                            <lord-icon
                                                src="https://cdn.lordicon.com/eanmttmw.json"
                                                trigger="hover"
                                                colors="primary:#ffffff"
                                                state="hover-1"
                                                style={{ width: 32, height: 32 }}>
                                            </lord-icon>
                                        </div>
                                        <p className={styles.titleStatus}>Turma</p>
                                    </div>
                                    <p><strong>Nome:</strong> {turma.nome}</p>
                                    <p><strong>Participantes:</strong> {turma.numParticipantes}</p>
                                    <p><strong>Professor:</strong> {professor.nome}</p>
                                </div>
                            </div>


                        </div>

                        <div className={styles.base}>
                            <div className={styles.btnsList}>
                                <button id="btnPedidos" onClick={pedidoList} type="button" className={styles.buttons}><i className="fa-solid fa-cart-plus"></i></button>
                                <button id="btnFornecedor" onClick={fornecedorList} type="button" className={styles.buttonsFocus}><i className="fa-solid fa-address-book"></i></button>
                                <button id="btnProdutos" onClick={produtoList} type="button" className={styles.buttons}><i className="fa-solid fa-box"></i></button>
                            </div>
                            <div id="baseForm" className={styles.base_form}>
                                <div id='pedidoList' className={styles.listaPedidos}>
                                    <div className={styles.headerList}>
                                        <span className={styles.headerTitle}>
                                            <i className="fa-solid fa-cart-plus"></i>
                                            <p className={styles.SubTitle}>Pedidos</p>
                                        </span>
                                        <a href="/Pedido" className={styles.addFornecedor}>
                                            <i className="fa-solid fa-circle-plus"></i>
                                            <p className={styles.addTitle}>Novo Pedido</p>
                                        </a>
                                    </div>
                                    <table className={styles.tabela}>
                                        <thead className={styles.thead}>
                                            <tr className={styles.pedidoHeaderTr}>
                                                <th>ID</th>
                                                <th>Data</th>
                                                <th>Valor</th>
                                                <th>Enderaçado</th>
                                            </tr>
                                        </thead>
                                        <tbody className={styles.lista}>
                                            {
                                                pedido.map((p, key) => <ListHome id={p.numPedido} key={key} objeto={p} Info1={p.numPedido} Info2={p.dataPedido} Info3={"R$ " + p.valor} />)
                                            }
                                        </tbody>
                                    </table>
                                </div>

                                <div id='fornecedorList' className={styles.listaFornecedor}>
                                    <div className={styles.headerList}>
                                        <span className={styles.headerTitle}>
                                            <i className="fa-solid fa-address-book"></i>
                                            <p className={styles.SubTitle}>Fornecedores</p>
                                        </span>
                                        <a href="/CadastroFornecedores" className={styles.addFornecedor}>
                                            <i className="fa-solid fa-circle-plus"></i>
                                            <p className={styles.addTitle}>Novo Fornecedor</p>
                                        </a>
                                    </div>
                                    <table className={styles.tabela}>
                                        <thead className={styles.thead}>
                                            <tr className={styles.headerTr}>
                                                <th colSpan="1">Nome</th>
                                                <th colSpan="1">CNPJ</th>
                                                <th colSpan="1">UF</th>
                                                <th colSpan="1">Homologado</th>
                                            </tr>
                                        </thead>
                                        <tbody className={styles.lista}>
                                            {
                                                fornecedor.map((f, key) => <ListHome id={f.id} objeto={f} key={key} Info1={f.nome} Info2={f.cnpj} Info3={f.uf} />)
                                            }
                                        </tbody>
                                    </table>
                                </div>

                                <div id='produtoList' className={styles.listaProdutos}>
                                    <div className={styles.headerList}>
                                        <span className={styles.headerTitle}>
                                            <i className="fa-solid fa-box"></i>
                                            <p className={styles.SubTitle}>Produtos</p>
                                        </span>
                                        <a href="/CadastroProduto" className={styles.addFornecedor}>
                                            <i className="fa-solid fa-circle-plus"></i>
                                            <p className={styles.addTitle}>Novo Produto</p>
                                        </a>
                                    </div>
                                    <table className={styles.tabela}>
                                        <thead className={styles.thead}>
                                            <tr>
                                                <th colSpan="1">SKU</th>
                                                <th colSpan="1">Nome</th>
                                                <th colSpan="1">Valor</th>
                                                <th colSpan="1">Ponto Pedido</th>
                                            </tr>
                                        </thead>
                                        <tbody className={styles.lista}>
                                            {
                                                produto.map((p, key) => <ListHome objeto={p} key={key} id={p.codProduto} Info1={p.sku} Info2={p.nome} Info3={"R$ " + p.valorUnitario} />)
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id='chatbot' className={styles.BaseBotChat}>
                        <div id={"baseAI"} className={styles.baseAI}>
                            <div id='btnOff' onClick={fecharChat} className={styles.btnOff}>
                                <i className="fa-solid fa-arrow-down"></i>
                            </div>
                            <div id='btnOn' onClick={abrirChat} className={styles.btnOn}>
                                <i className="fa-solid fa-arrow-up"></i>
                            </div>
                            <span id={"avatarFoto"} className={styles.foto}>
                                <img id={"chatAvatar"} src={BruninhaSleep}></img>
                            </span>
                        </div>
                        <div className={styles.BotChat}>
                            <span className={styles.BotChatTitle}>
                                <lord-icon
                                    src="https://cdn.lordicon.com/pkmkagva.json"
                                    trigger="hover"
                                    colors="primary:#4d71ff"
                                    style={{ width: 32, height: 32 }}>
                                </lord-icon>
                                <h3 className={styles.BCTitleH3} >ChatBot</h3>
                            </span>
                            <div className={styles.iframeBotChat}>
                                {/* Lugar do Chat */}
                                <iframe src='https://webchat.botframework.com/embed/chatbotBruna?s=-xV9QSsXK00.tFilHx8hrinZO0QkIzWZwfPxr9ide3fdpeKFzgtxhvs' style={{width: "100%", height: "100%", border: "none", fontSize:"20px"}}></iframe>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section >
    );

    function abrirChat() {
        const btnOn = document.getElementById('btnOn')
        const btnOff = document.getElementById('btnOff')
        const BotChat = document.getElementById('chatbot')
        const balao = document.getElementById('balao')
        const chatAvatar = document.getElementById('chatAvatar')
        const avatarFoto = document.getElementById('avatarFoto')
        const baseAI = document.getElementById('baseAI')

        chatAvatar.style.width = "160px"
        baseAI.style.top = "3%"
        chatAvatar.style.height = "160px"
        chatAvatar.style.left = "-30px"
        avatarFoto.style.overflow = "hidden"
        chatAvatar.src = Bruninha
        chatAvatar.style.bottom = "20px"

        if (window.screen.width <= 1070) {
            BotChat.style.bottom = '-8%'
        }
        else {
            BotChat.style.bottom = '0%'
        }

        btnOn.style.opacity = '0'
        btnOn.style.zIndex = '0'
        btnOff.style.opacity = '1'
        btnOff.style.zIndex = '1'
    }

    function fecharChat() {
        const btnOn = document.getElementById('btnOn')
        const btnOff = document.getElementById('btnOff')
        const BotChat = document.getElementById('chatbot')
        const balao = document.getElementById('balao')
        const chatAvatar = document.getElementById('chatAvatar')
        const avatarFoto = document.getElementById('avatarFoto')
        const baseAI = document.getElementById('baseAI')

        chatAvatar.style.width = "150px"
        chatAvatar.style.height = "150px"
        chatAvatar.style.left = "-25px"
        avatarFoto.style.overflow = "visible"
        chatAvatar.src = BruninhaSleep
        chatAvatar.style.bottom = "30px"

        if (window.screen.width <= 1070) {
            BotChat.style.bottom = '-48%'
        } else {
            BotChat.style.bottom = '-470px'
        }

        setTimeout(() => {
            baseAI.style.top = "-10%"
        }, 350);

        btnOn.style.opacity = '1'
        btnOn.style.zIndex = '1'
        btnOff.style.opacity = '0'
        btnOff.style.zIndex = '0'
    }

    function produtoList() {
        const baseForm = document.getElementById('baseForm')
        const fornecedor = document.getElementById('btnFornecedor')
        const pedidos = document.getElementById('btnPedidos')
        const produtos = document.getElementById('btnProdutos')

        fornecedor.classList.replace(styles.buttonsFocus, styles.buttons)
        pedidos.classList.replace(styles.buttonsFocus, styles.buttons)

        produtos.classList.replace(styles.buttons, styles.buttonsFocus)

        baseForm.style.left = '-900px'

    }

    function fornecedorList() {
        const baseForm = document.getElementById('baseForm')
        const fornecedor = document.getElementById('btnFornecedor')
        const pedidos = document.getElementById('btnPedidos')
        const produtos = document.getElementById('btnProdutos')

        produtos.classList.replace(styles.buttonsFocus, styles.buttons)
        pedidos.classList.replace(styles.buttonsFocus, styles.buttons)

        fornecedor.classList.replace(styles.buttons, styles.buttonsFocus)

        baseForm.style.left = '-450px'
    }

    function pedidoList() {
        const baseForm = document.getElementById('baseForm')
        const fornecedor = document.getElementById('btnFornecedor')
        const pedidos = document.getElementById('btnPedidos')
        const produtos = document.getElementById('btnProdutos')

        fornecedor.classList.replace(styles.buttonsFocus, styles.buttons)
        produtos.classList.replace(styles.buttonsFocus, styles.buttons)

        pedidos.classList.replace(styles.buttons, styles.buttonsFocus)

        baseForm.style.left = '0'
    }

}