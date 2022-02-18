import React from "react";
import styles from '../../styles/pages/tutor/PetHistory.module.css';
import {
    FaPlus
} from "react-icons/fa";
import Button from "../../components/Button";
import DogImage from '../../assets/images/pet.jpg';
import BackButton from "../../components/BackButton";
import { useNavigate } from "react-router-dom";

function PetHistory() {
    const navigate = useNavigate()
    return (
        <div className={styles.container}>
            <BackButton path="/tutor/petprofile" />
            <div className={styles.header}>
                <div className={styles.petInfo}>
                    <img src={DogImage} alt="Doguinho" className={styles.headerImage} />
                    <div>
                        <h4 className={styles.petName}>Doguinho</h4>
                        <h4 className={styles.petAge}>2 Anos</h4>
                    </div>
                </div>
            </div>
            <h4 className={styles.headerTitle}>Historico Médico</h4>
            <div className={styles.content}>
                <button className={styles.wContainer}>
                    <div className={styles.itemRow}>
                        <p className={styles.itemTitle}>Consulta XPTO</p>
                        <div className={styles.divider}></div>
                        <p className={styles.itemDate}>11/01/1994</p>
                    </div>
                    <p className={styles.itemNotation}>
                        Tedoiashuigoapnhsixvponhadonhuisc asjko ajispod jais djiasopjdioa
                    </p>
                </button>
                <Button transparent onClick={() => navigate("/tutor/addpethistory")}>
                    <FaPlus />
                    Adicionar histórico
                </Button>
            </div>
        </div>
    )
}

export default PetHistory;