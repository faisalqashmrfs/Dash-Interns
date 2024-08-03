import { Route, Routes, useNavigate } from 'react-router-dom'
import './App.css'
import Logein from './Components/Logein/Logein'
import MainDash from './Components/MainDash/MainDash'
import Users from './Components/Users/Users'
import { useEffect, useState } from 'react'
import AddIntern from './Components/AddIntern/AddIntern'
import ONEintern from './Components/ONEintern/ONEintern'
import AddUser from './Components/AddUser/AddUser'
import EditIntern from './Components/EditIntern/EditIntern'
import axios from 'axios'
import AddVersion from './Components/Addversion/Addversion'
import Coachs from './Components/coachs/coachs'
import Addcoachs from './Components/Addcoachs/Addcoachs'
import Version from './Components/version/version'
import EditVersion from './Components/EditVersion/EditVersion'
import EditCoach from './Components/EditCoach/EditCoach'
import Contracts from './Components/contracts/Contracts'
import Onecontract from './Components/Onecontract/Onecontract'

function App() {

  const [nAVbAR, setnAVbAR] = useState(false)
  const token = localStorage.getItem('token')

  const [version, setversion] = useState([]);
  const [versionid, setversionid] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('https://internships.focal-x.com/api/version-get',
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            }
          }
        );
        setversion(response.data);
        if (response.data === undefined) {
          localStorage.removeItem('token');
          navigate('/');
        }
      } catch (error) {
        if (error.response && error.response.status === 401) {
          localStorage.removeItem('token');
          navigate('/');
        } else {
          console.error('Error fetching versions:', error);
        }
      }
    };
    fetchUsers();
  }, [token, navigate]);

  const IDVirgen = localStorage.getItem('IDVirgen')
  const [coachs, setcoachs] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`https://internships.focal-x.com/api/version-get?id=${IDVirgen ? `${IDVirgen}` : `1`}`,
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            }
          }
        );
        setcoachs(response.data.coachs);
        setversionid(response.data)
      } catch (error) {
        if (error.response && error.response.status === 401) {
          localStorage.removeItem('token');
          navigate('/');
        } else {
          console.error('Error fetching coachs:', error);
        }
      }
    };

    fetchUsers();
  }, [IDVirgen, token, navigate]);

  return (
    <>
      <Routes>
        <Route path='/' element={<Logein />} />
        <Route path='/MainDash' element={<MainDash nAVbAR={nAVbAR} setnAVbAR={setnAVbAR} version={version} coachs={coachs}/>} />
        <Route path='/MainDash/AddIntern' element={<AddIntern nAVbAR={nAVbAR} setnAVbAR={setnAVbAR} versionid={versionid} coachs={coachs} />} />
        <Route path='/MainDash/EditIntern/:id' element={<EditIntern nAVbAR={nAVbAR} setnAVbAR={setnAVbAR} versionid={versionid} coachs={coachs} />} />
        <Route path='/MainDash/ShowUntern/:id' element={<ONEintern nAVbAR={nAVbAR} setnAVbAR={setnAVbAR} versionid={versionid} />} />
        <Route path='/MainDash/Users' element={<Users nAVbAR={nAVbAR} setnAVbAR={setnAVbAR} />} />
        <Route path='/MainDash/AddUser' element={<AddUser nAVbAR={nAVbAR} setnAVbAR={setnAVbAR} />} />
        <Route path='/MainDash/version' element={<Version nAVbAR={nAVbAR} version={version} setnAVbAR={setnAVbAR} />} />
        <Route path='/MainDash/Addversion' element={<AddVersion nAVbAR={nAVbAR} setnAVbAR={setnAVbAR} />} />
        <Route path='/MainDash/Editversion/:id' element={<EditVersion nAVbAR={nAVbAR} setnAVbAR={setnAVbAR} />} />
        <Route path='/MainDash/Coachs' element={<Coachs nAVbAR={nAVbAR} setnAVbAR={setnAVbAR} version={version} coachs={coachs} />} />
        <Route path='/MainDash/Addcoachs' element={<Addcoachs nAVbAR={nAVbAR} setnAVbAR={setnAVbAR} versionid={versionid} />} />
        <Route path='/MainDash/editcoachs/:id' element={<EditCoach nAVbAR={nAVbAR} setnAVbAR={setnAVbAR} coachs={coachs} versionid={versionid} />} />
        <Route path='/MainDash/contracts' element={<Contracts nAVbAR={nAVbAR} setnAVbAR={setnAVbAR} versionid={versionid} version={version} />} />
        <Route path='/MainDash/onecontract/:id' element={<Onecontract nAVbAR={nAVbAR} setnAVbAR={setnAVbAR} versionid={versionid} version={version} />} />
      </Routes>
    </>
  )
}

export default App;
