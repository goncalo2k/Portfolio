import './App.scss'
import Header from './components/header/header'
import Contacts from './pages/contacts/contacts'
import Education from './pages/education/education'
import Experience from './pages/experience/experience'
import Extracurriculars from './pages/extracurriculars/extracurriculars'
import Projects from './pages/projects/projects'
import Welcome from './pages/welcome/welcome'

function App() {
  return (
    <>
      <Header />
      <div className='content-container'>
        <Welcome />
        <Experience />
        <Education />
        <Projects />
        <Extracurriculars />
        <Contacts />
      </div>
    </>
  )
}

export default App
