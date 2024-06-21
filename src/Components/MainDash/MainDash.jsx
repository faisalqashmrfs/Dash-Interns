import './MainDash.css'
import NavSidBar from '../NavSidBar/NavSidBar'
import MineSection from '../MineSection/MineSection'

export default function MainDash({ nAVbAR, setnAVbAR , version}) {

  const token = localStorage.getItem('token');
  // console.log(token);

  return (
    <section className='MainDashs'>
      <NavSidBar nAVbAR={nAVbAR} setnAVbAR={setnAVbAR}/>
      <MineSection nAVbAR={nAVbAR} version={version}/>
      <czxczxc />
      <zxczxczx />
    </section>
  )
}