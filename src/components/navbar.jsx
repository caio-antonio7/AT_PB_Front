import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav style={styles.nav}>
      <h2>Clínica de Estética</h2>
      <ul style={styles.menu}>
        <li><NavLink to="/" style={styles.link}>Home</NavLink></li>
        <li><NavLink to="/tratamentos" style={styles.link}>Tratamentos</NavLink></li>
        <li><NavLink to="/contato" style={styles.link}>Contato</NavLink></li>
      </ul>
    </nav>
  );
}

const styles = {
  nav: {
    backgroundColor: "#f5f5f5",
    padding: "10px 20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: "2px solid #ccc"
  },
  menu: {
    listStyle: "none",
    display: "flex",
    gap: "20px",
  },
  link: {
    textDecoration: "none",
    color: "#333",
    fontWeight: "bold",
  }
};
