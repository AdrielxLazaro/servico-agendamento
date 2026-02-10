 import {useState, useEffect} from 'react';
 import "./App.css";

function Agendamento() {
  //===============================
  // Estado para armazenar o nome
  //===============================

  //Guarda o nome digitado pelo usuário
  const [nome, setNome] = useState('');

  //Guarda o serviço escolhido
  const [serviço, setServiço] = useState('');

  //Guarda a data escolhida
  const [data, setData] = useState('');

  //Guarda a hora escolhida
  const [hora, setHora] = useState('');

  //Guarda a lista de agendamentos
  const [agendamentos, setAgendamentos] = useState([]);
  //===============================
  // carregamento do localStorage
  //===============================

  useEffect(() => {
    const dadosSalvos = localStorage.getItem('agendamentos');

    if (dadosSalvos) {
      setAgendamentos(JSON.parse(dadosSalvos));
    }
  }, []);

  //===============================
  // salvamento no localStorage
  //===============================

  useEffect(() =>{
    localStorage.setItem(
      "agendamentos",
      JSON.stringify(agendamentos)
    );

  }, [agendamentos]);
  //===============================
  // Função Agendar Serviço
  //===============================

  function agendarHorario(e) {
    e.preventDefault(); // Evita o recarregamento da página

    //Verificação simples para garantir que todos os campos foram preenchidos
    if (nome === "" || serviço === "" || data === "") {
    alert("Preencha todos os campos!");
    return;
  }
    //Cria um novo agendamento
    const novoAgendamento = {
      id: Date.now(), // id unico
      nome,
      serviço,
      data,
      hora,
    };
    //Adiciona o novo agendamento à lista
    setAgendamentos([...agendamentos, novoAgendamento]);

    //Limpa os campos do formulário
    setNome('');
    setServiço('');
    setData('');
    setHora('');
  }

  //===============================
  // Remover Agendamento
  //===============================

  function removerAgendamento(id) {
    const novaLista = agendamentos.filter(
      (item) => item.id !== id
    );

    setAgendamentos(novaLista);
  }

  //===============================
  // HTML
  //===============================
  return (
    <div  className='container' style={{ padding: "20px", fontFamily: "Time New Roman" }}>
      <h1>Sistema de Agendamento</h1>

      {/* Formulário */}
      <form onSubmit={agendarHorario}>
        <div>
          <label>Nome:</label><br />
          <input className='nome'
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
        </div>

        <br />


        <div>
          <label>Serviço:</label><br />
          <select
          value={serviço}
          onChange={(e) => setServiço(e.target.value)}
          >
            <option value="">Selecione</option>
            <option value="Corte de Cabelo">Corte de Cabelo</option>
            <option value="Barba">Barba</option>
            <option value="Corte + Barba">Corte + Barba</option>
          </select>
        </div>

        <br />
    
        <div>
          <label>Data: </label><br />
          <input className='data'
            type='date'
            value={data}
            onChange={(e) => setData(e.target.value)}
          />
        </div>
        <br />
        <div>
          <label>Hora: </label><br />
          <input className='hora'
            type='time'
            value={hora}
            onChange={(e) => setHora(e.target.value)}
          />
        </div>
        <br />

        <button className='button' type='submit'>Agendar</button>
      </form>

      <hr />
      {/* Lista de Agendamentos */}
      <div className='agendamento'>
      <h2>Agendamentos</h2>

      {agendamentos.length === 0 && (
        <p>Nenhum agendamento realizado.</p>
      )}

      {agendamentos.map((item) => (
        <div key={item.id} style={{ marginBottom: 10}}>
          <strong>{item.nome}</strong> <br />
          Serviço: {item.serviço} <br />
          Data: {item.data} <br />
          Hora: {item.hora} <br />
          <button onClick={() => removerAgendamento(item.id)}>
            Remover
          </button>
        </div>
      ))}
      </div>
    </div>
  );
}

export default Agendamento;