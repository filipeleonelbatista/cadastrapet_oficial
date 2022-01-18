import { useEffect, useState } from 'react';
import {
  FaArrowRight
} from "react-icons/fa";
import { useSearchParams } from 'react-router-dom';
import CodigoPet from '../assets/codigopet.png';
import Logo from '../assets/logo.png';
import Button from '../components/Button';
import Input from '../components/Input';
import styles from "../styles/pages/LoginPage.module.css";
import * as masks from '../utils/masks';
import { isStringEmpty } from '../utils/string';

function LoginPage() {
  const [searchParams] = useSearchParams();
  const [petID, setPetID] = useState('');
  const [name, setName] = useState('');
  const [vetDocId, setVetDocId] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [CRMV, setCRMV] = useState('');
  const [isDisabled, setIsDisabled] = useState(true)

  const ValidateFields = () => {
    if (isStringEmpty(name)) {
      alert("O campo nome não foi preenchido");
      return true;
    }
    if (isStringEmpty(vetDocId)) {
      alert("O campo CPF/CNPJ não foi preenchido");
      return true;
    }
    if (isStringEmpty(email)) {
      alert("O campo Email não foi preenchido");
      return true;
    }
    if (isStringEmpty(phone)) {
      alert("O campo Telefone não foi preenchido");
      return true;
    }
    if (isStringEmpty(CRMV)) {
      alert("O campo CRMV não foi preenchido");
      return true;
    }
  }

  const handleCheckFirstForm = () => {
    if(ValidateFields()) return

    setIsDisabled(false)
  }

  const handleSearchPet = async () => {    
    if(isDisabled) return
    if (isStringEmpty(petID)) {
      alert("O campo Código do pet não foi preenchido");
      return
    }    
    if(!ValidateFields()) return

    //Pesquisar registro do veterinário

    // Se não localizar criar

    // Se localizar salvar no contexto

    // Buscar o PET

    // Se não localizar, retornar o aviso que o codigo do pet é invalido ou não existe

    // Se localizar salvar em contexto
  
    // Enviar para tela dashboard do pet.


  }

  useEffect(() => {
    const urlPetId = searchParams.get('id')
    if (urlPetId) setPetID(urlPetId)
  }, [searchParams])  

  useEffect(() => {}, [isDisabled])

  return (
    <div className={styles.container}>
      <img src={Logo} alt="Cadastra Pet" className={styles.imgHeader} />
      <div className={styles.content}>
        <div>
          <h3>Olá, tudo bem?</h3>
          <p>
            Para deixar o cadastro de informações do pet
            mais completo, precisamos de algumas
            informações suas:
          </p>
          <Input id="nome" placeholder="Nome/Nome fantasia" onChange={(e) => { setName(e.target.value)}} value={name} />
          <Input id="nome" placeholder="CPF/CNPJ" onChange={(e) => { setVetDocId(masks.cpf(e.target.value)) }} value={vetDocId} />
          <Input id="nome" placeholder="Email" onChange={(e) => { setEmail(e.target.value) }} value={email} />
          <Input id="nome" placeholder="Telefone" onChange={(e) => { setPhone(masks.phone(e.target.value)) }} value={phone} />
          <Input id="nome" placeholder="CRMV" onChange={(e) => { setCRMV(e.target.value)}} value={CRMV} />
          <Button id="nome" transparent onClick={handleCheckFirstForm}>
            Seguinte <FaArrowRight size="18" />
          </Button>
        </div>
        <div className={styles.divider}>
        </div>
        <div>
          <img src={CodigoPet} alt="Código Pet" />
          <p>
            Digite o código existente no APP do tutor
            para adicionar informações sobre a
            consulta com o Pet!
          </p>
          <Input disabled={isDisabled} id="nome" placeholder="Digite o código" onChange={(e) => { setPetID(e.target.value) }} value={petID} />
          <Button disabled={isDisabled} id="nome" onClick={handleSearchPet}>Prosseguir</Button>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;