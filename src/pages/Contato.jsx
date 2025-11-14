import { useState } from "react";

export default function Contato() {
  const [form, setForm] = useState({
    nome: "",
    email: "",
    mensagem: ""
  });

  const [erros, setErros] = useState({
    nome: "",
    email: "",
    mensagem: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validarCampo = (name, value) => {
    let msg = "";

    if (!value.trim()) {
      msg = "Campo obrigatório.";
    } else {
      if (name === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        msg = "Email inválido.";
      }
    }

    setErros((prev) => ({ ...prev, [name]: msg }));
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    validarCampo(name, value);
  };

  const formularioValido = Object.values(erros).every((e) => e === "") &&
    Object.values(form).every((v) => v.trim() !== "");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Mensagem enviada com sucesso!");
    setForm({ nome: "", email: "", mensagem: "" });
    setErros({ nome: "", email: "", mensagem: "" });
  };

  return (
    <div>
      <h1>Contato</h1>
      <p>Preencha o formulário abaixo e entraremos em contato o mais breve possível.</p>

      <form onSubmit={handleSubmit} style={styles.form}>
        <div>
          <input
            type="text"
            name="nome"
            placeholder="Seu nome"
            value={form.nome}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {erros.nome && <span style={styles.erro}>{erros.nome}</span>}
        </div>

        <div>
          <input
            type="email"
            name="email"
            placeholder="Seu e-mail"
            value={form.email}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {erros.email && <span style={styles.erro}>{erros.email}</span>}
        </div>

        <div>
          <textarea
            name="mensagem"
            placeholder="Sua mensagem"
            value={form.mensagem}
            onChange={handleChange}
            onBlur={handleBlur}
            rows="4"
          />
          {erros.mensagem && <span style={styles.erro}>{erros.mensagem}</span>}
        </div>

        <button type="submit" disabled={!formularioValido}>
          Enviar
        </button>
      </form>
    </div>
  );
}

const styles = {
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    maxWidth: "400px",
  },
  erro: {
    color: "red",
    fontSize: "0.9em",
  },
};
