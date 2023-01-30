import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import noDataImg from "../assets/images/no_data.svg";
import { useAuth } from "../hooks/useAuth";
import styles from "../styles/components/EmergencyContacts.module.css";
import { phone as phoneMask } from "../utils/masks";
import { isStringEmpty } from "../utils/string";
import Button from "./Button";
import Input from "./Input";
import { FaUser } from "react-icons/fa";

export default function EmergencyContacts() {
  const navigate = useNavigate();
  const { functions, props } = useAuth();
  const { updateUserByID } = functions;
  const { user } = props;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [hasEmergencyContacts, sethasEmergencyContacts] = useState(false);
  const [isAddComponent, setIsAddComponent] = useState(false);

  useEffect(() => {
    sethasEmergencyContacts(user.emergency_contacts.length > 0);
  }, [user]);

  const handleSetAddContact = () => {
    setIsAddComponent(true);
  };

  const ValidateFields = () => {
    if (isStringEmpty(name)) {
      alert("O campo nome não foi preenchido");
      return true;
    }
    if (isStringEmpty(email)) {
      alert("O campo Email não foi preenchido");
      return true;
    }
    if (isStringEmpty(phone)) {
      alert("O campo Celular/Whats não foi preenchido");
      return true;
    }
  };

  async function handlUpdateEmergencyContactList() {
    if (ValidateFields()) return;

    const new_emergency_contacts = [
      ...user.emergency_contacts,
      { name, email, phone, created_at: Date.now() },
    ];

    if (
      await updateUserByID(user.uid, {
        emergency_contacts: new_emergency_contacts,
      })
    ) {
      return navigate("/tutor/petlist");
    }
  }

  return (
    <>
      {isAddComponent ? (
        <div className={styles.container}>
          <Input
            required
            id="nome"
            label="Nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            required
            id="phone"
            label="Celular/Whats"
            value={phone}
            maxLength={15}
            onChange={(e) => setPhone(phoneMask(e.target.value))}
          />
          <Input
            required
            id="email"
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button onClick={handlUpdateEmergencyContactList}>Adicionar</Button>
        </div>
      ) : (
        <>
          {hasEmergencyContacts ? (
            <div className={styles.container}>
              {user.emergency_contacts.map((contact, index) => {
                return (
                  <div className={styles.wContainer}>
                    <div className={styles.uploadButton}>
                      <FaUser />
                    </div>
                    <div className={styles.emergencyData}>
                      <p>
                        <b>{contact.name}</b>
                      </p>
                      <p>{contact.phone}</p>
                      <p>{contact.email}</p>
                    </div>
                  </div>
                );
              })}
              <Button onClick={handleSetAddContact}>Adicionar contato</Button>
            </div>
          ) : (
            <div className={styles.noData}>
              <h2 className={styles.noDataTitle}>
                Não há contatos de emergência cadastrados.
              </h2>
              <img
                className={styles.noDataImg}
                src={noDataImg}
                alt="Sem registros"
              />
              <Button onClick={handleSetAddContact}>Adicionar contato</Button>
            </div>
          )}
        </>
      )}
    </>
  );
}
