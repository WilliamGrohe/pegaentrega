import '../styles/header.scss'

export function Header() {

  const nav = document.querySelector('#header nav')

  function heandleMenuToggle () {
    nav?.classList.toggle('show');
  }

  function heandleMenuClose(){
    nav?.classList.remove('show');
  }

  return (
    <header id="header">
      <nav className="container">
        <a className="logo" href="#home">pet<span>stop</span>.</a>
        <div className="menu">
          <ul className="grid">
            <li><a className="title" onClick={heandleMenuClose} href="#home">Início</a></li>
            <li><a className="title" onClick={heandleMenuClose} href="#about">Nova Entrega</a></li>
            <li><a className="title" onClick={heandleMenuClose} href="#services">Agenda</a></li>
            <li><a className="title" onClick={heandleMenuClose} href="#testemonials">...</a></li>
            <li><a className="title" onClick={heandleMenuClose} href="#contact">...</a></li>
          </ul>
        </div>
        <div className="toggle icon-menu" onClick={heandleMenuToggle}><i className="fas fa-bars"></i></div>
        <div className="toggle icon-cross" onClick={heandleMenuToggle}><i className="fas fa-times"></i></div>
      </nav>
    </header>
  );
}