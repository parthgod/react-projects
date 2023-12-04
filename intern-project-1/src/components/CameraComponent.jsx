import { useGlobalContext } from "../context"
import {AiFillCamera} from 'react-icons/ai'
import CaptureCamera from "./CameraCapture"

const CameraComponent=({index,name,value,error,label})=>{

    const { camera, setCamera, showImg, setShowImg, errorFlag } = useGlobalContext()

    return (
        <div className="form-element" key={index}>
            <label>{label}</label>
            <button id={name} className="camera-input-field" onClick={() => setCamera(true)}
                value='Click here to capture'
                name={name}><AiFillCamera />Click here to capture</button>
            {value && <div className="img-details" onClick={() => { setShowImg(!showImg) }}>{value['FileName']}</div>}
            {showImg && <img src={value['FileContent']} />}
            {camera && <CaptureCamera name={name} />}
            {error && <div className={`error ${errorFlag[name] ? `green` : ``}`}>{error}</div>}
        </div>
    )

}

export default CameraComponent