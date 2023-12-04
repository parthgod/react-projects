import { useEffect } from 'react'
import { useGlobalContext } from '../context'
import DetailsForm from '../components/DetailsForm'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { TbArrowsMaximize, TbArrowsMinimize } from 'react-icons/tb'
import { RiArrowGoBackFill } from 'react-icons/ri'

const ViewDetails = () => {

    const { isloading, statusSelected, fetchDetailsData, setDetailsData, approvalDetails, setApprovalDetails, fetchDropdownData, fetchLineItems, attachment, setTabnames, setAttachment, setErrorFlag, setInputErrors, handleSubmit, saveResponseData, saveStatus, setSaveStatus, setCollapseStates,autoID, setIsClicked } = useGlobalContext()
    const [showModal, setShowModal] = useState(false)
    const [resize, setResize] = useState([true, true])

    useEffect(() => {
        console.clear()
        setAttachment(null)
        setDetailsData([])
        setApprovalDetails([])
        fetchDetailsData(autoID, statusSelected)
    }, [])

    useEffect(() => {
        if (approvalDetails.length) {
            approvalDetails.map((item) => {
                if (item.fieldType.toLowerCase().includes('dropdown')) {
                    fetchDropdownData(item.fieldMappingID, item.fieldID, item.fieldName)
                }
                else if (item.fieldType === 'lineitems') {
                    fetchLineItems(autoID, item.fieldMappingID, item.fieldName)
                }
                if (item.isMandatory === 1) {
                    const err = '*required'
                    setInputErrors((preverrors) => ({ ...preverrors, [item.fieldName]: err }))
                    setErrorFlag((preverrors) => ({ ...preverrors, [item.fieldName]: false }))
                }
            })
        }
        const tabs = [...new Set(approvalDetails.map((item) => item.tabName))]
        tabs.map((tab) => { setCollapseStates((prev) => ({ ...prev, [tab]: false })) })
        setTabnames(tabs)
    }, [approvalDetails])

    const handleResize = (id1, id2, ind) => {
        if (resize[ind]) {
            document.getElementById(id1).style.display = 'block'
            document.getElementById(id2).style.display = 'none'
        }
        else {
            document.getElementById(id1).style.display = 'block'
            document.getElementById(id2).style.display = 'block'
        }
        const tempResize = { ...resize }
        tempResize[ind] = !tempResize[ind]
        setResize(tempResize)
        console.log(resize[ind]);
    }

    if (isloading) {
        return (
            <div className="load">
                <div className="loading-wave">
                    <div className="loading-bar"></div>
                    <div className="loading-bar"></div>
                    <div className="loading-bar"></div>
                    <div className="loading-bar"></div>
                </div>
            </div>
        )
    }

    return (
        <div className='container'>
            {/* <pre>{JSON.stringify(approvalDetails,null,2)}</pre> */}
            <div className='details-container'>
                <div className='title'>
                    Processing Details
                    <div style={{display:'flex', gap:'1rem'}}>
                        {resize[0] ? <TbArrowsMaximize className='resize' onClick={() => handleResize('details-form', 'attachment-form', 0)} /> : <TbArrowsMinimize className='resize' onClick={() => handleResize('details-form', 'attachment-form', 0)} />}
                        <RiArrowGoBackFill className='resize' onClick={()=>setIsClicked(false)} />
                    </div>
                </div>
                <div className='details-form-container'>
                    <DetailsForm />
                    <div className='form view-attachment' id='attachment-form'>
                        <div className='attachment-title'>View Attachment{resize[1] ? <TbArrowsMaximize className='resize' onClick={() => handleResize('attachment-form', 'details-form', 1)} /> : <TbArrowsMinimize className='resize' onClick={() => handleResize('attachment-form', 'details-form', 1)} />}</div>
                        <div className='file'>
                            {attachment ? attachment === 'null' ? <p>Error loading file</p> : <iframe src={attachment} className='file-viewer'></iframe> : ''}
                        </div>
                    </div>
                </div>
                <div className="control-btn">
                    <button onClick={handleSubmit}>Submit</button>
                    <button onClick={() => { setShowModal(true) }}>Cancel</button>
                </div>
            </div>
            {showModal && <div className="modal-overlay">
                <div className="modal-container">
                    <div className="modal-content">
                        Are you sure you want to cancel and go back?
                    </div>
                    <div className="modal-btn">
                        <Link to='/'>
                            <button id='yes'>YES</button>
                        </Link>
                        <button id='no' onClick={() => { setShowModal(false) }}>NO</button>
                    </div>
                </div>
            </div>}
            {saveStatus && <div className="modal-overlay">
                {!Object.keys(saveResponseData).length && <div className="spinner"></div>}
                {Object.keys(saveResponseData).length && saveResponseData[0]['Status'] === 'Success' &&
                    <div className="modal-container save">
                        <div className="modal-content">
                            <svg className="checkmark" viewBox="0 0 52 52">
                                <circle className="checkmark__circle" cx="26" cy="26" r="25" fill="none" />
                                <path className="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
                            </svg>
                            <div className="save-data">
                                <div>{saveResponseData[0]['Status']}</div>
                                <div>{saveResponseData[0]['Message']}</div>
                            </div>
                        </div>
                        <div className="modal-btn save-btn">
                            <button id='yes' onClick={(e) => { e.preventDefault(); setSaveStatus(false); window.location.reload(false) }}>OK</button>
                        </div>
                    </div>}
            </div>}
        </div >
    );

}

export default ViewDetails