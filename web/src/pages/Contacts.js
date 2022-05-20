import React, { useEffect, useState } from "react";
import { FaArrowLeft, FaInstagram, FaLinkedin } from "react-icons/fa";
import { FiMail } from "react-icons/fi";
import {
  IoCopyOutline,
  IoQrCodeOutline,
  IoShareSocialOutline,
} from "react-icons/io5";
import QRCode from "react-qr-code";
import { useNavigate, useParams } from "react-router-dom";
import pixLogo from "../assets/pix_logo.png";
import styles from "../styles/pages/Contacts.module.css";

export default function Contacts() {
  let { url } = useParams();
  const navigate = useNavigate();

  const contacts = [
    {
      url: "filipeleonelbatista",
      name: "Filipe Batista",
      subtitle: "CTO na Cadastrapet",
      image: "https://avatars.githubusercontent.com/u/20867392?v=4",
      pix: "00020126580014BR.GOV.BCB.PIX013649b3aa64-47eb-47a3-b439-b765a4d0f22c5204000053039865802BR5925FILIPE DE LEONEL BATISTA 6009SAO PAULO61080540900062250521hGjPosyoJ4dswj614vgvd63046514",
      instagram: "filipeleonelbatista",
      facebook: "filipeleonelbatista",
      whatsapp: "filipeleonelbatista",
      linkedin: "filipeleonelbatista",
      email: "contato@cadastrapet.com.br",
      links: [
        {
          title: "Cadastre seu pet agora",
          url: "https://cadastrapet.com.br/tutor/cadastrar",
        },
        {
          title: "Veterinário, atenda seus pets por aqui",
          url: "https://cadastrapet.com.br/veterinario/cadastrar",
        },
        { title: "Acesse o site", url: "https://cadastrapet.com.br" },
        {
          title: "Meu Linkedin",
          url: "https://linkedin.com/in/filipeleonelbatista",
        },
        {
          title: "Instagram",
          url: "https://instagram.com/filipeleonelbatista",
        },
        {
          title: "Meus Links",
          url: "https://desenvolvedordeaplicativos.com.br/links",
        },
      ],
    },
  ];

  const [showPix, setShowPix] = useState(false);
  const [currentContact, setCurrentContact] = useState(null);

  const sharableContent = {
    title: "CadastraPet",
    text: "Vi Este contato no site https://cadastrapet.com.br",
    url: "https://cadastrapet.com.br",
  };

  const handleCopyPix = () => {
    navigator.clipboard.writeText(currentContact.pix);
    alert("Copiado!");
  };

  const handleShare = async () => {
    try {
      await navigator.share(sharableContent);
    } catch (err) {
      console.log("Error: " + err);
    }
    console.log("MDN compartilhado com sucesso!");
  };

  useEffect(() => {
    const contactSelected = contacts.filter((contact) => contact.url === url);

    if (contactSelected.length === 0) return navigate("/links");

    setCurrentContact(contactSelected[0]);

    // eslint-disable-next-line
  }, []);

  if (!currentContact) return null;

  return (
    <div className={styles.container}>
      <img
        className={styles.imageProfile}
        src={currentContact.image}
        alt="Cadastrapet"
      />
      {showPix ? (
        <div className={styles.content} style={{ position: "relative" }}>
          <button
            onClick={() => setShowPix(false)}
            style={{ position: "absolute", top: 15, left: 15 }}
            className={styles.actionTransparent}
          >
            <FaArrowLeft size={18} />
          </button>
          <div className={styles.aboutContainer}>
            <div className={styles.aboutInfo}>
              <h3 className={styles.title}>{currentContact.name}</h3>
              <p className={styles.subtitle}>{currentContact.subtitle}</p>
            </div>
          </div>

          <div className={styles.pixContainer} style={{ alignItems: "center" }}>
            <div className={styles.pixContainerImage}>
              <img
                className={styles.pixImage}
                src={pixLogo}
                alt="Pix Banco central do Brasil"
              />
            </div>
            <div className={styles.pixContainerImage}>
              <QRCode value={currentContact.pix} />
            </div>
            <p className={styles.pixText}>
              Abra o App do seu banco e pague atravez do <b>QRCode</b> ou{" "}
              <b>Pix Copia e Cola</b>
            </p>

            <button
              onClick={handleCopyPix}
              className={styles.action}
              style={{
                width: "100%",
                margin: "1.6rem 0 0 0",
                fontSize: "small",
              }}
            >
              <IoCopyOutline />
              Copiar Código Pix
            </button>
          </div>
        </div>
      ) : (
        <div className={styles.content}>
          <div className={styles.aboutContainer}>
            <div className={styles.aboutInfo}>
              <h3 className={styles.title}>{currentContact.name}</h3>
              <p className={styles.subtitle}>{currentContact.subtitle}</p>
            </div>
            <div className={styles.aboutActions}>
              {currentContact.pix && (
                <button
                  onClick={() => setShowPix(true)}
                  className={styles.actionTransparent}
                >
                  <IoQrCodeOutline size={18} />
                  <p className={styles.actionTransparentLabel}>Pix</p>
                </button>
              )}
              <a href="/vcard.vcf" download className={styles.action}>
                Salvar na agenda
              </a>
              <button
                onClick={handleShare}
                className={styles.actionTransparent}
              >
                <IoShareSocialOutline size={18} />
                <p className={styles.actionTransparentLabel}>Compartilhar</p>
              </button>
            </div>
          </div>
          <div className={styles.divider}></div>
          <div className={styles.actionsList}>
            {currentContact.linkedin && (
              <a
                href={`https://www.linkedin.com/in/${currentContact.linkedin}/`}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.actionsLink}
              >
                <FaLinkedin size={48} />{" "}
                <p className={styles.label}>Linkedin</p>
              </a>
            )}

            {currentContact.instagram && (
              <a
                href={`https://instagram.com/${currentContact.instagram}/`}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.actionsLink}
              >
                <FaInstagram size={48} />{" "}
                <p className={styles.label}>Instagram</p>
              </a>
            )}
            {currentContact.email && (
              <a
                href={`mailto:${currentContact.email}`}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.actionsLink}
              >
                <FiMail size={48} /> <p className={styles.label}>E-mail</p>
              </a>
            )}
          </div>
          <div className={styles.divider}></div>
          <div className={styles.linksContainer}>
            <h4 className={styles.title} style={{ textTransform: "uppercase" }}>
              Meus Links
            </h4>

            {currentContact.pix && (
              <button
                onClick={handleCopyPix}
                className={styles.link}
                style={{
                  width: "100%",
                  margin: "1.6rem 0 0 0",
                  fontSize: "small",
                }}
              >
                <IoCopyOutline />
                Copiar Código Pix
              </button>
            )}

            {currentContact.links.map((item, index) => (
              <a
                key={index}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.link}
              >
                {item.title}
              </a>
            ))}
          </div>
          <button
            onClick={handleShare}
            className={styles.action}
            style={{ margin: "1.6rem 0", fontSize: "small" }}
          >
            <IoShareSocialOutline />
            Compartilhar
          </button>
        </div>
      )}
    </div>
  );
}
