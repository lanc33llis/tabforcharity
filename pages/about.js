import styles from '../styles/About.module.sass'

import Link from 'next/link'

const About = () => {

  return (
    <div className={styles.container}>
      <h1>
        About
      </h1>
      <p>
        Tab for Charity was first developed during the Longhorn Hack for Humanity 2022. 
        It&apos;s now developed in my freetime with intentions to turn the project
        open-source. It&apos;s built using Next.js using next-connect, passport,
        mongoose, and SWR. Mining services are provided by Minero with RandomX. 
        The project was built to provide an easy, simple way for people to help
        humanitarian causes.
      </p>
      <h2>
        Developer
      </h2>
      <p>
        I&apos;m Lance, a software engineer and web developer, and the creator of Tab for Charity.
        I have a heavy background in web design and development and an astronomy freshman at the
        University of Texas at Austin. You can check out my <Link href="https://github.com/lanc33llis" passHref><a>github</a></Link> and <Link href="https://www.lanc3.dev/"><a>personal site</a></Link> here.
      </p>
    </div>
  )
}

export default About