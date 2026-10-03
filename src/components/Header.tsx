import Link from "next/link";
export default function Header() {
  return (
    <header className="site-header">
      <div className="header-inner">
        <Link href="/" className="brand" aria-label="Gowtham home">
          <span className="brand-symbol">
            G<span>+</span>
          </span>
          <span>
            GOWTHAM<span className="brand-sub">PRODUCT / ENGINEERING / AI</span>
          </span>
        </Link>
        <nav aria-label="Main navigation">
          <a href="/#work">
            <span>01</span> Work
          </a>
          <a href="/#lab">
            <span>02</span> Lab
          </a>
          <a href="/#about">
            <span>03</span> About
          </a>
          <a href="/#contact" className="nav-contact">
            Let’s talk <span aria-hidden="true">↗</span>
          </a>
        </nav>
      </div>
    </header>
  );
}
