
import React from "react";
import styles from "../../Styles/ItensHome/SideBar.module.css"
import logoBox from "../../IMG/Logo WMS2.png"
import { CadastroNcm } from "./CadastroNcm"
import CadastroMedidas from "../Forms/CadastroMedidas";
import { getAluno, getProfessor } from "../../Services/gets";
import { AbrirPerfil } from "./Perfil";

export function logout() {
    localStorage.clear()
    window.location.href = "/Login"
}


export class SideBar extends React.Component {

    render() {

        return (
            <div className={styles.container} onMouseLeave={offSub}>
                {/* BTN ON SIDEBAR */}
                <div id='onBtn' onClick={onSideBar} className={styles.btn}>
                    <i className="fa-solid fa-arrow-right"></i>
                </div>
                <div id='offBtn' onClick={offSideBar} className={styles.btnOff}>
                    <i className="fa-solid fa-arrow-left"></i>
                </div>
                {/* UL OFF */}
                <ul id="sub_menuOff" className={styles.sub_menuOff}>
                    <li className={styles.sub_link}>

                        <a className={styles.link_containerOff} >EDUCAÇÃO</a>
                    </li>
                    <li className={styles.sub_link}>
                        <a className={styles.link_name} href="/CadastroProfessores"> <i className="fa-solid fa-user-plus"></i> PROFESSORES</a>
                    </li>
                    <li className={styles.sub_link}>
                        <a className={styles.link_name} href="/Membros"> <i className="fa-solid fa-users"></i> MEMBROS</a>
                    </li>
                    <li className={styles.sub_link}>
                        <a className={styles.link_name} href="/Turmas"> <i className="fa-solid fa-graduation-cap"></i> TURMA</a>
                    </li>
                </ul>
                {/* UL OFF */}
                <ul id="sub_menuCadastroOff" className={styles.sub_menuOff}>
                    <li className={styles.sub_link}>
                        <a className={styles.link_containerOff}>CADASTRO</a>
                    </li>
                    <li className={styles.sub_link}>
                        <a className={styles.link_name} href="/CadastroFornecedores"> <i className="fa-solid fa-user-plus"></i> FORNECEDOR</a>
                    </li>
                    <li className={styles.sub_link}>
                        <a className={styles.link_name} href="/CadastroProduto">  <i className="fa-solid fa-box"></i> PRODUTO</a>
                    </li>                 
                </ul>
                {/* SIDEBAR TEXT */}
                <a href="/Home" id="homeText" className={styles.IconText}>HOME</a>
                <a href="/Pedido" id="pedidoText" className={styles.IconText}>PEDIDOS</a>
                <a href="/Enderecamento" id="estoqueText" className={styles.IconText}>ESTOQUE</a>
                <a href="/Picking" id="pickingText" className={styles.IconText}>PICKING</a>
                <a onClick={chamarMedidas} id="medidasText" className={styles.IconText}>MEDIDAS</a>
                <a onClick={chamarNCM} id="ncmText" className={styles.IconText}>NCM</a>
                {/* SIDEBAR */}
                <div id="sideBar" onMouseEnter={offSub} className={styles.base}>
                    <div className={styles.btnsList}>
                        <img className={styles.logo} src={logoBox} />
                    </div>

                    <div onMouseEnter={offSubLink} className={styles.base_form}>
                        {/* HOME */}
                        <a onMouseEnter={offSub} className={styles.list}>
                            <span onMouseEnter={onSubTextHome} id='chamaSubText' className={styles.iconHome}>
                                <i className="fa-solid fa-house"></i>
                                <span className={styles.barhome}></span>
                            </span>
                            <span className={styles.iconTitle}>HOME</span>
                        </a>
                        {/* select EDUCAÇÃO*/}
                        <div id='select' onMouseEnter={offSubLinkC} className={styles.list_select}>
                            <span onMouseEnter={onSubLink} id='chamaListSub' className={styles.icon}>
                                <i className="fa-solid fa-book"></i>
                            </span>
                            <span className={styles.iconTitle}>
                                <span className={styles.suTitle}>EDUCAÇÃO</span>
                                <span id='arrowOn' onClick={LinkSelectOn} className={styles.arrowOn}>
                                    <i className="fa-solid fa-chevron-down"></i>
                                </span>
                                <span id='arrowOff' onClick={LinkSelectOff} className={styles.arrowOff}>
                                    <i className="fa-solid fa-chevron-up"></i>
                                </span>
                            </span>
                            <ul id="sub_menu" className={styles.sub_menu}>
                                <li className={styles.sub_link}>
                                    <a className={styles.link_container} href="#">EDUCAÇÃO</a>
                                </li>
                                <li className={styles.sub_link}>
                                    <a className={styles.link_name} href="/CadastroProfessores"> <i className="fa-solid fa-user-plus"></i> PROFESSORES</a>
                                </li>
                                <li className={styles.sub_link}>
                                    <a className={styles.link_name} href="/Membros"> <i className="fa-solid fa-users"></i> MEMBROS</a>
                                </li>
                                <li className={styles.sub_link}>
                                    <a className={styles.link_name} href="/Turmas"> <i className="fa-solid fa-graduation-cap"></i> TURMA</a>
                                </li>
                            </ul>

                        </div>
                        {/* select CADASTRO*/}
                        <div id='select_cadastro' onMouseEnter={offSubLink} className={styles.list_select}>
                            <span onMouseEnter={onSubLinkC} id='chamaListSubC' className={styles.icon}>
                                <i className="fa-solid fa-folder-plus"></i>
                            </span>
                            <span className={styles.iconTitle}>
                                <span className={styles.suTitle}>CADASTRO</span>
                                <span id='arrowCadastroOn' onClick={CadastroSelectOn} className={styles.arrowOn}>
                                    <i className="fa-solid fa-chevron-down"></i>
                                </span>
                                <span id='arrowCadastroOff' onClick={CadastroSelectOff} className={styles.arrowOff}>
                                    <i className="fa-solid fa-chevron-up"></i>
                                </span>
                            </span>
                            <ul id="sub_menuCadastro" className={styles.sub_menu}>
                                <li className={styles.sub_link}>
                                    <a className={styles.link_container} href="#">CADASTRO</a>
                                </li>
                                <li className={styles.sub_link}>
                                    <a className={styles.link_name} href="/CadastroFornecedores"> <i className="fa-solid fa-user-plus"></i> FORNECEDOR</a>
                                </li>
                                <li className={styles.sub_link}>
                                    <a className={styles.link_name} href="/CadastroProduto">  <i className="fa-solid fa-box"></i> PRODUTO</a>
                                </li> 
                            </ul>

                        </div>

                        {/* PEDIDOS */}
                        <a href="/Pedido" onMouseEnter={offSub} className={styles.list}>
                            <span onMouseEnter={onSubTextPedido} id='chamaTextPE' className={styles.icon}>
                                <i className="fa-solid fa-cart-plus"></i>
                            </span>
                            <span className={styles.iconTitle}>
                                PEDIDOS
                            </span>
                        </a>
                        {/* ESTOQUE */}
                        <a href="/Enderecamento" onMouseEnter={offSub} className={styles.list}>
                            <span onMouseEnter={onSubTextEstoque} id='chamaTextPI' className={styles.icon}>
                                <i className="fa-solid fa-warehouse"></i>
                            </span>
                            <span className={styles.iconTitle}>
                                ESTOQUE
                            </span>
                        </a>
                        {/* PICKING */}
                        <a href="/Picking" onMouseEnter={offSub} className={styles.list}>
                            <span onMouseEnter={onSubTextPicking} id='chamaTextPI' className={styles.icon}>
                                <i className="fa-solid fa-boxes-packing"></i>
                            </span>
                            <span className={styles.iconTitle}>
                                PICKING
                            </span>
                        </a>
                        {/* MEDIDAS */}
                        <a onClick={chamarMedidas} onMouseEnter={offSub} className={styles.list}>
                            <span onMouseEnter={onSubTextMedidas} id='chamaTextME' className={styles.icon}>
                                <i className="fa-solid fa-ruler"></i>
                            </span>
                            <span className={styles.iconTitle}>
                                MEDIDAS
                            </span>
                        </a>
                        {/* NCM */}
                        <a onClick={chamarNCM} onMouseEnter={offSub} className={styles.list}>
                            <span onMouseEnter={onSubTextNcm} id='chamaTextNcm' className={styles.icon}>
                                <span className={styles.textNcm}>NCM</span>
                            </span>
                            <span className={styles.iconTitle}>
                                NCM
                            </span>
                        </a>
                    </div>
                    {/* SOBRE */}
                    <div id='sobre' className={styles.sobre}>
                        <div className={styles.user} onClick={AbrirPerfil}>
                            <img id='ImgUser' className={styles.ImgUser_focus} />
                        </div>
                        <div id='InfoUser' className={styles.InfoUser}>
                            <div id='UserNome' className={styles.Nome}></div>
                            <div id='UserEmail' className={styles.Email}></div>
                        </div>
                        {/* LOG OUT */}
                        <a id="logOut" onClick={logout} className={styles.logOut}>
                            <i className="fa-solid fa-arrow-right-from-bracket"></i>
                        </a>
                    </div>
                </div>
            </div>
        );
    }

}

