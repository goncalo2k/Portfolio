import { useState } from 'react'
import './App.scss'
import Header from './components/header/header'
import Contacts from './pages/contacts/contacts'
import Education from './pages/education/education'
import Experience from './pages/experience/experience'
import Extracurriculars from './pages/extracurriculars/extracurriculars'
import LandingIntro from './pages/landing/landing'
import Projects from './pages/projects/projects'
import Welcome from './pages/welcome/welcome'

function App() {
  const [introDone, setIntroDone] = useState(false);

  return (
    <>
      {!introDone && <LandingIntro onFinish={() => setIntroDone(true)} />}
      <main>
        <Header />
        <div className='content-container'>
          <Welcome />
          <Experience />
          <Education />
          <Projects />
          <Extracurriculars />
          <Contacts />
        </div>
      </main>
    </>
  )
}

export default App
