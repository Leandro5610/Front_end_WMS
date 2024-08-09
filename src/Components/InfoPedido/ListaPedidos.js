import React from "react";
import styles from '../../Styles/VerificarPedidos.module.css'
import Box from '../../IMG/CaixaPedido.png'


export class ListaPedidos extends React.Component {
    render() {

        const { chamarItem, item } = this.props;

        function chamarInfo() {
            const BasePoup = document.getElementById('BasePoup')
            const PopUpInfo = document.getElementById('PopUpInfo')

            BasePoup.style.display = 'flex'
            PopUpInfo.style.display = 'flex'

            const id = item.produto.codProduto
            localStorage.setItem("idProduto", id)

            chamarItem(item)
        }

        return (
            <>
                <div className={styles.box} draggable = "true" onClick={chamarInfo}>
                    <img src={Box} className={styles.imgBox} />
                    <div className={styles.nomeProduto}>
                        <span className={styles.titleProduto}>{item.produto.nome.length > 12 ? item.produto.nome.substring(0, 12)+'...' : item.produto.nome }</span>
                    </div>
                </div>

            </>

        );

    }
}

