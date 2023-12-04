import { useGlobalContext } from "../context"
import { AiFillEdit, AiTwotoneDelete } from 'react-icons/ai'

const LineItemTable = ({ item, fieldNames }) => {

    const { lineItemData, handleDeleteEntry, handleEditEntry } = useGlobalContext()

    return (
        <div className='lineitem-table'>
            <table className='lineitem-table'>
                <thead>
                    <tr>
                        {fieldNames.map((field, id) => {
                            return (
                                <th key={id}>{field}</th>
                            )
                        })}
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {lineItemData[item.fieldName] && lineItemData[item.fieldName].map((lineItem, lineID) => {
                        return (
                            <tr key={lineID}>
                                {fieldNames.map((field, id) => {
                                    return (
                                        <td key={id}>{lineItem[field]}</td>
                                    )
                                })}
                                <td>
                                    <div className="table-line-btn">
                                        <button className="btn-line-items" onClick={() => handleEditEntry(lineItem, item.tabName)}><AiFillEdit /> Edit</button>
                                        <button className="btn-line-items" id="delete" onClick={() => handleDeleteEntry(lineItem, item.fieldName)}><AiTwotoneDelete /> Delete</button>
                                    </div>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )

}

export default LineItemTable