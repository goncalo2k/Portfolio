import Button from '../../components/button/button';
import Chip from '../../components/chip/chip';
import './welcome.scss';

export default function Welcome() {
    return (
        <div className='welcome-container'>
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
        </div>
    );
}
