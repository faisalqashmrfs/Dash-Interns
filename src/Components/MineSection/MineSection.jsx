import { Link } from 'react-router-dom';
import './MineSection.css';
import { FaEye, FaLessThanEqual, FaPlusCircle } from "react-icons/fa";
import { MdDeleteForever, MdModeEdit } from 'react-icons/md';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { ClimbingBoxLoader } from 'react-spinners';

export default function MineSection({ nAVbAR, version, coachs }) {
  const [Masseg, setMasseg] = useState(false);
  const token = localStorage.getItem('token');
  const [deleteID, setdeleteID] = useState('');
  const [Data, setData] = useState([]);
  const [looder, setlooder] = useState(false);

  const [selectedValue, setSelectedValue] = useState(() => {
    return localStorage.getItem('selectedValue') || '';
  });

  const [selecteds, setSelecteds] = useState(() => {
    return localStorage.getItem('setSelecteds') || '';
  });

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 75;

  const handleChange = (event) => {
    const value = event.target.value;
    setSelectedValue(value);
    localStorage.setItem('selectedValue', value);
    localStorage.setItem('IndexVirgen', event.target.selectedIndex - 1);
    localStorage.setItem('IDVirgen', version[event.target.selectedIndex - 1].id);
    // window.location.reload();
  };

  const handleChange2 = (event) => {
    const value = event.target.value;
    setSelecteds(value);
    localStorage.setItem('setSelecteds', value);
  };

  useEffect(() => {
    setlooder(true);
    axios.get(`https://internships.focal-x.com/api/intern?${selectedValue ? `version=${selectedValue}` : ``}${selecteds ? `&category=${selecteds}` : ``}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }
    })
      .then(response => {
        setData(response.data.data);
        setlooder(false);
      })
      .catch(error => {
        console.error('Error fetching data: ', error);
        setlooder(false);
      });
  }, [selectedValue, selecteds, token]);

  const [deleted, setDeleted] = useState(false);

  const handleDelete = () => {
    setMasseg(false);
    axios.delete(`https://internships.focal-x.com/api/intern/${deleteID}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }
    })
      .then(response => {
        console.log(response);
        setDeleted(true);
        // تحديث حالة Data لإزالة العنصر المحذوف
        setData(prevData => prevData.filter(item => item.id !== deleteID));
      })
      .catch(error => {
        console.error(error);
      });
  };

  function HandelDeletUser(id) {
    setMasseg(true);
    setdeleteID(id);
  }

  function reseteData() {
    setSelectedValue(null);
    localStorage.removeItem('selectedValue');
    window.location.reload();
  }

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = Data.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <section className={nAVbAR ? 'MainSECTION' : 'MainSECTION-off'}>
      {looder ? (
        <div className='Looder-Geniral'>
          Loading <span></span>
        </div>
      ) : (
        ''
      )}
      <section className='ALL-Data'>
        <div className={nAVbAR ? 'Fq-NavOptions-off' : 'Fq-NavOptions'}>
          {selectedValue ? (
            <Link to={'/MainDash/AddIntern'} className='aa'>
              <FaPlusCircle />
              Add Interns
            </Link>
          ) : (
            <h5 style={{ color: '#fff', textAlign: 'center', margin: '15px 0 0 15px' }}>
              please select version
            </h5>
          )}
        </div>
        <div className='selectedvps'>
        <button className='ResateData' onClick={reseteData}>reset</button>
            <select name="" id="" className='SelectedV' onChange={handleChange}>
              <option value="">select V</option>
              {version.map((version, index) => (
                <option key={version.id} value={version.name}>{version.name}</option>
              ))}
            </select>
            <select name="" id="" className='Selecteds' onChange={handleChange2}>
              <option value="">select S</option>
              {coachs.map((option, index) => (
                <option key={option.id} value={option.specialization}>{option.specialization}</option>
              ))}
            </select>
          </div>
        <button className={nAVbAR ? 'VirgenWorkspacs' : 'VirgenWorkspacs2'}>
          version Workspace : {selectedValue ? selectedValue : 'All Data'}
        </button>
        <div className="pagination">
          <button onClick={handlePreviousPage} disabled={currentPage === 1}>Previous</button>
          <p>{currentPage}</p>
          <button onClick={handleNextPage} disabled={indexOfLastItem >= Data.length}>Next</button>
        </div>
        <table>
          <thead>
            <tr>
              <th>ID</th>
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
            {currentItems.map((row, index) => (
              <tr key={index}>
                <td>{row.id}</td>
                <td>{row.name}</td>
                <td>{row.address}</td>
                <td>{row.email}</td>
                <td>{row.specialization}</td>
                <td>{row.supervisor}</td>
                <td>{row.created_at.substring(0, 10)}</td>
                <td className='Options'>
                  <Link to={`/MainDash/ShowUntern/${row.id}`}>
                    <FaEye color='#FF8500' />
                  </Link>
                  <Link to={`/MainDash/EditIntern/${row.id}`}>
                    <MdModeEdit color='#FF8500' />
                  </Link>
                  <Link onClick={() => HandelDeletUser(row.id)}>
                    <MdDeleteForever color='#FF8500' />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <section className='DeletingMasseg-box'>
          <div className={Masseg ? 'DeletingMasseg' : 'DeletingMasseg-off'}>
            <h2>Do You Want To Delete This Row</h2>
            <div>
              <button className='Yes' onClick={handleDelete}>Yes</button>
              <button className='No' onClick={() => setMasseg(false)}>No</button>
            </div>
          </div>
        </section>
      </section>
    </section>
  );
}
