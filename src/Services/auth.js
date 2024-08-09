import { getProfessor, sendIdProf } from "./gets"

export const isAuthenticatedProfessor = function () {
    const token = localStorage.getItem("token")
    if (token){
        const professor = localStorage.getItem("professor")
        if (professor) {
            return true
        } else {
            return false
        }
    } else {
        return false
    }
}

export const isAuthenticated = function () {
    const token = localStorage.getItem("token")
    if (token) {
        return true
    } else {
        return false
    }
}

export const isAuthenticatedPedido = function () {
    const token = localStorage.getItem("token")
    const idPedido = localStorage.getItem("idPedido")
    if (token) {
        if(idPedido){
            return true
        }else{
            return false
        }
    } else {
        return "semToken"
    }
}


export const isAuthenticatedTurma = function () {
    const token = localStorage.getItem("token")
    const idTurma = localStorage.getItem("idTurma")
    if (token) {
        if(idTurma){
            return true
        }else{
            return false
        }
    } else {
        return "semToken"
    }
}

