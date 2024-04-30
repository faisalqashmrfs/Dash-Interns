import { Route, Routes } from 'react-router-dom'
import './App.css'
import Logein from './Components/Logein/Logein'
import MainDash from './Components/MainDash/MainDash'
import Users from './Components/Users/Users'
import { useState } from 'react'
import AddIntern from './Components/AddIntern/AddIntern'
import ONEintern from './Components/ONEintern/ONEintern'
import AddUser from './Components/AddUser/AddUser'

function App() {

  const [nAVbAR , setnAVbAR] = useState(false)

  return (
    <>
    <Routes>
      <Route path='/' element={<Logein />} />
      <Route path='/MainDash' element={<MainDash nAVbAR={nAVbAR} setnAVbAR={setnAVbAR}/>} />
      <Route path='/MainDash/AddIntern' element={<AddIntern nAVbAR={nAVbAR} setnAVbAR={setnAVbAR}/>} />
      <Route path='/MainDash/ShowUntern' element={<ONEintern nAVbAR={nAVbAR} setnAVbAR={setnAVbAR}/>} />
      <Route path='/MainDash/Users' element={<Users nAVbAR={nAVbAR} setnAVbAR={setnAVbAR}/>} />
      <Route path='/MainDash/AddUser' element={<AddUser nAVbAR={nAVbAR} setnAVbAR={setnAVbAR}/>} />
    </Routes>
    </>
  )
}

export default App
