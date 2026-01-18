import { scrollToId } from '../../utils/utils';
import './header.scss';
import { FaHome, FaBriefcase, FaGraduationCap, FaCode } from 'react-icons/fa';
import { useState, useEffect, useRef } from 'react';
import { IoIosSend } from 'react-icons/io';

type HeaderProps = {
    children?: React.ReactNode;
};

export default function Header(props: HeaderProps) {
    const [activeSection, setActiveSection] = useState('home');
    const observerRef = useRef<IntersectionObserver | null>(null);

    const navItems = [
        { label: 'Home', icon: FaHome, href: 'home' },
        { label: 'Experience', icon: FaBriefcase, href: 'experience' },
        { label: 'Education', icon: FaGraduationCap, href: 'education' },
        { label: 'Projects', icon: FaCode, href: 'projects' },
        { label: 'Extracurriculars', icon: FaGraduationCap, href: 'extracurriculars' },
        { label: 'Contacts', icon: IoIosSend, href: 'contacts' }
    ];

    useEffect(() => {
        const sections = navItems.map(item => document.getElementById(item.href));

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            {
                rootMargin: '-80px 0px -5% 0px',
                threshold: 0.1
            }
        );

        sections.forEach(section => {
            if (section) observer.observe(section);
        });

        observerRef.current = observer;

        return () => {
            if (observerRef.current) {
                sections.forEach(section => {
                    if (section) observerRef.current!.unobserve(section);
                });
            }
        };
    }, []);

    return (
        activeSection !== 'home' && <div className='header-container'>
            <div className='nav-items'>
                {navItems.map((item) => (
                    <div
                        key={item.label}
                        className={`label link ${activeSection === item.href ? 'active' : ''}`}
                        onClick={() => scrollToId(item.href)}
                    >
                        <span className='desktop-label'>{item.label}</span>
                        <span className='mobile-label'>
                            <item.icon />
                        </span>
                    </div>
                ))}
            </div>
            {props.children}
        </div>
    );
}
