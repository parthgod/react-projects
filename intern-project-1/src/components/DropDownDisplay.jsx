import { useGlobalContext } from "../context";

const DropDownDisplay = ({ index, name, value, isCasacade, min, max, mand, error, mapID, cascadingFieldsID, label, dropCondition, validations }) => {

    const { dropdowndata, handleChange, handleDropdownChange, errorFlag, handleDependancy } = useGlobalContext()

    return (
        <div className="form-element" key={index}>
            <label>{label}</label>
            <select
                name={name}
                id={name}
                value={value}
                className='dropdown'
                onChange={isCasacade === 1 ? (e) => { handleChange(e, min, max, mand, error, validations); handleDropdownChange(e, mapID, cascadingFieldsID) } : (e) => { handleChange(e, min, max, mand, error, validations); handleDependancy(e); }}
            >
                <option value=''>--Select-- </option>
                {dropdowndata[name] && dropdowndata[name].map((dropitem, dropind) => {
                    return (
                        <option key={dropind} value={dropCondition === 0 ? dropitem.Value || dropitem.value : dropitem.Text || dropitem.text} className="dropdown-items">
                            {dropitem.Text || dropitem.text}
                        </option>
                    );
                })
                }
            </select>
            {error && <div className={`error ${errorFlag[name] ? `green` : ``}`}>{error}</div>}
        </div>
    );

}

export default DropDownDisplay