import { IoMdArrowRoundBack } from 'react-icons/io'
import { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import NavSidBar from '../NavSidBar/NavSidBar'
import { ClimbingBoxLoader } from 'react-spinners'

export default function AddVersion({ nAVbAR, setnAVbAR }) {

  const token = localStorage.getItem('token');

  const [name, setname] = useState('')
  const [StartData, setStartData] = useState('')
  const [EndData, setEndData] = useState('')
  const [looder, setlooder] = useState(false)

  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  function HandelName(e) {
    setname(e.target.value)
  }

  function HandelStartData(e) {
    setStartData(e.target.value)
  }

  function HandelEndData(e) {
    setEndData(e.target.value)
  }

  const fetchData = async () => {
    setlooder(true)
    try {
      const headers = {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
      };

      const body = {
        name: name,
        startDate: StartData,
        endDate: EndData,
      };

      console.log(body , token);

      const result = await axios.post('https://test.black-analysis-solutions.com/api/version', body, { headers });
      setlooder(false)
    } catch (error) {
      setError(error);
    }
  };

  
  return (
    <section>
      {looder ?
                <div className='Looder-Geniral'>
                    <ClimbingBoxLoader color="#FF8500" size={20} />
                </div>
                :
                ''
            }
      <NavSidBar nAVbAR={nAVbAR} setnAVbAR={setnAVbAR} />
      <section className={!nAVbAR ? 'AddUser' : 'AddUser-off'}>
        <Link
          to={'/MainDash/version'}
          className={nAVbAR ? 'Back-form' : 'Back-form-off'}
        >
          <IoMdArrowRoundBack />
          Back
        </Link>
        <div className='Form-AddUser'>
          <div className='FormIntern'>
            <form action="">
              <div>
                <label htmlFor="">Name</label>
                <input type="text" value={name} onChange={HandelName} />
              </div>
              <div>
                <label htmlFor="">Start Data :</label>
                <input type="Date" value={StartData} onChange={HandelStartData} />
              </div>
              <div>
                <label htmlFor="">End Data :</label>
                <input type="Date" value={EndData} onChange={HandelEndData} />
              </div>
            </form>
            <button className='Submite' onClick={fetchData}>Save</button>
          </div>
        </div>
      </section>
    </section>
  )
}
