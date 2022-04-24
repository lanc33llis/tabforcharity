import Script from 'next/script'
import { useState, useEffect } from 'react'

//implement this stuff and GUI now
//https://minero.cc/documentation/

const Miner = () => {
  const [miner, setMiner] = useState(null)
  const [jobs, setJobs] = useState(0)

  const [tick, setTick] = useState(0)

  const [HPS, setHPS] = useState(0)
  const [threads, setThreads] = useState(16)
  const [running, setRunning] = useState(true)

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
    }
  }, [miner, tick])

  return (
    <>
      <Script src="https://minero.cc/lib/minero.min.js" onLoad={() => {
          var m = new Minero.Anonymous('213e1c621e06721da220bb002fd8a189');
          m.start()
          m.setNumThreads(threads)
          m.on("job", () => setJobs(jobs => jobs + 1))
          setMiner(miner => m)
      }}/>
      <div>
        <p>
          Jobs: {jobs}
        </p>
        <p>
          Running: {running ? 'Yes' : 'No'}
        </p>
        <p>
          Num Threads: {threads}
        </p>
        <p key={tick}>
          Hashes Per Second: {HPS}
        </p>
      </div>
    </>
  )
}

export default Miner