function onSideBar() {
    const sideBar = document.getElementById("sideBar");
    const onBtn = document.getElementById("onBtn");
    const offBtn = document.getElementById("offBtn");
    const LogOut = document.getElementById("InfoUser");
    const UserInfo = document.getElementById("logOut");
    const Sobre = document.getElementById("sobre");
    const ImgUser = document.getElementById("ImgUser");

    const sub_menuOff = document.getElementById("sub_menuOff");
    const sub_menuCadastroOff = document.getElementById("sub_menuCadastroOff");
    const chamaListSub = document.getElementById("chamaListSub");
    const chamaListSubC = document.getElementById("chamaListSubC");

    const chamaSubText = document.getElementById("chamaSubText");
    const chamaTextPE = document.getElementById("chamaTextPE");
    const chamaTextPI = document.getElementById("chamaTextPI");
    const chamaTextME = document.getElementById("chamaTextME");
    const chamaTextNcm = document.getElementById("chamaTextNcm");

    const HomeRight = document.getElementById("HomeRight");
    const HomeCenter = document.getElementById("HomeCenter");
    const C1 = document.getElementById("C1");

    if(window.screen.width <= "1650px"){
        HomeCenter.style.width = '100%'
        HomeRight.style.width = '100%'
    }else if (window.screen.width > "1650px"){
        HomeCenter.style.width = '60%'
        HomeRight.style.width = '40%'
    }

    sideBar.style.width = '300px'
    onBtn.style.display = 'none'
    offBtn.style.display = 'flex'
    LogOut.style.display = 'block'
    UserInfo.style.display = 'block'
    Sobre.style.background = '#000'
    ImgUser.classList.replace(styles.ImgUser_focus, styles.ImgUser)

    sub_menuOff.style.display = 'none'
    sub_menuCadastroOff.style.display = 'none'
    chamaListSub.classList.replace(styles.icon, styles.iconoff)
    chamaListSubC.classList.replace(styles.icon, styles.iconoff)
    chamaSubText.classList.replace(styles.iconHome, styles.iconHomeOff)
    chamaTextPE.classList.replace(styles.icon, styles.iconoff)
    chamaTextPI.classList.replace(styles.icon, styles.iconoff)
    chamaTextME.classList.replace(styles.icon, styles.iconoff)
    chamaTextNcm.classList.replace(styles.icon, styles.iconoff)
}

