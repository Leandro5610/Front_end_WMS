import React from "react";
import styles from '../../Styles/ItensHome/ListHome.module.css'
import Fornecedor from '../../IMG/Fornecedor.png'

export class ListHome extends React.Component {
    render() {

        const { objeto, Info1, Info2, Info3, id } = this.props;

        function onClickId() {

            if (objeto.numPedido) {
                localStorage.setItem('idPedido', id)
                window.location.href = "/VerificarPedidos"
            }
            else if (objeto.cnpj) {
                localStorage.setItem('idFornecedor', id)
                chamarPopUp()
            }
            else {
                localStorage.setItem('idProduto', id)
                chamarPopUp()
            }
        }

        function chamarPopUp() {
            const container = document.getElementById("container");
            const PopUpInfo = document.getElementById("PopUpInfo");
            const popUpInformacoes = document.getElementById("popUpInformacoes"); 

            PopUpInfo.classList.add(styles.alertOn)

            container.style.zIndex = "20"
            PopUpInfo.style.display = 'flex'
            popUpInformacoes.style.zIndex = '20'

            // Informações
            let id = document.getElementById('id')
            let nome = document.getElementById('nome')
            let info1 = document.getElementById('info1')
            let info2 = document.getElementById('info2')
            let info3 = document.getElementById('info3')
            let info4 = document.getElementById('info4')
            let info5 = document.getElementById('info5')
            let info6 = document.getElementById('info6')
            let info7 = document.getElementById('info7')
            let info8 = document.getElementById('info8')
            let info9 = document.getElementById('info9')
            let imgItemPedido = document.getElementById('imgItemPedido')
            
            let info1Title = document.getElementById('info1Title')
            let info2Title = document.getElementById('info2Title')
            let info3Title = document.getElementById('info3Title')
            let info4Title = document.getElementById('info4Title')
            let info5Title = document.getElementById('info5Title')
            let info6Title = document.getElementById('info6Title')
            let info7Title = document.getElementById('info7Title')
            let info8Title = document.getElementById('info8Title')
            let info9Title = document.getElementById('info9Title')
            let info10Title = document.getElementById('info10Title')
            
            let importado = document.getElementById('importado')
            let infoImposto = document.getElementById('infoImposto')
            let impostos = document.getElementById('impostos')
            
            if (localStorage.getItem("idFornecedor") != undefined) {
                id.value = objeto.id
                nome.innerText = objeto.nome
                info1.innerText = objeto.cep
                info2.innerText = objeto.logradouro 
                info3.innerText = ''
                if (objeto.homologado == true) {
                    info5.innerText = 'SIM'
                    info5.style.color = 'green'
                } else {
                    info5.innerText = 'NÃO'
                    info5.style.color = 'red'
                }

                info4.innerText = objeto.uf 
                info6.innerText = objeto.localidade
                info9.innerText = objeto.cnpj
                         
                info9.style.fontSize = '25px'

                imgItemPedido.setAttribute("src", Fornecedor)

                info1Title.innerText = "CEP:"
                info2Title.innerText = "CNPJ:"
                info3Title.innerText = ""
                info5Title.innerText = "Homologado:"
                info4Title.innerText = "UF :"            
                info6Title.innerText = ""
                info7Title.innerText = "Localidade :"
                info8Title.innerText = 'CNPJ :' 
                info9Title.innerText = ''
                info10Title.innerText = 'Logradouro :'

                importado.style.display = 'none'
                infoImposto.style.display = 'none'
                impostos.style.width = '100%'

            } else if (localStorage.getItem("idProduto") != undefined) {
                id.value = objeto.codProduto
                nome.innerText = objeto.nome
                info1.innerText = objeto.sku
                
                if(objeto.descricao.length > 255){
                    info2.innerText = objeto.descricao.substring(0, 255)+'...'
                }else{
                    info2.innerText = objeto.descricao
                }

                if (objeto.importado == true) {
                    info3.innerText = 'SIM'
                    info3.style.color = 'green'
                    info8.innerText = objeto.valorImportacao
                } else {
                    info3.innerText = 'NÃO'
                    info3.style.color = 'red'
                    info8.innerText = '0'
                }
                info4.innerText = objeto.saldo
                info5.innerText = objeto.demanda
                info5.style.color = '#000'
                info6.innerText = objeto.valorUnitario
                info7.innerText = objeto.ncm.ncm

                if(objeto.saldo < 1){
                    info9.innerText =  objeto.valorUnitario
                }else{
                    info9.innerText =  objeto.valorUnitario * objeto.saldo
                }

                
                
                if(objeto.imagem == null || objeto.imagem == undefined){
                    imgItemPedido.setAttribute("src", "https://cdns.iconmonstr.com/wp-content/releases/preview/2019/240/iconmonstr-product-3.png")
                }else{
                    imgItemPedido.setAttribute("src", objeto.imagem)
                }
                  
                info1Title.innerText = "SKU:"
                info2Title.innerText = "NCM:"
                info3Title.innerText = "Importado"
                info4Title.innerText = "Quantidade:"
                info5Title.innerText = "Demanda:"
                info6Title.innerText = "R$"
                info7Title.innerText = "Valor Unitario :"
                info8Title.innerText = 'Valor Final :'
                info9Title.innerText = "R$"
                info9Title.style.color = '#fff'
                info10Title.innerText = ''

                importado.style.display = 'flex'
                infoImposto.style.display = 'flex'
                impostos.style.width = '50%'
            }
        }

        return (
            <tr className={styles.container} onClick={objeto == objeto.cnpj ? chamarPopUp : onClickId}>
                <td className={styles.titleList}>
                    <span className={styles.nome}>{Info1}</span>
                </td>
                <td className={styles.titleList} title={Info2}>{Info2.length > 10 ? Info2.substring(0, 10)+'...' : Info2 }</td>
                <td className={styles.titleList}>{Info3}</td>
                <td className={styles.titleList}>
                    {objeto.enderecado != undefined ?
                        objeto.enderecado == false ? <p title="Não endereçado" className={styles.circleRed}></p> : <p title="Endereçado" className={styles.circleGreen}></p>
                        : objeto.homologado != undefined ?
                            objeto.homologado == true ? <p title="Homologado" className={styles.circleBlue}></p> : <p title="Não Homologado" className={styles.circleGray}></p>
                            : objeto.pontoPedido >= objeto.saldo ?
                                <p title="Produto em falta">
                                    <lord-icon
                                        src="https://cdn.lordicon.com/wdqztrtx.json"
                                        trigger="hover"
                                        colors="primary:#c7c116"
                                        style={{ width: 32, height: 32 }}>
                                    </lord-icon>
                                </p> :
                                <p title="Quantidade Segura">
                                    <lord-icon
                                        src="https://cdn.lordicon.com/egiwmiit.json"
                                        trigger="hover"
                                        colors="primary:green"
                                        style={{ width: 32, height: 32 }}>
                                    </lord-icon>
                                </p>
                    }
                </td>
            </tr>
        );

    }
}
