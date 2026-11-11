
import { Link } from 'react-router-dom'
import './Footer.css'

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container container">

        {/* IDENTIDADE DA LOJA */}
        <div className="footer-brand">
          <Link to="/" className="footer-logo">
            <span className="footer-logo-icon">D</span>
            <span>Digital Store</span>
          </Link>

          <p className="footer-description">
            Encontre os melhores produtos para o seu estilo.
            Qualidade, conforto e tecnologia em um só lugar.
            Sua experiência de compra começa aqui!
          </p>

          {/* REDES SOCIAIS */}
          <div className="footer-social">

            <a
              href="https://www.facebook.com/"
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
            >
              <svg viewBox="0 0 24 24" width="19" height="19" fill="currentColor">
                <path d="M13.5 21v-8h2.7l.4-3.1h-3.1v-2c0-.9.3-1.5 1.6-1.5h1.7V3.6c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3v2.1H7.3V13h2.8v8h3.4z" />
              </svg>
            </a>

            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
            >
              <svg viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
              </svg>
            </a>

            <a
              href="https://x.com/"
              target="_blank"
              rel="noreferrer"
              aria-label="X Twitter"
            >
              <svg viewBox="0 0 24 24" width="19" height="19" fill="currentColor">
                <path d="M18.9 2H22l-6.8 7.8L23.2 22h-6.3L12 14.6 5.6 22H2.5l7.3-8.4L1.8 2h6.5l4.5 6.8L18.9 2zm-1.1 18h1.7L7.3 3.9H5.5L17.8 20z" />
              </svg>
            </a>

            <a
              href="https://www.youtube.com/"
              target="_blank"
              rel="noreferrer"
              aria-label="YouTube"
            >
              <svg viewBox="0 0 24 24" width="19" height="19" fill="currentColor">
                <path d="M23 7a3 3 0 0 0-2.1-2.1C19 4.4 12 4.4 12 4.4s-7 0-8.9.5A3 3 0 0 0 1 7C.5 9 .5 12 .5 12s0 3 .5 5a3 3 0 0 0 2.1 2.1c1.9.5 8.9.5 8.9.5s7 0 8.9-.5A3 3 0 0 0 23 17c.5-2 .5-5 .5-5s0-3-.5-5zM9.5 15.5v-7l6 3.5-6 3.5z" />
              </svg>
            </a>

            <a
              href="https://www.tiktok.com/"
              target="_blank"
              rel="noreferrer"
              aria-label="TikTok"
            >
              <svg viewBox="0 0 24 24" width="19" height="19" fill="currentColor">
                <path d="M19.6 7.1a6.3 6.3 0 0 1-4-1.4v8.1a6.1 6.1 0 1 1-6.1-6.1c.4 0 .8 0 1.2.1v3.3a2.8 2.8 0 1 0 1.8 2.7V2h3.2c.2 2 1.7 3.7 3.9 4.1v1z" />
              </svg>
            </a>

          </div>
        </div>

        {/* INFORMAÇÕES */}
        <div className="footer-column">
          <h3>Informação</h3>
          <Link to="/sobre">Sobre Drip Store</Link>
          <Link to="/seguranca">Segurança</Link>
          <Link to="/wishlist">Wishlist</Link>
          <Link to="/blog">Blog</Link>
          <Link to="/trabalhe-conosco">Trabalhe conosco</Link>
          <Link to="/meus-pedidos">Meus Pedidos</Link>
        </div>

        {/* CATEGORIAS */}
        <div className="footer-column">
          <h3>Categorias</h3>
          <Link to="/categorias">Camisetas</Link>
          <Link to="/categorias">Calças</Link>
          <Link to="/categorias">Bonés</Link>
          <Link to="/categorias">Headphones</Link>
          <Link to="/categorias">Tênis</Link>
        </div>

        {/* CONTATO */}
        <div className="footer-column footer-contact">
          <h3>Contato</h3>

          <p>
            <span className="footer-contact-icon">⌖</span>
            <span>Av. Santos Dumont, 1510 - Aldeota, Fortaleza - CE</span>
          </p>

          <p>
            <span className="footer-contact-icon">☎</span>
            <span>(85) 3051-3411</span>
          </p>
        </div>

      </div>

      {/* RODAPÉ INFERIOR */}
      <div className="footer-bottom container">
        <p>© 2026 Digital Store. Todos os direitos reservados.</p>
      </div>
    </footer>
  )
}

export default Footer
