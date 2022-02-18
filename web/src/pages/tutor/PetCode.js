import React from "react";
import DogImage from '../../assets/images/pet.jpg';
import styles from '../../styles/pages/tutor/PetCode.module.css';

import QRCode from "react-qr-code";
import BackButton from "../../components/BackButton";

function PetCode() {
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
            <h4 className={styles.headerTitle}>Clique no qr para copiar o link ou use sua camera para ler o Código QR</h4>
            <div className={styles.content}>
                <button className={styles.wContainer}>
                    <QRCode value="hey" />
                </button>
            </div>
        </div>
    )
}

export default PetCode;