import styles from "../styles/Login.module.sass"

import Image from "next/image"
import Link from "next/link"

const Login = () => {
  return (
    <div className={styles.container}>
      <h1>
        Login with:
      </h1>
      <Link href="/api/login" passhref>
        <a>
          <div className={styles.link}>
            <Image src="/btn_google.svg" width={36} height={36} alt="Google signin"/>
            <span>
              Google
            </span>
          </div>
        </a>
      </Link>
    </div>
  )
}

export default Login