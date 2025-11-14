import { useContext } from "react";
import { TratamentosContext } from "../context/TratamentosContext";

export default function Home() {
  const { state } = useContext(TratamentosContext);

  return (
    <div>
      <h1>Bem-vindo à Clínica de Estética BelaVida</h1>
      <p>
        Nossa clínica oferece tratamentos faciais e corporais realizados por profissionais
        qualificados, com foco em saúde, bem-estar e autoestima.
      </p>

      <h2>Tratamentos em Destaque</h2>
      {state.carregando ? (
        <p>Carregando...</p>
      ) : state.lista.length === 0 ? (
        <p>Nenhum tratamento disponível.</p>
      ) : (
        <ul>
          {state.lista.slice(0, 3).map(t => (
            <li key={t.id}>
              <strong>{t.nome}</strong> — R$ {t.preco.toFixed(2)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
