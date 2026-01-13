import cloudflareLogo from './assets/Cloudflare_Logo.svg'
import profilePicture from './assets/pfp.jpg'

import './App.scss'
import Header from './components/header/header'

function App() {
  return (
    <>
      <Header />
      <div>
        <a href='https://workers.cloudflare.com/' target='_blank'>
          <img src={cloudflareLogo} className='logo cloudflare' alt='Cloudflare logo' />
        </a>
      </div>
      <h1>Gonçalo Miranda</h1>
    </>
  )
}

export default App
