import styles from '../styles/Faq.module.sass'

import Image from 'next/image'

import { useState, useEffect } from 'react'

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
     <h1> 
       FAQ 
     </h1>
     <div className={styles.questions}>
       <div className={styles.question1}>
       <p>
         Would mining crypto make my electric bill sky rocket? 
       </p>
       </div>
       <div className={styles.question2}>
         <p>
           Does this website keep a percentage of the donations? 
         </p>
       </div>
       <div className={styles.question3}>
         <p>
           Why do I need to sign up to donate? 
         </p>
       </div>
       <div className={styles.question4}>
         <p>
          What if I do not have a crypto wallet? 
           </p>
       </div>    
     </div>
      
    </div>
    
 
    
  )
}

export default Faq