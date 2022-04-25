import { useUser } from '../lib/hooks'
import { useState, useRef, useEffect } from 'react'

import styles from '../styles/Dashboard.module.sass'

import Miner from './components/Miner'

const Dashboard = () => {
  const [user, { mutate }] = useUser()

  return (
    <div className={styles.container}>
      <Miner/>
      <h1>
        Hello, {user?.name}
      </h1>
    </div>
  )
}

export default Dashboard