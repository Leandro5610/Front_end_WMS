import { wait } from "@testing-library/user-event/dist/utils";
import React, { useEffect, useState } from "react";
import { erro, sucesso } from "../Components/Avisos/Alert";
import { closeConfirmacao, Confirmacao } from "../Components/Avisos/Confirmacao";
import CardTurma from "../Components/CardTurma";
import { InputPesquisa } from "../Components/Inputs/InputPesquisa";
import api from "../Services/api";
import { refresh } from "../Services/gets";
import styles from '../Styles/Turmas/Turmas.module.css'
import ListaMembros from "./ListaMembros";

export default function Turmas() {

    const [turmas, setTurmas] = useState([])
    let [idTurma, setidTurma] = useState()

    function getTurma() {
        return api.get(`api/turma/turmaByProf/${localStorage.getItem("idProf")}`).then(
            response => {
                setTurmas(response.data)
                return response.data
            }
        )
    }

    async function novosDados(id) {
        localStorage.setItem("idTurma", id)
        window.location.href = `/cadastroTurma`
    }

    function search(texto) {
        return api.get(`api/turma/findbyall/${texto}`).then(response => {
            setTurmas(response.data)
        })
    }

    function pegarId(id) {
        setidTurma(id)
    }

    function tirarTurma(id) {

        api.delete(`api/turma/${id}`).then(response => {
            closeConfirmacao()
            refresh("deleteTurma")
        },
        err => {
            closeConfirmacao()
            erro("Não foi possível realizar a exclusão, verifique se há alunos na turma")
        })
    }

    useEffect(() => {
        getTurma()
        localStorage.removeItem("idTurma")
        if (localStorage.getItem("logou") != undefined) {
            sucesso("Bem-vindo!!! Login Realizado com Sucesso!!")
            localStorage.removeItem('logou')
        }
    }, [])

    return (
        <>
            <Confirmacao funcao={() => tirarTurma(idTurma)}></Confirmacao>
            <section className={styles.container}>
                <div className={styles.BuscaTurma}>
                    <InputPesquisa placeholder={'Pesquise pela Turma'} search={search} />
                </div>
                <div className={styles.Turmas}>
                    {turmas.map((t, key) => <CardTurma id={t.id} config={t.id + 'config'} key={t.id} turma={t} imgTurma={t.imagem} tirarTurma={pegarId}   novosDados={novosDados} />)}
                    {turmas.length <= 0 &&
                        <div className={styles.semTurmas}>
                            <span className={styles.titleSemTurma}>Nenhuma Turma Cadastrada</span>
                        </div>
                    }
                </div>
                <a href='/cadastroTurma' className={styles.addTurmas} ><i className="fa-solid fa-plus"></i></a>
            </section>
        </>
    );
}
