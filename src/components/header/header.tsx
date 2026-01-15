import './header.scss';
import { useState } from 'react';
import { FaHome, FaBriefcase, FaGraduationCap, FaCode, FaEnvelope, FaBars, FaTimes } from 'react-icons/fa';

type HeaderProps = {
    children?: React.ReactNode;
};

export default function Header(props: HeaderProps) {
    const navItems = [
        { label: 'Home', icon: FaHome, href: '#home' },
        { label: 'Experience', icon: FaBriefcase, href: '#experience' },
        { label: 'Education', icon: FaGraduationCap, href: '#education' },
        { label: 'Projects', icon: FaCode, href: '#projects' },
        { label: 'Contacts', icon: FaEnvelope, href: '#contacts' }
    ];

    return (
        <>
            <div className='header-container'>
                <div className='nav-items'>
                    {navItems.map((item) => (
                        <a key={item.label} href={item.href} className='label link'>
                            <span className='desktop-label'>{item.label}</span>
                            <span className='mobile-label'>
                                <item.icon />
                            </span>
                        </a>
                    ))}
                </div>
                {props.children}
            </div>
        </>
    );
}
