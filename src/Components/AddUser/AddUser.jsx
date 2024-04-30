import { Link } from 'react-router-dom'
import NavSidBar from '../NavSidBar/NavSidBar'
import './AddUser.css'
import { IoMdArrowRoundBack } from 'react-icons/io'

export default function AddUser({ nAVbAR, setnAVbAR }) {
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
                            <input type="text" />
                        </div>
                        <div>
                            <label htmlFor="">E-mail :</label>
                            <input type="text" />
                        </div>
                    </form>
                    <button className='Submite'>Save</button>
                </div>
                </div>
            </section>
        </section>
    )
}
