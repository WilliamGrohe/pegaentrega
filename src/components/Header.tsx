import { Link } from 'react-router-dom';

import { useAuth } from '../hooks/useAuth'

import '../styles/header.scss'

export function Header() {
  const { user, handleSignOut } = useAuth();

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
        <a className="logo" href="#home">pega<span>entrega</span>.</a>
        <div className="menu">
          <ul className="grid">
            <li><a className="title" onClick={heandleMenuClose} href="#home">Início</a></li>
            <li><a className="title" onClick={heandleMenuClose} href="#about">Nova Entrega</a></li>
            <li><a className="title" onClick={heandleMenuClose} href="#services">Agenda</a></li>
            <li><a className="title" onClick={heandleMenuClose} href="#testemonials">...</a></li>
          </ul>
          <div className="userSection">
            <h4>{user?.name}</h4> 
            <h5>{user?.email}</h5>
            <Link to="/" onClick={handleSignOut}>Logout</Link>
          </div>
        </div>
        
        <div className="toggle icon-menu" onClick={heandleMenuToggle}><i className="fas fa-bars"></i></div>
        <div className="toggle icon-cross" onClick={heandleMenuToggle}><i className="fas fa-times"></i></div>
      </nav>
    </header>
  );
}