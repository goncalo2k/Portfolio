import './App.scss'
import Header from './components/header/header'
import Contacts from './pages/contacts/contacts'
import Education from './pages/education/education'
import Experience from './pages/experience/experience'
import Projects from './pages/projects/projects'
import Welcome from './pages/welcome/welcome'

function App() {
  return (
    <div className='content-container'>
      <Header />
      <Welcome />
      <Experience />
      <Education />
      <Projects />
      <Contacts />
    </div>
  )
}

export default App
