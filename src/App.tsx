import './App.scss'

import ExperienceContainer from './components/experience-container/experience-container'
import Footer from './components/footer/footer'
import SocialsCard from './components/socials-card/socials-card'
import SpotifyCard from './components/spotify-card/spotify-card'
import Welcome from './components/welcome/welcome'
import { experienceData } from './data/experience'
import useSpotifyWebhookSubscription from './hooks/useSpotifyWebhookSubscription'


function App() {
  useSpotifyWebhookSubscription();
  return (
    <>
      <main>
        <div className='content-container'>
          <Welcome />
          <div className='content-container-row'>
            <div className='experience-container'>
              <ExperienceContainer experiences={experienceData} />
            </div>
            <div className='extra-content-container'>
              <SpotifyCard />
              <SocialsCard />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

export default App
