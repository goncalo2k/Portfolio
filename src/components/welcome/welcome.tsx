import './welcome.scss';

export default function Welcome() {
    return (
        <div id='home' className='welcome-container'>
            <div className='hero-container'>
                <div className='hero-text-container'>
                    <div><span className='sub-title'>Hey! I'm </span> <span className='sub-title name-label'>Gonçalo</span><span className='sub-title'>!</span></div>
                    <span className='text'>Building all the time, taking pictures occasionaly.</span>
                    <span className='text secondary'>Software Engineer @ Deloitte</span>
                </div>
                <img className="avatar" src="pfp.jpg" alt="" />
            </div>
        </div>
    );
}
