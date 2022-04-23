import styles from '../styles/Faq.module.sass'

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

const Faq = () => {
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
      <div className={styles.faq}>
        <h3>
        Frequently Asked Questions 
        </h3>
        <h4 class = "faq-heading">FAQ'S</h4>
        <section class = "faq-container">
            <div class="faq-one">
                <h4 class = "faq-page">What is TAC?</h4>
                <div class="faq-body">
                    <p>TAC is a website used to mine crypto for donations.</p>
                </div>
                </div>
                </section>
        <p>
        </p>
      </div>
    </div>
  )
}

export default Faq