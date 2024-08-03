import './Logein.css'
import VideoFooter from '../VideoFooter/VideoFooter'
import Focal from './../../assets/Images/focal.png'
import showPass from './../../assets/Images/showPass.png'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import axios from 'axios'


export default function Logein() {

  const { handleSubmit, errors } = useForm()

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = (data) => {
    console.log(data.password);
  };


  useEffect(() => {
    if(localStorage.getItem('token'))
      {
        navigate('/MainDash');
      }
  } , [])

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  // const [URL, setURL] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('https://internships.focal-x.com/api/login',
        { email, password },
        {
          headers: {
            'Content-Type': 'application/json',
          }
        }
      );
      localStorage.setItem('token', response.data.access_token);
      if (response.status === 200) {
        navigate('/MainDash');
      } else {
        setError('خطأ في تسجيل الدخول. يرجى التحقق من بيانات الاعتماد.');
        navigate('/');
      }
    } catch (error) {
      console.error('حدث خطأ غير متوقع:', error);
      setError('حدث خطأ غير متوقع. يرجى المحاولة مرة أخرى.');
    }
  };

  return (
    <section className='LogeIn'>
      <img className='Logo' src={Focal} alt="Focal photo" />
      <div className='Main-box'>
        <h2>Welcome </h2>
        <h4>Interns Dashboard</h4>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="Email"
            name="email"
            placeholder='Enter your E-mail'
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className='pass-Area'>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder='Password'
              name="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <img
              onClick={() => setShowPassword(!showPassword)}
              src={showPass} alt="showPass" />
          </div>
          <Link
            onClick={handleLogin}
          ><button>Login</button></Link>
        </form>
      </div>
      <div>{error}</div>
      <div className='Footer'>
        <VideoFooter />
      </div>
    </section>
  )

}

