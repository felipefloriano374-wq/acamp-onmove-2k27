import { useRef } from "react"; 
import gsap from "gsap"; 
import { ScrollTrigger } from "gsap/ScrollTrigger"; 
import { useGSAP } from "@gsap/react"; 

// Suas imagens importadas
import logo from "../../assets/logo.png";
import piscina from "../../assets/piscina.webp";
import lazer from "../../assets/lazer.webp";
import churrasqueira from "../../assets/churrasqueira.webp";
import capela from "../../assets/capela.webp";
import "./style.css";

// É crucial registrar o plugin FORA da função do componente
gsap.registerPlugin(ScrollTrigger);

function Home() {
  const containerRef = useRef(null);
  const terraRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=4000", // O usuário precisa rolar 4000px para terminar a animação
        scrub: 1, // Suaviza a animação com o mouse
        pin: true, // Fixa a tela durante o zoom
      }
    });

    // 1. Zoom monstruoso no SVG (Focando na região do Brasil)
    tl.to(terraRef.current, { 
      scale: 60, // Aumenta o globo 60 vezes
      transformOrigin: "33% 68%", // Coordenadas aproximadas do Brasil no SVG
      ease: "power2.in", 
      duration: 10 
    })
    
    // 2. Controlando os textos que aparecem durante a descida
    .fromTo(".texto-continente", { opacity: 0, scale: 0.5 }, { opacity: 1, scale: 1, duration: 1 }, 1)
    .to(".texto-continente", { opacity: 0, duration: 1 }, 3)

    .fromTo(".texto-pais", { opacity: 0, scale: 0.5 }, { opacity: 1, scale: 1, duration: 1 }, 4)
    .to(".texto-pais", { opacity: 0, duration: 1 }, 6)

    .fromTo(".texto-cidade", { opacity: 0, scale: 0.5 }, { opacity: 1, scale: 1, duration: 1 }, 7)
    .to(".texto-cidade", { opacity: 0, duration: 1 }, 9)

    // 3. Some com o planeta e revela as fotos da chácara no final
    .to(terraRef.current, { opacity: 0, duration: 1 }, 9.5)
    .fromTo(".galeria-final", { opacity: 0, y: 100 }, { opacity: 1, y: 0, duration: 1 }, 9.5);

  }, { scope: containerRef }); 

  return (
    <>
      {/* Header Fixo */}
      <header className="header">
        <img src={logo} alt="Logo Acamp" className="logo" style={{ height: "40px", width: "auto" }} />
        <button className="menu-btn">☰</button>
        <nav className="nav">
          <a href="#">Início</a>
          <a href="#">Sobre</a>
          <a href="#">Local</a>
        </nav>
      </header>

      {/* Main do Mapa (Altura 100vh porque o GSAP Pin cuida da rolagem extra) */}
      <main ref={containerRef} style={{ height: "100vh", width: "100%", position: "relative", overflow: "hidden", background: "transparent" }}>
        
        {/* O Globo Terrestre Estilizado (SVG) */}
        <div 
          ref={terraRef} 
          style={{ 
            position: "absolute", 
            top: 0, left: 0, 
            width: "100%", height: "100%", 
            display: "flex", alignItems: "center", justifyContent: "center" 
          }}
        >
          {/* SVG Básico - Substitua pelo seu Globo Vetorial Preto */}
          <svg viewBox="0 0 100 100" style={{ width: "300px", height: "300px" }}>
            {/* Círculo base do planeta (Preto) */}
            <circle cx="50" cy="50" r="48" fill="#111" />
            {/* Linhas simples para representar os continentes */}
            <path d="M 40 40 Q 30 50, 45 70 T 30 80" stroke="#fff" strokeWidth="2" fill="none" />
            <path d="M 60 30 Q 80 40, 70 60 T 80 70" stroke="#fff" strokeWidth="2" fill="none" />
          </svg>
        </div>

        {/* Textos Guia que aparecem centralizados durante o zoom */}
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", zIndex: 10, textAlign: "center", pointerEvents: "none" }}>
          {/* Note a cor #fff (branca) e um leve text-shadow para leitura em cima do SVG preto */}
          <h2 className="texto-continente" style={{ position: "absolute", width: "400px", left: "-200px", fontSize: "3rem", color: "#fff", textShadow: "0 2px 10px rgba(0,0,0,0.8)", opacity: 0 }}>América do Sul</h2>
          <h2 className="texto-pais" style={{ position: "absolute", width: "400px", left: "-200px", fontSize: "4rem", color: "#fff", textShadow: "0 2px 10px rgba(0,0,0,0.8)", opacity: 0 }}>Brasil</h2>
          <h2 className="texto-cidade" style={{ position: "absolute", width: "400px", left: "-200px", fontSize: "4rem", color: "#fff", textShadow: "0 2px 10px rgba(0,0,0,0.8)", opacity: 0 }}>Franco da Rocha</h2>
        </div>

        {/* Galeria de Fotos (Revelada no último frame do zoom) */}
        <div className="galeria-final" style={{
          position: "absolute",
          top: 0, left: 0,
          width: "100%", height: "100%",
          display: "flex", alignItems: "center", justifyContent: "center", gap: "30px", flexWrap: "wrap",
          /* Um fundo levemente escurecido com blur para não matar 100% o seu CSS original */
          backgroundColor: "rgba(0,0,0,0.6)",
          backdropFilter: "blur(10px)",
          zIndex: 20,
          opacity: 0 
        }}>
          <div style={{ textAlign: "center", color: "white" }}>
            <img src={capela} alt="Capela" style={{ width: "250px", borderRadius: "10px", boxShadow: "0 4px 15px rgba(0,0,0,0.5)" }} />
            <h3 style={{ marginTop: "10px" }}>A Capela</h3>
          </div>
          
          <div style={{ textAlign: "center", color: "white" }}>
            <img src={piscina} alt="Piscina" style={{ width: "250px", borderRadius: "10px", boxShadow: "0 4px 15px rgba(0,0,0,0.5)" }} />
            <h3 style={{ marginTop: "10px" }}>Piscina</h3>
          </div>

          <div style={{ textAlign: "center", color: "white" }}>
            <img src={lazer} alt="Lazer" style={{ width: "250px", borderRadius: "10px", boxShadow: "0 4px 15px rgba(0,0,0,0.5)" }} />
            <h3 style={{ marginTop: "10px" }}>Área de Lazer</h3>
          </div>
        </div>

      </main>
    </>
  );
}

export default Home;