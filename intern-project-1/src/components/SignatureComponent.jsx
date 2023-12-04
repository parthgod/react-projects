import { useGlobalContext } from "../context"
import {AiFillCamera} from 'react-icons/ai'
import SignaturePadComponent from "./SignaturePad"

const SignatureComponent=({index,name,value,error,label})=>{

    const { signature, setSignature, showSigImg, setShowSigImg, errorFlag } = useGlobalContext()

    return (
        <div className="form-element" key={index}>
            <label>{label}</label>
            <button id={name} className="camera-input-field" onClick={(e) => {
                e.preventDefault()
                setSignature(true)
            }}
                value='Click here to capture'
                name={name}><AiFillCamera />  Click here to capture</button>
            {value && <div className="img-details" onClick={() => { setShowSigImg(!showSigImg) }}>{value['FileName']}</div>}
            {showSigImg && <img src={value['FileContent']} />}
            {signature && <SignaturePadComponent name={name} />}
            {error && <div className={`error ${errorFlag[name] ? `green` : ``}`}>{error}</div>}
        </div>
    )

}

export default SignatureComponent;