import { Header } from "../components/Header"

import '../styles/home.scss'

export function Home() {
  return (
    <>
      <Header />
      <main>
        <div className="teste">
          <img src="https://i.imgur.com/m1RlnWR.jpg" alt="" />
        </div>
        <h1>Hello World!</h1>
      </main>
    </>
  );
}