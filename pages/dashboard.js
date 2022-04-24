import { useUser } from '../lib/hooks'
import { useState, useRef, useEffect } from 'react'

import styles from '../styles/Dashboard.module.sass'

import Miner from './components/Miner'

const Dashboard = () => {
  const [user, { mutate }] = useUser()

  return (
    <div className={styles.container}>
      <Miner/>
    </div>
  )
}

export default Dashboard