import { MdDeleteForever, MdModeEdit } from 'react-icons/md'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

export default function VersionSiction({ nAVbAR , version}) {

  const token = localStorage.getItem('token');

  return (
      <section className={nAVbAR ? 'MainSECTION' : 'MainSECTION-off'}>
      <section className='ALL-Data'>
        <div className={nAVbAR ? 'Fq-NavOptions-off' : 'Fq-NavOptions'}>
          <Link
            to={'/MainDash/Addversion'}
            className='aa'
          >Add Version
          </Link>
        </div>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>star tDate</th>
              <th>End Date</th>
              <th>Options</th>
            </tr>
          </thead>
          <tbody>
            {version.map((row, index) => (
              <tr key={index}>
                <td>{row.name}</td>
                <td>{row.startDate}</td>
                <td>{row.endDate}</td>
                <td className='Options'>
                  <Link
                        to={`/MainDash/Editversion/${row.id}`}
                  >
                    <MdModeEdit color='#FF8500' />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </section>
  )
}
