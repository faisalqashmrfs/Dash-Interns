import { Link } from 'react-router-dom';
import { FaEye } from "react-icons/fa";
import { MdDeleteForever } from 'react-icons/md';
import { useEffect , useState } from 'react';
import axios from 'axios';
import { ClimbingBoxLoader } from 'react-spinners';
import { IoMdArrowRoundBack } from 'react-icons/io';

export default function Contract({ nAVbAR }) {
  const [Masseg, setMasseg] = useState(false);
  const token = localStorage.getItem('token');
  const [deleteID, setdeleteID] = useState('');
  const [Data, setData] = useState([]);
  const [looder, setlooder] = useState(false)

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 25;

  useEffect(() => {
    setlooder(true)
    axios.get(`https://internships.focal-x.com/api/contract`,
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
        console.log(Data);
      })
      .catch(error => {
        console.error('Error fetching data: ', error);
      });
  }, [ token]);

  const [deleted, setDeleted] = useState(false);

  const handleDelete = () => {
    setMasseg(false);
    axios.delete(`https://internships.focal-x.com/api/contract/${deleteID} `,
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
      {looder ?
        <div className='Looder-Geniral'>
           Loading <span></span>
        </div>
        :
        ''
      }
      <section className='ALL-Data'>
        <div className={nAVbAR ? 'Fq-NavOptions-off' : 'Fq-NavOptions'}>
          <Link
            to={'/MainDash/'}
            className='aa'
          >
            <IoMdArrowRoundBack />
            Back
          </Link>
        </div>
        <div className="pagination" >
          <button onClick={handlePreviousPage} disabled={currentPage === 1}>Previous</button>
          <p>{currentPage}</p>
          <button onClick={handleNextPage} disabled={indexOfLastItem >= Data.length}>Next</button>
        </div>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>ID Nember</th>
              <th>specialization</th>
              <th>Options</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((row, index) => (
              <tr key={index}>
                <td>{row.id}</td>
                <td>{row.full_name}</td>
                <td>{row.id_number}</td>
                <td>{row.specialization}</td>
                <td className='Options'>
                  <Link
                    to={`/MainDash/onecontract/${row.id}`}
                  >
                    <FaEye color='#FF8500' />
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
            <h2>Do You Want To Delete This Row</h2>
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
