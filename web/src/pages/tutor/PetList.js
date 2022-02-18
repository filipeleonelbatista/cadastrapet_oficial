import React from "react";
import styles from '../../styles/pages/tutor/PetList.module.css';
import Logo from '../../assets/logo.png';
import DogImage from '../../assets/images/pet.jpg';
import {
    FaPlus
  } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function PetList() {
    
    const navigate = useNavigate();
    

    const handleSelectedPet = () => {
        navigate('/tutor/petprofile')
    }

    return (
        <div className={styles.container}>
            <img src={Logo} alt="Cadastra Pet" className={styles.imgHeader} />
            <div className={styles.content}>
                <div className={styles.petItem}>
                    <button onClick={handleSelectedPet} className={styles.petButton}>
                        <img src={DogImage} alt="Doguinho" className={styles.petImage} />
                    </button>
                    <h4 className={styles.petName}>Doguinho</h4>
                </div>
                <div className={styles.petItem}>
                    <button onClick={() => navigate('/tutor/createpet')} className={styles.petButton}>
                        <FaPlus />
                    </button>
                    <h4 className={styles.petName}>Adicionar Pet</h4>
                </div>
            </div>
        </div>
    )
}

export default PetList;