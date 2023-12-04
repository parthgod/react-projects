import React, { useContext, useEffect, useState } from "react";
import { AiFillEdit, AiTwotoneDelete } from 'react-icons/ai';
import axios from 'axios';
import { format } from 'date-fns'

const AppContext = React.createContext();

const AppProvider = ({ children }) => {

    const [data, setData] = useState([])
    const [dropdowndata, setDropdownData] = useState([[]])
    const [loading, setLoading] = useState(false)
    const [inputValues, setInputValues] = useState([])
    const [inputErrors, setInputErrors] = useState('')
    const [showModal, setShowModal] = useState(false)
    const [camera, setCamera] = useState(false)
    const [signature, setSignature] = useState(false)
    const [showImg, setShowImg] = useState(false)
    const [showSigImg, setShowSigImg] = useState(false)
    const [errorFlag, setErrorFlag] = useState('')
    const [tableEntries, setTableEntries] = useState([]);
    const [selectedEntry, setSelectedEntry] = useState([]);
    const [tableLinename, setTableLinename] = useState('')
    const [searchModal, setSearchModal] = useState(false)
    const [searchData, setSearchData] = useState([])
    const [searchFilteredData, setSearchFilteredData] = useState([])
    const [finalData, setFinalData] = useState([])
    const [fileData, setFileData] = useState([])
    const [saveStatus, setSaveStatus] = useState(false)
    const [saveResponseData, setSaveResponseData] = useState([])
    const [dependantData, setDependantData] = useState([])
    const [showData, setShowData] = useState([])
    const [collapseStates, setCollapseStates] = useState([]);
    const [tabNames,setTabNames]=useState([])

    const apiUrl = 'https://slapps.southindia.cloudapp.azure.com/configapi/api/Dynamic/GetPageControls'
    const dropdownApi = 'https://slapps.southindia.cloudapp.azure.com/configapi/api/Dynamic/FillDropdown'
    const cascadingDropdownApi = 'https://slapps.southindia.cloudapp.azure.com/configapi/api/Dynamic/FillCascadingDropdown'
    const searchAPI = 'https://slapps.southindia.cloudapp.azure.com/configapi/api/Dynamic/GetDynamicSearchData'
    const saveAPI = 'https://slapps.southindia.cloudapp.azure.com/configapi/api/Dynamic/Save'

    const buttons = document.querySelectorAll('button');
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener('click', e => e.preventDefault());
    }

    const fetchData = async () => {
        setLoading(true)
        try {
            const { data } = await axios.post(apiUrl, {
                pageId: 2,
                processId: 1,
                fieldMappingID: 0,
                fieldID: 0,
                textValue: "string",
                connectionString: "string",
                isNotFlutter: true,
                userRole: "Admin",
                mainDataID: 0
            })
            // console.log(data);
            setData(data[0])
            setDependantData(data[1])
        } catch (error) {
            console.log(error.response)
        }
        setLoading(false)
    }

    const fetchDropdownData = async (fieldMappingID, fieldID, name) => {
        try {
            const { data } = await axios.post(dropdownApi, {
                pageId: 2,
                processId: 1,
                fieldMappingID: fieldMappingID,
                fieldID: fieldID,
                textValue: "",
                connectionString: "",
                isNotFlutter: true,
                userRole: "Admin",
                mainDataID: 0
            });
            setDropdownData((prevdata) => ({ ...prevdata, [name]: data }))
        } catch (error) {
            console.log(error.response);
        }
    };

    const fetchCascadingDropdownData = async (fieldMappingID, cascadeValue, textValue, name) => {
        try {
            const { data } = await axios.post(cascadingDropdownApi, {
                processID: 1,
                menuID: 2,
                userID: "",
                userRole: "Admin",
                fieldMappingID: fieldMappingID,
                cascadeValue: cascadeValue,
                textValue: textValue
            });
            setDropdownData((prevdata) => ({ ...prevdata, [name]: data[0] }))
            // console.log(data);
        } catch (error) {
            console.log(error.response);
        }
    };

    const fetchSearchData = async (fieldMappingID) => {
        try {
            const { data } = await axios.post(searchAPI, {
                dtFieldData: [
                    {
                        autoID: 0,
                        fieldID: "string"
                    }
                ],
                mode: "string",
                menuID: 2,
                mainDataID: 0,
                processID: 1,
                userID: "process1user",
                pageID: 1,
                autoID: 0,
                userRole: "Admin",
                fieldMappingID: fieldMappingID
            });
            setSearchData(data)
            setSearchFilteredData(data)
        } catch (error) {
            console.log(error.response);
        }
    };

    const handleDateChange = (name, dateFormat) => (date) => {
        const newDateFormat = dateFormat.replace('mm', "MM")
        let formattedDate = format(date, newDateFormat);
        setInputValues((prevInputValues) => ({ ...prevInputValues, [name]: formattedDate }));
        setErrorFlag((preverrors) => ({ ...preverrors, [name]: true }))
    }

    const handleRichTextInput = (name) => (value) => {
        if (value === '<p><br></p>' || !value)
            setErrorFlag((preverrors) => ({ ...preverrors, [name]: false }))
        else
            setErrorFlag((preverrors) => ({ ...preverrors, [name]: true }))
        const newvalue = encodeURIComponent(value)
        setInputValues((prevInputValues) => ({ ...prevInputValues, [name]: newvalue }));
    }

    const handleChange = (event, min, max, mand, error, validation) => {
        let { name, value } = event.target;
        // console.log(value);
        if (event.target.type === 'checkbox') {
            if (event.target.checked === true)
                value = true;
            else
                value = false
        }
        else if (event.target.type === 'file') {
            const file = event.target.files[0];
            const reader = new FileReader();

            reader.onloadend = () => {
                const base64String = reader.result;
                const fileName = file.name;
                const obj = {}
                const trimmedData = base64String.substring(base64String.indexOf(',') + 1);
                obj['FileName'] = fileName
                obj['FileContent'] = trimmedData
                setFileData((prev) => ({ ...prev, [name]: obj }))
            };
            reader.readAsDataURL(file)
        }
        let errors = error
        if (typeof (validation) !== 'object' && value !== '') {
            if (validation.toLowerCase() === 'alphabet') {
                const regex = /^[a-zA-Z]+$/;
                if (!regex.test(value)) {
                    errors = 'This field can contain only alphabets'
                    setInputErrors((preverrors) => ({ ...preverrors, [name]: errors }))
                    value = value.slice(0, -1);
                    setInputValues((prevInputValues) => ({ ...prevInputValues, [name]: value }));
                    return
                }
            }
            else if (validation.toLowerCase() === 'number') {
                const regex = /^[0-9]+$/;
                if (!regex.test(value)) {
                    errors = 'This field can contain only numbers'
                    setInputErrors((preverrors) => ({ ...preverrors, [name]: errors }))
                    value = value.slice(0, -1);
                    setInputValues((prevInputValues) => ({ ...prevInputValues, [name]: value }));
                    return
                }
            }
        }
        setInputValues((prevInputValues) => ({ ...prevInputValues, [name]: value }));
        if (typeof min === 'object') min = 0
        if (typeof max === 'object') max = 0

        if (value === '') {
            if (mand) {
                errors = '*required'
                setErrorFlag((preverrors) => ({ ...preverrors, [name]: false }))
            }
            else {
                errors = null
                setErrorFlag((preverrors) => ({ ...preverrors, [name]: true }))
            }
        }
        else if (value && ((min > 0 && value.length < min) || (max > 0 && value.length > max))) {
            errors = `The input should be between ${min} and ${max} characters`
            setErrorFlag((preverrors) => ({ ...preverrors, [name]: false }))
        }
        else {
            setErrorFlag((preverrors) => ({ ...preverrors, [name]: true }))
        }
        setInputErrors((preverrors) => ({ ...preverrors, [name]: errors }))
    }

    const handlePANVerification = (event) => {
        let { name, value } = event.target;
        const regex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
        let errors
        if (!regex.test(value)) {
            errors = `(${value}) is not a valid PAN number`
            value = ''
            setErrorFlag((preverrors) => ({ ...preverrors, [name]: false }))
            document.getElementById(name).focus()
        }
        else {
            errors = `(${value}) is a valid PAN number`
            setErrorFlag((preverrors) => ({ ...preverrors, [name]: true }))
        }
        setInputValues((prevInputValues) => ({ ...prevInputValues, [name]: value }));
        setInputErrors((preverrors) => ({ ...preverrors, [name]: errors }))
    }

    const handleDropdownChange = (event, mapID, cascadingFieldsID) => {
        const { name, value } = event.target;
        if (value === '')
            mapDropdownfetch()
        else {
            setInputValues((prevInputValues) => ({ ...prevInputValues, [cascadingFieldsID]: '' }))
            setErrorFlag((preverrors) => ({ ...preverrors, [cascadingFieldsID]: false }))
            dropdowndata[name].map((item) => {
                if (item.Value.toString() === value.toString()) {
                    fetchCascadingDropdownData(mapID, value.toString(), value, cascadingFieldsID)
                }
            })
        }
        handleDependancy(event)
    }

    const handleDependancy = (e) => {
        const { name, value } = e.target;
        const findVal = dropdowndata[name].find((item) => {
            const val = item?.Value || item?.value
            return val.toString() === value.toString()
        })
        const findValue = findVal?.Text || findVal?.text
        console.log(findValue);
        dependantData.map((singlevisi) => {
            if (singlevisi?.fieldMappingIDValue == findValue && singlevisi?.isVisible === 0) {
                const name = data.find((item) => { return item?.fieldMappingID === singlevisi?.fieldID })
                setShowData((prev) => ({ ...prev, [name.fieldName]: false }))
                setErrorFlag((prev) => ({ ...prev, [name.fieldName]: true }))
            }
            else if (singlevisi?.fieldMappingIDValue == findValue && singlevisi?.isVisible === 1) {
                const name = data.find((item) => { return item?.fieldMappingID === singlevisi?.fieldID })
                setShowData((prev) => ({ ...prev, [name.fieldName]: true }))
                setErrorFlag((prev) => ({ ...prev, [name.fieldName]: false }))
                handleChange(
                    { target: { name: name.fieldName, value: '' } },
                    name.fieldMinLength,
                    name.fieldMaxLength,
                    name.isMandatory,
                    '',
                    name.validations
                );
            }
            else if (findValue === undefined) {
                console.log('sdf');
                data.map((item) => {
                    if (item.iSVISIBLE === "visible") {
                        setShowData((prev) => ({ ...prev, [item.fieldName]: true }))
                        setErrorFlag((prev) => ({ ...prev, [item.fieldName]: false }))
                        handleChange(
                            { target: { name: item.fieldName, value: '' } },
                            item.fieldMinLength,
                            item.fieldMaxLength,
                            item.isMandatory,
                            '',
                            item.validations
                        );
                    }
                    else {
                        setShowData((prev) => ({ ...prev, [item.fieldName]: false }))
                        setErrorFlag((prev) => ({ ...prev, [item.fieldName]: true }))
                    }
                })
            }
        });
    }

    const mapDropdownfetch = () => {
        data.map((item) => {
            if (item.fieldType.includes('dropdown'))
                fetchDropdownData(item.fieldMappingID, item.fieldID, item.fieldName)
        })
    }

    const handleAddEntry = (e, lineName) => {
        e.preventDefault();
        let count = 1
        const fieldValues = {};
        setTableLinename(lineName)
        data.filter((item) => item.lineItemFieldName === lineName).forEach((item) => {
            if (item.isMandatory === 1) count++;
            if (inputValues[item.fieldName]) {
                fieldValues[item.fieldName] = inputValues[item.fieldName];
                fieldValues['lineName'] = lineName;
            }
        });
        if (Object.keys(fieldValues).length >= count)
            setTableEntries((prevEntries) => [...prevEntries, fieldValues]);
        handleClear(lineName);
    };

    const handleEditEntry = (entry, lineName) => {
        setSelectedEntry((prevEntries) => ({ ...prevEntries, [lineName]: entry }));
        setTableLinename(lineName)
        data.filter((item) => item.lineItemFieldName === lineName).forEach((item) => {
            handleChange(
                { target: { name: item.fieldName, value: entry[item.fieldName] } },
                item.fieldMinLength,
                item.fieldMaxLength,
                item.isMandatory,
                inputErrors[item.fieldName],
                item.validations
            );
        });
    };

    const handleUpdateEntry = (e, lineName) => {
        e.preventDefault();
        const updatedEntry = selectedEntry[lineName];
        data.filter((item) => item.lineItemFieldName === lineName).forEach((item) => {
            if (inputValues[item.fieldName]) {
                updatedEntry[item.fieldName] = inputValues[item.fieldName];
            }
        });

        setTableEntries((prevEntries) =>
            prevEntries.map((entry) =>
                entry === selectedEntry[lineName] ? updatedEntry : entry
            )
        );

        handleClear(lineName);
    };

    const handleDeleteEntry = (entry) => {
        setTableLinename(entry.lineName)
        setTableEntries((prevEntries) => prevEntries.filter((e) => e !== entry));
    };

    const handleClear = (lineName) => {
        data.filter((item) => item.lineItemFieldName === lineName).forEach((item) => {
            handleChange(
                { target: { name: item.fieldName, value: '' } },
                item.fieldMinLength,
                item.fieldMaxLength,
                item.isMandatory,
                '',
                item.validations
            );
        });

        setSelectedEntry((prevEntries) => ({ ...prevEntries, [lineName]: null }));
    };

    const handleSearchData = (e, searchitem) => {
        e.preventDefault()
        const fields = Object.keys(searchitem)
        fields.map((field) => {
            data.filter((item) => item.fieldName === field).map((item) => {
                handleChange(
                    { target: { name: field, value: searchitem[field] } },
                    item.fieldMinLength,
                    item.fieldMaxLength,
                    item.isMandatory,
                    inputErrors[item.fieldName],
                    item.validations
                );
            })
        })
        setSearchModal(false)
    }

    const handleSearch = (event) => {
        const searchterm = event.target.value;
        const filtersearchdata = searchData.filter((item) => {
            return JSON.stringify(item)?.toLowerCase().includes(searchterm.toLowerCase());
        })
        setSearchFilteredData(filtersearchdata)
    };

    const SearchTable = () => {

        if (!searchData)
            return null

        const fields = Object.keys(searchData[0])

        return (
            <table>
                <thead>
                    <tr>
                        <th>Sr.No</th>
                        <th>Action</th>
                        {fields.map((f,ind) => {
                            return (
                                <th key={ind}>{f}</th>
                            )
                        })
                        }
                    </tr>
                </thead>
                <tbody>
                    {searchFilteredData && searchFilteredData.map((searchitem, index) => {
                        const fields = Object.keys(searchitem)
                        return (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td><button onClick={(e) => { handleSearchData(e, searchitem) }}>Select</button></td>
                                {fields.map((f,ind) => {
                                    return (
                                        <td key={ind}>{searchitem[f]}</td>
                                    )
                                })}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        )
    }

    const renderTable = (lineName) => {

        if (tableEntries.length === 0) {
            return null;
        }

        if (inputValues[lineName]) {
            return (
                <table>
                    <thead>
                        <tr>
                            {data.filter((item) => item.lineItemFieldName === lineName).map((item, index) => (
                                <th key={index}>{item.fieldName}</th>
                            ))}
                            <th>Action</th>
                        </tr>
                    </thead>
                    {tableEntries.map((entry, ind) => {
                        const fields = Object.keys(entry).filter((key) => key !== 'lineName');
                        if (entry.lineName === lineName) {
                            return (
                                <tbody key={ind}>
                                    <tr>
                                        {fields.map((field, fieldind) => (
                                            <td key={fieldind}>{entry[field]}</td>
                                        ))}

                                        <td>
                                            <div className="table-line-btn">
                                                <button onClick={() => { handleEditEntry(entry, lineName) }} className="btn-line-items"><AiFillEdit /> Edit</button>
                                                <button onClick={() => { handleDeleteEntry(entry) }} className="btn-line-items" id="delete"><AiTwotoneDelete /> Delete</button>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            )
                        }
                    })}
                </table>
            );
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault()
        let flag = 1
        for (const item of data) {
            setCollapseStates((prev) => ({ ...prev, [item.tabName]: false }))
            if (item.isLineItemData === "1") {
                const checkData = finalData['dtFieldData'].find(data => data['FieldID'] === item.lineItemFieldName);
                if (checkData.FieldValue === undefined) {
                    document.getElementById(item.fieldName).focus()
                    flag = 0
                    break;
                }
            }
            else if (errorFlag[item.fieldName] === false) {
                if (item.fieldType === 'richtextbox')
                    document.querySelector('.ql-editor').focus()
                else
                    document.getElementById(item.fieldName).focus()
                flag = 0
                break;
            }
        };
        if (flag === 1) {
            sendDataToSave();
        }
    }

    const sendDataToSave = () => {
        setSaveStatus(true)
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        };
        axios.post(saveAPI, JSON.stringify(finalData), config).then(response => {
            const responseData = JSON.parse(response.data)
            if (responseData[0]['Status'] === 'Failed') {
                setSaveStatus(false)
                const matches = responseData[0]['Message'].match(/'([^']+)'/g);
                const name = matches && matches.length >= 2 ? matches[1].replace(/'/g, '') : '';
                setInputErrors((preverrors) => ({ ...preverrors, [name]: responseData[0]['Message'] }))
                setErrorFlag((preverrors) => ({ ...preverrors, [name]: false }))
                document.getElementById(name).focus()
            }
            else
                setSaveResponseData(responseData)
        }).catch(error => {
            console.error(error);
        });
    }    

    useEffect(() => {
        fetchData()
    }, [])

    useEffect(() => {
        mapDropdownfetch()
        let err
        data.map((item) => {
            if (item.isMandatory === 1) {
                err = '*required'
                setInputErrors((preverrors) => ({ ...preverrors, [item.fieldName]: err }))
                setErrorFlag((preverrors) => ({ ...preverrors, [item.fieldName]: false }))
            }
            if (item.isDynamicSearchRequired === 1) {
                fetchSearchData(item.fieldMappingID)
            }
            if (item.iSVISIBLE === "visible") {
                setShowData((prev) => ({ ...prev, [item.fieldName]: true }))
            }
            else {
                setShowData((prev) => ({ ...prev, [item.fieldName]: false }))
            }

        })
        const tabs = [...new Set(data.map((item) => item.tabName))]
        tabs.map((tab)=>{setCollapseStates((prev)=>({...prev,[tab]:false}))})
        setTabNames(tabs)
    }, [data])

    useEffect(() => {
        const segregatedEntries = {};
        tableEntries.forEach((entry) => {
            if (!segregatedEntries[entry.lineName]) {
                segregatedEntries[entry.lineName] = [];
            }
            const { lineName, ...newEntry } = entry;
            segregatedEntries[entry.lineName].push(newEntry);
        });
        setInputValues((prev) => ({ ...prev, ...segregatedEntries }));
        if (segregatedEntries[tableLinename] === undefined) {
            const newobj = { ...inputValues }
            delete newobj[tableLinename]
            setInputValues(newobj)
        }
    }, [tableEntries, tableLinename])

    useEffect(() => {
        const newobj = []
        data.forEach((item, index) => {
            if (item.fieldName != 'CaptureBarcode' && item.fieldName != 'MapViewer' && item.isSave === 1) {
                const obj = {}
                obj['AutoID'] = index + 1
                if (item.fieldType === 'checkbox' && inputValues[item.fieldName] === undefined) {
                    obj['FieldID'] = item.fieldName
                    obj['FieldValue'] = false
                }
                else if (item.fileExtension !== "") {
                    obj['FieldID'] = item.fieldName
                    const temp = [fileData[item.fieldName]]
                    obj['FieldValue'] = temp
                }
                else if (item.isLineItemData === "1") {
                    obj['FieldID'] = item.lineItemFieldName;
                    if (inputValues[item.lineItemFieldName]) {
                        const newtempobj = [];
                        inputValues[item.lineItemFieldName].forEach((lineitem, lineindex) => {
                            const fields = Object.keys(lineitem);
                            fields.forEach((field, ind) => {
                                const tempobj = {};
                                tempobj['rowNo'] = lineindex + 1;
                                tempobj['AutoID'] = ind + 1;
                                tempobj['fieldID'] = field;
                                tempobj['FieldValue'] = lineitem[field];
                                newtempobj.push(tempobj);
                            });
                        });
                        obj['FieldValue'] = newtempobj;
                    }
                    else
                        obj['FieldValue'] = inputValues[item.tabName]
                }
                else {
                    obj['FieldID'] = item.fieldName
                    obj['FieldValue'] = inputValues[item.fieldName]
                }
                newobj.push(obj)
                const finobj = newobj.filter((item, index, self) => {
                    return (
                        index === self.findIndex((t) => (
                            t.FieldID === item.FieldID
                        ))
                    );
                });
                const updatedFinObj = finobj.map((item, index) => {
                    return { ...item, AutoID: index + 1 };
                });
                setFinalData({ ['dtFieldData']: updatedFinObj, ['Mode']: 'Insert', ['MenuID']: 2, ['MainDataID']: 0, ['ProcessID']: 1, ['UserID']: 'Process1User', ['PageID']: 0, ['AutoID']: 0, ['UserRole']: null, ['FieldMappingID']: 0 })
            }
        })
    }, [inputValues, fileData])

    useEffect(() => {
        if (showModal || camera || signature || searchModal || saveStatus)
            document.body.style.overflow = 'hidden'
        else
            document.body.style.overflow = 'unset'
    }, [showModal, camera, signature, searchModal, saveStatus])    

    return (
        <AppContext.Provider value={{ data, dropdowndata, loading, inputValues, inputErrors, showModal, camera, tabNames, fetchData, fetchDropdownData, handleChange, handleDropdownChange, setShowModal, setCamera, showImg, setShowImg, signature, setSignature, showSigImg, setShowSigImg, fetchCascadingDropdownData, errorFlag, setInputValues, tableEntries, setTableEntries, selectedEntry, setSelectedEntry, tableLinename, setTableLinename, handleAddEntry, handleEditEntry, handleUpdateEntry, handleDeleteEntry, handleClear, renderTable, fetchSearchData, searchModal, setSearchModal, searchData, setSearchData, handleSearchData, SearchTable, handleSearch, searchFilteredData, setSearchFilteredData, fileData, setFileData, finalData, setFinalData, handleSubmit, handlePANVerification, handleDateChange, saveStatus, setSaveStatus, saveResponseData, setSaveResponseData, handleRichTextInput, handleDependancy, showData, setCollapseStates, collapseStates }}>
            {children}
        </AppContext.Provider>
    )
}

export const useGlobalContext = () => {
    return useContext(AppContext);
}

export { AppContext, AppProvider };