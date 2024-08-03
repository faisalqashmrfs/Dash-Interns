import './MainDash.css'
import NavSidBar from '../NavSidBar/NavSidBar'
import MineSection from '../MineSection/MineSection'
import { useEffect } from 'react';

export default function MainDash({ nAVbAR, setnAVbAR , version,coachs}) {

  const token = localStorage.getItem('token');

  return (
    <section className='MainDashs'>
      <NavSidBar nAVbAR={nAVbAR} setnAVbAR={setnAVbAR}/>
      <MineSection nAVbAR={nAVbAR} version={version}coachs={coachs}/>
    </section>
  )
}