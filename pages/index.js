import styles from '../styles/Index.module.sass'

import Image from 'next/image'

import { useState, useEffect } from 'react'

import AnimatedText from 'react-animated-text-content'

const hcs = [
  "Ukraine.",
  "Climate Change.",
  "World Hunger.", 
  "Refugees.",
  "Humanity."
]

const Index = () => {
  const [i, setI] = useState(0)

  useEffect(() => {
    const int = setInterval(() => {
      setI(i => (i + 1) % hcs.length)
    }, 1500)
    return () => clearInterval(int)
  }, [])

  return (
    <div className={styles.container}>
      <div className={styles.hero}>
        <div className={styles.left}>
          <h1>
            The tab built for <span className={styles.highlight}>humanity.</span>
          </h1>
          <h1>
            Crypto for&nbsp;
            <AnimatedText 
              type="words"
              animationType='fadeIn'
              animationDuration={1000}
              animationDelay={0}
              className={styles.ai}
            >
              {hcs[i]}
            </AnimatedText>
          </h1>
          <h2>
            Use your idle tabs to donate to charity by mining crypto.
          </h2>
        </div>
        <div className={styles.right}>
          <div className={styles["right-bg"]} />
        </div>
      </div>
      <div className={styles.content}>
        <h3>
          How does it work?
        </h3>
        <p>
          Tab for Charity(TAC) mines crypto in your browser your CPU is idling.
          TAC mines monero, a privacy-focused cryptocurrency, to donate directly to 
          non-profits while keeping your information private and discrete. 
        </p>
      </div>
    </div>
  )
}

export default Index