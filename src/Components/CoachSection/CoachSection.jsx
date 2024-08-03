import { MdDeleteForever, MdModeEdit } from 'react-icons/md'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

export default function CoachSection({ nAVbAR , coachs}) {

      const token = localStorage.getItem('token');
      const [Masseg, setMasseg] = useState(false)
      const [deleteID, setdeleteID] = useState('')
      const [deleted, setDeleted] = useState(false);

      const handleDelete = () => {
        setMasseg(false)
        axios.delete(`https://internships.focal-x.com/api/coachs/${deleteID} `,
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
      }

  return (
    <section className={nAVbAR ? 'MainSECTION' : 'MainSECTION-off'}>
      <section className='ALL-Data'>
        <div className={nAVbAR ? 'Fq-NavOptions-off' : 'Fq-NavOptions'}>
          <Link
            to={'/MainDash/Addcoachs'}
            className='aa'
          >Add Coach
          </Link>
        </div>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>specialization</th>
              <th>Options</th>
            </tr>
          </thead>
          <tbody>
            {coachs.map((row, index) => (
              <tr key={index}>
                <td>{row.name}</td>
                <td>{row.specialization}</td>
                <td className='Options'>
                  <Link
                  onClick={() => HandelDeletUser(row.id)}
                  >
                    <MdDeleteForever color='#FF8500' />
                  </Link>
                  <Link to={`/MainDash/editcoachs/${row.id}`}
                  >
                    <MdModeEdit color='#FF8500' />
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
