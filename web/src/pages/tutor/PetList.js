
import React from "react";
import { FaPlus, FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Logo from '../../assets/logo.png';
import Button from "../../components/Button";
import { AuthContextProvider } from "../../context/AuthContext";
import { useAuth } from "../../hooks/useAuth";
import styles from '../../styles/pages/tutor/PetList.module.css';

function PetListComponent() {
    const navigate = useNavigate();

    const { isLoggedIn, logout, petList, getPetByID, setSelectedPet } = useAuth();

    const handleSelectedPet = async (id) => {
        const selectedPet = await getPetByID(id);
        setSelectedPet(selectedPet);
        navigate('/tutor/petprofile')
    }

    const handleLogout = () => {
        logout()
        navigate('/tutor')
    }
    
    if(!isLoggedIn) return null;

    return (
        <div className={styles.container}>
            <img src={Logo} alt="Cadastra Pet" className={styles.imgHeader} />
            <div className={styles.content}>
                {petList &&
                    petList.map(pet => {
                        return (
                            <div key={pet.uid} className={styles.petItem}>
                                <button onClick={() => handleSelectedPet(pet.uid)} className={styles.petButton}>
                                    <img src={pet.avatar} alt={pet.name} className={styles.petImage} />
                                </button>
                                <h4 className={styles.petName}>{pet.name}</h4>
                            </div>
                        )
                    })
                }
                <div className={styles.petItem}>
                    <button onClick={() => navigate('/tutor/createpet')} className={styles.petButton}>
                        <FaPlus />
                    </button>
                    <h4 className={styles.petName}>Adicionar Pet</h4>
                </div>
            </div>
            <Button transparent onClick={handleLogout}>
                <FaSignOutAlt /> Sair
            </Button>
        </div>
    )
}



function PetList() {
    return (
        <AuthContextProvider>
            <PetListComponent />
        </AuthContextProvider>
    )
}
export default PetList;