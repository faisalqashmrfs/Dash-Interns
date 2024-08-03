import { IoMdArrowRoundBack } from 'react-icons/io'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useNavigate, useParams } from 'react-router-dom'
import NavSidBar from '../NavSidBar/NavSidBar'
import { ClimbingBoxLoader } from 'react-spinners'

export default function EditCoach({ nAVbAR, setnAVbAR, versionid, coachs }) {

  const { id } = useParams();

  const token = localStorage.getItem('token');
  const [name, setname] = useState('')
  const [namex, setnamex] = useState('')
  const [specialization, setSspecialization] = useState('')
  const [type, settype] = useState('Host')
  const [version_intern_id, setversion_intern_id] = useState('')
  const [looder, setlooder] = useState(false)

  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [Data, setData] = useState([]);

  useEffect(() => {
    setlooder(true)
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`https://internships.focal-x.com/api/coachs/${id}`,
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            }
          }
        );
        setData(response.data);
        console.log(response.data);
        setlooder(false)
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchUsers();
  }, []);

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
    if (!name || !specialization || !type || !version_intern_id) {
      setError('All fields are required.');
      setTimeout(() => setError(null), 3000); // Hide error after 3 seconds
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

      const result = await axios.put(`https://internships.focal-x.com/api/coachs/${id}`, body, { headers });;
      setResponse('Version saved successfully.');
      setTimeout(() => setResponse(null), 3000); // Hide response after 3 seconds
      setlooder(false)
    } catch (error) {
      setlooder(false);
      setError('An error occurred while saving the version.');
      setTimeout(() => setError(null), 3000); // Hide error after 3 seconds
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setversion_intern_id(versionid.id)
      setnamex(versionid.name)
      setname(Data.name)
      setSspecialization(Data.specialization)
    }, 1000);
  }, [Data])

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
      {
        Data ?
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
                {response && <div className='success-message'><span>تم حفظ الطلب</span></div>}
                {error && <div className='error-message'><span>الرجاء ملء جميع الحقول</span></div>}
              </div>
            </div>
          </section>
          :
          <></>
      }
    </section>
  )
}

