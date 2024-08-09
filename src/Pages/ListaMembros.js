import React, { useEffect, useState } from "react";
import styles from '../Styles/Lista/ListaMebros.module.css'
/* import LinhaMembros from '../Components/Membros/LinhaMembro' */
/* import AddMembros from "../Components/Membros/AddMembros"; */
import LinhaPesquisa from "../Components/Membros/LinhaPesquisa";
import SearchInput from "../Components/Inputs/SearchInput";
import api from "../Services/api";
import LinhaMembros from "../Components/Membros/LinhaMembro";
import { erro } from "../Components/Avisos/Alert";
import { InputPesquisa } from "../Components/Inputs/InputPesquisa";

export default function ListaMembros() {

    const [alunos, setAlunos] = useState([])
    const [membrosCheck, setMembrosCheck] = useState([])
    const [pesquisa, setPesquisa] = useState('')
    const [list, setList] = useState([])
    const [membrosTurma, setMembrosTurma] = useState([])

    function AbrirList() {
        const btnAddMembro = document.getElementById('btnAddMembro')
        const pesquisa = document.getElementById('pesquisa')
        const lista = document.getElementById('listMembros')

        btnAddMembro.style.width = "350px"
        pesquisa.style.left = '0'
        lista.style.left = "0"

        setTimeout(() => {
            lista.style.maxHeight = "100%"
            if (list.length == 0) {
                setList(alunos)
            }
        }, 500);
    }

    async function AdicionarList() {
        const turma = await getTurma(localStorage.getItem("idTurma"))
        var count = 0;

        const alunos = (await api.get(`api/aluno/turma/${turma.id}`)).data
        await alunos.map((a) => { count++ })

        if (membrosCheck.length != 0) {
            if (localStorage.getItem("professor")) {
                if (count < turma.numParticipantes) {
                    membrosCheck.map((m) => {
                        api.patch(`api/aluno/${m.id}`, turma)
                    })
                    window.location.reload()
                } else {
                    erro(
                        `Limite de Membros foi alcançado! ${count}/${turma.numParticipantes} de Membros na Turma`
                    )
                }
            } else {
                erro("Somente Professores tem permissão para adicionar membros em uma Turma")
            }
        }

    }

    async function tirarAluno(id) {
        const turma = await getTurma(localStorage.getItem("idTurma"))
        api.patch(`api/aluno/delete/${id}`, turma)
        window.location.reload()
    }

    function onCheck(membro) {
        setMembrosCheck(membrosCheck => [...membrosCheck, membro])
    }

    function offCheck(membro) {
        membrosCheck.map((m, index) => {
            if (m.id == membro.id) {
                membrosCheck.splice(index, 1)
            }
        })
    }

    //Ordernando busca de A & Z
    const OrdenarList = () => {
        let newList = [...alunos]

        newList.sort((a, b) => (a.nome > b.nome ? 1 : b.nome > a.nome ? -1 : 0))

        setList(newList)
    }

    //Fazendo Busca pelo Membro
    useEffect(() => {
        if (pesquisa === '') {
            setList(alunos)
        } else {
            setList(
                alunos.filter((item) =>
                    item.nome.toLowerCase().indexOf(pesquisa.toLowerCase()) > -1
                )
            );
        }
    }, [pesquisa]);

    function getTurma(id) {
        return api.get(`api/turma/${id}`).then(response => response.data)
    }

    function getAluno() {
        return api.get("api/aluno/list").then(
            response => {
                const alu = response.data
                alu.map(a => {
                    if (a.turma == null) {
                        setAlunos(alunos => [...alunos, a])
                    }
                })
            }
        )
    }

    async function getMembros() {
        api.get(`api/aluno/turma/${localStorage.getItem("idTurma")}`).then(response => {
            const membros = response.data
            membros.map(m => {
                setMembrosTurma(membrosTurma => [...membrosTurma, m])
            })
        })
    }

    function Pesquisar(texto) {
        api.get(`api/aluno/findbyall/${texto}`).then(response => {
            const membros = response.data

            if (membros.length == []) {
                erro('Nenhum Membro encontrado')
            } else {
                membros.map((m) => {
                    if (m.turma.id == localStorage.getItem('idTurma')) {
                        setMembrosTurma(response.data)
                    }
                })

            }

        })
    }

    useEffect(() => {
        getMembros()
        getAluno()
    }, [])

    return (
        <section className={styles.container}>

            <a className='voltar' onClick={() => window.history.back()}>
                <lord-icon
                    src="https://cdn.lordicon.com/jxwksgwv.json"
                    trigger="hover"
                    colors="primary:#121331"
                    state="hover-1"
                    style={{ width: 32, height: 32 }}>
                </lord-icon>
            </a>

            <div className={styles.AddMembros}>
                <div id='btnAddMembro' onClick={AbrirList} className={styles.baseAddMembros}>
                    <span onClick={AdicionarList} className={styles.button}>
                        <i className="fa-regular fa-plus"></i>
                    </span>
                    <div id='pesquisa' className={styles.pesquisa}>
                        <span onClick={OrdenarList} className={styles.btnOrderTitle}>
                            <i className="fa-solid fa-arrow-up-a-z"></i>
                        </span>
                        <SearchInput id='pesquisa' placeholder="Pesquise uma pessoa" value={pesquisa} onChange={(search) => setPesquisa(search)} />
                    </div>
                </div>
                <ul id="listMembros" className={styles.listPesquisa}>
                    {
                        list.length == 0 ? <li>Sem resultados <i className="fa-regular fa-face-sad-tear"></i></li> : list.map((m) => <LinhaPesquisa key={m.id} membro={m} onCheck={onCheck} offCheck={offCheck} />)
                    }
                </ul>

            </div>

            <div className={styles.baseList}>
                <span className={styles.title}><i className="fa-solid fa-users"></i>Lista de Membros</span>

                <div className={styles.basePesquisa}>
                    <InputPesquisa placeholder={"Pesquise por um Membro"} search={Pesquisar} />
                </div>

                <div className={styles.div_lista}>
                    <div className={styles.headerList}>
                        <span className={styles.titleHeader1}></span>
                        <span className={styles.titleHeader}>Nome</span>
                        <span className={styles.titleHeader}>Email</span>
                        <span className={styles.titleHeader}>Matrícula</span>
                        <span className={styles.titleHeader}>Função</span>
                        <span className={styles.titleHeader}><p className={styles.titleDelete}>Excluir</p></span>
                        <span className={styles.barra}></span>
                    </div>
                    <ul className={styles.lista}>
                        <table id="tabela" className={styles.tabelaMembro} >
                            <tbody id="lista" className={styles.body}>
                                {
                                    membrosTurma.map((m) => <LinhaMembros key={m.id} funcao={m.nif == undefined ? "ALUNO" : "PROFESSOR"} membro={m} tirarAluno={tirarAluno} />)
                                }
                            </tbody>
                        </table>
                    </ul>
                </div>
            </div>
        </section>
    );
}