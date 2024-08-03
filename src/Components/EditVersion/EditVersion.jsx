import { IoMdArrowRoundBack } from 'react-icons/io'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom'
import NavSidBar from '../NavSidBar/NavSidBar'
import { ClimbingBoxLoader } from 'react-spinners'

export default function EditVersion({ nAVbAR, setnAVbAR }) {

      const { id } = useParams();

      const [Data, setData] = useState([]);

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

      useEffect(() => {
            setlooder(true)
            const fetchUsers = async () => {
                  try {
                        const response = await axios.get(`https://internships.focal-x.com/api/version/${id}`,
                              {
                                    headers: {
                                          'Content-Type': 'application/json',
                                          'Authorization': `Bearer ${token}`,
                                    }
                              }
                        );
                        setData(response.data);
                  } catch (error) {
                        console.error('Error fetching users:', error);
                  }
                  setlooder(false)
            };
            fetchUsers();
      }, []);

      const fetchData = async () => {
            if (!name || !StartData || !EndData) {
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
                        startDate: StartData,
                        endDate: EndData,
                  };

                  console.log(body, token);

                  const result = await axios.put(`https://internships.focal-x.com/api/version/${id}`, body, { headers });
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
                  console.log(Data);
                  setname(Data.name)
                  setStartData(Data.startDate)
                  setEndData(Data.endDate)
            }, 500);
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
                                    <button className='Submite' onClick={fetchData}>UpDate</button>
                              </div>
                              {response && <div className='success-message'><span>تم حفظ الطلب</span></div>}
                              {error && <div className='error-message'><span>الرجاء ملء جميع الحقول</span></div>}
                        </div>
                  </section>
            </section>
      )
}
