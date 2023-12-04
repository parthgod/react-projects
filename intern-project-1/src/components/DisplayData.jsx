import { useGlobalContext } from "../context"
import { AiOutlineClose } from 'react-icons/ai'
import { BsChevronRight } from 'react-icons/bs'
import DropDownDisplay from "./DropDownDisplay"
import CameraComponent from "./CameraComponent"
import SignatureComponent from "./SignatureComponent"
import InputComponent from "./InputComponent"
import LineItemComponent from "./LineItemComponent"

const DisplayData = () => {

    const { data, loading, inputValues, inputErrors, showModal, tabNames, setShowModal, searchModal, setSearchModal, SearchTable, handleSearch, searchFilteredData, handleSubmit, saveStatus, setSaveStatus, saveResponseData, showData, setCollapseStates, collapseStates } = useGlobalContext()

    const lineitem = []

    const buttons = document.querySelectorAll('button');
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener('click', e => e.preventDefault());
    }

    if (loading) {
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
        <div className="form-container" >
            {tabNames.map((tabName, tabIndex) => {

                return (
                    <div className={`form-con ${collapseStates[tabName] ? 'collapsed' : ''}`} key={tabIndex + 1} id={tabName}>
                        <div className="title" key={tabIndex + 2} onClick={() => setCollapseStates((prev)=>({...prev,[tabName]:!collapseStates[tabName]}))}>{tabName}<BsChevronRight /></div>
                        <div className="form" key={tabIndex}>
                            {data.filter((item) => item.tabName === tabName).map((item, index) => {
                                let { fieldMinLength: min, fieldMaxLength: max, fieldName: name, fieldType: type, isCasacade, isMandatory: mand, fieldMappingID: mapID, cascadingFieldsID, fileExtension: fileType, isDynamicSearchRequired: search, label, isDropdowntextValue: dropCondition, className, validations, dateFormat, isLineItemData, lineItemFieldName: lineName } = item
                                const value = inputValues[name] || ''
                                const error = inputErrors[name] || ''

                                if (typeof min === 'object') min = 0
                                if (typeof max === 'object') max = 0

                                if (name != 'CaptureBarcode' && name != 'MapViewer' && showData[name]) {

                                    if (type.includes('dropdown')) {
                                        return (
                                            <DropDownDisplay
                                                index={index}
                                                name={name}
                                                value={value}
                                                isCasacade={isCasacade}
                                                min={min}
                                                max={max}
                                                mand={mand}
                                                error={error}
                                                mapID={mapID}
                                                cascadingFieldsID={cascadingFieldsID}
                                                label={label}
                                                dropCondition={dropCondition}
                                                validations={validations} />
                                        );
                                    }

                                    else if (type === 'camera') {
                                        return (
                                            <CameraComponent
                                                index={index}
                                                name={name}
                                                value={value}
                                                error={error}
                                                label={label} />
                                        )
                                    }

                                    else if (type === 'signaturePad') {
                                        return (
                                            <SignatureComponent
                                                index={index}
                                                name={name}
                                                value={value}
                                                error={error}
                                                label={label} />
                                        )
                                    }

                                    if (isLineItemData === '1') {
                                        const key = item.lineItemFieldName
                                        if (!lineitem.includes(key)) {
                                            lineitem.push(key)
                                            return (
                                                <LineItemComponent
                                                    lineName={lineName}
                                                    tabIndex={tabIndex} />
                                            )
                                        }
                                        else
                                            return
                                    }

                                    return (
                                        <InputComponent
                                            index={index}
                                            name={name}
                                            value={value}
                                            min={min}
                                            max={max}
                                            mand={mand}
                                            error={error}
                                            label={label}
                                            search={search}
                                            type={type}
                                            fileType={fileType}
                                            className={className}
                                            validations={validations}
                                            dateFormat={dateFormat} />
                                    )
                                }
                            })}
                        </div>
                    </div>
                )
            })}
            <div className="btn">
                <button onClick={(e) => { handleSubmit(e) }}>Submit</button>
                <button onClick={() => { setShowModal(true) }}>Cancel</button>
            </div>
            {showModal && <div className="modal-overlay">
                <div className="modal-container">
                    <div className="modal-content">
                        Are you sure you want to cancel? This will delete all the data
                    </div>
                    <div className="modal-btn">
                        <button id='yes' onClick={(e) => { e.preventDefault(); window.location.reload(false) }}>YES</button>
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

            {searchModal && <div className="modal-overlay">
                <div className="search-modal-container">
                    <div className="modal-content">
                        <div className="search-title">
                            <div>Search Data</div>
                            <div className="closebtn" onClick={() => { setSearchModal(false) }}><AiOutlineClose /></div>
                        </div>
                        <div className="search-bar">
                            <div>Search:</div>
                            <input
                                type="text"
                                placeholder="Search"
                                onChange={handleSearch}
                            />
                        </div>
                        {SearchTable()}
                        {!searchFilteredData.length && <p>No matching records found</p>}
                    </div>
                </div>
            </div>}
        </div >
    )
}

export default DisplayData;