import styles from '../../Styles/VerificarPedidos.module.css'
import Box from '../../IMG/CaixaPedido.png'
import React from 'react'

export class PedidoItemCaixa extends React.Component {
    render() {
        const { chamarItem, item, onClick } = this.props;

        function dragstart_handler(ev) {
            ev.dataTransfer.setData("text/plain", ev.target.id);
            ev.stopPropagation();
            ev.dataTransfer.dropEffect = "move";
        }

        return (
            <div draggable="true" onClick={onClick} id={"Item" + item.id} onDragStart={(ev) => dragstart_handler(ev)} className={styles.boxDiv}>
                <img src={Box} className={styles.img} />
                <div className={styles.nomeProduto2}>
                    <span id={"prodNome" + item.id} title={item.produto.nome} className={styles.titleProduto}>{item.produto.nome.length > 8 ? item.produto.nome.substring(0, 8) + '...' : item.produto.nome}</span>
                </div>
            </div>
        )
    }
}