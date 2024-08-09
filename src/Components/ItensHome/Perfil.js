import React from "react"
import api from "../../Services/api"
import { refresh } from "../../Services/gets"
import styles from "../../Styles/ItensHome/Perfil.module.css"
import { erro } from "../Avisos/Alert"
import { logout } from "./SideBar"

export class Perfil extends React.Component {
    render() { 

        const {nome, nif, matricula, email, img} = this.props

        function alterar() {
            if (localStorage.getItem("idProf")) {
                localStorage.setItem("alterandoProf", true)
                window.location.href = "/CadastroProfessores"
            } else if (localStorage.getItem("idAluno")) {
                localStorage.setItem("alterandoAluno", true)
                window.location.href = "/CadastroAlunos"
            }
        }

        function excluir() {
            if (localStorage.getItem("idProf")) {
                const id = localStorage.getItem("idProf")
                api.delete(`api/professor/${id}`).then(
                    response => {
                        refresh("delete")
                    },
                    err => {
                        erro("Não foi possivel excluir seu usuário, talvez existam itens cadastrados com seu nome, como produtos, turmas e pedidos")
                    }
                )
            } else if (localStorage.getItem("idAluno")) {
                const id = localStorage.getItem("idAluno")
                api.delete(`api/aluno/${id}`).then(
                    response => {
                        refresh("delete")
                    },
                    err => {
                        erro("Não foi possivel excluir seu usuário, talvez existam itens cadastrados com seu nome, como produtos ou pedidos")
                    }
                )
            }
        }

        return (
            <div id="containerPerfil" className={styles.container}>
                <div id="PopUpPerfil" className={styles.Perfil}>
                    <header className={styles.headerPerfil}>
                        <p className={styles.infoName}>Perfil</p>
                        <span className={styles.close} onClick={Fechar} ><i className="fa-regular fa-circle-xmark"></i></span>
                    </header>

                    <div className={styles.dadosUsers}>

                        <div className={styles.divImg}>
                            <div className={styles.imgContainer}>
                                <img id="imgPerfil" src={img} className={styles.img}></img>
                            </div>
                        </div>

                        <div className={styles.dados}>

                            <span>
                                <i className={`fa-solid fa-user ${styles.icon}`}></i> Nome: <p className={styles.p} id={"nomePerfil"}>{nome}</p>
                            </span>

                            <span>
                                <i className={`fa-solid fa-at ${styles.icon}`}></i> Email: <p className={styles.p} id={"emailPerfil"}>{email}</p>
                            </span>

                            <span>
                                <i className={`fa-solid fa-id-card ${styles.icon}`}></i> {nif == null ? "Código de Matricula:" : "Nif:"}  <p className={styles.p} id={"NifCodPerfil"}>{nif == null ? matricula : nif}</p>
                            </span>

                        </div>

                    </div>

                    <div className={styles.btns}>
                        <button onClick={alterar} className={styles.btnalterar}>
                            Alterar
                        </button>
                        
                        <i onClick={logout} id={styles.sairPerfil} className="fa-solid fa-arrow-right-from-bracket"></i>

                        <button onClick={excluir} className={styles.btnExcluir}>
                            Excluir
                        </button>

                    </div>
                </div>
            </div>
        )
    }
}

function Fechar() {
    const container = document.getElementById("containerPerfil");
    const PopUpPerfil = document.getElementById("PopUpPerfil");
    const popUpSobre = document.getElementById("popUpSobre");
    
    localStorage.removeItem("idFornecedor")
    localStorage.removeItem("idProduto")
    
    container.style.display = "none"
    PopUpPerfil.style.display = 'none'
    PopUpPerfil.classList.remove(styles.alertOn)
    popUpSobre.style.zIndex = '-1'
}

export function AbrirPerfil() {
    const container = document.getElementById("containerPerfil");
    const PopUpPerfil = document.getElementById("PopUpPerfil");
    const popUpSobre = document.getElementById("popUpSobre");
    

    localStorage.removeItem("idFornecedor")
    localStorage.removeItem("idProduto")

    container.style.display = "flex"
    PopUpPerfil.style.display = 'flex'
    PopUpPerfil.classList.add(styles.alertOn)
    popUpSobre.style.zIndex = '20'
}