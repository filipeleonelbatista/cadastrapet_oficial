import Logo from '../assets/logo.png'
import styles from "../styles/pages/PetHistoryFormPage.module.css";
import Button from '../components/Button';
import Input from '../components/Input';
import Textarea from '../components/Textarea';

import {
  FaCamera,
  FaFile
  } from "react-icons/fa";

function PetHistoryFormPage(){
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <img src={Logo} alt="Cadastra Pet" className={styles.imgHeader} />
        <div className={styles.header}>
          <h3>Relatório da consulta</h3>  
          <div className={styles.divider}></div>
        </div>  
        <div className={styles.petInfoContainer}>
          <img src="" className={styles.imagePet} />
          <h3>Doguinho</h3>
        </div> 
        <div className={styles.menuContainer}>
          <Button id="anotacoes" transparent> Anotações </Button>
          <Button id="fotos" transparent> Fotos </Button>
          <Button id="documentos" transparent> Documentos </Button>
          <Button id="historico" transparent> Histórico medico </Button>
        </div>
        <div className={styles.groupContainer}>
          <div className={styles.inputContainer}>
            <Input id="consulta" label="Consulta" placeholder="Descreva o tipo da consulta..." />
            <Input id="data-consulta" type="date" label="Data" placeholder="DD/MM/AAAA" />
          </div>
          <div className={styles.buttonsContainer}>            
            <Button id="add-imagens"> Adicionar Imagens <FaCamera size="16" /> </Button>
            <Button id="add-documents"> Adicionar Documentos <FaFile size="16" /> </Button>
          </div>
        </div>
        <Textarea id="anotacao" placeholder="Digite aqui suas considerações sobre o atendimento" />
        <div className={styles.actionsContainer}>
          <Button id="cancelar" transparent> Cancelar </Button>
          <Button id="enviar"> Enviar </Button>
        </div>
        
      
      </div>
    </div>
  );
}

export default PetHistoryFormPage;