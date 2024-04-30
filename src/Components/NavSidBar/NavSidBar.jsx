import { Link } from 'react-router-dom';
import './NavSidBar.css'
import { TfiAlignJustify, TfiAlignLeft } from "react-icons/tfi";

export default function NavSidBar({ setnAVbAR, nAVbAR }) {

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
