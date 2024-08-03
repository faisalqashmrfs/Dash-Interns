import { IoMdArrowRoundBack } from 'react-icons/io'
import { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import NavSidBar from '../NavSidBar/NavSidBar'
import { ClimbingBoxLoader } from 'react-spinners'

export default function Addcoachs({ nAVbAR, setnAVbAR, versionid }) {

  const token = localStorage.getItem('token');

  const [name, setname] = useState('')
  const [namex, setnamex] = useState('')
  const [specialization, setSspecialization] = useState('')
  const [type, settype] = useState('Host')
  const [version_intern_id, setversion_intern_id] = useState('')
  const [looder, setlooder] = useState(false)

  const [showError, setShowError] = useState(false);
  const [showSuccess, setshowSuccess] = useState(false);
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

  const allFieldsFilled = () => {
    return name && specialization;
};

  const fetchData = async () => {

    if (!allFieldsFilled()) {
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
      return;
    }
    setlooder(true)
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

      console.log(body, token);

      const result = await axios.post('https://internships.focal-x.com/api/coachs', body, { headers });
      setlooder(false)
      setshowSuccess(true);
      setTimeout(() => setshowSuccess(false), 3000);
    } catch (error) {
      setError(error);
      setlooder(false)
      setshowSuccess(true);
      setTimeout(() => setshowSuccess(false), 3000);
    }
  };

  setTimeout(() => {
    setversion_intern_id(versionid.id)
    setnamex(versionid.name)
  }, 100);

  return (
    <section>
      {looder ?
        <div className='Looder-Geniral'>
          Loading <span></span>
        </div>
        :
        ''
      }
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
            {showError && <div className="error-message"><span>الرجاء ملء جميع الحقول</span></div>}
            {showSuccess && <div className="success-message"><span>تم بيانات حفظ المدرب بنجاح</span></div>}
          </div>
        </div>
      </section>
    </section>
  )
}
