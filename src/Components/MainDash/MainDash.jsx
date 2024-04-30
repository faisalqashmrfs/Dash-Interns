import './MainDash.css'
import NavSidBar from '../NavSidBar/NavSidBar'
import MineSection from '../MineSection/MineSection'

export default function MainDash({nAVbAR , setnAVbAR}) {

  return (
    <section className='MainDashs'>
        <NavSidBar nAVbAR={nAVbAR} setnAVbAR={setnAVbAR}/>
        <MineSection nAVbAR={nAVbAR}/>
    </section>
  )
}
