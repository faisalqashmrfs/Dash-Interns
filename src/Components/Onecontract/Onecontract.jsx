
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import NavSidBar from '../NavSidBar/NavSidBar';
import focal from './../../assets/focal X 1.svg';
import { ClimbingBoxLoader } from 'react-spinners';
import { MdDeleteForever } from 'react-icons/md';
import './Onecontract.css'

export default function Onecontract({ nAVbAR, setnAVbAR }) {
  const { id } = useParams();
  const token = localStorage.getItem('token');
  const [Data, setData] = useState([]);
  const [looder, setlooder] = useState(false);
  const [Masseg, setMasseg] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setlooder(true)
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`https://internships.focal-x.com/api/contract/${id}`,
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            }
          }
        );
        const data = response.data.data;
        console.log(response.data.data);
        setData(data);
        setlooder(false)
        
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, [id, token]);
  
  const handleDelete = () => {
    setMasseg(false);
    axios.delete(`https://internships.focal-x.com/api/contract/${id}`,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        }
      }
    )
      .then(response => {
        console.log(response);
        setDeleted(true);
        navigate('/MainDash/contracts');
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <section className='OneIntern-certificate'>
      {looder ? (
        <div className='Looder-Geniral'>
           Loading <span></span>
        </div>
      ) : (
        ''
      )}
      {Data ? (
        <section>
          <NavSidBar nAVbAR={nAVbAR} setnAVbAR={setnAVbAR} />
          <section className={nAVbAR ? 'DataIntern-off' : 'DataIntern'}>
            <Link to={'/MainDash/contracts'} className={nAVbAR ? 'Back-form' : 'Back-form-off'}>
              <IoMdArrowRoundBack />
              Back
            </Link>
            <div className='Body-info'>
              <div className='one-info'>
                <h3>Name :</h3>
                <p>{Data.full_name}</p>
              </div>
              <div className='one-info'>
                <h3>ID-Number :</h3>
                <p>{Data.id_number}</p>
              </div>
              <div className='one-info'>
                <h3>specialization :</h3>
                <p>{Data.specialization}</p>
              </div>
            </div>

            <div className='Controle-Certificate'>
              <button onClick={() => createPDF(Data.full_name , Data.specialization)}>طباعة العقد</button>
              <button onClick={() => handleDelete()}><MdDeleteForever color='#FF8500' />حذف العقد</button>
            </div>
          </section>
          <div className='certificate1 certificate1x'>
            <div className='box-certificate'>
              <div id="pdf-content" className='PDF-containarx'>
              <img src={focal} alt="focal-x" />
                <h3>عقد تدريب مؤقت</h3>
                <p>أنا المتدرب/ة: <span>{Data.full_name}</span>.</p>
                <p>أحمل الهوية الشخصية/جواز السفر رقم: <span>{Data.id_number}</span>.</p>
                <p>أتفق مع الطرف الأول شركة فوكال اكس (نقطة الارتكاز محدودة المسؤولية)، سجل تجاري رقم: 10062 <br />
                  بكامل الإرادة وتمام الأهلية على الدخول في دورة تدريب مؤقت بناءً على ما أكدته من رغبة وقدرة على القيام بمهام ومسؤوليات التدريب، وعدم خضوعي لأي قيود تمنعني من القيام بهذه المهام والمسؤوليات.
                </p>
                <p>
                فقد وافقت بصفتي المتدرب (الطرف الثاني) على الخضوع لتدريب لدى الطرف الأول في الاختصاص المتفق عليه وتم تعبئته في استمارة التسجيل وفقاً للأحكام والشروط التالية:
                </p>
                <p>
                التزم بما يلي:
                </p>
                <p>
                -جميع مراحل التدريب (النظري – التفاعلي – العملي – مشروع التخرج) التي تبدأ من تاريخ 1/8/2024م وتستمر لمدة أربعة أشهر، ويحق للطرف الأول تمديد هذه المدة لشهر واحد تبعاً للأعطال الرسمية والأعياد وعطل المراجعة اللازمة للتدريب التي يقررها الطرف الأول.
                </p>
                <p>
                -حضور الجلسات النظرية في مواعيدها وفقاً لاختصاص تدريبي والمحددة في الملف الرسمي للتدريب، وحضور الاجتماعات المطلوبة من قبل الطرف الأول ضمن أوقات التدريب أو خارجها.
                </p>
                <p>
                -القيام بالمهام والمسؤوليات (التدريب العملي) التي تحدد من قبل فريق التدريب وفقاً لاختصاص تدريبي وتسليم المهام في الوقت الذي يحدده فريق التدريب بدون تأخير عن الموعد.
                </p>
                <p>
                -التواجد على منصات التواصل الاجتماعي المطلوبة في عملية التدريب والاطلاع المستمر على كافة التعليمات الإدارية اللازمة لمتابعة التدريب.
                </p>
                <p>
                - عدم الانخراط في أي نقاش سياسي أو ديني أو عنصري أثناء التدريب لدى الطرف الأول، ويمنع منعاً باتاً أي نوع من أنواع التنمر أو العنصرية أو التحرش الجنسي سواء كان بدني أو لفظي أو الكتروني.
                </p>
                <p>
                -سرية المنهاج التعليمي ويشمل ذلك دونما حصر (تسجيل الجلسات النظرية – الملخصات – الروابط – الأعمال والمهام) وعدم تخزينها أو مشاركتها مع أي أطراف خارجية خلال أو بعد انتهاء التدريب.
                </p>
                <p>
                -الأنظمة واللوائح الداخلية والقرارات والتعليمات المعتمدة لدى الطرف الأول.
                </p>
                <p>
                - الإقرار بأن حقوق الملكية الفكرية وحقوق المؤلف للأعمال التي قمت بتنفيذها خلال هذا العقد تعود ملكيتها الفكرية للطرف الأول ويشمل ذلك دونما حصر البرمجيات والتطبيقات والأنظمة والدراسات والأبحاث ومواد التدريب وبراءات الاختراع والنماذج والرسوم الصناعة والتصاميم الهندسية وما في حكمها.
                </p>
                <p>
                - معايير السلوك الوظيفي القويم الذي يتفق مع طبيعة تدريبي.
                </p>
                <p>
                -المحافظة وعدم الإفصاح أو الكشف عن أية معلومات خطيّة كانت أو شفهيّة، سريّة كانت بطبيعتها أو محتواها أو بحكم الضوابط والتعليمات الصادرة بشأنها سواء كانت هذه المعلومات تخص الشركة أو أية شركة أخرى دون الحصول على إذن خطي صريح ومسبق بذلك من الإدارة.
                </p>
                <p>
                -عدم نقل مضمون أو ملكية أي ملف أو مشروع مملوك للشركة أو تعديله أو ترجمته أو نسخه أو نشره أو تصويره دون الحصول على إذن خطي صريح ومسبق بذلك من الإدارة.
                </p>
              </div>
              <div id="pdf-content-page2" className='PDF-containarx2'>
                <p>-المحافظة على الممتلكات المادية والفكرية الخاصة بالطرف الأول، والمحافظة على ملفات وسجلات العمل والمتعاملين بطريقة صحيحة وآمنة والحفاظ على أمن وسلامة وسائل ووسائط الاتصال الإلكترونية وعدم استخدامها لأغراض شخصيّة أو تخرج عن نطاق العمل أو بصورة تمكن أطراف خارجية من الاطلاع غير المصرح به على أنظمة معلومات الشركة.</p>
                <p>
                  -إعادة وتسليم كافة ما في عهدتي من الوثائق والملفات والمواد والأجهزة أو أية ممتلكات أخرى ذات صلة بعملي تخص الشركة سواء كانت سرية أم لا عند انتهاء التدريب، ويتضمن ذلك المواد التي تعود لأطراف أخرى حصلت عليها في سياق القيام بمهام ومشاريع التدريب عند الانتهاء خدمتي أو عند نقلي لمشروع آخر لا يتطلب ابقائها بحوزتي.
                </p>
                <p>
                  -إزالة كافة المعلومات والبيانات التي تعود بملكيتها إلى الشركة بشكل نهائي وغير قابل للاستعادة من كافة وسائط التخزين سواء كانت في حيازتي أو تحت تصرفي وذلك عند انتهاء التدريب وفقاً للطريقة التي تقرها الإدارة.
                </p>
                <p>
                  -عدم الاشتراك في عملية أو محادثة أو قرار بهدف تعطيل أو تضييق مصالح المتعاملين أو المتدربين الذين تجمعهم به عداوة سابقة أو مشاعر بُغض أو لأسباب عنصرية أو غيرها.
                </p>
                <p>
                  - دفع كافة المستحقات المالية في موعدها وكما تم الاتفاق عليه.
                </p>
                <p>
                  -في حال مخالفتي لأي من التزاماتي المذكورة في هذا العقد، وبعد إرسال الطرف الأول إنذار لي عند المخالفة الأولى، وفي حال الاستمرار بالمخالفة بعد التنبيه، يحق للطرف الأول إنهاء العقد أثناء مدة سريانه شريطة إخطاري بذلك خطياً قبل 5 أيام عمل من تاريخ الإنهاء، ولا يترتب على الطرف الأول أية التزامات مالية أو غيرها عند فسخ العقد.
                </p>
                <p>
                  - يحق لي الانسحاب من التدريب شريطة إخطار الطرف الأول بذلك قبل 10 أيام عمل، ولا يترتب على الطرف الأول أية التزامات مالية أو غيرها عند انسحاب الطرف الثاني.
                </p>
                <p>
                  - في حال إخلالي بأي من الالتزامات المشار إليها أعلاه فإنه يحق للطرف الأول أن يتخذ قرار الفصل من التدريب وكافة الإجراءات القانونية السارية في الجمهورية العربية السورية أو في أي دولة يوجد فيها الطرف الأول.
                </p>
                <p>
                  أوافق على الشروط والأحكام وموافقتي وكتابة اسمي يعتبر توقيع على العقد والتزامي بشروط التدريب
                </p>
                <span>{Data.full_name}</span>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <></>
      )}
      <section className='DeletingMasseg-box'>
          <div className={Masseg ? 'DeletingMasseg' : 'DeletingMasseg-off'}>
            <h2>Do You Want To Delete This Row</h2>
            <div>
              <button className='Yes'
                onClick={handleDelete}
              >Yes</button>
              <button className='No'
                onClick={() => setMasseg(false)}
              >No</button>
            </div>
          </div>
        </section>
    </section>
  );
}

const createPDF = ( name , specialization ) => {
  const input1 = document.getElementById('pdf-content');
  const input2 = document.getElementById('pdf-content-page2');

  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  html2canvas(input1, { scale: 5 }).then((canvas) => {
    const imgData1 = canvas.toDataURL('image/png', 1.0);
    pdf.addImage(imgData1, 'PNG', 0, 0, 210, 297, undefined, 'FAST'); // A4 dimensions: 210mm x 297mm

    html2canvas(input2, { scale: 5 }).then((canvas) => {
      const imgData2 = canvas.toDataURL('image/png', 1.0);
      pdf.addPage();
      pdf.addImage(imgData2, 'PNG', 0, 0, 210, 297, undefined, 'FAST'); // A4 dimensions: 210mm x 297mm

      pdf.save(`${name}_${specialization}_Contract.pdf`);
    });
  });
};
