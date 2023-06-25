import { useState } from 'react';
import { FiSearch } from 'react-icons/fi'
import "./style.css"
import api from "./services/api"
function App() {

  const [input, setInput] = useState('')
  const [cep, setCep] = useState({})

  async function handleSearch() {
    // 01310930/json
    if (input === "") {
      alert("Preencha algum cep")
    }
    try {
      const res = await api.get(`${input}/json`)
      setCep(res.data)
      setInput("")
    } catch {
      alert("Erro ao buscar cep")
      setInput("")
    }
  }
  return (
    <div className="container">
      <h1 className="title">Buscador de CEP</h1>
      <div className="container-input">
        <input
          type="text"
          placeholder="Digite o cep"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <button className="buttonSearch" onClick={handleSearch}>
          <FiSearch size={25} color={"#fff"} />
        </button>
      </div>
      {Object.keys(cep).length > 0 && (
        <main className='main'>
          <h2> CEP: {cep.cep}</h2>
          <span>Logradouro: {cep.logradouro}</span>
          <span>Complemento: {cep.complemento}</span>
          <span>Bairro: {cep.bairro} </span>
          <span>Cidade/UF: {cep.localidade} - {cep.uf}</span>

        </main>
      )}

    </div>
  );
}

export default App;
