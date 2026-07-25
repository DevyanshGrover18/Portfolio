import React, { useState, useEffect, useRef } from 'react';
import HeroSection from '../components/HeroSection';
import Navbar from '../components/Navbar';
import About from '../components/About';
import '../styles/home.css';
import Skills from '../components/Skills';
import Projects from '../components/Projects';
import Experience from '../components/Experience';
import Education from '../components/Education';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import GlobalBackground from '../components/GlobalBackground';

const Home = () => {

  return (
    <div>
      {/* Global Background */}
      <GlobalBackground/>
      {/* Content */}
      <Navbar/>
      <HeroSection/>
      <About/>
      <Skills/>
      <Projects/>
      <Experience/>
      <Education/>
      <Contact/>
      <Footer/>
    </div>
  );
};

export default Home;