import React from 'react';
import { refresh } from '../Services/gets';
import styles from '../Styles/Loading.module.css'

export default class Loading extends React.Component {
    render() {


        setTimeout(() => {
            window.location.href = "/Home"
            
        }, 8000)

        return (
            <div className={styles.container}>
                <div className={styles.text_container}></div>
                <div className={styles.text_wrapper}>
                    <div className={styles.text1}>
                        <p className={styles.font_Size}>Warehouse Management System Warehouse Management System</p>
                    </div>
                    <div className={styles.text2}>
                        <p className={styles.font_Size}>Warehouse Management System Warehouse Management System</p>
                    </div>
                    <div className={styles.text3}>
                        <p className={styles.font_Size}>Warehouse Management System Warehouse Management System</p>
                    </div>
                    <div className={styles.text4}>
                        <p className={styles.font_Size}>Warehouse Management System Warehouse Management System</p>
                    </div>
                    <div className={styles.text5}>
                        <p className={styles.font_Size}>Warehouse Management System Warehouse Management System</p>
                    </div>
                    <div className={styles.text6}>
                        <p className={styles.font_Size}>Warehouse Management System Warehouse Management System</p>
                    </div>
                    <div className={styles.text7}>
                        <p className={styles.font_Size}>Warehouse Management System Warehouse Management System</p>
                    </div>
                    <div className={styles.text8}>
                        <p className={styles.font_Size}>Warehouse Management System Warehouse Management System</p>
                    </div>

                </div>
                <div className={styles.header}>
                    <div className={styles.faixa}>
                        <div className={styles.faixa1}></div>
                        <div className={styles.faixa2}></div>
                        <div className={styles.faixa3}></div>
                        <div className={styles.faixa4}></div>
                        <div className={styles.faixa5}></div>
                        <div className={styles.faixa6}></div>
                        <div className={styles.faixa7}></div>
                        <div className={styles.faixa8}></div>
                        <div className={styles.faixa9}></div>
                        <div className={styles.faixa10}></div>
                        <div className={styles.faixa11}></div>
                        <div className={styles.faixa12}></div>
                        <div className={styles.faixa13}></div>
                        <div className={styles.faixa14}></div>
                        <div className={styles.faixa15}></div>
                        <div className={styles.faixa16}></div>
                        <div className={styles.faixa17}></div>
                        <div className={styles.faixa18}></div>
                                       
                    </div>
                    <div className={styles.logo}>
                        <span className={styles.um}>W</span>
                        <span className={styles.dois}>M</span>
                        <span className={styles.tres}>S</span>
                    </div>

                </div>
            </div>
        );
    }
}