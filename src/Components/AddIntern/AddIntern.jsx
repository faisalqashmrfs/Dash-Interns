import { Link } from 'react-router-dom'
import NavSidBar from '../NavSidBar/NavSidBar'
import './AddIntern.css'
import { IoMdArrowRoundBack } from 'react-icons/io'

export default function AddIntern({ nAVbAR, setnAVbAR }) {
    return (
        <div>
            <NavSidBar nAVbAR={nAVbAR} setnAVbAR={setnAVbAR} />
            <div className={!nAVbAR ? 'AddInternForm' : 'AddInternForm-off'}>
                <Link
                    to={'/MainDash'}
                    className={nAVbAR ? 'Back-form' : 'Back-form-off'}
                >
                    <IoMdArrowRoundBack />
                    Back
                </Link>
                <div className='FormIntern'>
                    <form action="">
                        <div>
                            <label htmlFor="">Name</label>
                            <input type="text" />
                        </div>
                        <div>
                            <label htmlFor="">Specialization</label>
                            <input type="text" />
                        </div>
                        <div>
                            <label htmlFor="">Adsress</label>
                            <input type="text" />
                        </div>
                        <div>
                            <label htmlFor="">E-mail</label>
                            <input type="text" />
                        </div>
                        <div>
                            <label htmlFor="">KPI</label>
                            <input type="text" />
                        </div>
                        <div>
                            <label htmlFor="">Supervisor</label>
                            <input type="text" />
                        </div>
                        <div>
                            <label htmlFor="">Start Date</label>
                            <input type="date" />
                        </div>
                        <div>
                            <label htmlFor="">End Date</label>
                            <input type="date" />
                        </div>
                        <div className='Select' >
                            <label htmlFor="">Certificate Type</label>
                            <select name="" id="">
                                <option value="شهادة تخرج">شهادة تخرج</option>
                                <option value="شهادة إتمام تدريب">شهادة إتمام تدريب</option>
                            </select>
                        </div>
                    </form>
                    <button className='Submite'>Save</button>
                </div>
            </div>
        </div>
    )
}
