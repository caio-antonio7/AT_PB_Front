import { createContext, useReducer, useEffect } from "react";

export const TratamentosContext = createContext();

const initialState = {
  lista: [],
  carregando: true
};

function reducer(state, action) {
  switch (action.type) {
    case "CARREGAR_INICIAL":
      return { ...state, lista: action.payload, carregando: false };
    case "ADICIONAR":
      return { ...state, lista: [...state.lista, action.payload] };
    case "REMOVER":
      return { ...state, lista: state.lista.filter(t => t.id !== action.payload) };
    default:
      return state;
  }
}

export function TratamentosProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    async function carregar() {
      try {
        const res = await fetch("/tratamentos.json");
        const data = await res.json();
        dispatch({ type: "CARREGAR_INICIAL", payload: data });
      } catch (e) {
        console.error("Erro ao carregar tratamentos:", e);
        dispatch({ type: "CARREGAR_INICIAL", payload: [] });
      }
    }
    carregar();
  }, []);

  return (
    <TratamentosContext.Provider value={{ state, dispatch }}>
      {children}
    </TratamentosContext.Provider>
  );
}
