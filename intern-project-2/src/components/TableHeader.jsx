import { useGlobalContext } from "../context";

const TableHeader = () => {

    const { statsData, statusSelected, setStatusSelected } = useGlobalContext()

    return (
        <div className="title">
            Processing
            <select onChange={(e) => { setStatusSelected(e.target.value) }} className="dropdown" value={statusSelected}>
                {statsData.map((dropitem, dropind) => {
                    return (
                        <option key={dropind} value={dropitem.ID} className="dropdown-items">
                            {dropitem.VALUE}
                        </option>
                    );
                })
                }
            </select>
        </div>
    )

}

export default TableHeader