import StockList from "../components/StockList";
import Autocomplete from "../components/Autocomplete";

const StockOverviewPage=()=>{

    return(
        <div>
            <Autocomplete/>
            <StockList/>
        </div>
    )

}

export default StockOverviewPage;