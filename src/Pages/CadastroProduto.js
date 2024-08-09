import styles from "../Styles/Cadastros/CadastroProduto.module.css"
import logo from "../IMG/Logo WMS.png"
import { Children, useEffect, useState } from "react"
import api from "../Services/api"
import { Foto } from "../Components/Inputs/InputFoto";
import { Input } from "../Components/Inputs/InputText";
import { Select } from "../Components/Inputs/Select";
import { fazOptionsDemanda, fazOptionsFornecedor, fazOptionsMedida, fazOptionsNcm, getFornecedorID, getMedidaID, getNcmID, refresh } from "../Services/gets"
import { Redirect } from "react-router-dom";
import { history } from "../routes";
import { erro, sucesso } from "../Components/Avisos/Alert";

export default function CadastroProduto() {

    const [passo, setPasso] = useState(1)
    const [nome, setNome] = useState('')
    const [descricao, setDescricao] = useState('')
    const [pontoPedido, setPedido] = useState('')
    const [valorUnitario, setValor] = useState('')
    const [ipi, setIpi] = useState('')
    const [pis, setPis] = useState('')
    const [cofins, setCofins] = useState('')
    const [icms, setIcms] = useState('')
    const [sku, setSku] = useState('')
    const [importado, setimportado] = useState('')
    const [fornecedores, setFornecedores] = useState([])
    const [fornecedoresCheck, setFornecedoresCheck] = useState([])
    const [valorImportacao, setValorImportacao] = useState()
    const [check, setCheck] = useState([])
    let [valorLiquido, setValorLiquido] = useState()

    const [ipiValor, setIpiValor] = useState('')
    const [pisValor, setPisValor] = useState('')
    const [cofinsValor, setCofinsValor] = useState('')
    const [icmsValor, setIcmsValor] = useState('')
    const [valorImportacaoValor, setValorImportacaoValor] = useState("")

    function getProduto() {
        const id = localStorage.getItem("idProduto")
        let demanda = document.getElementById("demanda")
        let medida = document.getElementById("medida")
        let ncm = document.getElementById("ncm")
        const valorImportacaoInput = document.getElementById("valorImportacao")
        const imagem = document.getElementById("imgPhoto")

        if (id) {
            const homologado = document.getElementById("homologado")

            api.get(`api/produto/${id}`).then(
                response => {
                    const produto = response.data
                    setNome(produto.nome)
                    setDescricao(produto.descricao)
                    setSku(produto.sku)
                    setValor(produto.valorUnitario)
                    setPedido(produto.pontoPedido)
                    imagem.setAttribute("src", produto.imagem)

                    homologado.checked = produto.importado

                    if (produto.valorImportacao != null) {
                        valorImportacaoInput.removeAttribute("disabled")
                        setValorImportacao(produto.valorImportacao)
                    }

                    produto.fornecedores.map(f => {
                        setFornecedoresCheck(fornecedoresCheck => [...fornecedoresCheck, f.fornecedor])
                    })

                    produto.fornecedores.map(f => {
                        setCheck(check => [...check, f.fornecedor])
                    })

                    setimportado(produto.importado)
                    setPis(produto.pis)
                    setIpi(produto.ipi)
                    setCofins(produto.cofins)
                    setIcms(produto.icms)

                    demanda.value = produto.demanda
                    medida.value = produto.medida.id
                    ncm.value = produto.ncm.id

                    setTimeout(() => {
                        fazerCalculo()
                    }, 1000);

                }
            )
        }
    }

    const getCompPasso = () => {
        const etapa1 = document.getElementById("etapa1Div")
        const etapa2 = document.getElementById("etapa2Div")
        const etapa3 = document.getElementById("etapa3Div")

        const etap1 = document.getElementById("etapa1")
        const etap2 = document.getElementById("etapa2")
        const etap3 = document.getElementById("etapa3")

        const etap1Title = document.getElementById("etapaTitle1")
        const etap2Title = document.getElementById("etapaTitle2")
        const etap3Title = document.getElementById("etapaTitle3")

        const processLinha = document.getElementById('processLinha')
        const processLinha2 = document.getElementById('processLinha2')

        switch (passo) {
            case 1:
                etapa1.classList.replace(styles.etapa1Off, styles.etapa1On)
                etapa2.classList.replace(styles.etapa2On, styles.etapa2Off)
                etapa3.classList.replace(styles.etapa3On, styles.etapa3Off)

                etap2.classList.replace(styles.etapaPass, styles.etapa)
                etap3.classList.replace(styles.etapaPass, styles.etapa)

                etap1Title.classList.add(styles.titleOn)
                etap2Title.classList.remove(styles.titleOn)
                etap3Title.classList.remove(styles.titleOn)

                processLinha.style.width = '0%'

                break;
            case 2:
                etapa1.classList.replace(styles.etapa1On, styles.etapa1Off)
                if (etapa2.classList.contains(styles.etapa2Off)) {
                    etapa2.classList.replace(styles.etapa2Off, styles.etapa2On)
                } else {
                    etapa2.classList.replace(styles.etapa2Off2, styles.etapa2On)
                }
                etapa3.classList.replace(styles.etapa3On, styles.etapa3Off)

                etap2.classList.replace(styles.etapa, styles.etapaPass)
                etap3.classList.replace(styles.etapaPass, styles.etapa)

                etap1Title.classList.remove(styles.titleOn)
                etap2Title.classList.add(styles.titleOn)
                etap3Title.classList.remove(styles.titleOn)

                processLinha.style.width = '100%'
                processLinha2.style.width = '0%'

                break;
            case 3:
                etapa1.classList.replace(styles.etapa1On, styles.etapa1Off)
                etapa2.classList.replace(styles.etapa2On, styles.etapa2Off2)
                etapa3.classList.replace(styles.etapa3Off, styles.etapa3On)

                etap2.classList.replace(styles.etapa, styles.etapaPass)
                etap3.classList.replace(styles.etapa, styles.etapaPass)

                etap1Title.classList.remove(styles.titleOn)
                etap2Title.classList.remove(styles.titleOn)
                etap3Title.classList.add(styles.titleOn)

                processLinha2.style.width = '100%'

                break;
        }
    }

    function getFornecedores() {
        return api.get("api/fornecedor/list").then(response => { setFornecedores(response.data) })
    }

    function fazerCalculo() {
        const ipi = document.getElementById("ipi").value
        const icms = document.getElementById("icms").value
        const cofins = document.getElementById("cofins").value
        const pis = document.getElementById("pis").value
        const valorUnitario = document.getElementById("valor").value
        const importado = document.getElementById("valorImportacao").value

        const valorIpi = ipi * valorUnitario / 100
        const valorIcms = icms * valorUnitario / 100
        const valorPis = pis * valorUnitario / 100
        const valorCofins = cofins * valorUnitario / 100
        const valorImport = importado * valorUnitario / 100

        setIpiValor((valorIpi).toFixed(2))
        setPisValor((valorPis).toFixed(2))
        setCofinsValor((valorCofins).toFixed(2))
        setIcmsValor((valorIcms).toFixed(2))
        setValorImportacaoValor((valorImport).toFixed(2))

        /*
        const valorImposto = valorCofins + valorIcms + valorIpi + valorPis + valorImport
        let impostoFormat = parseInt(valorUnitario)
        const valorFinal = valorImposto + impostoFormat
        */

        const valorFinalBr = valorUnitario.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
        setValorLiquido(valorFinalBr)
    }

    function checkFornecedor(fornecedor, id) {
        const checked = document.getElementById(id).checked
        const checkBox = document.getElementById(id)

        if (checked == true) {
            checkBox.checked = true
            setFornecedoresCheck(fornecedoresCheck => [...fornecedoresCheck, fornecedor])
        } else {
            fornecedoresCheck.map((f, index) => {
                if (fornecedor.id == f.id) {
                    fornecedoresCheck.splice(index, 1)
                }
            })
        }
    }

    useEffect(() => {
        getCompPasso()
    })

    useEffect(() => {
        getFornecedores()
        getProduto()
    }, [])

    function disableImportacao(tipo) {
        const valorImportacaoInput = document.getElementById("homologado").checked
        let valorImportacao = document.getElementById('valorImportacao')

        if (valorImportacaoInput == false) {
            valorImportacao.value = ""
            valorImportacao.setAttribute("disabled", '')
            setValorImportacao(null)
            fazerCalculo()
        } else {
            valorImportacao.removeAttribute('disabled')
        }
    }

    async function CadastrarProduto(e) {
        e.preventDefault()

        let fornecedores = fornecedoresCheck
        let demanda = document.getElementById("demanda").value
        let medida = document.getElementById("medida").value
        medida = await getMedidaID(medida)
        let ncm = document.getElementById("ncm").value
        ncm = await getNcmID(ncm)
        let imagem = document.getElementById("imgPhoto").getAttribute("src")
        const id = localStorage.getItem("idProduto")
        const importado = document.getElementById("homologado").checked
        valorLiquido = (valorLiquido.substring(3, valorLiquido.lenght).replace(",", "."));

        const produto = {
            nome, descricao, medida, pontoPedido, valorImportacao, valorUnitario, demanda, ncm, sku, "fornecedores":
                fornecedoresCheck.map(f => (
                    {
                        "fornecedor": {
                            "id": f.id
                        }
                    }
                )
                )
            , importado, ipi, pis, cofins, icms, imagem, valorLiquido
        }

        if (id) {
            produto.codProduto = id
            api.put(`api/produto/${id}`, produto).then(
                response => {
                    if (response.status == 201 || response.status == 200) {
                        refresh("alteracao")
                    }
                },
                err => {
                    erro("Ocorreu um erro ao Alterar este Produto:" + err)
                }
            )
        } else {
            api.post("api/produto/save", produto).then(
                response => {
                    if (response.status == 201 || response.status == 200) {
                        refresh("cadastro")
                    }
                },
                err => {
                    erro("Ocorreu um erro ao Cadastrar este Produto:" + err)
                }
            )
        }

    }

    return (
        <div className={styles.container} onChange={(e) => getCompPasso(e)}>

            <a className='voltar' onClick={() => window.history.back()}>
                <lord-icon
                    src="https://cdn.lordicon.com/jxwksgwv.json"
                    trigger="hover"
                    colors="primary:#121331"
                    state="hover-1"
                    style={{ width: 32, height: 32 }}>
                </lord-icon>
            </a>

            <div className={styles.formContainer}>

                <header className={styles.header}>
                    <img src={logo} className={styles.logo}></img>

                    <div className={styles.etapas}>

                        <div className={styles.etapaPass} id="etapa1">
                            <div className={styles.etapaCircle}>
                                <i className="fa-sharp fa-solid fa-bars"></i>
                            </div>
                            <span className={`${styles.etapaTitle} ${styles.titleOn}`} id="etapaTitle1">Dados Principais</span>
                        </div>

                        <div className={styles.linhaEtapa}>
                            <span id='processLinha' className={styles.linhaProcess}></span>
                        </div>

                        <div className={styles.etapa} id="etapa2">
                            <div className={styles.etapaCircle}>
                                <i className="fa-sharp fa-solid fa-dollar-sign"></i>
                            </div>
                            <span className={`${styles.etapaTitle}`} id="etapaTitle2">Impostos</span>
                        </div>

                        <div className={styles.linhaEtapa}>
                            <span id='processLinha2' className={styles.linhaProcess}></span>
                        </div>

                        <div className={styles.etapa} id="etapa3">
                            <div className={styles.etapaCircle} >
                                <i className="fa-sharp fa-solid fa-image"></i>
                            </div>
                            <span className={styles.etapaTitle} id="etapaTitle3">Foto</span>
                        </div>
                    </div>
                </header>

                <div className={styles.div_forms} id="forms">

                    <form className={`${styles.form}  ${styles.etapa1On}`} id="etapa1Div" onSubmit={(e) => { e.preventDefault(); setPasso(passo + 1) }}>

                        <div className={styles.formdados}>
                            <div className={styles.dados}>

                                <div className={styles.column}>
                                    <Input width={"325px"} defaultValue={nome} onChange={(e) => setNome(e.target.value)} label="Nome" id="nome" type="text" name="nome" caracter={20} ></Input>
                                    <Input width={"325px"} defaultValue={descricao} onChange={(e) => setDescricao(e.target.value)} label="Descrição" id="descricao" type="text" name="descricao" caracter={255} ></Input>
                                    <span className={styles.titleDemanda}>Demanda</span>
                                    <Select width={"325px"} data={fazOptionsDemanda()} idArrow="arrow2" id="demanda" name="demanda"></Select>
                                    <Input width={"325px"} defaultValue={pontoPedido} onChange={(e) => setPedido(e.target.value)} label="Ponto de Pedido" type="number" id="nome" name="pontoPedido"></Input>
                                </div>

                                <div className={styles.column}>
                                    <Input width={"325px"} defaultValue={sku} onChange={(e) => setSku(e.target.value)} label="SKU" id="nome" type="text" name="nome" ></Input>
                                    <span className={styles.titleNcm}>NCM</span>
                                    <Select width={"325px"} data={fazOptionsNcm()} label="NCM" id="ncm" idArrow="arrow4" name="ncm"></Select>
                                    <span className={styles.titleMedida}>Medida</span>
                                    <Select width={"325px"} data={fazOptionsMedida()} idArrow="arrow3" id="medida" name="medida"></Select>
                                    <Input width={"325px"} defaultValue={valorUnitario} onChange={(e) => {setValor(e.target.value); fazerCalculo()}} label="Valor Bruto" id="valor" type="number" name="valor"></Input>
                                </div>

                            </div>

                            <div className={styles.fornecedoresDiv}>
                                <div className={styles.labelFornecedores}>
                                    <span className={styles.spanFornecedores}>Fornecedores</span>
                                    <a className={styles.cadastrarBtn} href="/CadastroFornecedores" ><p className={styles.fornecedor}>Cadastrar Fornecedor</p><i className="fa-solid fa-circle-plus"></i></a>
                                </div>
                                <ul className={styles.listaFornecedores}>
                                    {fornecedores.map((f, index) => {
                                        let isBreak = false
                                        return <li className={styles.linhaFornecedor} key={index}>
                                            <p>{f.nome}</p>
                                            <div className={styles.checkboxAnimate}>
                                                <label id={"label" + index} onClick={() => localStorage.getItem("idProduto") == undefined ? "" : erro("Fornecedores de um produto não podem ser alterados")}>
                                                    {
                                                        localStorage.getItem("idProduto") == undefined || localStorage.getItem("idProduto") == null ?
                                                            <input key={index} id={f.nome + index} className={styles.check} onClick={() => checkFornecedor(f, f.nome + index)} type="checkbox" name={"check" + index} /> :
                                                            check.map((fc, key) => {
                                                                if (fc.id == f.id) {
                                                                    isBreak = true
                                                                    check.splice(key, 1)
                                                                    return <input disabled key={index + key} id={fc.nome + index} defaultChecked className={styles.check} type="checkbox" name={"check" + index} />
                                                                } else {
                                                                    if (!isBreak) {
                                                                        isBreak = true
                                                                        return <input disabled key={index + key} id={fc.nome + index} className={styles.check} type="checkbox" name={"check" + index} />
                                                                    } else {
                                                                        return
                                                                    }
                                                                }
                                                            }
                                                            )}

                                                    <span className={styles.inputCheck}></span>
                                                </label>
                                            </div>
                                        </li>
                                    }
                                    )}
                                </ul>
                            </div>

                        </div>

                        <div className={styles.footerButtons}>

                            <button type="button" className={styles.voltarButton}>
                                Voltar
                            </button>

                            <button type="submit" className={styles.avancarButton}>
                                Avançar
                            </button >
                        </div>

                    </form>

                    <form className={`${styles.form}  ${styles.etapa2Off}`} onSubmit={(e) => { e.preventDefault(); setPasso(passo + 1) }} id="etapa2Div">

                        <div className={styles.column}>
                            <Input onChange={(e) => { setIpi(e.target.value); fazerCalculo() }} defaultValue={ipi} label="IPI %" id="ipi" type="number" name="nome" ></Input>
                            <Input onChange={(e) => { setPis(e.target.value); fazerCalculo() }} defaultValue={pis} label="PIS %" id="pis" type="number" name="descricao" ></Input>
                            <Input onChange={(e) => { setCofins(e.target.value); fazerCalculo() }} defaultValue={cofins} label="COFINS %" id="cofins" type="number" name="descricao" ></Input>
                            <Input onChange={(e) => { setIcms(e.target.value); fazerCalculo() }} defaultValue={icms} label="ICMS %" id="icms" type="number" name="descricao" ></Input>
                        </div>

                        <div className={styles.column}>

                            <div className={styles.divInput}>
                                <label className={styles.label}>Importado</label>

                                <div className={styles.importado}>
                                    <label className={styles.switch}>
                                        <input id='homologado' defaultValue={importado} className={styles.inputCheckbox} type="checkbox"
                                            /* defaultChecked={importado == null ? false : importado == 1 ? false : true} */
                                            onChange={(e) => setimportado(e.target.value)}
                                            onClick={() => disableImportacao()}
                                        />
                                        <span className={styles.slider}></span>
                                    </label>
                                </div>
                                <Input width={250} defaultValue={valorImportacao} onChange={(e) => { setValorImportacao(e.target.value); fazerCalculo() }} disabled={true} label="Taxa de Importação %" id="valorImportacao" type="number" name="valorImportacao" ></Input>
                            </div>

                            <div className={styles.ValorLiquido}>
                                <span className={styles.titleVL}>Taxas</span>
                                <span className={styles.vl}>
                                    <p>Valor IPI: {"R$" + ipiValor}</p>
                                    <p>Valor PIS: {"R$" + pisValor}</p>
                                    <p>Valor COFINS: {"R$" + cofinsValor}</p>
                                    <p>Valor ICMS: {"R$" + icmsValor}</p>
                                    <p>Valor de Importação: {"R$" + valorImportacaoValor}</p>
                                </span>
                            </div>
                        </div>

                        <div className={styles.footerButtons}>
                            <button className={styles.voltarButton} type="button" onClick={(e) => { setPasso(passo - 1); getCompPasso(e) }}>
                                Voltar
                            </button>

                            <button className={styles.avancarButton} type="submit">
                                Avançar
                            </button>
                        </div>
                    </form>

                    <form className={`${styles.form}  ${styles.etapa3Off}`} id="etapa3Div" onSubmit={(e) => CadastrarProduto(e)}>

                        <div className={styles.divFotos}>
                            <Foto></Foto>
                        </div>

                        <div className={styles.footerButtons} >

                            <button className={styles.voltarButton} type="button" onClick={(e) => { setPasso(passo - 1); getCompPasso(e) }}>
                                Voltar
                            </button>

                            <button className={styles.avancarButton} type="submit">
                                Confirmar
                            </button>
                        </div>
                    </form>

                </div>

            </div>
        </div>
    )
}

