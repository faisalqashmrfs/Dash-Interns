import CoachSection from "../CoachSection/CoachSection";
import NavSidBar from "../NavSidBar/NavSidBar";

export default function Coachs({nAVbAR , setnAVbAR , version , coachs}) {
  return (
    <section className='MainDashs'>
        <NavSidBar nAVbAR={nAVbAR} setnAVbAR={setnAVbAR}/>
        <CoachSection nAVbAR={nAVbAR} version={version} coachs={coachs}/>
    </section>
  )
}
