import styles from "../Styles/Cadastros/Fornecedor.module.css"
import logo from "../IMG/Logo WMS.png"
import { Input } from "../Components/Inputs/InputText"
import { Button } from "../Components/Button"
import api from "../Services/api"
import { useEffect, useState } from "react"
import { erro, sucesso } from "../Components/Avisos/Alert"
import gif from '../IMG/telaFornecedor.mp4'
import { refresh } from "../Services/gets"

export default function CadastroFornecedor() {

    function getFornecedor() {
        const id = localStorage.getItem("idFornecedor")
        const homologado = document.getElementById("homologado")

        if (id != undefined || id != null) {
            api.get(`api/fornecedor/${id}`).then(
                response => {
                    const fornecedor = response.data
                    setNome(fornecedor.nome)
                    setCnpj(fornecedor.cnpj)
                    setCep(fornecedor.cep)
                    setLogradouro(fornecedor.logradouro)
                    setLocalidade(fornecedor.localidade)
                    setUf(fornecedor.uf)
                    homologado.checked = fornecedor.homologado
                }
            )
        }
    }

    function CadastrarAlterar(event) {
        event.preventDefault()

        const id = localStorage.getItem('idFornecedor')
        const homologado = document.getElementById("homologado").checked

        var body = {
            id,
            "nome": nome,
            "cnpj": cnpj,
            "cep": cep,
            "logradouro": logradouro,
            "localidade": localidade,
            "uf": uf,
            "homologado": homologado
        };

        if (id) {
            api.put(
                `api/fornecedor/${id}`, body
            ).then(
                response => {
                    if (response.status == 201 || response.status == 200) {
                        refresh(`alteracao`)
                    }
                },
                err => {
                    erro("Ocorreu um erro ao Alterar o Fornecedor:" + err)
                }
            )
        } else {
            api.post("api/fornecedor/save", body).then(
                response => {
                    if (response.status == 201 || response.status == 200) {
                        refresh(`cadastro`)
                    }
                },
                err => {
                    erro("Ocorreu um erro ao Cadastrar este Fornecedor:" + err)
                }
            )
        }
    }

    useEffect(() => {
        getFornecedor()
    }, [])

    const [nome, setNome] = useState('')
    const [cnpj, setCnpj] = useState('')
    const [cep, setCep] = useState('')
    const [logradouro, setLogradouro] = useState('')
    const [localidade, setLocalidade] = useState('')
    const [uf, setUf] = useState('')
    const [homologado, setHomologado] = useState('')

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

            <div className={styles.design_video}>
                <span className={styles.title}>Cadastre novos Fornecedores aqui!</span>
                <video className={styles.video} src={gif} autoPlay loop muted type="mp4"></video>
            </div>

            <div className={styles.formContainer}>
                <header className={styles.header}>
                    <img src={logo} className={styles.logo}></img>
                </header>

                <form className={styles.form} onSubmit={CadastrarAlterar}>

                    <Input caracter={20}  label="Nome" id="nome" type="text" defaultValue={nome} onChange={(e) => setNome(e.target.value)} placeholder="Digite o Nome do Fornecedor" name="nome" ></Input>

                    <div className={styles.doubleInput1}>
                        <Input width={210} caracter={18} label="CNPJ" id="cnpj" defaultValue={cnpj} onChange={(e) => setCnpj(e.target.value)} type="number" placeholder="Digite o CNPJ" name="cpnj" ></Input>

                        <Input width={210} caracter={9} label="CEP" id="cep" type="number" defaultValue={cep} onChange={(e) => setCep(e.target.value)} placeholder="Digite o CEP" name="cep" ></Input>
                    </div>

                    <Input caracter={30} label="Logradouro" id="logradouro" type="text" defaultValue={logradouro} onChange={(e) => setLogradouro(e.target.value)} placeholder="Digite o Logradouro" name="nome" ></Input>

                    <Input caracter={20} label="Localidade" id="localidade" type="text" defaultValue={localidade} onChange={(e) => setLocalidade(e.target.value)} placeholder="Digite o localidade" name="localidade" ></Input>

                    <div className={styles.doubleInput}>
                        <Input width={210} label="UF" id="uf" type="text" defaultValue={uf} onChange={(e) => setUf(e.target.value)} placeholder="Digite o UF" name="uf" ></Input>

                        <div className={styles.divInput}>
                            <label className={styles.label}>Homologado</label>

                            <div className={styles.homologado}>
                                <label className={styles.switch}>
                                    <input id='homologado' onChange={(e) => setHomologado(e.target.value)} className={styles.inputCheckbox} type="checkbox" name="homologado" />
                                    <span className={styles.slider}></span>
                                </label>
                            </div>
                        </div>
                    </div>



                    <div className={styles.btn}>
                        <Button>Cadastrar Fornecedor</Button>
                    </div>

                </form>
            </div>
        </div>
    )
}