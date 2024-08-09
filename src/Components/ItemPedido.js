import React from "react";
import styles from "../Styles/ProdutoItem.module.css"

export default class ItemPedido extends React.Component {
    render() {

        const { id, produto, quantidade, tirarProduto } = this.props

        function tiraProdutoLista(){
            tirarProduto(produto.codProduto)
        }
        
        return (
            <div className={styles.container} key={id} >
                <div className={styles.imgDiv}>
                    <img src={produto.imagem == null ? "https://cdns.iconmonstr.com/wp-content/releases/preview/2019/240/iconmonstr-product-3.png" : `${produto.imagem}`}></img>
                </div>

                <div className={styles.produtoDados}>

                    <div className={styles.titleCheck}>
                        <p>{produto.nome}</p>

                        <div className={styles.btnRemover} onClick={tiraProdutoLista}>
                            <i className="fa-regular fa-circle-xmark"></i>
                        </div>

                    </div>

                    <div className={styles.dados}>

                        <div className={styles.divQtd}>
                            <p>Qtd:</p>
                            <div>
                                {quantidade}
                            </div>
                        </div>

                        <span>User</span>

                        <span id="valor">{"R$ " + produto.valorUnitario * quantidade}</span>
                    </div>
                </div>
            </div>
        )
    }
}