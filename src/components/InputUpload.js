import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import styles from "../styles/components/InputUpload.module.css";

function InputUpload({
  id,
  label,
  onChange,
  value,
  attachment = [],
  disabled,
  ...rest
}) {
  const [file, setfile] = useState();
  const [files, setfiles] = useState([]);
  const [isShow, setIsShow] = useState(false);

  const handleFilePreview = async (fileArray) => {
    let files = Array.from(fileArray).map((file) => {
      let reader = new FileReader();
      return new Promise((resolve) => {
        reader.onloadend = () => resolve({ file, data_url: reader.result });
        reader.readAsDataURL(file);
      });
    });

    let res = await Promise.all(files);
    setfiles(res);
  };

  function handleClickInput() {
    document.getElementById(id).click();
  }

  function handlePreview(e) {
    onChange(e);
    handleFilePreview(e.target.files);
  }

  function handleShowModal(selectedFile) {
    setfile(selectedFile);
    setIsShow(true);
  }

  function handleCloseModal() {
    setfile(null);
    setIsShow(false);
  }
  return (
    <>
      {isShow && (
        <button onClick={handleCloseModal} className={styles.overlay}>
          <img
            src={file.data_url}
            alt=""
            className={styles.overlayImageContainer}
          />
          <div className={styles.imageData}>{file.file.name}</div>
        </button>
      )}
      {disabled ? (
        <>
          {attachment.length > 0 && (
            <div className={styles.imagePreviewContainer}>
              <p>Documentos Carregados</p>
              <div className={styles.imageList}>
                {attachment.map((file) => (
                  <button
                    key={file}
                    onClick={() =>
                      handleShowModal({
                        data_url: file,
                        file: { name: "Imagem Carregada" },
                      })
                    }
                    className={styles.imageContainer}
                  >
                    <div className={styles.imageContent}>
                      <img alt="Imagem Selecionada" src={file} />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </>
      ) : (
        <>
          <div className={styles.container}>
            <div className={styles.content}>
              <div className={styles.inputContainer}>
                {label && <label htmlFor={id}>{label}</label>}
                <input
                  id={id}
                  value={value}
                  onChange={(e) => handlePreview(e)}
                  multiple
                  type="file"
                  {...rest}
                />
                <button onClick={handleClickInput} title={label}>
                  <FaPlus />
                </button>
              </div>
              {files.length > 0 && (
                <div className={styles.imagePreviewContainer}>
                  <p>Imagens selecionadas</p>
                  <div className={styles.imageList}>
                    {files.map((file) => (
                      <button
                        key={file.data_url}
                        onClick={() => handleShowModal(file)}
                        className={styles.imageContainer}
                      >
                        <div className={styles.imageContent}>
                          <img alt="Imagem Selecionada" src={file.data_url} />
                        </div>
                        <p>{file.file.name}</p>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default InputUpload;
