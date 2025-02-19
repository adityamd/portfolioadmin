import React, { useContext, useEffect, useState } from 'react'
import Navlinks from '../components/Navlinks'
import Title from '../components/Title'
import Home from '../components/Home';
import About from '../components/About';
import Services from '../components/Services';
import Project from '../components/Project';
import Portfolio from '../components/Portfolio';
import Testimonials from '../components/Testimonials';
import Blog from '../components/Blog';
import Contact from '../components/Contact';
import Social from '../components/Social';
import { FieldContext } from '../context/FieldContext';
import Header from '../components/Header.jsx';

const Index = () => {
    
    const { getData, updateData } = useContext(FieldContext)

    useEffect( () => {
        getData();
    }, [])

    return (
        <div>
            <Header />
            <div className='container'>
                <Title title="Portfolio Admin" />
                <form className="contact">
                    <Navlinks />
                    <Home />
                    <About />
                    <Services />
                    <Project />
                    <Portfolio />
                    <Testimonials />
                    <Blog />
                    <Contact />
                    <Social />
                    <div className="sticky-bottom">
                        <div className="container smallBtn">
                            <button onClick={updateData}>Submit</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Index