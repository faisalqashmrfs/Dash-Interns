import { Link, useNavigate } from 'react-router-dom';
import './NavSidBar.css'
import { TfiAlignJustify, TfiAlignLeft } from "react-icons/tfi";
import axios from 'axios';
import { useState } from 'react';

export default function NavSidBar({ setnAVbAR, nAVbAR, version }) {

    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const [error, setError] = useState('');

    const handleLogin = async () => {
        try {
            const response = await axios.post('https://internships.focal-x.com/api/logout',
                {},
                {
                    headers: {
                        'Accept': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    }
                }
            );
            if (response.status === 200) {
                localStorage.removeItem('token')
                navigate('/');
            } else {
                setError('خطأ في تسجيل الخروج.');
            }
        } catch (error) {
            console.error('حدث خطأ غير متوقع:', error);
            setError('حدث خطأ غير متوقع. يرجى المحاولة مرة أخرى.');
        }
    };

    return (
        <section className='SidNavBar'>
            <div className={nAVbAR ? 'SideBar-isOPPEN' : 'SideBar-iscLOSE'} >
                <div className='SideBareSpition'>
                    <Link
                        to={'/MainDash'}
                        onClick={() => setnAVbAR(false)}
                    >
                        MainDash
                    </Link>
                    <Link
                        to={'/MainDash/AddIntern'}
                        onClick={() => setnAVbAR(false)}
                    >
                        Add Intern
                    </Link>
                    <Link
                        to={'/MainDash/Users'}
                        onClick={() => setnAVbAR(false)}
                    >
                        Users
                    </Link>
                    <Link
                        to={'/MainDash/AddUser'}
                        onClick={() => setnAVbAR(false)}
                    >
                        Add User
                    </Link>
                    <Link
                        to={'/MainDash/version'}
                        onClick={() => setnAVbAR(false)}
                    >
                        Version
                    </Link>
                    <Link
                        to={'/MainDash/Addversion'}
                        onClick={() => setnAVbAR(false)}
                    >
                        Add Version
                    </Link>
                    <Link
                        to={'/MainDash/Coachs'}
                        onClick={() => setnAVbAR(false)}
                    >
                        Coachs
                    </Link>
                    <Link
                        to={'/MainDash/Addcoachs'}
                        onClick={() => setnAVbAR(false)}
                    >
                        Add Coachs
                    </Link>
                    <Link
                        to={'/MainDash/contracts'}
                        onClick={() => setnAVbAR(false)}
                    >
                        contracts
                    </Link>
                    <Link
                        onClick={() => handleLogin()}
                        className='Loge-Out'
                    >
                        Loge Out
                    </Link>
                </div>
            </div>
            <nav className={nAVbAR ? 'FQ-NavBar-isOPPEN' : 'FQ-NavBar-iscLOSE'} >
                <button
                    onClick={() => setnAVbAR(!nAVbAR)}
                    className='Seting-btn'
                >
                    {!nAVbAR ? <TfiAlignJustify size={30} color='#fff' /> : <TfiAlignLeft size={30} color='#fff' />}

                </button>
            </nav>
        </section>
    )
}
