import Logo from '../assets/logo.png'
import CodigoPet from '../assets/codigopet.png'
import Input from '../components/Input';
import styles from "../styles/pages/LoginPage.module.css";
import Button from '../components/Button';

import {
  FaArrowRight,
  } from "react-icons/fa";

function LoginPage(){
  return (
    <div className={styles.container}>
      <img src={Logo} alt="Cadastra Pet" className={styles.imgHeader} />
      <div className={styles.content}>
        <div>
          <h3>Olá, tudo bem?</h3>
          <p>
            Para deixar o cadastro de informações do pet 
            mais completo, precisamos de algumas 
            informações suas:
          </p>
          <Input id="nome" placeholder="Nome/Nome fantasia" onChange={()=> {}} value="" />
          <Input id="nome" placeholder="CPF/CNPJ" onChange={()=> {}} value="" />
          <Input id="nome" placeholder="Email" onChange={()=> {}} value="" />
          <Input id="nome" placeholder="Telefone" onChange={()=> {}} value="" />
          <Input id="nome" placeholder="CRMV" onChange={()=> {}} value="" />
          <Button id="nome" transparent onClick={()=>{}}>
            Seguinte <FaArrowRight size="18" />
          </Button>
        </div>
        <div className={styles.divider}>
        </div>
        <div>
          <img src={CodigoPet} alt="Código Pet" />
          <p>
            Digite o código existente no APP do tutor 
            para adicionar informações sobre a 
            consulta com o Pet!
          </p>          
          <Input id="nome" placeholder="Digite o código" onChange={()=> {}} value="" />
          <Button id="nome" onClick={()=>{}}>Prosseguir</Button>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;