import React from "react";
import styles from '../../Styles/Lista/ListaMebros.module.css'
import { erro } from "../Avisos/Alert";

export default class LinhaMembros extends React.Component {
    render() {

        const { membro, funcao, tirarAluno } = this.props;

        function tirarAlu() {
            if(localStorage.getItem("professor")){
                tirarAluno(membro.id)
            }else{
                erro("Somente Professores tem permissão para remover membros de uma Turma")
            }
            
        }

        return (
            <tr> 
                <th className={styles.titleList}><div className={styles.imgMembro}><img className={styles.img} src={membro.imagem == null ? "https://www.somadesenvolvimento.com.br/application/assets/img/male.png" : `${membro.imagem}`}></img></div></th>
                <td className={styles.titleList}><span className={styles.nome}>{membro.nome}</span></td>
                <td className={styles.titleList}>{membro.email == undefined ? "Sem Email" : membro.email}</td>
                <td className={styles.titleList}>{membro.codMatricula}</td>
                <td className={styles.titleList}>{funcao}</td>
                <td className={styles.titleList}>
                    <div onClick={tirarAlu} href="#" className={styles.btnExcluir}> 
                        <lord-icon
                            src="https://cdn.lordicon.com/jmkrnisz.json"
                            trigger="hover"
                            colors="primary:#121331"
                            state="hover-empty"
                            style={{width:32,height:32}}>
                        </lord-icon>
                    </div>
                </td>
            </tr>
        );
    }
} 