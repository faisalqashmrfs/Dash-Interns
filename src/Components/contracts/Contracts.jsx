import Contract from '../Contract/Contract.jsx'
import NavSidBar from '../NavSidBar/NavSidBar.jsx'

export default function Contracts({ nAVbAR , setnAVbAR , version}) {
  return (
    <section className='MainDashs'>
      <NavSidBar nAVbAR={nAVbAR} setnAVbAR={setnAVbAR}/>
      <Contract nAVbAR={nAVbAR} version={version}/>
    </section>
  )
}
