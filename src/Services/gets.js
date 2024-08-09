//Pegar Objetos e

import api from "./api"

// Components
import CardTurma from "../Components/CardTurma";
import { erro, sucesso } from "../Components/Avisos/Alert";

export function getFornecedores(e) {
    return api.get("api/fornecedor/list").then(response => response.data)
}

export function getMedidas(e) {
    return api.get("api/unidade/list").then(response => response.data)
}

export function getDemandas(e) {
    return api.get("api/enumeracoes/demandas").then(response => response.data)
}

export function getNcm(e) {
    return api.get("api/ncm/list").then(response => response.data)
}

export function getFornecedorID(id) {
    return api.get("api/fornecedor/" + id).then(response => response.data)
}

export function getMedidaID(id) {
    return api.get("api/unidade/" + id).then(response => response.data)
}

export function getNcmID(id) {
    return api.get("api/ncm/" + id).then(response => response.data)
}

export function getProduto(e) {
    return api.get("api/produto/list").then(response => response.data)
}

export function getPeriodo(e) {
    return api.get("api/enumeracoes/periodos").then(response => response.data)
}

export async function getTurma() {
    return await api.get("api/turma/list").then(response => response.data)
}

//Listagens

export async function fazOptionsFornecedor() {
    const fornecedor = await getFornecedores()
    const options = await fornecedor.map((f) => `<option value=${f.id}>${f.nome}</option>`)
    return options
}

export async function fazOptionsDemanda(){
    const demanda = await getDemandas()
    const options = demanda.map((d) => `<option value=${d}>${d}</option>`)
    return options
}

export async function fazOptionsProdutos() {
    const produto = await getProduto()
    const options = produto.map((d) => `<option value=${d.codProduto}>${d.nome}</option>`)
    return options
}

export async function fazOptionsProdutosSKU() {
    const produto = await getProduto()
    const options = produto.map((p) => `<option value=${p.sku}>${p.nome}</option>`)
    return options
}

export async function fazOptionsPeriodo() {
    const periodo = await getPeriodo()
    const options = periodo.map((p) => `<option value=${p}>${p}</option>`)
    return options
}

export async function fazOptionsMedida() {
    const medidas = await getMedidas()
    const options = await medidas.map((m) => `<option value=${m.id}>${m.nome + " (" + m.sigla + ")"}</option>`)
    return options
}

export async function fazOptionsNcm() {
    const ncm = await getNcm()
    const options = await ncm.map((n) => `<option value=${n.id}>${n.ncm}</option>`)
    return options
}

export  function fazListaTurma() {
    const turmas = getTurma()
    console.log(turmas)
   // const cardTurma = turmas.map((t) => <CardTurma nomeTurma={t.nome} periodo={t.periodo} dataComeco={t.dataInicio} membros={t.numeroMembro}/>)
   // console.log(cardTurma)
    return turmas
}

//Usuario

export async function sendIdAluno(){
    const response = await api.get("api/aluno/sendId", { headers: { Authorization: localStorage.getItem("token") } });
    return response.data
}

export async function sendIdProf(){
    const response = await api.get("api/professor/sendId", { headers: { Authorization: localStorage.getItem("token") } });
    return response.data
}

export function getProfessor(id){
    return api.get(`api/professor/${id}`)
}

export function getAluno(id){
    return api.get(`api/aluno/${id}`)
}

window.onload = function () {
    var reloading = sessionStorage.getItem("reloading");
    if (reloading == "login") {
        sucesso("Usuário Logado com sucesso, seja bem-vindo!!")
        sessionStorage.removeItem("reloading");
    } else if (reloading == "cadastro") {
        sucesso("Seu cadastro foi realizado com sucesso")
        sessionStorage.removeItem("reloading");
    } else if (reloading == "alteracao") {
        sucesso("A alteração foi realizada com sucesso!!")
        sessionStorage.removeItem("reloading")
    } else if (reloading == "deleteTurma") {
        sucesso("A turma foi deletada com sucesso")
        sessionStorage.removeItem("reloading")
    } else if (reloading == "delete") {
        sucesso("A exclusão foi realizada com sucesso")
        sessionStorage.removeItem("reloading")
    }else if (reloading == "semTurma") {
        erro("Alunos sem turma não podem logar, peça a seu professor para adicioná-lo em uma turma")
        sessionStorage.removeItem("reloading")
    }else if(reloading == "erroFornecedor"){
        erro("Este fornecedor não pode ser excluído, pois existem produtos cadastrados com ele!!")
        sessionStorage.removeItem("reloading")
    }else if(reloading == "erroProduto"){
        erro("Este produto não pode ser excluído, pois existem pedidos cadastrados com ele!!")
        sessionStorage.removeItem("reloading")
    }else if(reloading == "email"){
        sucesso("Verifique seu email e insira o código para alterar sua senha")
        sessionStorage.removeItem("reloading")
    }else if(reloading == "enderecamento"){
        sucesso("Endereçamento foi cadastrado com sucesso!!!")
        sessionStorage.removeItem("reloading")
    }else if(reloading == "picking"){
        sucesso("Produtos Enviados com sucesso!!!")
        sessionStorage.removeItem("reloading")
    }else if(reloading == "erroEnderecado"){
        erro("Este pedido já está com seus produtos endereçados no estoque")
        sessionStorage.removeItem("reloading")
    }else if(reloading == "pedido"){
        sucesso("Pedido foi realizado com sucesso!!")
        sessionStorage.removeItem("reloading")
    } else if (reloading == "deleteNCM") {
        sucesso("NCM foi excluido com sucesso")
        sessionStorage.removeItem("reloading")
    }
}

export function refresh(r) {
    sessionStorage.setItem("reloading", r);
    window.location.reload()
}

