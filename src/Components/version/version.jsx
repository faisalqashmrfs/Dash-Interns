import NavSidBar from "../NavSidBar/NavSidBar";
import VersionSiction from "../VersionSiction/VersionSiction";

export default function Version({nAVbAR , setnAVbAR , version}) {
  return (
    <section className='MainDashs'>
        <NavSidBar nAVbAR={nAVbAR} setnAVbAR={setnAVbAR}/>
        <VersionSiction nAVbAR={nAVbAR} version={version}/>
    </section>
  )
}