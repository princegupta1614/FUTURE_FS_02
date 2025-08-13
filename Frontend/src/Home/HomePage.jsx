import React from 'react'
import Features from './Features'
import HeroSection from './HeroSection'

function HomePage() {

    document.title = "Home - E-commerce App";

    return (
        <div>
            <HeroSection />
            <Features />
        </div>
    )
}

export default HomePage
