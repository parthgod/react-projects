import { useGlobalContext } from "../context";
import { AiOutlineSearch, AiFillCalendar } from 'react-icons/ai';
import DatePicker from 'react-datepicker';
import ReactQuill from 'react-quill';

const InputComponent = ({ index, name, value, min, max, mand, error, label, search, type, fileType, className, validations, dateFormat }) => {
    const { handleChange, errorFlag, setSearchModal, handlePANVerification, handleDateChange,handleRichTextInput } = useGlobalContext();

    return (
        <div className="form-element" key={index} id={type}>
            <label>{label} {search === 1 ? <AiOutlineSearch className="search-icon" onClick={() => { setSearchModal(true) }} /> : null}</label>
            {type === 'date' ? (
                <div className="input-field-date">
                    <DatePicker
                        value={value}
                        className="date"
                        onChange={handleDateChange(name, dateFormat)}
                        placeholderText="Select a date"
                        id={name}
                    /><AiFillCalendar onClick={() => { document.getElementById(name).focus() }} className="calendar-icon" />
                </div>) : type === 'richtextbox' ? (
                    <ReactQuill
                        placeholder="Write your message here"
                        id={name}
                        onChange={handleRichTextInput(name)}
                    />
                )
                : type==='textarea'?(
                    <textarea
                        onChange={(e) => { handleChange(e, min, max, mand, error, validations) }}
                        id={name}
                        name={name}
                        placeholder={label}
                        className='input-field'
                        required={mand === 1}
                        value={value}
                    />
                ): (
                    <input
                        onChange={(e) => { handleChange(e, min, max, mand, error, validations) }}
                        type={className.toLowerCase().includes('email') ? 'email' : type}
                        accept={type === 'file' ? fileType.toString() : null}
                        id={name}
                        name={name}
                        placeholder={label}
                        className={type === 'file' ? 'file-input' : 'input-field'}
                        required={mand === 1}
                        value={value}
                        onBlur={value !== '' && validations === 'PAN' ? handlePANVerification : null}
                    />)}
            {error && <div className={`error ${errorFlag[name] ? 'green' : ''}`}>{error}</div>}
        </div>
    );
};

export default InputComponent;