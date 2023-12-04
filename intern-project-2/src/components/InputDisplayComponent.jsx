import { useGlobalContext } from "../context"

const InputDisplayComponent = ({ index, item, uniqueItem, error }) => {

    const { inputValues, handleInputChange, errorFlag } = useGlobalContext()

    if (uniqueItem) {

        return (
            <div className="form-element" key={index}>
                <label key={index + 23}>{item.label}</label>
                <input className='input-field marked' value={uniqueItem.FIELDData || 'null'} disabled={true} type={item.fieldType === 'date' ? 'text' : item.fieldType} checked={uniqueItem.FIELDData === 'true' ? true : false} key={index + 10} id={item.fieldName} />
            </div>
        )
    }

    return (
        <div className="form-element" key={index}>
            <label key={index + 24}>{item.label}</label>
            <input className='input-field' type={item.fieldType} onChange={(e) => { handleInputChange(e, item.fieldMinLength, item.fieldMaxLength, item.isMandatory, error, item.validations) }} value={inputValues[item.fieldName]} name={item.fieldName} key={index + 34} id={item.fieldName} />
            {error && <div className={`error ${errorFlag[item.fieldName] ? `green` : ``}`} key={index + 54}>{error}</div>}
        </div>
    )

}

export default InputDisplayComponent