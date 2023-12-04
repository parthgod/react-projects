import React, { useCallback, useRef, useState } from "react";
import Webcam from "react-webcam";
import { AiOutlineClose } from 'react-icons/ai'
import { useGlobalContext } from "../context";

const CaptureCamera = ({ name }) => {
    const [img, setImg] = useState(null);
    const webcamRef = useRef(null);

    const { setCamera, setInputValues, setFileData } = useGlobalContext()

    const videoConstraints = {
        width: 500,
        height: 500,
        facingMode: "user",
    };

    const capture = useCallback(() => {
        const imageSrc = webcamRef.current.getScreenshot();
        setImg(imageSrc);
    }, [webcamRef]);

    const handleCameraInput = () => {
        const obj = {}
        const currentDate = new Date();
        const day = String(currentDate.getDate()).padStart(2, '0');
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        const year = String(currentDate.getFullYear());
        const newFilename = `${day}-${month}-${year}-image.png`;
        const trimmedData = img.substring(img.indexOf(',') + 1);
        obj['FileName'] = newFilename
        obj['FileContent'] = trimmedData
        setFileData((prev)=>({...prev,[name]:obj}))
        const tempobj={}
        tempobj['FileName'] = newFilename
        tempobj['FileContent'] = img
        setInputValues((prevInputValues) => ({ ...prevInputValues, [name]: tempobj }));
        setCamera(false)
    }

    return (
        <div className="modal-overlay">
            <div className="modal-container capture-image">
                <div className="camera-title">
                    <div>Capture Image</div>
                    <div className="closebtn" onClick={() => { setCamera(false) }}><AiOutlineClose /></div>
                </div>
                <div className="images">
                    <div className="take-image">
                        <div className="heading-1">
                            <div>Camera View</div>
                            <button onClick={(e) => { e.preventDefault(); capture() }}>Capture</button>
                        </div>
                        <Webcam
                            audio={false}
                            mirrored={true}
                            height={400}
                            width={400}
                            ref={webcamRef}
                            screenshotFormat="image/png"
                            videoConstraints={videoConstraints}
                            className="webcam"
                        />
                    </div>

                    {img && <div className="image-preview">
                        <div className="heading-1">
                            <div>Captured Image</div>
                            <div>
                                <button onClick={handleCameraInput}>Save</button>
                            </div>
                        </div>
                        <img src={img} alt="screenshot" />
                    </div>}
                </div>
            </div>
        </div>
    );
}

export default CaptureCamera;