import { Link } from 'react-router-dom'
import './MineSection.css'
import { FaEye, FaPlusCircle } from "react-icons/fa";
import { MdDeleteForever, MdModeEdit } from 'react-icons/md';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function MineSection({ nAVbAR, version }) {

  const [Masseg, setMasseg] = useState(false)
  const token = localStorage.getItem('token');
  const [deleteID, setdeleteID] = useState()
  const [Data, setData] = useState([]);
  const [virgn , setvirgn] = useState("")
  
  const [selectedValue, setSelectedValue] = useState(() => {

    return localStorage.getItem('selectedValue') || '';
  });

  const handleChange = (event) => {
    const value = event.target.value;
    setSelectedValue(value);
    localStorage.setItem('selectedValue', value);
    setvirgn(`version=${selectedValue}`)
    console.log();
    localStorage.setItem('IndexVirgen', event.target.selectedIndex - 1);
    localStorage.setItem('IDVirgen', version[event.target.selectedIndex - 1].id);
    window.location.reload() 
  };
  

  useEffect(() => {
    axios.get(`https://test.black-analysis-solutions.com/api/intern?${selectedValue ? `version=${selectedValue}` : `''`}`,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        }
      }
    )
      .then(response => {
        setData(response.data.data);
        console.log(Data);
      })
      .catch(error => {
        console.error('Error fetching data: ', error);
      });
  }, [selectedValue]);

  const [deleted, setDeleted] = useState(false);

  const handleDelete = () => {
    setMasseg(false)
    axios.delete(`https://test.black-analysis-solutions.com/api/intern/${deleteID} `,
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
  const [virgnx , setvirgnx] = useState("")

  function reseteData()
  {
    setSelectedValue(null);
    localStorage.removeItem('selectedValue');
    window.location.reload()
  }

  return (
    <section className={nAVbAR ? 'MainSECTION' : 'MainSECTION-off'}>
      <section className='ALL-Data'>
        <div className={nAVbAR ? 'Fq-NavOptions-off' : 'Fq-NavOptions'}>
          <Link
            to={'/MainDash/AddIntern'}
            className='aa'
          >
            <FaPlusCircle />
            Add Interns
          </Link>
          <select name="" id="" className='SelectedV' onChange={handleChange}>
            <option value="">select V</option>
            {version.map((version , index) => (
              <option key={version.id} value={version.name}>{version.name}</option>
            ))}
          </select>
          <button className='ResateData' onClick={reseteData} >reset</button>
        </div>
        <button className={nAVbAR ? 'VirgenWorkspacs' : 'VirgenWorkspacs2'} >version Workspace : {selectedValue ? selectedValue : 'All Data'}</button>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Address</th>
              <th>E-Mail</th>
              <th>Specialization</th>
              <th>Supervisor</th>
              <th>Created At</th>
              <th>Options</th>
            </tr>
          </thead>
          <tbody>
            {Data.map((row, index) => (
              <tr key={index}>
                <td>{row.name}</td>
                <td>{row.address}</td>
                <td>{row.email}</td>
                <td>{row.specialization}</td>
                <td>{row.supervisor}</td>
                <td>{row.created_at.substring(0, 10)}</td>
                <td className='Options'>
                  <Link
                    to={`/MainDash/ShowUntern/${row.id}`}
                  >
                    <FaEye color='#FF8500' />
                  </Link>
                  <Link to={`/MainDash/EditIntern/${row.id}`}
                  >
                    <MdModeEdit color='#FF8500' />
                  </Link>
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
