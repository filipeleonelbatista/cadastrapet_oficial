import { useNavigate } from 'react-router-dom';
import styles from '../styles/components/BackButton.module.css'
import {
    FaArrowLeft
} from "react-icons/fa";

function BackButton({ path, ...rest }) {
    const navigate = useNavigate()
    return (
        <div className={styles.container}>
            <button
                className={styles.backButton}
                onClick={() => navigate(path)}
                {...rest}
            >
                <FaArrowLeft size={24} />
            </button>
        </div>
    );
}

export default BackButton;