import cloudflareLogo from './assets/Cloudflare_Logo.svg'

import './App.scss'
import Header from './components/header/header'
import { SiSpotify } from 'react-icons/si'
import Welcome from './pages/welcome/welcome'

function App() {
  return (
    <div className='content-container'>
      <Header />
      <Welcome />
    </div>
  )
}

export default App
