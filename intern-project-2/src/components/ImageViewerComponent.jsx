import { useGlobalContext } from "../context"

const ImageViewerComponent = ({ index, item, uniqueItem }) => {

    const { handleViewAttachment } = useGlobalContext()

    return (
        <div className="form-element" key={index}>
            <label>{item.label}</label>
            {uniqueItem && uniqueItem.FIELDData ? (<button className='marked btn' onClick={() => handleViewAttachment(uniqueItem.FIELDData)} id={item.fieldName}>Click here to view</button>) : (<input className='input-field marked' value='null' disabled={true} type={item.fieldType} id={item.fieldName} />)}
        </div>
    )

}

export default ImageViewerComponent