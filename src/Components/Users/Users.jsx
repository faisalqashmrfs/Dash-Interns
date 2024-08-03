import './Users.css'
import NavSidBar from '../NavSidBar/NavSidBar'
import UsersSection from '../UsersSection/UsersSection'

export default function Users({nAVbAR , setnAVbAR}) {

  return (
    <section className='MainDashs'>
        <NavSidBar nAVbAR={nAVbAR} setnAVbAR={setnAVbAR}/>
        <UsersSection nAVbAR={nAVbAR}/>
    </section>
  )
}
