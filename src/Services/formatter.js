export function dataFormatada(date) {
    var data = new Date(date),
        dia = data.getDate(),
        dia = (dia == 30) ? "1" : (dia + 1).toString(),
        dia = (dia == 32) ? "01" : dia,
        diaF = (dia.length == 1) ? '0' + dia : dia,
        mes = (data.getMonth() + 1).toString(),
        mesF = (mes.length == 1) ? '0' + mes : mes,
        anoF = data.getFullYear();
    return diaF + "/" + mesF + "/" + anoF;
}

export function formataHora(h) {

    let hora = h.substring(0, 2) + ""
    let minuto = h.substring(3, 6)
    if (hora == "00") {
        hora = "21"
    } else if (hora == "01") {
        hora = "22"
    } else if (hora == "02") {
        hora = "23"
    } else {
        hora = hora - 3 + ""
    }if (hora.length == 1) {
        hora = "0" + hora
    }

    let horaFormatada = hora + ":" + minuto
    return horaFormatada
}

export function dataHoraFormatter(date){
    let hora = date.substring(11, 16)
    let data = date.substring(0, 10)

    hora = formataHora(hora)
    data = dataFormatada(data)

    let dataHoraFinal

    return dataHoraFinal = data
}

export function dataDesformatada(date) {
    var data = new Date(date),
        dia = data.getDate(),
        dia = (dia + 1).toString(),
        diaF = (dia.length == 1) ? '0' + dia : dia,
        mes = (data.getMonth() + 1).toString(),
        mesF = (mes.length == 1) ? '0' + mes : mes,
        anoF = data.getFullYear();
    return  anoF  + "-" + mesF + "-" + diaF;
}
