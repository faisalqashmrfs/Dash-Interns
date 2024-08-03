import { IoMdArrowRoundBack } from 'react-icons/io';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import NavSidBar from '../NavSidBar/NavSidBar';
import { ClimbingBoxLoader } from 'react-spinners';

export default function AddVersion({ nAVbAR, setnAVbAR }) {
  const token = localStorage.getItem('token');

  const [name, setname] = useState('');
  const [StartData, setStartData] = useState('');
  const [EndData, setEndData] = useState('');
  const [looder, setlooder] = useState(false);

  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  function HandelName(e) {
    setname(e.target.value);
  }

  function HandelStartData(e) {
    setStartData(e.target.value);
  }

  function HandelEndData(e) {
    setEndData(e.target.value);
  }

  const fetchData = async () => {
    if (!name || !StartData || !EndData) {
      setError('All fields are required.');
      setTimeout(() => setError(null), 3000); // Hide error after 3 seconds
      return;
    }

    setlooder(true);
    setError(null); // Clear previous errors
    setResponse(null); // Clear previous responses

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

      console.log(body, token);

      const result = await axios.post('https://internships.focal-x.com/api/version', body, { headers });
      setResponse('Version saved successfully.');
      setlooder(false);
      setTimeout(() => setResponse(null), 3000); // Hide response after 3 seconds
    } catch (error) {
      setError('An error occurred while saving the version.');
      setlooder(false);
      setTimeout(() => setError(null), 3000); // Hide error after 3 seconds
    }
  };

  return (
    <section>
      {looder ? (
        <div className='Looder-Geniral'>
          Loading <span></span>
        </div>
      ) : (
        ''
      )}
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
                <input type="date" value={StartData} onChange={HandelStartData} />
              </div>
              <div>
                <label htmlFor="">End Data :</label>
                <input type="date" value={EndData} onChange={HandelEndData} />
              </div>
            </form>
            <button className='Submite' onClick={fetchData}>Save</button>
          </div>
          {response && <div className='success-message'><span>تم حفظ الطلب</span></div>}
          {error && <div className='error-message'><span>الرجاء ملء جميع الحقول</span></div>}
        </div>
      </section>
    </section>
  );
}
