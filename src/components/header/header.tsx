/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import './header.scss';

import React from 'react';

export default function Header() {
    const { width } = useWindowSize();

    const isMobile = width <= 640;
    const isLaptop = width >= 1024;

    return (
        <>
            <div className='header-container'>
                <div className='left-container'>
                    {/* todo: logo */}
                    <span>Gonçalo Miranda</span>
                </div>
                <div className='right-container'>
                </div>
            </div>
        </>
    );
}
