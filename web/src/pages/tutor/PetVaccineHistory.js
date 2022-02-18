import React from "react";
import styles from '../../styles/pages/tutor/PetVaccineHistory.module.css';
import {
    FaPlus
} from "react-icons/fa";
import Button from "../../components/Button";
import DogImage from '../../assets/images/pet.jpg';
import BackButton from "../../components/BackButton";
import { useNavigate } from "react-router-dom";

function PetVaccineHistory() {
    const navigate = useNavigate()
    return (
        <div className={styles.container}>
            <BackButton path="/tutor/petvaccinehistory" />
            <div className={styles.header}>
                <div className={styles.petInfo}>
                    <img src={DogImage} alt="Doguinho" className={styles.headerImage} />
                    <div>
                        <h4 className={styles.petName}>Doguinho</h4>
                        <h4 className={styles.petAge}>2 Anos</h4>
                    </div>
                </div>
            </div>
            <h4 className={styles.headerTitle}>Historico de Vacinas</h4>
            <div className={styles.content}>
                <button className={styles.wContainer}>
                    <div className={styles.itemRow}>
                        <p className={styles.itemTitle}>Antirrábica</p>
                        <div className={styles.divider}></div>
                        <p className={styles.itemDate}>11/01/1994</p>
                    </div>
                </button>
                <Button transparent onClick={() => navigate("/tutor/addpetvaccinehistory")}>
                    <FaPlus />
                    Adicionar Vacinas
                </Button>
            </div>
        </div>
    )
}

export default PetVaccineHistory;