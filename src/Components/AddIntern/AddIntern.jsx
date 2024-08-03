import { Link } from 'react-router-dom'
import NavSidBar from '../NavSidBar/NavSidBar'
import './AddIntern.css'
import { IoMdArrowRoundBack } from 'react-icons/io'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { ClimbingBoxLoader } from 'react-spinners'

export default function AddIntern({ nAVbAR, setnAVbAR, versionid, coachs }) {

    if (versionid === undefined && coachs === undefined) {
        window.location.reload();
    }

    const token = localStorage.getItem('token');
    const IndexVirgen = localStorage.getItem('IndexVirgen');

    const [Name, setName] = useState('');
    const [Namev, setNamev] = useState('');
    const [Adsress, setAdsress] = useState('');
    const [mail, setmail] = useState('');
    const [KPI, setKPI] = useState('');
    const [Startdate, setStartdate] = useState('');
    const [enddate, setenddate] = useState('');
    const [supervisor, setsupervisor] = useState('');
    const [specialization, setspecialization] = useState('');
    const [version_interns_id, setversion_interns_id] = useState();
    const [certificate_type, setcertificate_type] = useState('graduation');
    const [genders, setgenders] = useState('male');
    const [looder, setlooder] = useState(false);
    const [errors, setErrors] = useState({});
    const [showSuccess, setShowSuccess] = useState(false);
    const [Massege, setMassege] = useState('');

    useEffect(() => {
        // مزامنة القيم
        if (specialization && coachs.length > 0) {
            const selectedCoach = coachs.find(coach => coach.specialization === specialization);
            if (selectedCoach) {
                setsupervisor(selectedCoach.name);
            } else {
                setsupervisor('');
            }
        }
    }, [specialization, coachs]);

    useEffect(() => {
        setStartdate(versionid?.startDate || '');
        setenddate(versionid?.endDate || '');
        setNamev(versionid?.name || '');
        setversion_interns_id(versionid?.id || '');
    }, [versionid]);

    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        if (!allFieldsFilled()) {
            return;
        }

        setlooder(true);
        try {
            const headers = {
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`,
            };

            const body = {
                name: Name,
                specialization: specialization,
                address: Adsress,
                email: mail,
                kpi: KPI,
                supervisor: supervisor,
                startDate: Startdate,
                endDate: enddate,
                version_interns_id: version_interns_id,
                certificate_type: certificate_type,
                gender: genders,
            };
            const result = await axios.post('https://internships.focal-x.com/api/intern', body, { headers });
            setlooder(false);
            setShowSuccess(true);
            setTimeout(() => setShowSuccess(false), 3000);
        } catch (error) {
            setMassege(error.response.data.message)
            setTimeout(() => setMassege(''), 4000);
            setlooder(false);
            setError(error);
        }
    };

    const allFieldsFilled = () => {
        const newErrors = {};
        if (!Name) newErrors.Name = 'هذا الحقل مطلوب';
        if (!Adsress) newErrors.Adsress = 'هذا الحقل مطلوب';
        if (!mail) newErrors.mail = 'هذا الحقل مطلوب';
        if (!KPI) newErrors.KPI = 'هذا الحقل مطلوب';
        if (!Startdate) newErrors.Startdate = 'هذا الحقل مطلوب';
        if (!enddate) newErrors.enddate = 'هذا الحقل مطلوب';
        if (!specialization) newErrors.specialization = 'هذا الحقل مطلوب';
        if (!version_interns_id) newErrors.version_interns_id = 'هذا الحقل مطلوب';
        // if (!supervisor) newErrors.supervisor = 'هذا الحقل مطلوب';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    return (
        <>
            {looder ?
                <div className='Looder-Geniral'>
                    Loading <span></span>
                </div>
                :
                ''
            }
            {coachs ? <div>
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
                                {errors.Name && <span className="error-message">{errors.Name}</span>}
                                <label htmlFor="">Name</label>
                                <input type="text" value={Name} onChange={(e) => { setName(e.target.value); setErrors({ ...errors, Name: '' }); }} />
                            </div>
                            <div>
                                    {errors.specialization && <span className="error-message">{errors.specialization}</span>}
                                <label htmlFor="">Specialization</label>
                                <select onChange={(e) => { setspecialization(e.target.value); setErrors({ ...errors, specialization: '' }); }}>
                                    <option value="">select</option>
                                    {coachs.map((option, index) => (
                                        <option key={option.id} value={option.specialization}>{option.specialization}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                {errors.Adsress && <span className="error-message">{errors.Adsress}</span>}
                                <label htmlFor="">Adsress</label>
                                <input type="text" value={Adsress} onChange={(e) => { setAdsress(e.target.value); setErrors({ ...errors, Adsress: '' }); }} />
                            </div>
                            <div>
                                {errors.mail && <span className="error-message">{errors.mail}</span>}
                                <label htmlFor="">E-mail</label>
                                <input type="text" value={mail} onChange={(e) => { setmail(e.target.value); setErrors({ ...errors, mail: '' }); }} />
                            </div>
                            <div>
                                {errors.KPI && <span className="error-message">{errors.KPI}</span>}
                                <label htmlFor="">KPI</label>
                                <input type="number" value={KPI} onChange={(e) => { setKPI(e.target.value); setErrors({ ...errors, KPI: '' }); }} />
                            </div>
                            <div>
                                {/* {errors.supervisor && <span className="error-message">{errors.supervisor}</span>} */}
                                <label htmlFor="">Supervisor</label>
                                <input type="text" value={supervisor} readOnly />
                            </div>
                            <div>
                                {errors.Startdate && <span className="error-message">{errors.Startdate}</span>}
                                <label htmlFor="">Start Date</label>
                                <input type="date" onChange={(e) => { setStartdate(e.target.value); setErrors({ ...errors, Startdate: '' }); }} value={Startdate} />
                            </div>
                            <div>
                                {errors.enddate && <span className="error-message">{errors.enddate}</span>}
                                <label htmlFor="">End Date</label>
                                <input type="date" onChange={(e) => { setenddate(e.target.value); setErrors({ ...errors, enddate: '' }); }} value={enddate} />
                            </div>
                            <div>
                                {errors.version_interns_id && <span className="error-message">{errors.version_interns_id}</span>}
                                <label htmlFor="">version interns id ({Namev})</label>
                                <input type="text" onChange={(e) => { setversion_interns_id(e.target.value); setErrors({ ...errors, version_interns_id: '' }); }} value={version_interns_id} />
                            </div>
                            <div>
                                <label htmlFor="">genders</label>
                                <select name="" id="" onChange={(e) => { setgenders(e.target.value); setErrors({ ...errors, genders: '' }); }}>
                                    <option value="male">ذكر</option>
                                    <option value="female">أنثى</option>
                                </select>
                            </div>
                            <div className='Select'>
                                <label htmlFor="">Certificate Type</label>
                                <select name="" id="" value={certificate_type} onChange={(e) => { setcertificate_type(e.target.value); setErrors({ ...errors, certificate_type: '' }); }}>
                                    <option value="graduation">شهادة تخرج</option>
                                    <option value="presence">شهادة حضور</option>
                                </select>
                            </div>
                        </form>
                        <button onClick={fetchData} className='Submite'>Save</button>
                        <div className={!showSuccess ? 'success-message-off':'success-message'}><span>تم حفظ الطلب</span></div>
                        <div className={Massege === '' ? 'Massege-off':'Massege'}><span>{Massege}</span></div>
                    </div>
                </div>
            </div> : <></>}
        </>
    );
}
