import { Link } from 'react-router-dom'
import NavSidBar from '../NavSidBar/NavSidBar'
import './AddIntern.css'
import { IoMdArrowRoundBack } from 'react-icons/io'
import { useState } from 'react'

const optionsMap = {
    option1: ['optionA'],
    option2: ['optionX'],
    option3: ['optionB'],
    option4: ['optionY'],
    option5: ['optionC'],
};

export default function AddIntern({ nAVbAR, setnAVbAR }) {

    const [Name, setName] = useState('')
    const [firstSelectValue, setFirstSelectValue] = useState('');
    const [secondSelectValue, setSecondSelectValue] = useState('');

    const handleFirstSelectChange = (e) => {
        const selectedValue = e.target.value;
        setFirstSelectValue(selectedValue);

        if (selectedValue in optionsMap) {
            setSecondSelectValue(optionsMap[selectedValue][0]);
        } else {
            setSecondSelectValue('');
        }
    };

    const handleSecondSelectChange = (e) => {
        setSecondSelectValue(e.target.value);
    };

    function HandelName(e) {
        setName(e.target.value)
    }

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
                            <input type="text" value={Name} onChange={HandelName} />
                        </div>
                        <div>
                            <label htmlFor="">Specialization</label>
                            {/* <select name="" id="">
                                <option value="">select</option>
                                <option value="">Front End Beg</option>
                                <option value="">Front End Adv</option>
                                <option value="">Back End Beg</option>
                                <option value="">Back End Adv</option>
                                <option value="">Mern Stack</option>
                                <option value="">Flutter Beg</option>
                                <option value="">Flatter Adv</option>
                                <option value="">UI/UX</option>
                                <option value="">Marketing</option>
                                <option value="">Graphic design</option>
                            </select> */}
                            <select value={firstSelectValue} onChange={handleFirstSelectChange}>
                                <option value=""></option>
                                <option value="option1">خيار 1</option>
                                <option value="option2">خيار 2</option>
                                <option value="option3">خيار 3</option>
                                <option value="option4">خيار 4</option>
                                <option value="option5">خيار 5</option>
                            </select>
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
                            {/* <select name="" id="">
                                <option value="">select</option>
                                <option value="">Karam Mustafa || Faisal Qashmr</option>
                                <option value="">Karam Mustafa || Mohammed Al-kordy</option>
                                <option value="">Ali Saleh || Abdulrahman Al-Helo</option>
                                <option value="">Karam Mustafa || Somar Kesen || Mohammed Al-kordy || Hashem Othman</option>
                                <option value="">Ahmad Al-Ghneem</option>
                                <option value="">Alaa Darwish</option>
                            </select> */}
                            <select value={secondSelectValue} onChange={handleSecondSelectChange}>
                                <option value=""></option>
                                {firstSelectValue in optionsMap &&
                                    optionsMap[firstSelectValue].map((option) => (
                                        <option key={option} value={option}>{option}</option>
                                    ))}
                            </select>
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
