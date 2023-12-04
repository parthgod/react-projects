import { useGlobalContext } from "../context";
import { AiOutlineArrowRight, AiOutlineArrowLeft, AiFillLock, AiFillUnlock } from 'react-icons/ai'

const Table = ({ data }) => {

    const { handlePageChange, currentPage, setCurrentPage, entriesPerPage, setAutoID, setIsClicked } = useGlobalContext()

    const indexOfLastEntry = currentPage * entriesPerPage;
    const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
    const currentEntries = data.slice(indexOfFirstEntry, indexOfLastEntry);
    const fields = Object.keys(currentEntries[0])

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(data.length / entriesPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <div>
            {pageNumbers.length > 1 && <div className="page-control-btn">
                {currentPage !== pageNumbers[0] ? <button onClick={() => setCurrentPage(currentPage - 1)} className="page-btn"><AiOutlineArrowLeft />Previous</button> : <section></section>}
                <div>Page: {currentPage}</div>
                {currentPage !== pageNumbers[pageNumbers.length - 1] ? <button onClick={() => setCurrentPage(currentPage + 1)} className="page-btn">Next<AiOutlineArrowRight /></button> : <section></section>}
            </div>}
            <table>
                <thead>
                    <tr>
                        {fields.map((field) => (
                            <th>{field}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {currentEntries.map((entry) => (
                        <tr key={entry.AutoID} onClick={() => {setAutoID(entry.AutoID);setIsClicked(true)}}>
                            {fields.map((field) => {
                                if (field === 'isLocked') {
                                    if (entry[field] === 0) {
                                        return (
                                            <td style={{color:'red'}}><AiFillLock /></td>
                                        )
                                    }
                                    else{
                                        return(
                                            <td style={{color:'green'}}><AiFillUnlock/></td>
                                        )
                                    }
                                }
                                else{
                                    return(
                                        <td>{entry[field]}</td>
                                    )
                                }
                            })}
                            {/* <td>{entry.AutoID}</td>
                            <td>{entry.UniqueID}</td>
                            <td>{entry.VendorCode}</td>
                            <td>{entry.VendorName}</td>
                            <td>{entry.InvoiceType}</td>
                            <td>{entry.RECEIVEDDATE}</td>
                            <td>{entry.BUCKETDATE}</td> */}
                        </tr>
                    ))}
                </tbody>
            </table>

            {!data.length && <p>No matching records found</p>}
            <div className="pagenumbers">
                {pageNumbers.length > 1 && pageNumbers.map((number) => (
                    <button key={number} onClick={() => handlePageChange(number)} className={currentPage === number ? "btn selected" : 'btn'}>
                        {number}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Table;