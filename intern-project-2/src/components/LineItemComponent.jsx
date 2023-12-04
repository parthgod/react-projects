import { useGlobalContext } from "../context"
import { AiOutlinePlus } from 'react-icons/ai'

const LineItemComponent = ({ lineName, tabIndex, tabName }) => {

    const { approvalDetails, inputValues, handleInputChange, handleAddEntry, handleClear, handleUpdateEntry, selectedEntry, errorFlag, inputErrors } = useGlobalContext()


    return (
        <form className="line-item-form" key={tabIndex}>
            {approvalDetails.filter((lineItem) => lineItem.lineItemFieldName === lineName).map((lineItem, index) => {
                const value = inputValues[lineItem.fieldName] || ''
                const error = inputErrors[lineItem.fieldName]

                return (
                    <div className="form-element" key={index}>
                        <label>{lineItem.label}</label>
                        <input
                            onChange={(e) => { handleInputChange(e, lineItem.fieldMinLength, lineItem.fieldMaxLength, lineItem.isMandatory, error, lineItem.validations) }}
                            type={lineItem.fieldType}
                            id={lineItem.fieldName}
                            name={lineItem.fieldName}
                            placeholder={lineItem.label}
                            className='input-field'
                            value={value}
                        />
                        {error && <div className={`error ${errorFlag[lineItem.fieldName] ? `green` : ``}`}>{error}</div>}
                    </div>
                )
            })}
            <div className="line-btn">
                {!selectedEntry[tabName] && <button className="btn-line-items" onClick={(e) => { e.preventDefault(); handleAddEntry(lineName, tabName) }}><AiOutlinePlus /> Add</button>}

                {selectedEntry[tabName] && <button onClick={(e) => { e.preventDefault(); handleUpdateEntry(lineName, tabName) }} className="btn-line-items">Update</button>}

                <button className="btn-line-items" onClick={(e) => { e.preventDefault(); handleClear(lineName, tabName) }}>Clear</button>
            </div>
        </form>
    )
}

export default LineItemComponent