import { useState } from "react";
import logo from "../../assets/logo.png";
import "./style.css";

function Home() {
  const [open, setOpen] = useState(false);

  return (
    <div className="home">
    <header className="header">
      <img src={logo} alt="Logo" className="logo"/>

      <button
        className="menu-btn"
        onClick={() => setOpen(!open)}
      >
        <i className="fa-solid fa-bars"></i>
      </button>

      <nav className={open ? "nav active" : "nav"}>
        <a href="#">Local</a>
        <a href="#">Programação</a>
        <a href="#">Pagamento</a>
        <a href="#">Inscrição</a>
        <a href="#">Contato</a>
      </nav>
    </header>

--- fotos da chacara

    <section className="Local">

    </section>
    </div>
  );
}

export default Home;