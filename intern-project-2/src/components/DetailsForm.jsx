import { useGlobalContext } from "../context";
import { BsChevronRight } from 'react-icons/bs'
import LineItemComponent from '../components/LineItemComponent'
import ImageViewerComponent from "./ImageViewerComponent";
import DropDownComponent from "./DropDownComponent";
import LineItemTable from "./LineItemTable";
import InputDisplayComponent from "./InputDisplayComponent";

const DetailsForm = () => {

    const { detailsData, approvalDetails, dropdownData, lineItemData, collapseStates, tabNames, inputErrors,setCollapseStates } = useGlobalContext()

    const lineitem = []

    return (
        <div className='form' id='details-form'>
            {tabNames.map((tabName, tabIndex) => {
                return (
                    <div className={`form-head ${collapseStates[tabName] ? 'collapsed' : ''}`} key={tabIndex + 1} id={tabName}>
                        <div className="newtitle" key={tabIndex + 2} onClick={() => setCollapseStates((prev)=>({...prev,[tabName]:!collapseStates[tabName]}))}>{tabName}<BsChevronRight /></div>
                        <div className='newform-content' key={tabIndex + 4}>
                            {approvalDetails.filter((item) => item.tabName === tabName).map((item, index) => {
                                const uniqueItem = detailsData.find(
                                    (detail) => detail.FieldMappingID === item.fieldMappingID
                                );
                                const error = inputErrors[item.fieldName] || ''

                                if (item.fieldType === 'imageviewer') {
                                    return (
                                        <ImageViewerComponent
                                            index={index}
                                            item={item}
                                            uniqueItem={uniqueItem} />
                                    )
                                }

                                else if (item.fieldType.toLowerCase().includes('dropdown') && dropdownData[item.fieldName]) {
                                    return (
                                        <DropDownComponent
                                            index={index}
                                            item={item}
                                            uniqueItem={uniqueItem}
                                            error={error} />
                                    )
                                }

                                if (item.isLineItemData === '1') {
                                    const key = item.lineItemFieldName
                                    if (!lineitem.includes(key)) {
                                        lineitem.push(key)
                                        return (
                                            <LineItemComponent
                                                lineName={item.lineItemFieldName}
                                                tabIndex={tabIndex}
                                                tabName={tabName} />
                                        )
                                    }
                                    else
                                        return
                                }

                                else if (item.fieldType === 'lineitems') {
                                    const fieldNames = item.lineItemFieldName.split(',')
                                    if (lineItemData[item.fieldName] && lineItemData[item.fieldName].length) {
                                        return (
                                            <LineItemTable
                                                item={item}
                                                fieldNames={fieldNames} />
                                        )
                                    }
                                    else return
                                }

                                return (
                                    <InputDisplayComponent
                                        index={index}
                                        item={item}
                                        uniqueItem={uniqueItem}
                                        error={error} />
                                )
                            })}
                        </div>
                    </div>
                );
            })}
        </div>
    )

}

export default DetailsForm