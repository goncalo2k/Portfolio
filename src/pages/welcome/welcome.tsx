import Button from '../../components/button/button';
import Chip from '../../components/chip/chip';
import { scrollToId } from '../../utils/utils';
import './welcome.scss';
import { FaCaretDown, FaGithub, FaLinkedin } from 'react-icons/fa';
import { HiOutlineMail } from 'react-icons/hi';

export default function Welcome() {
    return (
        <div id='home' className='welcome-container'>
            <Chip text='Welcome to my portfolio' />
            <h1 className='title name-label'>Gonçalo Miranda</h1>
            <span className='sub-title'>Software Engineer</span>
            <span className='text secondary'>Crafting beautiful, user-centric web experiences with modern
                technologies. Passionate about clean code, intuitive design, and solving
                complex problems.</span>
            <div className='multi-button-container'>
                <Button minSizeActive={false} textContent='Get in touch' onClick={() => scrollToId('contacts')} />
                <Button minSizeActive={false} textContent='View Experience' onClick={() => scrollToId('experience')} />
                <Button minSizeActive={false} textContent='View Education' onClick={() => scrollToId('education')} />
                <Button minSizeActive={false} textContent='View Extracurriculars' onClick={() => scrollToId('extracurriculars')} />
                <Button minSizeActive={false} textContent='View Projects' onClick={() => scrollToId('projects')} />
            </div>

            <div className='multi-chip-container'>
                <Button type='chip' minSizeActive={false} href='https://github.com/goncalo2k'>
                    <FaGithub className='icon' />
                </Button>
                <Button type='chip' minSizeActive={false} href='https://www.linkedin.com/in/goncalogmiranda/'>
                    <FaLinkedin className='icon' />
                </Button>
                <Button type='chip' minSizeActive={false} href='mailto:goncalo.miranda.cplx@gmail.com'>
                    <HiOutlineMail className='icon' />
                </Button>
            </div>
            <div className='bottom-container'>
                <Button className="travel-link" type='chip' minSizeActive={false} onClick={() => scrollToId('experience')}>
                    <FaCaretDown className='icon' />
                </Button>
            </div>

        </div>
    );
}
