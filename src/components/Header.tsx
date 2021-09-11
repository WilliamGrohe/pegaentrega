import '../styles/header.scss'

/* abrir e esconder o menu toggle/hamburguer */
// const nav = document.querySelector('#header nav')
// const toggle = document.querySelectorAll('nav .toggle')

// function heandleMenuToggle() {
//   for (let element of toggle) {

//     element.addEventListener('onClick', () => {
//       nav.classList.toggle('show')
//     })
//   }
// }

// for (let element of toggle) {
//   element.addEventListener('click', () => {
//     nav.classList.toggle('show')
//   })
// }

export function Header() {

  const nav = document.querySelector('#header nav')

  function heandleMenuOpen() {
    if(!nav?.classList.contains('show')){
      nav?.classList.add('show');
    } 
  }

  function heandleMenuClose() {
    if(nav?.classList.contains('show')){
      nav?.classList.remove('show');
    } 
  }

  return (
    <header id="header">
      <nav className="container">
        <a className="logo" href="#home">pet<span>stop</span>.</a>
        <div className="menu">
          <ul className="grid">
            <li><a className="title" href="#home">Início</a></li>
            <li><a className="title" href="#about">Sobre</a></li>
            <li><a className="title" href="#services">Serviços</a></li>
            <li><a className="title" href="#testemonials">Depoimentos</a></li>
            <li><a className="title" href="#contact">Contato</a></li>
          </ul>
        </div>
        <div className="toggle icon-menu" onClick={heandleMenuOpen}><i className="fas fa-bars"></i></div>
        <div className="toggle icon-cross" onClick={heandleMenuClose}><i className="fas fa-times"></i></div>
      </nav>
    </header>
  );
}