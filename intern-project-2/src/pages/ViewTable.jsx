import { useGlobalContext } from "../context"
import Table from "../components/Table"
import TableHeader from "../components/TableHeader"
import { useEffect } from "react"

const ViewTable = () => {

    const { isloading, statusSelected, handleEntriesPerPageChange, entriesPerPage, handleSearch, searchFilteredData } = useGlobalContext()

    // useEffect(()=>{console.clear()},[])

    useEffect(() => {
        handleSearch({ target: { value: '' } })
    }, [])

    if (isloading) {
        return (
            <div className="load">
                <div className="loading-wave">
                    <div className="loading-bar"></div>
                    <div className="loading-bar"></div>
                    <div className="loading-bar"></div>
                    <div className="loading-bar"></div>
                </div>
            </div>
        )
    }

    return (
        <div className="table-container">
            {/* <pre>{JSON.stringify(tableData,null,2)}</pre> */}
            <div className="table">
                <TableHeader />
                {statusSelected !== '' && <div className="table-header">
                    <div className="table-heading-1">
                        Show <select value={entriesPerPage} onChange={handleEntriesPerPageChange} className="dropdown">
                            <option value={10}>10</option>
                            <option value={20}>20</option>
                            <option value={30}>30</option>
                        </select> entries per page
                    </div>
                    <input type="text" placeholder="Search" onChange={handleSearch} id='search-bar' />
                </div>}
                {/* {!searchFilteredData.length && <p>No matching records found</p>} */}
                {statusSelected === 'Submitted' ? <div className="view-table"><Table data={searchFilteredData} /></div> : statusSelected === 'Approved' ? <p>No approved records</p> : statusSelected === '' && <p>Please select an appropriate option</p>}
            </div>
        </div>
    )

}

export default ViewTable