import React, { useRef } from "react";
import { useGlobalContext } from "../context";
import { AiOutlineClose } from 'react-icons/ai'
import SignaturePad from "react-signature-canvas";

const SignaturePadComponent = ({ name }) => {
    const { setInputValues, setSignature,setFileData } = useGlobalContext()
    const sigCanvas = useRef({});

    const clear = () => sigCanvas.current.clear();

    const handleSignatureInput = () => {
        const image=sigCanvas.current.getTrimmedCanvas().toDataURL("image/png");
        const trimmedData = image.substring(image.indexOf(',') + 1);
        const obj = {}
        const currentDate = new Date();
        const day = String(currentDate.getDate()).padStart(2, '0');
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        const year = String(currentDate.getFullYear());
        const newFilename = `${day}-${month}-${year}-signature.png`;
        obj['FileName'] = newFilename
        obj['FileContent'] = trimmedData
        const tempobj={}
        tempobj['FileName'] = newFilename
        tempobj['FileContent'] = image
        setFileData((prev)=>({...prev,[name]:obj}))
        setInputValues((prevInputValues) => ({ ...prevInputValues, [name]: tempobj }));
        setSignature(false)
    }

    return (
        <div className="modal-overlay">
            <div className="modal-container capture-image">
                <div className="camera-title">
                    <div>Capture Signature</div>
                    <div className="closebtn" onClick={() => { setSignature(false) }}><AiOutlineClose /></div>
                </div>
                <div className="images">
                    <div className="take-image">
                        <div className="heading-1">
                            <div>Signature</div>
                            <div>
                                <button onClick={(e)=>{e.preventDefault();clear()}} id='sigbtn'>Clear</button>
                                <button onClick={handleSignatureInput}>Save</button>
                            </div>
                        </div>
                        <SignaturePad
                            ref={sigCanvas}
                            canvasProps={{
                                className: "sigcanvas"
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignaturePadComponent;