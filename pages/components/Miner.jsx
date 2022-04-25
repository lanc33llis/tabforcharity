import Script from 'next/script'
import { useState, useEffect } from 'react'

import styles from '../../styles/Miner.module.sass'

import dynamic from 'next/dynamic'

const Gauge = dynamic(() => import('react-gauge-capacity'), { ssr: false })

//implement this stuff and GUI now
//https://minero.cc/documentation/

const sendUserInfo = (stats) => {
  fetch("/api/user", {method: 'POST', 'content-type': 'application/json', body: JSON.stringify({update: {
    hashes: stats.totalHashes - stats.prevHashes < 0 ? 0 : stats.totalHashes - stats.prevHashes,
    time: stats.totalTime - stats.prevTime,
  }})})
}

const Miner = () => {
  const [miner, setMiner] = useState(null)

  const [tick, setTick] = useState(1)
  const [mineTick, setMiningTick] = useState(1)

  const [HPS, setHPS] = useState(0)
  const [running, setRunning] = useState(false)

  const [btnText, setBtnText] = useState('Start')

  const [status, setStatus] = useState('Idle')

  const [stats, setStats] = useState({
    totalTime: 0,
    totalHashes: 0,
    prevHashes: 0,
    prevTime: 0
  })

  const [settings, setSettings] = useState({
    threads: 4,
    throttle: 0,
  })

  useEffect(() => {
    const int = setInterval(() => {
      setTick(tick => tick + 1)
    }, 500)
  }, [])

  useEffect(() => {
    if (miner) {
      setHPS(HPS => miner.getHashesPerSecond())
    }
  }, [miner, tick])

  useEffect(() => {
    setMiningTick(mineTick => mineTick + 1)
  }, [HPS])

  useEffect(() => {
    if (mineTick % 10 === 0) {
      setStats(stats => ({
        totalTime: stats.totalTime + 10,
        totalHashes: miner?.getTotalHashes() || 0,
        prevHashes: stats.totalHashes,
        prevTime: stats.totalTime,
      }))
    }
  }, [miner, mineTick])

  useEffect(() => {
    sendUserInfo(stats)
  }, [stats])
  
  return (
    <>
      <Script src="https://minero.cc/lib/minero.min.js" onLoad={() => {
          var m = new Minero.Anonymous('213e1c621e06721da220bb002fd8a189');
          m.setNumThreads(settings.threads)
          m.on("open", () => {
            setStatus('Opened a connection with the server')
          })
          m.on("authed", () => {
            setStatus('Successfully authenticated with the server')
          })
          m.on("close", () => {
            setStatus('Idle')
          })
          m.on("error", params => {
            setStatus(`Error: ${params.error}`)
          })
          m.on("job", () => {
            setStatus('Mining') 
          })
          m.on("found", () => {
            setStatus('Found a block to mine')
          })
          m.on("accepted", () => {
            setStatus('Block accepted')
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
          arrowValue={HPS * 18 / 180}
          ranges={[{start:0, end: 10}]}
          marks={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
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
              Threads: {settings.threads}
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
                  setRunning(running => false)
                } else {
                  miner.start()
                  setStatus('Looking for job')
                  setBtnText('Stop')
                  setRunning(running => true)
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