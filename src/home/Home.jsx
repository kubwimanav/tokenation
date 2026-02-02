import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';

const HomeLayout = () => {
    return (
        <div>
            <Navbar />
            <Hero />
            <Services />
            <About />
            <Contact />
            <Footer />
        </div>
    );
};

export default HomeLayout;