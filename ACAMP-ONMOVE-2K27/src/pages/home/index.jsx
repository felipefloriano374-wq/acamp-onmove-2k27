import { useState, useEffect } from "react";
import logo from "../../assets/logo.png";
import piscina from "../../assets/piscina.webp";
import piscina2 from "../../assets/piscina2.webp";
import lazer from "../../assets/lazer.webp";
import churrasqueira from "../../assets/churrasqueira.webp";
import capela from "../../assets/capela.webp";
import onmove from "../../assets/onmove.webp";
import logonmove from "../../assets/logo-on-move.webp";
import "./style.css";

function Home() {
  const [open, setOpen] = useState(false);

  const imagens = [
    piscina,
    piscina2,
    lazer,
    churrasqueira,
    capela,
  ];

  const [imagemAtual, setImagemAtual] = useState(0);

  useEffect(() => {
    const intervalo = setInterval(() => {
      setImagemAtual((prev) => (prev + 1) % imagens.length);
    }, 3000); // troca a cada 3 segundos

    return () => clearInterval(intervalo);
  }, []);

  return (
    <div className="home">
      <header className="header">
        <img src={logo} alt="Logo" className="logo" />

        <button
          className="menu-btn"
          onClick={() => setOpen(!open)}
        >
          <i className="fa-solid fa-bars"></i>
        </button>

        <nav className={open ? "nav active" : "nav"}>
          <a href="#">Sobre nós</a>
          <a href="#">Local</a>
          <a href="#">Programação</a>
          <a href="#">Pagamento</a>
          <a href="#">Inscrição</a>
          <a href="#">Contato</a>
        </nav>
      </header>

      <section>

      </section>
        <img src={onmove} alt="Logo On Move" className="logo-onmove"/>
      <section
        className="local"
        style={{
          backgroundImage: `url(${imagens[imagemAtual]})`,
        }}
      >
        <h1>UM LUGAR COM UM PROPÓSITO</h1>
      </section>
    </div>
  );
}

export default Home;