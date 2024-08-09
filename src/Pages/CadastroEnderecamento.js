import styles from "../Styles/Cadastros/Enderecamento.module.css"
import logo from "../IMG/Logo WMS.png"
import { Input } from "../Components/Inputs/InputText"
import { Select } from "../Components/Inputs/Select";
import { Button } from "../Components/Button"
import api from "../Services/api"
import { useState } from "react"
import { fazOptionsDemanda, fazOptionsProdutos } from "../Services/gets";
import { erro, sucesso } from "../Components/Avisos/Alert"
import gif from '../IMG/Endereçamento.mp4'

export default function CadastroEnderecamento() {

    const [corredor, setCorredor] = useState('')
    const [edificio, setEdificio] = useState('')
    const [andar, setAndar] = useState('')
    const [modulo, setModulo] = useState('')
    //const [quantidade, setQuantidade] = useState('')

    function getProdutoId(id) {
        return api.get(`api/produto/${id}`).then(
            response => response.data
        )
    }

    async function CadastrarEnderecamento(event) {
        event.preventDefault()

        //let idProduto = document.getElementById("itens").value
        //let itens = await getProdutoId(idProduto)

        let demanda = document.getElementById("demanda").value

        var body = {
            'corredor': corredor,
            'edificio': edificio,
            'andar': andar,
            'modulo': modulo,
            'demanda': demanda,
        };

        api.post("api/enderecamento/save", body).then(
            response => {
                if (response.status == 201 || response.status == 200) {
                    sucesso("Endereçamento cadastrado com sucesso!!!")
                }
            },
            err => {
                erro("Ocorreu um erro ao Cadastrar este Endereçamento:" + err)
            }
        )
    }

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

            <div className={styles.formContainer}>
                <header className={styles.header}>
                    <img src={logo} className={styles.logo}></img>
                </header>

                <form className={styles.form} onSubmit={CadastrarEnderecamento}>
                    <div className={styles.column}>
                        <Input label="Corredor" id="corredor" type="text" onChange={(e) => setCorredor(e.target.value)} placeholder="Digite o Corredor" name="corredor" ></Input>

                        <Input label="Edificio" id="edificio" type="text" onChange={(e) => setEdificio(e.target.value)} placeholder="Digite o Edificio" name="edificio" ></Input>

                        <Input label="Andar" id="andar" type="text" onChange={(e) => setAndar(e.target.value)} placeholder="Digite o Andar" name="andar" ></Input>

                        <Input label="Modulo" id="modulo" type="text" onChange={(e) => setModulo(e.target.value)} placeholder="Digite o Modulo" name="modulo" ></Input>
                    </div>

                    <div className={styles.column}>
                        <Select data={fazOptionsDemanda()} idArrow="arrow1" id="demanda" name="demanda"></Select>

                    </div>
                    <div className={styles.btn}>
                        <Button>Cadastrar Endereçamento</Button>
                    </div>
                </form>
            </div>

            <div className={styles.design_video}>
                <h1 className={styles.title}>Cadastro de Endereçamento</h1>
                <video className={styles.video} src={gif} autoPlay loop muted type="mp4"></video>
            </div>
        </div>
    )
}