import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FiArrowUpRight } from "react-icons/fi";


import Card from "../card/card";
import './socials-card.scss';

function SocialsCard() {
    return (
        <Card className='socials-card'>
            <Card.Title>
                Socials
            </Card.Title>
            <div className="socials-content-container">
                <div className="social-link-card github">
                    <div className="social-brand-content">
                        <FaGithub className="logo socials" />
                        <span className="social-name">Github</span>
                    </div>
                    <FiArrowUpRight className="arrow" />
                </div>
                <div className="social-link-card linkedin">
                    <div className="social-brand-content">
                        <FaLinkedin className="logo socials" />
                        <span className="social-name">LinkedIn</span>
                    </div>
                    <FiArrowUpRight className="arrow" />
                </div>
                {/* <div className="social-link-card">
                    <MdOutlineEmail className="logo socials" />
                    <span className="social-name">Email</span>
                </div> */}
            </div>
        </Card>
    );
}

export default SocialsCard;