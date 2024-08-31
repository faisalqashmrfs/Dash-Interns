import React, { useEffect, useState } from 'react';
import { parse, format } from 'date-fns';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import QRCode from 'qrcode.react';

import NavSidBar from '../NavSidBar/NavSidBar';
import focal from './../../assets/focal X 1.svg';
import focalx from './../../assets/Group 7.svg';
import stamp1 from './../../assets/Images/e-sign-stamp1.svg';
import './ONEintern.css';

export default function ONEintern({ nAVbAR, setnAVbAR , versionid}) {

  const { id } = useParams();
  const token = localStorage.getItem('token');
  const [Data, setData] = useState('');
  const [start, setstart] = useState('');
  const [end, setend] = useState('');
  const [text, setText] = useState('');
  const [looder, setlooder] = useState(false);

  useEffect(() => {
    setlooder(true)
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`https://internships.focal-x.com/api/intern/${id}`,
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            }
          }
        );
        const data = response.data;
        console.log(Data);
        setData(data);
        setstart(versionid.startDate);
        setend(versionid.endDate);
        const wordsToRemove = ['Lvl.1', 'Lvl.2', 'Lvl.3', "Web" , "Development" , '|' , 'App'];
        const updatedText = removeWords(data.specialization, wordsToRemove);
        setText(updatedText);
        setlooder(false)
      } catch (error) {
        // console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, [id, token]);

  const removeWords = (text, wordsToRemove) => {
    wordsToRemove.forEach(word => {
      const escapedWord = word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // هروب الأحرف الخاصة
      const regex = new RegExp(escapedWord, 'gi');
      text = text.replace(regex, '');
    });
    return text.replace(/\s+/g, ' ').trim();
  };

  const parseDate = (dateString, formatString) => {
    try {
      const date = parse(dateString, 'yyyy-MM-dd', new Date());
      return format(date, formatString);
    } catch (error) {
      // console.error('Error parsing date:', error);
      return dateString;
    }
  };

  const formattedStart = parseDate(start, 'MMMM yyyy');
  const formattedEnd = parseDate(end, 'MMMM yyyy');
  const formattedEnd2 = parseDate(end, 'dd/MM/yyyy');

  return (
    <section className='OneIntern-certificate'>
      {looder ?
                <div className='Looder-Geniral'>
                     Loading <span></span>
                </div>
                :
                ''
            }
      {Data ? <section>
        <NavSidBar nAVbAR={nAVbAR} setnAVbAR={setnAVbAR} />
        <section className={nAVbAR ? 'DataIntern-off' : 'DataIntern'}>
          <Link
            to={'/MainDash'}
            className={nAVbAR ? 'Back-form' : 'Back-form-off'}
          >
            <IoMdArrowRoundBack />
            Back
          </Link>
          <div className='Body-info'>
            <div className='one-info'>
              <h3>Name :</h3>
              <p>{Data.name.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</p>
            </div>
            <div className='one-info'>
              <h3>ID-Certificate :</h3>
              <p>{Data.id_certificate}</p>
            </div>
            <div className='one-info'>
              <h3>KPI :</h3>
              <p>{Data.kpi}</p>
            </div>
            <div className='one-info'>
              <h3>E-mail : </h3>
              <p> {Data.email}</p>
            </div>
            <div className='one-info'>
              <h3>Specilization :</h3>
              <p>{Data.specialization}</p>
            </div>
            <div className='one-info'>
              <h3>Address :</h3>
              <p>{Data.address}</p>
            </div>
            <div className='one-info'>
              <h3>Supervisor :</h3>
              <p>{Data.supervisor}</p>
            </div>
            <div className='one-info'>
              <h3>Certificate Type :</h3>
              <p>{Data.certificate_type}</p>
            </div>
            <div className='one-info'>
              <h3>Start Data :</h3>
              <p>{versionid.startDate}</p>
            </div>
            <div className='one-info'>
              <h3>End Data :</h3>
              <p>{versionid.endDate}</p>
            </div>
          </div>
          <div className='Controle-Certificate'>
            <button onClick={() => createPDF(Data.name)}>شهادة حضور</button>
            <button onClick={() => createPDF2(Data.name)}>شهادة تخرج</button>
            <button onClick={() => createPDF3(Data.name)}>رسالة توصية</button>
          </div>

        </section>
        <div className='certificate1'>
          <div className='box-certificate'>
            <div id="pdf-content" className='PDF-containar'>
              <div className='Border'>
                <div className='top'>
                  <p>INTERNSHIP CERTIFICATE</p>
                  <div><img src={focal} alt="focal-x" /></div>
                </div>
                <div className='Mid'>
                  <span>This is to certify that</span>
                  <p>{Data.name.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</p>
                  <span>attend 4 months internship program in</span>
                  <p>{Data.specialization}</p>
                  <span>a program offered by focal X (L.L.C).</span>
                </div>
                <div className='End'>
                  <div className='left'>
                    <div className='qr'>
                      <QRCode
                        value="https://www.focal-x.com"
                        size={78}
                        bgColor={"#ffffff"}
                        fgColor={"#000000"}
                        level={"L"}
                        includeMargin={false}
                        renderAs={"svg"}
                      />
                    </div>
                    <div className='description'>
                      <span className='xxx'>Scan To Search</span>
                      <span>Issued 2024-July</span>
                      <span>VALID CERTIFICATE ID</span>
                      <span>{Data.id_certificate}</span>
                    </div>
                  </div>
                  <div className='right'>
                    <div className='CEOName'>Alaa Darwish</div>
                    <div className='ceo'>Founder & CEO</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='box-certificate'>
            <div id="pdf-content2" className='PDF-containar'>
              <div className='Border border2'>
                <div className='top'>
                  <p>INTERNSHIP CERTIFICATE</p>
                  <div><img src={focal} alt="focal-x" /></div>
                </div>
                <div className='Mid mid2'>
                  <span>This is to certify that</span>
                  <p>{Data.name.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</p>
                  <span className='midmid'>successfully completed four months internship program<br /> and received passing grades for certificate in</span>
                  <p>{Data.specialization}</p>
                  <span>a program offered by focal X (L.L.C).</span>
                </div>
                <div className='End'>
                  <div className='left'>
                    <div className='qr'>
                      <QRCode
                        value="https://www.focal-x.com"
                        size={78}
                        bgColor={"#ffffff"}
                        fgColor={"#000000"}
                        level={"L"}
                        includeMargin={false}
                        renderAs={"svg"}
                      />
                    </div>
                    <div className='description'>
                      <span className='xxx'>Scan To Search</span>
                      <span>Issued 2024-July</span>
                      <span>VALID CERTIFICATE ID</span>
                      <span>{Data.id_certificate}</span>
                    </div>
                  </div>
                  <div className='right'>
                    <div className='CEOName'>Alaa Darwish</div>
                    <div className='ceo'>Founder & CEO</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='box-certificate x'>
            <div id="pdf-content3" className='PDF-containarA4'>
              <div className='theTop'>
                <img src={focalx} alt="focalx" />
                <span>simple & clean</span>
              </div>
              <h3>Recommendation Letter</h3>
              <div className='dESCRIP'>
                <h5>To whom it may concern,</h5>
                <p>I am writing to recommend <span className='h1'>{Data.name.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</span><br />
                  {Data.genders === 'male' ? 'He':'She'} successfully completed a four-months training program<br />
                  in {Data.specialization} from {formattedStart} to {formattedEnd}.
                </p>
                <p>{Data.name.split(' ')[0].charAt(0).toUpperCase() + Data.name.split(' ')[0].slice(1)} is a motivated individual with a passion for {text}. <br />
                {Data.genders === 'male' ? 'He':'She'} demonstrated exceptional creativity, attention to detail, technical expertise, teamwork, and adaptability during the program.
                </p>
                <p>
                  {Data.name.split(' ')[0].charAt(0).toUpperCase() + Data.name.split(' ')[0].slice(1)}  would be a valuable asset to your company.<br />
                  {Data.genders === 'male' ? 'He':'She'} has the skills and work ethic to thrive in {text}.<br />
                  I highly recommend {Data.genders === 'male' ? 'him':'her'} for employment and encourage you to consider {Data.genders === 'male' ? 'his':'her'} application.
                </p>
                <p>
                  Please feel free to contact me if you require further information about  {Data.name.split(' ')[0].charAt(0).toUpperCase() + Data.name.split(' ')[0].slice(1)}'s qualifications and performance.
                </p>
              </div>
              <h6>Thank You,</h6>
              <div className='Thank-Name'>
                <img src={stamp1} alt="" />
                <p>
                  <span>Alaa Darwish</span>
                  <span>Founder & CEO</span>
                </p>
                <p>
                  Date: 15/07/2024
                  {/* {formattedEnd2} */}
                </p>
              </div>
              <div className='end-certificate'>
                <div>
                  <p><span>focal X agency</span> (Syrian O.P limited liability co.)</p>
                  <p className='Tajawal'>محدودة المسؤولية <span><span className='Montserat Bolderr'>focal X</span><span style={{margin:'0 0 -4px 2px'}}>شركة</span></span></p>
                </div>
                <div>
                  <p>Commercial register No.10062 Latakia 2022</p>
                  <p className='Tajawal'><>س.ت</>: <span className='Montserat'>10062</span> <>اللاذقية</> <span className='Montserat'>2022</span></p>
                </div>
                <div>
                  <p><span>Head Office: </span> Latakia - Alshekh daher</p>
                  <p className='Tajawal'><span> المكتب الرئيسي</span>: اللاذقية - الشيخ ضاهر - مقابل المركز الثقافي </p>
                </div>
                <div>
                  <p>Tel: +963 41 221 5201   |   Fax: +963 41 5202</p>
                  <p className='Tajawal'>+<>هاتف</>: <span className='Montserat'>5201 221 41 963+</span>  | <>فاكس</>: <span className='Montserat'>5202 41 963</span></p>
                </div>
                <div>
                  <p>Customer Service +963 953 666 056</p>
                  <p className='Tajawal'>+<>خدمة العملاء</>: <span className='Montserat'>056 666 953 963</span></p>
                </div>
                <div>
                  <p className='or-fq-fq'>contact@focal-x.com | www.focal-x.com</p>
                  <p className='or-fq-fq'>contact@focal-x.com | www.focal-x.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> : <></>}
    </section>
  )
}
const createPDF = (name) => {
  const input = document.getElementById('pdf-content');

  html2canvas(input, { scale: 5 }).then((canvas) => { // استخدم scale أعلى لتحسين الدقة
    const imgData = canvas.toDataURL('image/png', 1.0); // استخدم الجودة القصوى عند التحويل
    const pdf = new jsPDF({
      orientation: 'landscape',
      unit: 'mm',
      format: [222, 157.6]
    });
    pdf.addImage(imgData, 'PNG', 0, 0, 222, 157.6, undefined, 'FAST'); // استخدم 'FAST' لتحسين الأداء
    pdf.save(`${name} Certificate.pdf`);
  });
};

const createPDF2 = (name) => {
  const input = document.getElementById('pdf-content2');

  html2canvas(input, { scale: 5 }).then((canvas) => { // استخدم scale أعلى لتحسين الدقة
    const imgData = canvas.toDataURL('image/png', 1.0); // استخدم الجودة القصوى عند التحويل
    const pdf = new jsPDF({
      orientation: 'landscape',
      unit: 'mm',
      format: [223, 157.6]
    });
    pdf.addImage(imgData, 'PNG', 0, 0, 223, 157.6, undefined, 'FAST'); // استخدم 'FAST' لتحسين الأداء
    pdf.save(`${name} Certificate.pdf`);
  });
};

const createPDF3 = (name) => {
  const input = document.getElementById('pdf-content3');

  html2canvas(input, { scale: 5 }).then((canvas) => { // استخدم scale أعلى لتحسين الدقة
    const imgData = canvas.toDataURL('image/png', 1.0); // استخدم الجودة القصوى عند التحويل
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });
    pdf.addImage(imgData, 'PNG', 0, 0, 210, 297, undefined, 'FAST'); // استخدم 'FAST' لتحسين الأداء
    pdf.save(`${name} Recommendation.pdf`);
  });
};
