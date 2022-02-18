import React from "react";
import {
    FaCamera
} from "react-icons/fa";
import BackButton from "../../components/BackButton";
import Button from "../../components/Button";
import Input from "../../components/Input";
import styles from '../../styles/pages/tutor/CreatePet.module.css';

function CreatePet() {
    return (
        <div className={styles.container}>
            <BackButton path="/tutor/petlist" />
            <div className={styles.header}>
                <div className={styles.petInfo}>
                    <h4 className={styles.petName}>Adicionar Pet</h4>
                </div>
            </div>
            <div className={styles.content}>

                <button className={styles.uploadButton}>
                    <FaCamera size={64} />
                </button>

                <Input id="nome" label="Nome" value="Teste" />
                <Input id="dt_nascimento" label="Data de Nascimento" value="11/01/2020" />
                <Input id="dt_adocao" label="Data de Adoção" value="11/01/2020" />

            </div>

            <Button id="nome" onClick={() => { }}>Adicionar Pet</Button>
        </div>
    )
}

export default CreatePet;