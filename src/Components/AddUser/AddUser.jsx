import { Link } from 'react-router-dom'
import NavSidBar from '../NavSidBar/NavSidBar'
import './AddUser.css'
import { IoMdArrowRoundBack } from 'react-icons/io'
import { useState } from 'react'
import axios from 'axios'

export default function AddUser({ nAVbAR, setnAVbAR }) {

    const token = localStorage.getItem('token');

    const [name, setname] = useState('')
    const [email, setemail] = useState('')
    const [pass, setpass] = useState('')

    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);

    function HandelName(e) {
        setname(e.target.value)
    }

    function HandelEmail(e) {
        setemail(e.target.value)
    }

    function HandelPass(e) {
        setpass(e.target.value)
    }

    const fetchData = async () => {
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

            console.log(body);

            const result = await axios.post('https://test.black-analysis-solutions.com/api/admins', body, { headers });
        } catch (error) {
            setError(error);
        }
    };
    return (
        <section>
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
                    </div>
                </div>
            </section>
        </section>
    )
}
