import React, { useContext, useEffect, useState } from "react";
import axios from 'axios'

const AppContext = React.createContext();

const AppProvider = ({ children }) => {

    const [statsData, setStatsData] = useState([])
    const [detailsData, setDetailsData] = useState([])
    const [tableData, setTableData] = useState([])
    const [isloading, setIsLoading] = useState(false)
    const [statusSelected, setStatusSelected] = useState('')
    const [currentPage, setCurrentPage] = useState(1);
    const [entriesPerPage, setEntriesPerPage] = useState(10);
    const [searchFilteredData, setSearchFilteredData] = useState([])
    const [approvalDetails, setApprovalDetails] = useState([])
    const [dropdownData, setDropdownData] = useState([])
    const [lineItemData, setLineItemData] = useState([])
    const [inputValues, setInputValues] = useState([])
    const [selectedEntry, setSelectedEntry] = useState([])
    const [attachment, setAttachment] = useState(null)
    const [collapseStates, setCollapseStates] = useState([]);
    const [tabNames, setTabnames] = useState([])
    const [errorFlag, setErrorFlag] = useState('')
    const [inputErrors, setInputErrors] = useState('')
    const [finalData, setFinalData] = useState([])
    const [saveStatus, setSaveStatus] = useState(false)
    const [saveResponseData, setSaveResponseData] = useState([])
    const [autoID, setAutoID] = useState(null)
    const [isClicked, setIsClicked] = useState(false)

    const statsURL = 'https://slapps.southindia.cloudapp.azure.com/configapi/api/Dynamic/GetPageStages'
    const tableDataURL = 'https://slapps.southindia.cloudapp.azure.com/configapi/api/Dynamic/GetListData'
    const detailsURL = 'https://slapps.southindia.cloudapp.azure.com/configapi/api/Dynamic/GetDetails'
    const approvalDetailsurl = 'https://slapps.southindia.cloudapp.azure.com/configapi/api/Dynamic/GetPageControls'
    const lineItemsURL = 'https://slapps.southindia.cloudapp.azure.com/configapi/api/Dynamic/GetLineItems'
    const dropdownURL = 'https://slapps.southindia.cloudapp.azure.com/configapi/api/Dynamic/FillDropdown'
    const saveAPI = 'https://slapps.southindia.cloudapp.azure.com/configapi/api/Dynamic/Save'
    const fetchDocsURL = 'https://slapps.southindia.cloudapp.azure.com/configapi/api/Dynamic/GetBlobFile'

    // const fetchD = async () => {
    //     try {
    //         const { data } = await axios.post('https://slapps.southindia.cloudapp.azure.com/configapi/api/SignIn/GetProcessRoleWiseMenu', {
    //             processID: "1",
    //             userID: 2
    //         })
    //         console.log(data);
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    // useEffect(()=>{fetchD()},[])

    const fetchLineItems = async (autoID, fieldMappingID, name) => {
        try {
            const { data } = await axios.post(lineItemsURL, {
                dtFieldData: [
                    {
                        autoID: 0,
                        fieldID: "string"
                    }
                ],
                mode: "",
                menuID: 60,
                mainDataID: 23,
                processID: 1,
                userID: "process1user",
                pageID: 60,
                autoID: autoID,
                userRole: "Approver",
                fieldMappingID: fieldMappingID,
            });
            setLineItemData((prev) => ({ ...prev, [name]: data }))
        } catch (error) {
            console.log(error.response);
        }
    }

    const fetchStatsData = async () => {
        setIsLoading(true)
        try {
            const statsRequest = axios.post(statsURL, {
                processID: 1,
                pageID: 60,
                userRole: "Approver",
                autoID: 0,
                userID: "Process1user",
                status: "string",
                actionID: 0
            });

            const tableDataRequest = axios.post(tableDataURL, {
                processID: 1,
                pageID: 60,
                userRole: "Approver",
                autoID: 0,
                userID: "Process1user",
                status: "submitted",
                actionID: 0
            });
            const [statsResponse, tableDataResponse] = await Promise.all([statsRequest, tableDataRequest]);
            setStatsData(statsResponse.data);
            setStatusSelected(statsResponse.data[0].ID)
            setTableData(tableDataResponse.data);
            setSearchFilteredData(tableDataResponse.data);
            console.log(tableDataResponse.data);
        } catch (error) {
            console.log(error);
        }
        setIsLoading(false)
    };

    const fetchDetailsData = async (autoID, status) => {
        setIsLoading(true)
        try {
            const request1 = axios.post(detailsURL, {
                processID: 1,
                pageID: 60,
                userRole: "Approver",
                autoID: autoID,
                userID: "Process1user",
                status: status,
                actionID: 0
            })
            const request2 = axios.post(approvalDetailsurl, {
                pageId: 60,
                processId: 1,
                fieldMappingID: 0,
                fieldID: 0,
                textValue: "string",
                connectionString: "string",
                isNotFlutter: true,
                userRole: "Approver",
                mainDataID: 0
            })
            const [response1, response2] = await Promise.all([request1, request2])
            setDetailsData(response1.data)
            setApprovalDetails(response2.data[0])
        } catch (error) {
            console.log(error.response)
        }
        setIsLoading(false)
    }

    const fetchDropdownData = async (fieldMappingID, fieldID, name) => {
        try {
            const { data } = await axios.post(dropdownURL, {
                pageId: 60,
                processId: 1,
                fieldMappingID: fieldMappingID,
                fieldID: fieldID,
                textValue: "",
                connectionString: "",
                isNotFlutter: true,
                userRole: "Approver",
                mainDataID: 0
            })
            // console.log(data);
            setDropdownData((prevdata) => ({ ...prevdata, [name]: data }))
        } catch (error) {
            console.log(error.response);
        }
    }

    const handleSearch = (event) => {
        const searchterm = event.target.value.toLowerCase();
        const filtersearchdata = tableData.filter((item) => {
            for (const value of Object.values(item)) {
                if (value.toString().toLowerCase().includes(searchterm)) {
                    return true;
                }
            }
            return false;
        });
        setSearchFilteredData(filtersearchdata);
        setCurrentPage(1)
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleEntriesPerPageChange = (event) => {
        setEntriesPerPage(Number(event.target.value));
        setCurrentPage(1);
    };

    const handleInputChange = (event, min, max, mand, error, validation) => {
        const { name, value } = event.target
        // setInputValues((prev) => ({ ...prev, [name]: value }))
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

    const handleAddEntry = (lineName, tabName) => {
        let count = 1
        const fieldValues = {};
        approvalDetails.filter((item) => item.lineItemFieldName === lineName).forEach((item) => {
            if (item.isMandatory === 1) count++;
            if (inputValues[item.fieldName]) {
                fieldValues[item.fieldName] = inputValues[item.fieldName];
            }
        });
        approvalDetails.filter((item) => item.fieldType === 'lineitems').forEach((item) => {
            if (item.tabName === tabName)
                fieldValues['lineName'] = item.fieldName
        });
        if (Object.keys(fieldValues).length >= count) {
            const { lineName, ...data } = fieldValues;
            const mergedArray = { ...lineItemData, [lineName]: lineItemData[lineName].concat(data) }
            setLineItemData((prev) => ({ ...prev, ...mergedArray }))
        };
        handleClear(lineName, tabName);
    }

    const handleClear = (lineName, tabName) => {
        approvalDetails.filter((item) => item.lineItemFieldName === lineName).forEach((item) => {
            handleInputChange(
                { target: { name: item.fieldName, value: '' } },
                item.fieldMinLength,
                item.fieldMaxLength,
                item.isMandatory,
                '',
                item.validations
            );
        });
        setSelectedEntry((prevEntries) => ({ ...prevEntries, [tabName]: null }));
    }

    const handleDeleteEntry = (lineItem, name) => {
        setLineItemData(prevData => {
            const newData = { ...prevData };
            newData[name] = newData[name].filter(item => item !== lineItem);
            return newData;
        });
    };

    const handleEditEntry = (entry, tabName) => {
        setSelectedEntry((prevEntries) => ({ ...prevEntries, [tabName]: entry }));
        approvalDetails.filter((item) => item.tabName === tabName && item.fieldType !== 'lineitems').forEach((item) => {
            handleInputChange(
                { target: { name: item.fieldName, value: entry[item.fieldName] } },
                item.fieldMinLength,
                item.fieldMaxLength,
                item.isMandatory,
                inputErrors[item.fieldName],
                item.validations
            );
        });
    }

    const handleUpdateEntry = (lineName, tabName) => {
        const name = approvalDetails.find(
            (item) => item.fieldType === 'lineitems' && item.tabName === tabName
        )?.fieldName;

        setLineItemData((prevData) => {
            const newData = { ...prevData };
            newData[name] = newData[name].map((item) => {
                if (item === selectedEntry[tabName]) {
                    return { ...item, ...inputValues };
                }
                return item;
            });
            return newData;
        });

        handleClear(lineName, tabName);
    };

    const handleViewAttachment = async (fileData) => {
        setAttachment(null)
        const urlParts = fileData.split('/');
        const blobName = urlParts[urlParts.length - 1];
        const mimeType = getMimeType(blobName.split('.').pop().toLowerCase());
        try {

            const { data } = await axios.post(fetchDocsURL, {
                processID: 1,
                fileName: blobName
            })
            if (data === '') {
                setAttachment('null')
                return
            }
            const docUrl = `data:${mimeType};base64,${data}`;
            setAttachment(docUrl)
        } catch (error) {
            console.log(error);
        }
    }

    function getMimeType(extension) {
        switch (extension) {
            case 'png':
                return 'image/png';
            case 'jpg':
                return 'image/jpg';
            case 'jpeg':
                return 'image/jpeg';
            case 'pdf':
                return 'application/pdf';
            case 'docx':
                return 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
            case 'xlsx':
                return 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
            default:
                return '';
        }
    }

    const handleSubmit = () => {
        let flag = 1
        for (const item of approvalDetails) {
            setCollapseStates((prev) => ({ ...prev, [item.tabName]: false }))
            const uniqueItem = detailsData.find((detail) => detail.FieldMappingID === item.fieldMappingID)
            if (item.isLineItemData === "1") {
                const checkData = finalData['dtFieldData'].find(data => data['FieldID'] === item.lineItemFieldName);
                if (checkData.FieldValue === undefined) {
                    document.getElementById(item.fieldName).focus()
                    flag = 0
                    break;
                }
            }
            else if (errorFlag[item.fieldName] === false && !uniqueItem) {
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
        if (detailsData.length && approvalDetails.length) {
            {
                approvalDetails.map((item) => {
                    const uniqueItem = detailsData.find((detail) => detail.FieldMappingID === item.fieldMappingID)
                    if (uniqueItem) {
                        if (item.fieldType === "lineitems") {
                            const lineName = approvalDetails.find((line) => {
                                return line.isLineItemData === '1' && line.tabName === item.tabName
                            })?.lineItemFieldName
                            if (lineItemData[item.fieldName] && lineItemData[item.fieldName].length)
                                setInputValues((prev) => ({ ...prev, [lineName]: lineItemData[item.fieldName] }))
                            else
                                setInputValues((prev) => ({ ...prev, [lineName]: undefined }))
                        }
                        else
                            setInputValues((prev) => ({ ...prev, [uniqueItem.FieldName]: uniqueItem.FIELDData }))
                    }
                })
            }
        }
    }, [detailsData, approvalDetails, lineItemData])

    useEffect(() => {
        const newobj = []
        approvalDetails.forEach((item, index) => {
            if (item.isSave === 1) {
                const obj = {}
                obj['AutoID'] = index + 1
                if (item.isLineItemData === '1') {
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
                else if (item.fieldType === 'lineitems')
                    return
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
                setFinalData({ ['dtFieldData']: updatedFinObj, ['Mode']: 'Update', ['MenuID']: 60, ['MainDataID']: 0, ['ProcessID']: 1, ['UserID']: 'Process1User', ['AutoID']: 0, ['UserRole']: 'Approver', ['FieldMappingID']: 0 })
            }

        })
    }, [inputValues])

    useEffect(() => {
        if (document.getElementById('search-bar')) {
            document.getElementById('search-bar').value = '';
            setSearchFilteredData(tableData);
        }
    }, [statusSelected])

    useEffect(() => {
        fetchStatsData();
    }, [])

    return (
        <AppContext.Provider value={{ statsData, tableData, isloading, setIsLoading, statusSelected, setStatusSelected, handlePageChange, handleEntriesPerPageChange, currentPage, setCurrentPage, entriesPerPage, setEntriesPerPage, handleSearch, searchFilteredData, fetchDetailsData, detailsData, setDetailsData, approvalDetails, setApprovalDetails, dropdownData, fetchDropdownData, fetchLineItems, lineItemData, setLineItemData, inputValues, setInputValues, handleInputChange, handleAddEntry, handleClear, handleDeleteEntry, handleEditEntry, handleUpdateEntry, selectedEntry, setSelectedEntry, attachment, setAttachment, collapseStates, setCollapseStates, handleViewAttachment, tabNames, setTabnames, errorFlag, setErrorFlag, inputErrors, setInputErrors, handleSubmit, saveResponseData, saveStatus, setSaveStatus, setCollapseStates, autoID, setAutoID, isClicked, setIsClicked }}>
            {children}
        </AppContext.Provider>
    )
}

export const useGlobalContext = () => {
    return useContext(AppContext);
}

export { AppContext, AppProvider };