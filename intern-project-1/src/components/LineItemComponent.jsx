import { useGlobalContext } from "../context"
import { AiOutlinePlus } from 'react-icons/ai'

const LineItemComponent = ({lineName,tabIndex}) => {

    const { data, inputValues, inputErrors, handleChange, errorFlag, selectedEntry, handleAddEntry, handleUpdateEntry, handleClear, renderTable } = useGlobalContext()

    return (
            <form className="line-item-form" key={tabIndex}>
                {data.filter((item) => item.lineItemFieldName === lineName).map((item, index) => {
                    let { fieldMinLength: min, fieldMaxLength: max, fieldName: name, fieldType: type, isMandatory: mand, label,validations } = item
                    const value = inputValues[name] || ''
                    const error = inputErrors[name] || ''

                    if (typeof min === 'object') min = 0
                    if (typeof max === 'object') max = 0

                    if (name != 'CaptureBarcode' && name != 'MapViewer') {
                        return (
                            <div className="form-element" key={index}>
                                <label>{label}</label>
                                <input
                                    onChange={(e) => { handleChange(e, min, max, mand, error, validations) }}
                                    type={type}
                                    id={name}
                                    name={name}
                                    placeholder={label}
                                    className={type === 'file' ? 'file-input' : 'input-field'}
                                    required={mand === 1 ? true : false}
                                    value={value}
                                />
                                {error && <div className={`error ${errorFlag[name] ? `green` : ``}`}>{error}</div>}
                            </div>
                        )
                    }
                })}
                <div className="line-btn">
                    {!selectedEntry[lineName] && <button onClick={(e) => handleAddEntry(e, lineName)} className="btn-line-items"><AiOutlinePlus /> Add</button>}
                    {selectedEntry[lineName] && <button onClick={(e) => handleUpdateEntry(e, lineName)} className="btn-line-items">Update</button>}
                    <button onClick={()=>handleClear(lineName)} className="btn-line-items">Clear</button>
                </div>
                {renderTable(lineName)}
            </form>
    )
}

export default LineItemComponent