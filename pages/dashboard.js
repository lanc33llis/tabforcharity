import { useUser } from '../lib/hooks'
import { useState, useRef, useEffect } from 'react'

import styles from '../styles/Dashboard.module.sass'

import Miner from './components/Miner'

const Dashboard = ({ payout, xmrToUsd }) => {
  const [user, { mutate }] = useUser()

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
          <p>
            Total Hashes: {user?.totalMined}
          </p>
          <p>
            Total Time: {user?.timeMined}
          </p>
          <p>
            Estimated Donated Amount: {(user?.totalMined / 1000000 * payout * xmrToUsd).toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 10 })}
          </p>
        </div>
      </div>
    </div>
  )
}

export async function getStaticProps (context) {
  const mineroApiRes = await fetch('https://api.minero.cc/stats/payout?secret=e21db08b6957edf74b227866351a978c')
  const data  = await mineroApiRes.json()
  const payout = data.payoutPer1MHashes
  const xmrToUsd = data.xmrToUsd

  return {
    props: {
      payout,
      xmrToUsd
    },
    revalidate: 60 * 60 * 8 // 8hrs
  }
}

export default Dashboard