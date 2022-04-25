import Script from 'next/script'
import { useState, useEffect } from 'react'

import styles from '../../styles/Miner.module.sass'

// import { LinearGauge } from 'reaviz'

import dynamic from 'next/dynamic'

const Gauge = dynamic(() => import('react-gauge-capacity'), { ssr: false })

//implement this stuff and GUI now
//https://minero.cc/documentation/

const Miner = () => {
  const [miner, setMiner] = useState(null)
  const [jobs, setJobs] = useState(0)

  const [tick, setTick] = useState(0)

  const [HPS, setHPS] = useState(0)
  const [threads, setThreads] = useState(4)
  const [running, setRunning] = useState(true)

  const [btnText, setBtnText] = useState('Start')

  const [status, setStatus] = useState('Idle')

  useEffect(() => {
    const int = setInterval(() => {
      setTick(tick => tick + 1)
    }, 500)
  }, [])

  useEffect(() => {
    if (miner) {
      setHPS(HPS => miner.getHashesPerSecond())
      setThreads(threads => miner.getNumThreads())
      setRunning(running => miner.isRunning())
      if (running) {
        // implement user data stuff here
      }
    }
  }, [miner, tick, running])

  return (
    <>
      <Script src="https://minero.cc/lib/minero.min.js" onLoad={() => {
          var m = new Minero.Anonymous('213e1c621e06721da220bb002fd8a189');
          m.setNumThreads(threads)
          m.on("job", () => {
            setStatus('Mining')
          })
          m.stop()
          setMiner(miner => m)
      }}/>
      <Script src="/sailthru.js" onError={() => {
          const popup = document.createElement('div')
          popup.className = styles.popup
          const title = document.createElement('h3')
          title.innerText = 'Tab for Charity does not work with AdBlock'
          popup.appendChild(title)
          const text = document.createElement('p')
          text.innerText = 'Please disable AdBlock for this site.'
          popup.appendChild(text)
          document.body.appendChild(popup)
      }}/>
      <div className={styles.container}>
        <Gauge 
          viewBox="15 200 425 1" 
          contentWidth={450} 
          svgContainerWidth={450} 
          svgContainerHeight={450} 
          arrowValue={HPS / 13}
          ranges={[{start:0, end: 10}]}
          marks={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
          scaleDivisionNumber={10}
          radius={175}
          aperture={180}
          arrowColor="#f0ca00"
          className={styles.gauge}
        />
        <div className={styles.content}>
          <div className={styles.stats}>
            <p>
              Running: {running ? 'Yes' : 'No'}
            </p>
            <p>
              Threads: {threads}
            </p>
            <p>
              Hashes Per Second: {HPS.toLocaleString(undefined, {maximumFractionDigits: 2})}
            </p>
          </div>
          <div className={styles.settings}>
            <p>
              {status}
            </p>
            <button onClick={() => {
              if (miner) {
                if (running) {
                  miner.stop()
                  setBtnText('Start')
                  setStatus('Idle')
                } else {
                  miner.start()
                  setStatus('Looking for job')
                  setBtnText('Stop')
                }
              }
            }}>{btnText}</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Miner