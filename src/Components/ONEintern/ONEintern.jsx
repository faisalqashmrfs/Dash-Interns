import { IoMdArrowRoundBack } from 'react-icons/io'
import NavSidBar from '../NavSidBar/NavSidBar'
import './ONEintern.css'
import { Link } from 'react-router-dom'
import React, { useState } from 'react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import QRCode from 'qrcode.react';
import focal from './../../assets/focal X 1 (1).png';
import focalx from './../../assets/Group 7.png';


export default function ONEintern({ nAVbAR, setnAVbAR }) {

  return (
    <section>
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
            <p>test@test.com</p>
          </div>
          <div className='one-info'>
            <h3>ID-Certificate :</h3>
            <p>test@test.com</p>
          </div>
          <div className='one-info'>
            <h3>KPI :</h3>
            <p>test@test.com</p>
          </div>
          <div className='one-info'>
            <h3>E-mail : </h3>
            <p> test@test.com</p>
          </div>
          <div className='one-info'>
            <h3>Specilization :</h3>
            <p>test@test.com</p>
          </div>
          <div className='one-info'>
            <h3>Address :</h3>
            <p>test@test.com</p>
          </div>
          <div className='one-info'>
            <h3>Supervisor :</h3>
            <p>test@test.com</p>
          </div>
          <div className='one-info'>
            <h3>Certificate Type :</h3>
            <p>test@test.com</p>
          </div>
          <div className='one-info'>
            <h3>Start Data :</h3>
            <p>test@test.com</p>
          </div>
          <div className='one-info'>
            <h3>End Data :</h3>
            <p>test@test.com</p>
          </div>
        </div>
        <div className='Controle-Certificate'>
          <button onClick={createPDF}>شهادة حضور</button>
          <button onClick={createPDF2}>شهادة تخرج</button>
          <button onClick={createPDF3}>رسالة توصية</button>
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
                <p>Rama Mohammed Shaher Alabsah</p>
                <span>attend 4 months internship program in</span>
                <p>Web Development Front-end lvl.2</p>
                <span>a program offered by focal X (L.L.C)</span>
              </div>
              <div className='End'>
                <div className='left'>
                  <div className='qr'>
                    <QRCode
                      value="https://www.example.com"
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
                    <span>Issued 2024-December</span>
                    <span>VALID CERTIFICATE ID</span>
                    <span>9PED0SS3Z08</span>
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
                <p>Rama Mohammed Shaher Alabsah2</p>
                <span className='midmid'>successfully completed four months internship program<br /> and received passing grades for certificate in</span>
                <p>Web Development Front-end lvl.2</p>
                <span>a program offered by focal X (L.L.C)</span>
              </div>
              <div className='End'>
                <div className='left'>
                  <div className='qr'>
                    <QRCode
                      value="https://www.example.com"
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
                    <span>Issued 2024-December</span>
                    <span>VALID CERTIFICATE ID</span>
                    <span>9PED0SS3Z08</span>
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
              <p>I am writing to recommend <span className='h1'>Ahmad Mahmud Kerbuje</span><br />
                He successfully completed a four-month training program<br />
                in Digital Marketing front-end levl - 2   from July 2023 to November 2023.
              </p>
              <p>Ahmad Mohammed is a motivated individual with a passion for front-end development. He demonstrated exceptional creativity, attention to detail, technical expertise, teamwork, and adaptability during the program.
              </p>
              <p>
                Ahmad Mohammed  would be a valuable asset to your company.<br />
                He has the skills and work ethic to thrive in digital marketing front-end.<br />
                I highly recommend him for employment and encourage you to consider his application.
              </p>
              <p>
                Please feel free to contact me if you require further information about Ahmad's qualifications and performance.
              </p>
            </div>
              <h6>Thank You,</h6>
            <div className='Thank-Name'>
              <p>
                <span>Alaa Darwish</span>
                <span>Founder & CEO</span>
              </p>
              <p>
                Date: 01\06\2024
              </p>
            </div>
            <div className='end-certificate'>
              <div className='one'></div>
              <div className='tow'></div>
            </div>
          </div>
        </div>
      </div>
    </section>

  )
}



const createPDF = () => {
  const input = document.getElementById('pdf-content');

  html2canvas(input).then((canvas) => {
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({
      orientation: 'landscape',
      unit: 'mm',
      format: [222, 157.6]
    });
    pdf.addImage(imgData, 'PNG', 0, 0);
    pdf.save('شهادة حضور');
  });
};

const createPDF2 = () => {
  const input = document.getElementById('pdf-content2');

  html2canvas(input).then((canvas) => {
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({
      orientation: 'landscape',
      unit: 'mm',
      format: [223, 157.6]
    });
    pdf.addImage(imgData, 'PNG', 0, 0);
    pdf.save('شهادة تخرج');
  });
};

const createPDF3 = () => {
  const input = document.getElementById('pdf-content3');

  html2canvas(input).then((canvas) => {
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({
      orientation: 'portrait', // التوجيه: landscape (أفقي) أو portrait (رأسي)
      unit: 'mm',
      format: [222, 157.6]
    });
    pdf.addImage(imgData, 'PNG', 0, 0);
    pdf.save('توصية');
  });
};