import { useState, useEffect,useContext } from 'react'
import finhub from "../apis/finhub"
import { WatchListContext } from '../context/watchListContext'

const Autocomplete = () => {

    const [search, setSearch] = useState('')
    const [results, setResults] = useState([])

    const {addStock}=useContext(WatchListContext)

    const renderDropdown=()=>{
        const dropDownClass=search?'show':null
        return(
            <ul style={{height:'400px', overflowY:'scroll', overflowX:'hidden', cursor:'pointer'}} 
            className={`dropdown-menu ${dropDownClass}`}>
                {results.map((result)=>{
                    return(
                        <li key={result.symbol} className="dropdown-item" onClick={()=>{addStock(result.symbol);setSearch('')}}>{result.description} ({result.symbol})</li>                    
                    )
                })}
            </ul>
        )
    }

    useEffect(() => {
        let isMounted = true
        const fetchData = async () => {
            try {
                const response = await finhub.get('/search', {
                    params: {
                        q: search
                    }
                })
                if (isMounted)
                    setResults(response.data.result)
            } catch (error) {
                console.log(error)
            }
        }
        if (search.length > 0)
            fetchData()
        else
        setResults([])

        return () => (isMounted = false)
    }, [search])

    return (
        <div className="w-50 p-5 rounded mx-auto">
            <div className="form-floating dropdown">
                <input style={{ backgroundColor: 'rgba(145,158,171,0.04)' }} id="search" type="text" className="form-control" placeholder="Search" Autocomplete="off" value={search} onChange={(e) => setSearch(e.target.value)}></input>
                <label htmlFor="search">Search</label>
                {renderDropdown()}
            </div>
        </div>
    )

}

export default Autocomplete