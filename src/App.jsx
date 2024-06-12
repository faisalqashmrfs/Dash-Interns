import { Route, Routes } from 'react-router-dom'
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

function App() {

  const [nAVbAR , setnAVbAR] = useState(false)
  const token = localStorage.getItem('token')

  const [version, setversion] = useState([]);
  const [versionid, setversionid] = useState();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('https://test.black-analysis-solutions.com/api/version-get' , 
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          }
        }
        );
        setversion(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchUsers();
  }, []);

  const IDVirgen = localStorage.getItem('IDVirgen')
  const [coachs, setcoachs] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`https://test.black-analysis-solutions.com/api/version-get?id=${IDVirgen ? `${IDVirgen}` : `1`}` , 
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          }
        }
        );
        setcoachs(response.data.coachs);
        setversionid(response.data)
        console.log(versionid);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, [IDVirgen]);


  return (
    <>
    <Routes>
      <Route path='/' element={<Logein />} />
      <Route path='/MainDash' element={<MainDash nAVbAR={nAVbAR} setnAVbAR={setnAVbAR} version={version}/>} />
      <Route path='/MainDash/AddIntern' element={<AddIntern nAVbAR={nAVbAR} setnAVbAR={setnAVbAR} versionid={versionid} coachs={coachs}/>} />
      <Route path='/MainDash/EditIntern/:id' element={<EditIntern nAVbAR={nAVbAR} setnAVbAR={setnAVbAR} versionid={versionid} coachs={coachs}/>} />
      <Route path='/MainDash/ShowUntern/:id' element={<ONEintern nAVbAR={nAVbAR} setnAVbAR={setnAVbAR}/>} />
      <Route path='/MainDash/Users' element={<Users nAVbAR={nAVbAR} setnAVbAR={setnAVbAR}/>} />
      <Route path='/MainDash/AddUser' element={<AddUser nAVbAR={nAVbAR} setnAVbAR={setnAVbAR}/>} />
      <Route path='/MainDash/version' element={<Version nAVbAR={nAVbAR} version={version} setnAVbAR={setnAVbAR}/>} />
      <Route path='/MainDash/Addversion' element={<AddVersion nAVbAR={nAVbAR} setnAVbAR={setnAVbAR}/>} />
      <Route path='/MainDash/Editversion/:id' element={<EditVersion nAVbAR={nAVbAR} setnAVbAR={setnAVbAR}/>} />
      <Route path='/MainDash/Coachs' element={<Coachs nAVbAR={nAVbAR} setnAVbAR={setnAVbAR} version={version} coachs={coachs}/>} />
      <Route path='/MainDash/Addcoachs' element={<Addcoachs nAVbAR={nAVbAR} setnAVbAR={setnAVbAR}  versionid={versionid}/>} />
      <Route path='/MainDash/contracts' element={<Addcoachs nAVbAR={nAVbAR} setnAVbAR={setnAVbAR}  versionid={versionid}/>} />
    </Routes>
    </>
  )
}

export default App
