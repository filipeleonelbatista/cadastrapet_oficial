import { useState } from "react"
import {FaBars, FaDog, FaUserMd} from "react-icons/fa";
import { Link } from 'react-router-dom';
import styles from "../styles/components/HomeNavigation.module.css";

export default function HomeNavigation() {
    const [isShow, setIsShow] = useState(false)

    const handleIsShowMenu = () => {
        setIsShow(!isShow)
    }

    return (
        <div className={styles.container}>
            <button className={styles.roundedButton} onClick={handleIsShowMenu}>
                <FaBars size={18} />
            </button>
            {
                isShow && (
                    <div className={styles.menuItems}>
                        <Link to="/veterinario">
                            <FaUserMd /> Sou Veterinário
                        </Link>
                        <Link to="/tutor">
                            <FaDog /> Sou Tutor
                        </Link>
                    </div>
                )
            }
        </div>
    )
}