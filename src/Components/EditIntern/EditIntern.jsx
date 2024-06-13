import { Link, useParams } from 'react-router-dom'
import NavSidBar from '../NavSidBar/NavSidBar'
import { IoMdArrowRoundBack } from 'react-icons/io'
import { useEffect, useState } from 'react'
import axios from 'axios';
import { ClimbingBoxLoader } from 'react-spinners';

export default function EditIntern({ nAVbAR, setnAVbAR, versionid, coachs }) {

    const { id } = useParams();

    if (versionid == undefined && coachs == undefined) {
        window.location.reload()
    }

    const token = localStorage.getItem('token');
    const IndexVirgen = localStorage.getItem('IndexVirgen');

    const [Name, setName] = useState('')
    const [Namev, setNamev] = useState('')
    const [Adsress, setAdsress] = useState('')
    const [mail, setmail] = useState('')
    const [KPI, setKPI] = useState('')
    const [Startdate, setStartdate] = useState('')
    const [enddate, setenddate] = useState('')
    const [supervisor, setsupervisor] = useState('')
    const [specialization, setspecialization] = useState('')
    const [version_interns_id, setversion_interns_id] = useState()
    const [certificate_type, setcertificate_type] = useState('graduation')
    const [genders, setgenders] = useState('male')
    const [looder, setlooder] = useState(false)

    function HandelName(e) {
        setName(e.target.value)
    }

    setTimeout(() => {
        setStartdate(versionid.startDate)
        setenddate(versionid.endDate)
        setNamev(versionid.name)
        setversion_interns_id(versionid.id)
    }, 100);

    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);


    const fetchData = async () => {
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
                genders: genders,
            };
            console.log(body);
            const result = await axios.put(`https://test.black-analysis-solutions.com/api/intern/${id}`, body, { headers });
        } catch (error) {
            setError(error);
        }
    };

    const [Data, setData] = useState();

    useEffect(() => {
        setlooder(true)
        const fetchUsers = async () => {
            try {
                const response = await axios.get(`https://test.black-analysis-solutions.com/api/intern/${id}`,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`,
                        }
                    }
                );
                setData(response.data);
                console.log(Data);
                setlooder(false)
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };
        fetchUsers();
    }, []);

    useEffect(() => {
        setTimeout(() => {
            setName(Data.name)
            setAdsress(Data.address)
            setmail(Data.email)
            setKPI(Data.kpi)
            setStartdate(Data.startDate)
            setenddate(Data.endDate)
            setspecialization(Data.specialization)
            setversion_interns_id(Data.version_interns_id)
            setcertificate_type(Data.certificate_type)
            setgenders(Data.genders)

        }, 500);
    }, [Data])


    function HandelAdsress(e) {
        setAdsress(e.target.value)
    }

    function Handelmail(e) {
        setmail(e.target.value)
    }

    function HandelKPI(e) {
        setKPI(e.target.value)
    }

    function HandelStartdate(e) {
        setStartdate(e.target.value)
    }

    function Handelenddate(e) {
        setenddate(e.target.value)
    }

    function HandelSpecialization(e) {
        setspecialization(e.target.value)
    }

    function Handelsupervisor(e) {
        setsupervisor(e.target.value)
    }

    function Handelversion_interns_id(e) {
        setversion_interns_id(e.target.value)
    }

    function Handelcertificate_type(e) {
        setcertificate_type(e.target.value)
    }

    function Handelgenders(e) {
        setgenders(e.target.value)
    }
    ;

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

    return (
        <>
            {looder ?
                <div className='Looder-Geniral'>
                    <ClimbingBoxLoader color="#FF8500" size={20} />
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
                                <label htmlFor="">Name</label>
                                <input type="text" value={Name} onChange={HandelName} />
                            </div>
                            <div>
                                <label htmlFor="">Specialization</label>
                                <select onChange={HandelSpecialization} value={specialization}>
                                    <option value="">select</option>
                                    {coachs.map((option, index) => (
                                        <option key={option.id} value={option.specialization}>{option.specialization}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label htmlFor="">Adsress</label>
                                <input type="text" value={Adsress} onChange={HandelAdsress} />
                            </div>
                            <div>
                                <label htmlFor="">E-mail</label>
                                <input type="text" value={mail} onChange={Handelmail} />
                            </div>
                            <div>
                                <label htmlFor="">KPI</label>
                                <input type="text" value={KPI} onChange={HandelKPI} />
                            </div>
                            <div>
                                <label htmlFor="">Supervisor</label>
                                <select name="" id="" value={supervisor} onChange={Handelsupervisor}>
                                    <option value="">select</option>
                                    {coachs.map((option, index) => (
                                        <option key={option.id} value={option.name}>{option.name}</option>
                                    ))}
                                </select>

                            </div>
                            <div>
                                <label htmlFor="">Start Date</label>
                                <input type="date" onChange={HandelStartdate} value={Startdate} />
                            </div>
                            <div>
                                <label htmlFor="">End Date</label>
                                <input type="date" onChange={Handelenddate} value={enddate} />
                            </div>
                            <div>
                                <label htmlFor="">version interns id ({Namev})</label>
                                <input type="text" onChange={Handelversion_interns_id} value={version_interns_id} />
                            </div>
                            <div>
                                <label htmlFor="">genders</label>
                                <select name="" id="" onChange={Handelgenders}>
                                    <option value="male">ذكر</option>
                                    <option value="female">أنثى</option>
                                </select>
                            </div>
                            <div className='Select' >
                                <label htmlFor="">Certificate Type</label>
                                <select name="" id="" value={certificate_type} onChange={Handelcertificate_type}>
                                    <option value="graduation">شهادة تخرج</option>
                                    <option value="presence">شهادة إتمام تدريب</option>
                                </select>
                            </div>

                        </form>
                        <button onClick={fetchData} className='Submite'>Update</button>
                    </div>
                </div>
            </div> : <></>}
        </>
    )
}











