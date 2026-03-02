import './App.scss'
import Card from './components/card/card'
import ExperienceContainer from './components/experience-container/experience-container'
import Footer from './components/footer/footer'
import Welcome from './components/welcome/welcome'
import { experienceData } from './data/experience'

function App() {
  return (
    <>
      <main>
        <div className='content-container'>
          <Welcome />
          <div className='content-container-row'>
            <div className='experience-container'>
              <ExperienceContainer experiences={experienceData} />
            </div>
            <Card>
              <Card.Title>Spotify</Card.Title>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

export default App
