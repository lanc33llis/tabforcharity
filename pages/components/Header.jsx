import Image from 'next/image'
import Link from 'next/link'

import styles from '../../styles/Header.module.sass'

const Header = () => {
  return (
    <div className={styles.container}>
      <header>
        <nav>
          <Link href="/" passhref>
            <a>
              <Image src="/TabForCharityLogoWhite.svg" height={50} width={150} alt="logo"/>
            </a>
          </Link>
          <div style={{flexGrow: 1}}/>
          <div className={styles.links}>
            <Link href="/about" passhref>
              <a>
                About
              </a>
            </Link>
            <Link href="/faq" passhref>
              <a>
                FAQ
              </a>
            </Link>
            <Link href="/api/login" passhref>
              <a className={styles["dashboard-link"]} >
                Start Donating
              </a>
            </Link>
          </div>
        </nav>
      </header>
    </div>
  )
}

export default Header