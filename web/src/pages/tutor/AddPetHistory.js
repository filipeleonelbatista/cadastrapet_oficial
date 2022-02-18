import React from "react";
import {
    FaCamera
} from "react-icons/fa";
import BackButton from "../../components/BackButton";
import Button from "../../components/Button";
import Input from "../../components/Input";
import Textarea from "../../components/Textarea";
import DogImage from '../../assets/images/pet.jpg';
import styles from '../../styles/pages/tutor/AddPetHistory.module.css';

function AddPetHistory() {
    return (
        <div className={styles.container}>
            <BackButton path="/tutor/pethistory" />
            <div className={styles.header}>
                <div className={styles.petInfo}>
                    <img src={DogImage} alt="Doguinho" className={styles.headerImage} />
                    <div>
                        <h4 className={styles.petName}>Doguinho</h4>
                        <h4 className={styles.petAge}>2 Anos</h4>
                    </div>
                </div>
            </div>
            <div className={styles.content}>

                <Input id="consulta" placeholder="Consulta" value="Teste" />
                <Input id="dt_nascimento" placeholder="Data da consulta" value="11/01/2020" />

                {/* anotacoes e documentos */}

                <Button onClick={() => { }}>Anotações</Button>                
                <Button transparent onClick={() => { }}>Documentos</Button>

                <Textarea id="dt_nascimento" placeholder="Digite aqui suas anotações..." value="11/01/2020" />
                <button className={styles.uploadButton}>
                    <FaCamera size={64} />
                </button>

                <Button onClick={() => { }}>Salvar</Button>
            </div>
        </div>
    )
}

export default AddPetHistory;