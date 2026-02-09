import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import "./App.css";

function Admin(){
const isAdmin = localStorage.getItem('admin') === "true";
const [agendamentos, setAgendamentos] = useState([]);

/*============carregamento de agendamneto =======================================*/
useEffect(() => {
    const dados = localStorage.getItem('agendamentos');
    if (dados) {
        setAgendamentos(JSON.parse(dados));
    }
}, []);

/*=====================Proteção de rota =======================================*/

if (!isAdmin) {
    return <Navigate to="/login" />;
}
/*==============Excluir agendamento==============================================*/
function excluirAgendamento(index) {
    const novaLista = agendamentos.filter((_, i) => i !== index);
    setAgendamentos(novaLista);
    localStorage.setItem('agendamentos', JSON.stringify(novaLista));
}

return (
    <div className="container">
        <h1>Area Administrativa</h1>

        {agendamentos.length === 0 && (
            <p>Nenhum agendamento encontrado.</p>
        )}
        <div className="lista">
            {agendamentos.map((item, index) => (
                <div className="item" key={index} style={{ background: "#ffffff", padding: "10px", margin: "10px 0", borderRadius: "5px" }}>
                    <p><strong>Nome: </strong>{item.nome}</p>
                    <p><strong>Serviço: </strong>{item.serviço}</p>
                    <p><strong>Data: </strong>{item.data}</p>
                    <p><strong>Hora: </strong>{item.hora}</p>
                    
                    <button
                    style={{marginTop: "10px", background: "#ef4444"}}
                    onClick={() => excluirAgendamento(index)}
                    >
                        Excluir
                        </button>
                    </div>
                ))}
            </div>
            <button
            className="btn-agendar"
                style={{marginTop: "20px"}} 
                onClick={()=> {
                    localStorage.removeItem('admin');
                    window.location.href = '/login';
                }}
            >
                Sair
            </button>      
    </div>
 );
}

export default Admin;