import Button from '../../components/button/button';
import Chip from '../../components/chip/chip';
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
                <Button textContent='Get in touch' />
                <Button textContent='View Experience' />
                <Button textContent='View Education' />
                <Button textContent='View Projects' />
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
            <Button className="travel-link" type='chip' minSizeActive={false}>
                <FaCaretDown className='icon' />
            </Button>
        </div>
    );
}
