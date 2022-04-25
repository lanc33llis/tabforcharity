import { useUser } from '../lib/hooks'
import { useState, useRef, useEffect } from 'react'

import styles from '../styles/Dashboard.module.sass'

import Miner from './components/Miner'

const Dashboard = () => {
  const [user, { mutate }] = useUser()

  console.log(user)

  return (
    <div className={styles.container}>
      <Miner/>
      <h1>
        Hello, {user?.firstName}
      </h1>
      <h2>
        Check out your stats!
      </h2>
      <div className={styles.stats}>
        <div className={styles.left}>
          <h3>
            Total Hashes: {user?.totalMined}
          </h3>
          <h3>
            Total Time: {user?.timeMined}
          </h3>
          <h3>
            Estimated Donated Amount: {(user?.totalMined / 1000000 * user?.payout * user?.xmrToUsd).toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 10 })}
          </h3>
        </div>
      </div>
    </div>
  )
}

export default Dashboard