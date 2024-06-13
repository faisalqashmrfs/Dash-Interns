import { Link } from 'react-router-dom'
import './UsersSection.css'
import { FaEye } from 'react-icons/fa'
import { MdDeleteForever, MdModeEdit } from 'react-icons/md'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { ClimbingBoxLoader } from 'react-spinners'

export default function UsersSection({ nAVbAR }) {

  const [Masseg, setMasseg] = useState(false)
  const [deleteID, setdeleteID] = useState()
  const [looder, setlooder] = useState(false)

  const token = localStorage.getItem('token');

  const [Data, setData] = useState([]);

  useEffect(() => {
    setlooder(true)
    axios.get('https://test.black-analysis-solutions.com/api/admins',
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        }
      }
    )
      .then(response => {
        setData(response.data.data);
        setlooder(false)
      })
      .catch(error => {
        console.error('Error fetching data: ', error);
      });
  }, [token]);

    const [deleted, setDeleted] = useState(false);
  
    const handleDelete = () => {
      setMasseg(false)
      axios.delete(`https://test.black-analysis-solutions.com/api/admins/${deleteID} ` , 
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        }
      }
      )
        .then(response => {
          console.log(response);
          setDeleted(true);
        })
        .catch(error => {
          console.error(error);
        });
    };

    function HandelDeletUser(id) {
      setMasseg(true)
      setdeleteID(id)
      console.log(id);
    }

  return (
    <section className={nAVbAR ? 'MainSECTION' : 'MainSECTION-off'}>
      {looder ?
                <div className='Looder-Geniral'>
                    <ClimbingBoxLoader color="#FF8500" size={20} />
                </div>
                :
                ''
            }
      <section className='ALL-Data'>
        <div className={nAVbAR ? 'Fq-NavOptions-off' : 'Fq-NavOptions'}>
          <Link
            to={'/MainDash/AddUser'}
            className='aa'
          >Add User
          </Link>
        </div>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>E-Mail</th>
              <th>Options</th>
            </tr>
          </thead>
          <tbody>
            {Data.map((row, index) => (
              <tr key={index}>
                <td>{row.name}</td>
                <td>{row.email}</td>
                <td className='Options'>
                  <Link
                    onClick={() => HandelDeletUser(row.id)}
                  >
                    <MdDeleteForever color='#FF8500' />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <section className='DeletingMasseg-box'>
          <div className={Masseg ? 'DeletingMasseg' : 'DeletingMasseg-off'}>
            <h2>Do You Wont To Delet This Row</h2>
            <div>
              <button className='Yes' 
              onClick={handleDelete}
              >Yes</button>
              <button className='No'
                onClick={() => setMasseg(false)}
              >No</button>
            </div>
          </div>
        </section>
      </section>
    </section>
  )
}
