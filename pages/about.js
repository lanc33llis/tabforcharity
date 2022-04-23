import styles from '../styles/About.module.sass'

import Image from 'next/image'

import { useState, useEffect } from 'react'

import AnimatedText from 'react-animated-text-content'
import React from 'react';
import Style from 'style-it';
import { render } from 'react-dom';

const hcs = [
  "Ukraine.",
  "Climate Change.",
  "World Hunger.", 
  "Refugees.",
  "Humanity."
]

const About = () => {
  const [i, setI] = useState(0)

  useEffect(() => {
    const int = setInterval(() => {
      setI(i => (i + 1) % hcs.length)
    }, 1500)
    return () => clearInterval(int)
  }, [])

  return (
    <div className={styles.container}>

      <div className={styles.about}>
        <h1>
          About
        </h1>
        <p>
          Tab for charity is a website used to mine and donate crypto currency
          to causes all over the world. 
          </p>
          <p>
          Crypto is getting more and more popular everyday.
          </p>
          <p>
          Now is the time to seize this opportunity and use it to change the world.
          </p>
          <p>
            Click on start donating to register and keep up with your mining! 
          </p>
        
      </div>
    <div className={styles.codeInfo}>
      <h2>
        Language used to create this
      </h2> 
    </div>
    <div className={styles.devInfo}>
      <h2>
        Dev Info
      </h2>
    </div>
    </div>
    
   
  )
}

export default About