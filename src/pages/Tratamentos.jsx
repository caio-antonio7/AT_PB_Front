import { useContext, useState, useLayoutEffect, useRef } from "react";
import { TratamentosContext } from "../context/TratamentosContext";

export default function Tratamentos() {
  const { state, dispatch } = useContext(TratamentosContext);
  const [form, setForm] = useState({ nome: "", descricao: "", preco: "", duracao: "" });
  const novoRef = useRef(null);

  useLayoutEffect(() => {
    if (novoRef.current) {
      novoRef.current.style.transition = "background-color 0.6s ease";
      novoRef.current.style.backgroundColor = "#e8f8e8";
      setTimeout(() => {
        if (novoRef.current) novoRef.current.style.backgroundColor = "white";
      }, 600);
    }
  }, [state.lista.length]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAdd = (e) => {
    e.preventDefault();
    if (!form.nome.trim() || !form.descricao.trim() || !form.preco || !form.duracao)
      return alert("Preencha todos os campos.");
    if (parseFloat(form.preco) <= 0) return alert("Preço inválido.");

    const novo = {
      id: Date.now(),
      nome: form.nome.trim(),
      descricao: form.descricao.trim(),
      preco: parseFloat(form.preco),
      duracao: form.duracao.trim()
    };
    dispatch({ type: "ADICIONAR", payload: novo });
    setForm({ nome: "", descricao: "", preco: "", duracao: "" });
  };

  const remover = (id) => dispatch({ type: "REMOVER", payload: id });

  if (state.carregando) return <p>Carregando...</p>;

  return (
    <div>
      <h1>Cadastro de Tratamentos</h1>

      <form onSubmit={handleAdd} className="form">
        <input
          name="nome"
          placeholder="Nome"
          value={form.nome}
          onChange={handleChange}
        />
        <input
          name="descricao"
          placeholder="Descrição"
          value={form.descricao}
          onChange={handleChange}
        />
        <input
          name="preco"
          type="number"
          placeholder="Preço (R$)"
          value={form.preco}
          onChange={handleChange}
        />
        <input
          name="duracao"
          placeholder="Duração (ex: 45 min)"
          value={form.duracao}
          onChange={handleChange}
        />
        <button type="submit">Adicionar</button>
      </form>

      <hr />

      {state.lista.length === 0 ? (
        <p><strong>Nenhum tratamento cadastrado.</strong></p>
      ) : (
        <div className="card-container">
          {state.lista.map((t, i) => (
            <div
              key={t.id}
              ref={i === state.lista.length - 1 ? novoRef : null}
              className="card"
            >
              <h3>{t.nome}</h3>
              <p>{t.descricao}</p>
              <p><strong>Preço:</strong> R$ {t.preco.toFixed(2)}</p>
              <p><strong>Duração:</strong> {t.duracao}</p>
              <button onClick={() => remover(t.id)}>Remover</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