function offSideBar() {
    const sideBar = document.getElementById("sideBar");
    const offBtn = document.getElementById("offBtn");
    const onBtn = document.getElementById("onBtn");
    const LogOut = document.getElementById("InfoUser");
    const UserInfo = document.getElementById("logOut");
    const Sobre = document.getElementById("sobre");
    const ImgUser = document.getElementById("ImgUser");

    const select = document.getElementById("select");
    const sub_menu = document.getElementById("sub_menu");
    const select_cadastro = document.getElementById("select_cadastro");
    const sub_menuCadastro = document.getElementById("sub_menuCadastro");
    const arrowOn = document.getElementById("arrowOn");
    const arrowOff = document.getElementById("arrowOff");
    const arrowCadastroOn = document.getElementById("arrowCadastroOn");
    const arrowCadastroOff = document.getElementById("arrowCadastroOff");


    const HomeCenter = document.getElementById("HomeCenter");
    const C1 = document.getElementById("C1");
    const home = document.getElementById('home')
    const HomeRight = document.getElementById("HomeRight");

    if (window.screen.width <= "1650px") {
        HomeCenter.style.width = '100%'
        HomeRight.style.width = '100%'
    } else if (window.screen.width > "1650px"){
        HomeCenter.style.width = '70%'
        HomeRight.style.width = '30%'
    }

    sub_menu.style.display = 'none'
    select.style.height = "50px"
    sub_menuCadastro.style.display = 'none'
    select_cadastro.style.height = "50px"
    arrowOn.style.display = 'flex'
    arrowOn.style.zIndex = '1'
    arrowOff.style.display = 'none'
    arrowOff.style.zIndex = '0'
    arrowCadastroOn.style.display = 'flex'
    arrowCadastroOn.style.zIndex = '1'
    arrowCadastroOff.style.zIndex = '0'
    arrowCadastroOff.style.display = 'none'

    const chamaListSub = document.getElementById("chamaListSub");
    const chamaListSubC = document.getElementById("chamaListSubC");
    const sub_menuOff = document.getElementById("sub_menuOff");
    const sub_menuCadastroOff = document.getElementById("sub_menuCadastroOff");


    const chamaSubText = document.getElementById("chamaSubText");
    const chamaTextPE = document.getElementById("chamaTextPE");
    const chamaTextPI = document.getElementById("chamaTextPI");
    const chamaTextME = document.getElementById("chamaTextME");
    const chamaTextNcm = document.getElementById("chamaTextNcm");

    sideBar.style.width = '100px'
    onBtn.style.display = 'flex'
    offBtn.style.display = 'none'
    LogOut.style.display = 'none'
    UserInfo.style.display = 'none'
    Sobre.style.background = 'transparent'
    ImgUser.classList.replace(styles.ImgUser, styles.ImgUser_focus)

    sub_menuOff.style.display = 'block'
    sub_menuCadastroOff.style.display = 'block'
    chamaListSub.classList.replace(styles.iconoff, styles.icon)
    chamaListSubC.classList.replace(styles.iconoff, styles.icon)
    chamaSubText.classList.replace(styles.iconHomeOff, styles.iconHome)
    chamaTextPE.classList.replace(styles.iconoff, styles.icon)
    chamaTextPI.classList.replace(styles.iconoff, styles.icon)
    chamaTextME.classList.replace(styles.iconoff, styles.icon)
    chamaTextNcm.classList.replace(styles.iconoff, styles.icon)
}

