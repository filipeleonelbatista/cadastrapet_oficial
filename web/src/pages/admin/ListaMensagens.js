import React, { useEffect, useState } from "react";
import { AuthContextProvider } from "../../context/AuthContext";
import { ConversionContextProvider } from "../../context/ConversionContext";
import { useConversion } from "../../hooks/useConversion";
import "../../styles/pages/admin/list-contatos.css";

function ListMensagensComponent() {
  const [contatos, setContatos] = useState([]);

  const { getAllContacts } = useConversion();

  useEffect(() => {
    const executeAsync = async () => {
      const result = await getAllContacts();
      setContatos(result);
    };
    executeAsync();
  }, [getAllContacts]);

  return (
    <>
      <table>
        <thead className="table-head">
          <th>Nome</th>
          <th>Telefone</th>
        </thead>
        <tbody>
          {contatos.length > 0 &&
            contatos.map((contato, index) => {
              return (
                <tr key={index}>
                  <td>{contato.name}</td>
                  <td>
                    {contato.phone.replace(/\D/g, "").length > 11
                      ? contato.phone.replace(/\D/g, "").substr(2)
                      : contato.phone.replace(/\D/g, "")}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </>
  );
}

function ListaMensagens() {
  return (
    <AuthContextProvider>
      <ConversionContextProvider>
        <ListMensagensComponent />
      </ConversionContextProvider>
    </AuthContextProvider>
  );
}

export default ListaMensagens;
