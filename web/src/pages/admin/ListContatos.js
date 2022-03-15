import React, { useEffect, useState } from "react";
import noData from "../../assets/admin/no_data.svg";
import NavbarComponent from "../../components/admin/NavbarComponent";
import { AuthContextProvider } from "../../context/AuthContext";
import { ConversionContextProvider } from "../../context/ConversionContext";
import { useAuth } from "../../hooks/useAuth";
import { useConversion } from "../../hooks/useConversion";
import "../../styles/pages/admin/list-contatos.css";

function ListContatosComponent() {
  const [contatos, setContatos] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalContacts, setTotalContacts] = useState(0);
  const [totalContactsToday, setTotalContactsToday] = useState(0);

  const { getAllContacts, getNumberOfContacts, getNumberOfContactsToday } =
    useConversion();
  const { functions } = useAuth();
  const { getNumberOfUsers } = functions;

  useEffect(() => {
    const executeAsync = async () => {
      const result = await getAllContacts();
      setContatos(result);
      const quant = await getNumberOfUsers();
      setTotalUsers(quant);
      const quant2 = await getNumberOfContacts();
      setTotalContacts(quant2);
      const quant3 = await getNumberOfContactsToday();
      setTotalContactsToday(quant3);
    };
    executeAsync();
  }, [
    getAllContacts,
    getNumberOfContacts,
    getNumberOfUsers,
    getNumberOfContactsToday,
  ]);

  return (
    <>
      <NavbarComponent />
      {contatos.length === 0 ? (
        <div id="contatos-page">
          <div className="container">
            <img src={noData} alt="NotFound" />
            <h2>Não foram registrados nenhum contato até o momento</h2>
          </div>
        </div>
      ) : (
        <div id="contatos-page">
          <div style={{ display: "flex", flexDirection: "row", gap: "0.8rem" }}>
            <div>
              <h3>Usuários por contatos</h3>
              <p>
                {totalUsers}/{totalContacts}
              </p>
            </div>

            <div>
              <h3>Total de contatos hoje</h3>
              <p>{totalContactsToday}</p>
            </div>
          </div>
          <table>
            <thead className="table-head">
              <th>Tipo de Contato</th>
              <th>Dados</th>
              <th>Data do contato</th>
              <th>Retorno do contato</th>
              {/* <th>Ações</th> */}
            </thead>
            <tbody>
              {contatos.map((contato, index) => {
                return (
                  <tr key={index} className="table-row">
                    <td>{contato.from}</td>
                    <td className="data">
                      <p>{contato.name}</p>
                      <div className="row-data">
                        <p>{contato.email}</p>
                        <p>{contato.phone}</p>
                      </div>
                      <div className="row-data">
                        <p>{contato.url}</p>
                      </div>
                      <div className="row-data">
                        <p>{contato.message}</p>
                      </div>
                    </td>
                    <td>{new Date(contato.created_at).toLocaleDateString()}</td>
                    <td>
                      {contato.converted ? (
                        <div className="boolean-data-true"></div>
                      ) : (
                        <div className="boolean-data-false"></div>
                      )}
                    </td>
                    {/* <td className="actions">
                                                    <button onClick={async () => {
                                                        const result = await api.delete(`contatos/${contato.id}`)
                                                        if (result.data.success) alert("Dados removidos com sucesso")
                                                    }}><FaTrash size={24} color="#ff4141" /></button>
                                                   <button><FaEdit size={24} color="#0c961e" /></button> 
                                                </td> */}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}

function ListContatos() {
  return (
    <AuthContextProvider>
      <ConversionContextProvider>
        <ListContatosComponent />
      </ConversionContextProvider>
    </AuthContextProvider>
  );
}

export default ListContatos;
