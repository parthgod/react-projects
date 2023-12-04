import { useGlobalContext } from "../context"

const DropDownComponent = ({ index, item, uniqueItem, error }) => {

    const { dropdownData, handleInputChange, errorFlag } = useGlobalContext()

    if (uniqueItem) {
        const value = dropdownData[item.fieldName].find((dropitem) => uniqueItem.FIELDData.toString() === dropitem.Value.toString())
        return (
            <div className="form-element" key={index}>
                <label>{item.label}</label>
                <input className='input-field marked' value={value.Text} disabled={true} type={item.fieldType} id={item.fieldName} />
            </div>
        )
    }
    return (
        <div className="form-element" key={index}>
            <label>{item.label}</label>
            <select className='dropdown' style={{ width: '8.1rem' }} onChange={(e) => { handleInputChange(e, item.fieldMinLength, item.fieldMaxLength, item.isMandatory, error, item.validations) }} name={item.fieldName} id={item.fieldName}>
                <option value=''>--Select--</option>
                {dropdownData[item.fieldName].map((dropitem, dropind) => {
                    return (
                        < option key={dropind} value={item.isDropdowntextValue === 0 ? dropitem.Value : dropitem.Text}>
                            {dropitem.Text}
                        </option>
                    )
                })}
            </select>
            {error && <div className={`error ${errorFlag[item.fieldName] ? `green` : ``}`}>{error}</div>}
        </div>
    )

}

export default DropDownComponent