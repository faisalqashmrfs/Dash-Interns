import { IoMdArrowRoundBack } from 'react-icons/io'
import { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import NavSidBar from '../NavSidBar/NavSidBar'

export default function Addcoachs({ nAVbAR, setnAVbAR , versionid}) {

  const token = localStorage.getItem('token');

  const [name, setname] = useState('')
  const [namex, setnamex] = useState('')
  const [specialization, setSspecialization] = useState('')
  const [type, settype] = useState('Host')
  const [version_intern_id, setversion_intern_id] = useState('')

  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  function HandelName(e) {
    setname(e.target.value)
  }

  function Handelspecialization(e) {
    setSspecialization(e.target.value)
  }

  function Handeltype(e) {
    settype(e.target.value)
  }

  function Handelversion_intern_id(e) {
    setversion_intern_id(e.target.value)
  }

  const fetchData = async () => {
    try {
      const headers = {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
      };

      const body = {
        name: name,
        specialization: specialization,
        type: type,
        version_intern_id: version_intern_id,
      };

      console.log(body , token);

      const result = await axios.post('https://test.black-analysis-solutions.com/api/coachs', body, { headers });
    } catch (error) {
      setError(error);
    }
  };

  setTimeout(() => {
    setversion_intern_id(versionid.id)
    setnamex(versionid.name)
}, 100);

  return (
    <section>
      <NavSidBar nAVbAR={nAVbAR} setnAVbAR={setnAVbAR} />
      <section className={!nAVbAR ? 'AddUser' : 'AddUser-off'}>
        <Link
          to={'/MainDash/Coachs'}
          className={nAVbAR ? 'Back-form' : 'Back-form-off'}
        >
          <IoMdArrowRoundBack />
          Back
        </Link>
        <div className='Form-AddUser'>
          <div className='FormIntern'>
            <form action="">
              <div>
                <label htmlFor="">Name :</label>
                <input type="text" value={name} onChange={HandelName} />
              </div>
              <div>
                <label htmlFor="">specialization :</label>
                <input type="text" value={specialization} onChange={Handelspecialization} />
              </div>
              <div>
                <label htmlFor="">type :</label>
                <input type="text" value={type} onChange={Handeltype} />
              </div>
              <div>
                <label htmlFor="">version_intern_id : ({namex})</label>
                <input type="text" value={version_intern_id} onChange={Handelversion_intern_id} />
              </div>
            </form>
            <button className='Submite' onClick={fetchData}>Save</button>
          </div>
        </div>
      </section>
    </section>
  )
}
