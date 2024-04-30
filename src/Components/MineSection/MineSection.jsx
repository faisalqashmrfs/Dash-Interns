import { Link } from 'react-router-dom'
import './MineSection.css'
import { FaEye, FaPlusCircle } from "react-icons/fa";
import { MdDeleteForever, MdModeEdit } from 'react-icons/md';
import { useState } from 'react';

export default function MineSection({ nAVbAR }) {

  const [Masseg , setMasseg] = useState(false)

  return (
    <section className={nAVbAR ? 'MainSECTION' : 'MainSECTION-off'}>
      <section className='ALL-Data'>
        <div className={nAVbAR ? 'Fq-NavOptions-off' : 'Fq-NavOptions'}>
          <Link
            to={'/MainDash/AddIntern'}
            className='aa'
          >
            <FaPlusCircle />
            Add Interns
          </Link>
        </div>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Address</th>
              <th>E-Mail</th>
              <th>Specialization</th>
              <th>Supervisor</th>
              <th>Created At</th>
              <th>Options</th>
            </tr>
          </thead>
          <tbody>
            {/* {data.map((row, index) => (
          <tr key={index}>
            <td>{row.column1}</td>
            <td>{row.column2}</td>
            <td>{row.column3}</td>
            <td>{row.column4}</td>
            <td>{row.column5}</td>
            <td>{row.column6}</td>
            <td>{row.column7}</td>
          </tr>
        ))} */}
            <tr >
              <td>row.variabelsss</td>
              <td>row.variabels</td>
              <td>row.variabels</td>
              <td>row.variabels</td>
              <td>row.variabels</td>
              <td>row.variabels</td>
              <td className='Options'>
                <Link
                to={'/MainDash/ShowUntern'}
                >
                  <FaEye color='#FF8500' />
                </Link>
                <Link to={'/MainDash/AddIntern'}>
                  <MdModeEdit color='#FF8500' />
                </Link>
                <Link
                onClick={() => setMasseg(true)}
                >
                  <MdDeleteForever color='#FF8500' />
                </Link>
              </td>
            </tr>
            <tr >
              <td>row.variabelsss</td>
              <td>row.variabels</td>
              <td>row.variabels</td>
              <td>row.variabels</td>
              <td>row.variabels</td>
              <td>row.variabels</td>
              <td className='Options'>
                <Link
                to={'/MainDash/ShowUntern'}
                >
                  <FaEye color='#FF8500' />
                </Link>
                <Link to={'/MainDash/AddIntern'}>
                  <MdModeEdit color='#FF8500' />
                </Link>
                <Link
                onClick={() => setMasseg(true)}
                >
                  <MdDeleteForever color='#FF8500' />
                </Link>
              </td>
            </tr>
            <tr >
              <td>row.variabelsss</td>
              <td>row.variabels</td>
              <td>row.variabels</td>
              <td>row.variabels</td>
              <td>row.variabels</td>
              <td>row.variabels</td>
              <td className='Options'>
                <Link
                to={'/MainDash/ShowUntern'}
                >
                  <FaEye color='#FF8500' />
                </Link>
                <Link to={'/MainDash/AddIntern'}>
                  <MdModeEdit color='#FF8500' />
                </Link>
                <Link
                onClick={() => setMasseg(true)}
                >
                  <MdDeleteForever color='#FF8500' />
                </Link>
              </td>
            </tr>
            <tr >
              <td>row.variabelsss</td>
              <td>row.variabels</td>
              <td>row.variabels</td>
              <td>row.variabels</td>
              <td>row.variabels</td>
              <td>row.variabels</td>
              <td className='Options'>
                <Link
                to={'/MainDash/ShowUntern'}
                >
                  <FaEye color='#FF8500' />
                </Link>
                <Link to={'/MainDash/AddIntern'}>
                  <MdModeEdit color='#FF8500' />
                </Link>
                <Link
                onClick={() => setMasseg(true)}
                >
                  <MdDeleteForever color='#FF8500' />
                </Link>
              </td>
            </tr>
            <tr >
              <td>row.variabelsss</td>
              <td>row.variabels</td>
              <td>row.variabels</td>
              <td>row.variabels</td>
              <td>row.variabels</td>
              <td>row.variabels</td>
              <td className='Options'>
                <Link
                to={'/MainDash/ShowUntern'}
                >
                  <FaEye color='#FF8500' />
                </Link>
                <Link to={'/MainDash/AddIntern'}>
                  <MdModeEdit color='#FF8500' />
                </Link>
                <Link
                onClick={() => setMasseg(true)}
                >
                  <MdDeleteForever color='#FF8500' />
                </Link>
              </td>
            </tr>
            <tr >
              <td>row.variabelsss</td>
              <td>row.variabels</td>
              <td>row.variabels</td>
              <td>row.variabels</td>
              <td>row.variabels</td>
              <td>row.variabels</td>
              <td className='Options'>
                <Link
                to={'/MainDash/ShowUntern'}
                >
                  <FaEye color='#FF8500' />
                </Link>
                <Link to={'/MainDash/AddIntern'}>
                  <MdModeEdit color='#FF8500' />
                </Link>
                <Link
                onClick={() => setMasseg(true)}
                >
                  <MdDeleteForever color='#FF8500' />
                </Link>
              </td>
            </tr>
            <tr >
              <td>row.variabelsss</td>
              <td>row.variabels</td>
              <td>row.variabels</td>
              <td>row.variabels</td>
              <td>row.variabels</td>
              <td>row.variabels</td>
              <td className='Options'>
                <Link
                to={'/MainDash/ShowUntern'}
                >
                  <FaEye color='#FF8500' />
                </Link>
                <Link to={'/MainDash/AddIntern'}>
                  <MdModeEdit color='#FF8500' />
                </Link>
                <Link
                onClick={() => setMasseg(true)}
                >
                  <MdDeleteForever color='#FF8500' />
                </Link>
              </td>
            </tr>
          </tbody>
        </table>
        <section className='DeletingMasseg-box'>
        <div className={Masseg ? 'DeletingMasseg' : 'DeletingMasseg-off'}>
          <h2>Do You Wont To Delet This Row</h2>
          <div>
            <button className='Yes'>Yes</button>
            <button className='No'
            onClick={() => setMasseg(false)}
            >No</button>
          </div>
        </div>
        </section>
      </section>
    </section>
  )
}
