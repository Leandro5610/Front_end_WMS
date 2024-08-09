import React from "react"
import styles from "../Styles/LinhaPicking.module.css"

export default class LinhaPicking extends React.Component {
    render() {

        const { id, produto, item, onCheck, unCheck } = this.props

        function check() {
            const checked = document.getElementById(id).checked
            const checkBox = document.getElementById(id)
            const qtd = document.getElementById(`qtd ${id}`).value
            const qtdInput = document.getElementById(`qtd ${id}`)
            console.log(qtd);

            if (checked == true) {
                checkBox.checked = true
                qtdInput.disabled = true
                onCheck(item, qtd)
            } else {
                checkBox.checked = false
                qtdInput.disabled = false
                unCheck(item)
            }
        }

        function verificaQtd(){
            const input = document.getElementById(`qtd ${id}`)
            if(input.value > item.quantidade){
                input.value = item.quantidade
            }
        }

        return (
            <tr className={styles.container} id={id + "container"}>
                <td><img className={styles.img} src={produto.imagem == null ? "https://cdns.iconmonstr.com/wp-content/releases/preview/2019/240/iconmonstr-product-3.png" : `${produto.imagem}`}></img></td>
                <td>{produto.nome}</td>
                <td>{produto.sku}</td>
                <td>{item.quantidade}</td>
                <td>{produto.valorUnitario}</td>
                <td><input type="number" onBlur={verificaQtd} min={"1"} max={item.quantidade} id={`qtd ${id}`} defaultValue={1} className={styles.qtd}></input></td>
                <td>
                    <div className={styles.checkboxAnimate}>
                        <label>
                            <input id={id} className={styles.check} onClick={check} type="checkbox" name="check" />
                            <span className={styles.inputCheck}></span>
                        </label>
                    </div>
                </td>
            </tr>
        )
    }
}