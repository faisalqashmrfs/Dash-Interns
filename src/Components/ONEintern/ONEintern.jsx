import { IoMdArrowRoundBack } from 'react-icons/io'
import NavSidBar from '../NavSidBar/NavSidBar'
import './ONEintern.css'
import { Link } from 'react-router-dom'

export default function ONEintern({ nAVbAR, setnAVbAR }) {

  return (
    <section>
      <NavSidBar nAVbAR={nAVbAR} setnAVbAR={setnAVbAR} />
      <section className={nAVbAR ? 'DataIntern-off' : 'DataIntern'}>
        <Link
          to={'/MainDash'}
          className={nAVbAR ? 'Back-form' : 'Back-form-off'}
        >
          <IoMdArrowRoundBack />
          Back
        </Link>

        <div className='Body-info'>
          <div className='one-info'>
            <h3>Name :</h3>
            <p>test@test.com</p>
          </div>
          <div className='one-info'>
            <h3>ID-Certificate :</h3>
            <p>test@test.com</p>
          </div>
          <div className='one-info'>
            <h3>KPI :</h3>
            <p>test@test.com</p>
          </div>
          <div className='one-info'>
            <h3>E-mail : </h3>
            <p> test@test.com</p>
          </div>
          <div className='one-info'>
            <h3>Specilization :</h3>
            <p>test@test.com</p>
          </div>
          <div className='one-info'>
            <h3>Address :</h3>
            <p>test@test.com</p>
          </div>
          <div className='one-info'>
            <h3>Supervisor :</h3>
            <p>test@test.com</p>
          </div>
          <div className='one-info'>
            <h3>Certificate Type :</h3>
            <p>test@test.com</p>
          </div>
          <div className='one-info'>
            <h3>Start Data :</h3>
            <p>test@test.com</p>
          </div>
          <div className='one-info'>
            <h3>End Data :</h3>
            <p>test@test.com</p>
          </div>
        </div>
        <div className='Controle-Certificate'>
          <button>شهادة إتمام تدريب</button>
          <button>شهادة تخرج</button>
          <button>رسالة توصية</button>
        </div>
      </section>
    </section>
  )
}
