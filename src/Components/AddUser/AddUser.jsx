import { Link } from 'react-router-dom';
import NavSidBar from '../NavSidBar/NavSidBar';
import './AddUser.css';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { useState } from 'react';
import axios from 'axios';
import { ClimbingBoxLoader } from 'react-spinners';

export default function AddUser({ nAVbAR, setnAVbAR }) {

    const token = localStorage.getItem('token');

    const [name, setname] = useState('');
    const [email, setemail] = useState('');
    const [pass, setpass] = useState('');
    const [looder, setlooder] = useState(false);
    const [showError, setShowError] = useState(false);
    const [showSuccess, setshowSuccess] = useState(false);

    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);

    function HandelName(e) {
        setname(e.target.value);
    }

    function HandelEmail(e) {
        setemail(e.target.value);
    }

    function HandelPass(e) {
        setpass(e.target.value);
    }

    const allFieldsFilled = () => {
        return name && email && pass;
    };

    const fetchData = async () => {
        if (!allFieldsFilled()) {
            setShowError(true);
            setTimeout(() => setShowError(false), 3000);
            return;
        }

        setlooder(true);
        try {
            const headers = {
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`,
            };

            const body = {
                name: name,
                email: email,
                password: pass,
            };
            const result = await axios.post('https://internships.focal-x.com/api/admins', body, { headers });
            setlooder(false);
            
        } catch (error) {
            setError(error);
            setlooder(false);
            setshowSuccess(true);
            setTimeout(() => setshowSuccess(false), 3000);
        }
    };

    return (
        <section>
            {looder ?
                <div className='Looder-Geniral'>
                    Loading <span></span>
                </div>
                : ''
            }
            <NavSidBar nAVbAR={nAVbAR} setnAVbAR={setnAVbAR} />
            <section className={!nAVbAR ? 'AddUser' : 'AddUser-off'}>
                <Link
                    to={'/MainDash/Users'}
                    className={nAVbAR ? 'Back-form' : 'Back-form-off'}
                >
                    <IoMdArrowRoundBack />
                    Back
                </Link>
                <div className='Form-AddUser'>
                    <div className='FormIntern'>
                        <form action="">
                            <div>
                                <label htmlFor="">Name</label>
                                <input type="text" value={name} onChange={HandelName} />
                            </div>
                            <div>
                                <label htmlFor="">E-mail :</label>
                                <input type="text" value={email} onChange={HandelEmail} />
                            </div>
                            <div>
                                <label htmlFor="">Password :</label>
                                <input type="text" value={pass} onChange={HandelPass} />
                            </div>
                        </form>
                        <button className='Submite' onClick={fetchData}>Save</button>
                        {showError && <div className="error-message"><span>الرجاء ملء جميع الحقول</span></div>}
                        {showSuccess && <div className="success-message"><span>تم حفظ المستخدم بنجاح</span></div>}
                    </div>
                </div>
            </section>
        </section>
    );
}