function LinkSelectOn() {
    const select = document.getElementById("select");
    const sub_menu = document.getElementById("sub_menu");
    const arrowOn = document.getElementById("arrowOn");
    const arrowOff = document.getElementById("arrowOff");

    sub_menu.style.display = 'block'
    select.style.height = "120px"
    arrowOn.style.display = 'none'
    arrowOn.style.zIndex = '0'
    arrowOff.style.zIndex = '1'
    arrowOff.style.display = 'flex'
}

function LinkSelectOff() {
    const select = document.getElementById("select");
    const sub_menu = document.getElementById("sub_menu");
    const arrowOn = document.getElementById("arrowOn");
    const arrowOff = document.getElementById("arrowOff");

    sub_menu.style.display = 'none'
    select.style.height = "50px"
    arrowOn.style.display = 'flex'
    arrowOn.style.zIndex = '1'
    arrowOff.style.display = 'none'
    arrowOff.style.zIndex = '0'
}

function CadastroSelectOn() {
    const select_cadastro = document.getElementById("select_cadastro");
    const sub_menuCadastro = document.getElementById("sub_menuCadastro");
    const arrowCadastroOn = document.getElementById("arrowCadastroOn");
    const arrowCadastroOff = document.getElementById("arrowCadastroOff");

    sub_menuCadastro.style.display = 'block'
    select_cadastro.style.height = "70px"
    arrowCadastroOn.style.display = 'none'
    arrowCadastroOn.style.zIndex = '0'
    arrowCadastroOff.style.zIndex = '1'
    arrowCadastroOff.style.display = 'flex'
}

function CadastroSelectOff() {
    const select_cadastro = document.getElementById("select_cadastro");
    const sub_menuCadastro = document.getElementById("sub_menuCadastro");
    const arrowCadastroOn = document.getElementById("arrowCadastroOn");
    const arrowCadastroOff = document.getElementById("arrowCadastroOff");

    sub_menuCadastro.style.display = 'none'
    select_cadastro.style.height = "50px"
    arrowCadastroOn.style.display = 'flex'
    arrowCadastroOn.style.zIndex = '1'
    arrowCadastroOff.style.zIndex = '0'
    arrowCadastroOff.style.display = 'none'
}

