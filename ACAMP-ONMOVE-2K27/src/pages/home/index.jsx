import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import logo from "../../assets/logo.png";
import logonmove from "../../assets/logo-on-move.webp";
import onmove from "../../assets/onmove.webp";
import piscina from "../../assets/piscina.webp";
import lazer from "../../assets/lazer.webp";
import churrasqueira from "../../assets/churrasqueira.webp";
import capela from "../../assets/capela.webp";
import "./style.css"; 

gsap.registerPlugin(ScrollTrigger);

export default function AcampamentoOnMove() {
  const containerRef = useRef(null);
  const [modalAberto, setModalAberto] = useState(false);
  
  const [nome, setNome] = useState("");
  const [idade, setIdade] = useState("");
  const [telefone, setTelefone] = useState("");
  const [telefoneResp, setTelefoneResp] = useState("");
  const [autorizado, setAutorizado] = useState(false);

  useGSAP(() => {
    gsap.fromTo(".hero-logo", 
      { scale: 0.5, opacity: 0 }, 
      { scale: 1, opacity: 1, duration: 1.5, ease: "back.out(1.7)" }
    );

    const secoes = gsap.utils.toArray(".scroll-section");

    secoes.forEach((secao) => {
      const elementos = secao.querySelectorAll(".anima-item");
      
      gsap.fromTo(elementos, 
        { opacity: 0, y: 50 }, 
        { 
          opacity: 1, 
          y: 0,
          stagger: 0.3, 
          duration: 1,
          scrollTrigger: {
            trigger: secao,
            start: "top 75%", 
            toggleActions: "play none none reverse", 
          }
        }
      );
    });
  }, { scope: containerRef });

  const handleInscricao = (e) => {
    e.preventDefault();
    if (Number(idade) < 18 && !autorizado) {
      alert("Para menores de 18 anos, a autorização dos pais é obrigatória.");
      return;
    }

    const numeroAcampamento = "5519983737701"; 
    const textoMensagem = `*Inscrição Acampamento ON MOVE* 🔥\n\n*Nome:* ${nome}\n\n*Telefone:* ${telefone}\n*Idade:* ${idade} anos\n*Telefone do Responsável:* ${telefoneResp}\n*Autorização dos Pais:* ${autorizado ? "Sim ✅" : "Maior de 18 / Não ❌"}`;
    const urlWhatsApp = `https://wa.me/${numeroAcampamento}?text=${encodeURIComponent(textoMensagem)}`;
    
    window.open(urlWhatsApp, "_blank");
    
    setModalAberto(false);
    setNome("");
    setIdade("");
    setTelefone("");
    setTelefoneResp("");
    setAutorizado(false);
  };

  return (
    <main ref={containerRef} className="main-container">
      
      <header className="header">
        <img src={onmove} alt="Logo" className="logo" />
        <button className="menu-btn">☰</button>
        <nav className="nav">
          <a href="#proposito">Propósito</a>
          <a href="#local">O Local</a>
          <button className="btn-nav-inscricao" onClick={() => setModalAberto(true)}>
            Inscrever-se
          </button>
        </nav>
      </header>

      <section className="hero-section">
        <img src={logonmove} alt="On Move" className="hero-logo hero-logo-img" />
        <h2 className="hero-logo hero-subtitle">
          Mais do que um evento. Um marco na sua história.
        </h2>
      </section>

      <section id="proposito" className="scroll-section content-section">
        <div className="anima-item text-block">
          <h3 className="sub-title color-yellow">Adoração Profunda</h3>
          <h2 className="section-title">A Capela é o nosso coração.</h2>
          <p className="section-text">
            Preparamos um ambiente focado totalmente em buscar a presença de Deus. Não vamos apenas cantar, vamos ser transformados. Nossos cultos na capela da chácara serão o ponto alto do acampamento.
          </p>
        </div>
        <div className="anima-item image-block">
          <img src={capela} alt="Capela do Acampamento" className="content-img" />
        </div>
      </section>

      <section id="local" className="scroll-section content-section reverse bg-darker">
        <div className="anima-item image-block">
          <img src={piscina} alt="Piscina da Chácara" className="content-img" />
        </div>
        <div className="anima-item text-block">
          <h3 className="sub-title color-red">Tempo de Qualidade</h3>
          <h2 className="section-title">Lazer e Conexão.</h2>
          <p className="section-text">
            A diversão também faz parte do propósito! A chácara conta com uma estrutura completa: piscina, área verde enorme e espaços para dinâmicas. É aqui que amizades de propósito vão nascer e se fortalecer.
          </p>
        </div>
      </section>

      <section className="scroll-section content-section">
        <div className="anima-item text-block">
          <h3 className="sub-title color-blue">Comunhão na Mesa</h3>
          <h2 className="section-title">Momentos Inesquecíveis.</h2>
          <p className="section-text">
            As melhores conversas acontecem ao redor da mesa (e da churrasqueira). Preparamos uma área de lazer completa para que cada refeição seja um momento de alegria e muita risada.
          </p>
        </div>
        <div className="anima-item image-block column">
          <img src={lazer} alt="Área de Lazer" className="content-img" />
          <img src={churrasqueira} alt="Churrasqueira" className="content-img" />
        </div>
      </section>

      <section className="scroll-section cta-section">
        <h2 className="anima-item cta-title">As vagas são limitadas.</h2>
        <p className="anima-item cta-text">
          Não fique de fora do que Deus vai fazer nestes dias. Garanta seu lugar agora mesmo.
        </p>
        <button className="anima-item btn-cta" onClick={() => setModalAberto(true)}>
          Garantir Minha Vaga!
        </button>
      </section>

      {modalAberto && (
        <div className="modal-overlay">
          <div className="modal-content">
            
            <div className="modal-header">
              <h3 className="modal-title">Inscrição Oficial</h3>
              <button className="btn-close-modal" onClick={() => setModalAberto(false)}>✖</button>
            </div>

            <form className="modal-form" onSubmit={handleInscricao}>
              
              <div className="form-group">
                <label>Nome Completo:</label>
                <input type="text" placeholder="Nome Completo" required value={nome} onChange={(e) => setNome(e.target.value)} />
              </div>
              <div className="form-group">
                <label>Telefone:</label>
                <input type="tel" placeholder="Telefone" required value={telefone} onChange={(e) => setTelefone(e.target.value)} />
              </div>

              <div className="form-group">
                <label>Idade:</label>
                <input type="number" placeholder="Idade" required value={idade} onChange={(e) => setIdade(e.target.value)} />
              </div>

              <div className="form-group">
                <label>Telefone do responsável:</label>
                <input type="tel" placeholder="Telefone do Responsável" required value={telefoneResp} onChange={(e) => setTelefone(e.target.value)} />
              </div>

              <div className="form-checkbox">
                <input type="checkbox" id="autorizacao" checked={autorizado} onChange={(e) => setAutorizado(e.target.checked)} />
                <label htmlFor="autorizacao">
                  Sou responsável e <strong>autorizo</strong> a participação do meu filho(a) menor de idade no acampamento.
                </label>
              </div>

              <button type="submit" className="btn-submit">
                Enviar pelo WhatsApp
              </button>
            </form>
          </div>
        </div>
      )}

    </main>
  );
}