/* TEXT BTN */
function onSubTextHome() {
    const homeText = document.getElementById("homeText")
    homeText.style.opacity = '2'
    homeText.style.top = '180px'
    homeText.style.zIndex = '2'
}
function offSubTextHome() {
    const homeText = document.getElementById("homeText")
    homeText.style.opacity = '0'
    homeText.style.top = '120px'
    homeText.style.zIndex = '-1'
}
function onSubTextPedido() {
    const pedidoText = document.getElementById("pedidoText")
    pedidoText.style.opacity = '2'
    pedidoText.style.top = '450px'
    pedidoText.style.zIndex = '2'
}
function offSubTextPedido() {
    const pedidoText = document.getElementById("pedidoText")
    pedidoText.style.opacity = '0'
    pedidoText.style.top = '400px'
    pedidoText.style.zIndex = '-1'
}
function onSubTextPicking() {
    const pickingText = document.getElementById("pickingText")
    pickingText.style.opacity = '2'
    pickingText.style.top = '560px'
    pickingText.style.zIndex = '2'
}
function offSubTextPicking() {
    const pickingText = document.getElementById("pickingText")
    pickingText.style.opacity = '0'
    pickingText.style.top = '470px'
    pickingText.style.zIndex = '-1'
}
function onSubTextEstoque() {
    const pickingText = document.getElementById("estoqueText")
    pickingText.style.opacity = '2'
    pickingText.style.top = '520px'
    pickingText.style.zIndex = '2'
}
function offSubTextEstoque() {
    const pickingText = document.getElementById("estoqueText")
    pickingText.style.opacity = '0'
    pickingText.style.top = '470px'
    pickingText.style.zIndex = '-1'
}
function onSubTextMedidas() {
    const medidasText = document.getElementById("medidasText")
    medidasText.style.opacity = '2'
    medidasText.style.top = '640px'
    medidasText.style.zIndex = '2'
}
function offSubTextMedidas() {
    const medidasText = document.getElementById("medidasText")
    medidasText.style.opacity = '0'
    medidasText.style.top = '560px'
    medidasText.style.zIndex = '-1'
}
function onSubTextNcm() {
    const ncmText = document.getElementById("ncmText")
    ncmText.style.opacity = '2'
    ncmText.style.top = '740px'
    ncmText.style.zIndex = '2'
}
function offSubTextNcm() {
    const ncmText = document.getElementById("ncmText")
    ncmText.style.opacity = '0'
    ncmText.style.top = '660px'
    ncmText.style.zIndex = '-1'
}
/* SELECT */
function onSubLink() {
    const sub_menuOff = document.getElementById("sub_menuOff")
    sub_menuOff.style.opacity = '2'
    sub_menuOff.style.top = '240px'
    sub_menuOff.style.zIndex = '2'
    offSubTextHome()

}
function offSubLink() {
    const sub_menuOff = document.getElementById("sub_menuOff")
    sub_menuOff.style.opacity = '0'
    sub_menuOff.style.top = '200px'
    sub_menuOff.style.zIndex = '-1'
}
function onSubLinkC() {
    const sub_menuCadastroOff = document.getElementById("sub_menuCadastroOff")
    sub_menuCadastroOff.style.opacity = '2'
    sub_menuCadastroOff.style.top = '340px'
    sub_menuCadastroOff.style.zIndex = '2'
    offSubTextPedido()
}
function offSubLinkC() {
    const sub_menuCadastroOff = document.getElementById("sub_menuCadastroOff")
    sub_menuCadastroOff.style.opacity = '0'
    sub_menuCadastroOff.style.top = '300px'
    sub_menuCadastroOff.style.zIndex = '-1'
}

function offSub() {
    offSubLink()
    offSubLinkC()
    offSubTextHome()
    offSubTextPedido()
    offSubTextPicking()
    offSubTextEstoque()
    offSubTextMedidas()
    offSubTextNcm()
}

function chamarNCM() {
    const payment = document.getElementById("payment");
    const principal = document.getElementById("principal");
    const popUp = document.getElementById("popUp");

    payment.style.display = "flex"
    principal.style.display = "flex"
    popUp.style.zIndex = 20

    payment.classList.add(styles.alertOn)
}

function chamarMedidas() {
    const popUpMedidas = document.getElementById("popUpMedidas");
    const base = document.getElementById("base");
    const containerMedida = document.getElementById("containerMedida");

    base.style.display = "flex"
    containerMedida.style.display = "flex"
    popUpMedidas.style.zIndex = 20

    base.classList.add(styles.alertOn)

}
