import axios from 'axios'
import { useParams } from 'react-router-dom'

const token="chunp0pr01qphnn2cfj0chunp0pr01qphnn2cfjg"

export default axios.create({
    baseURL: 'https://finnhub.io/api/v1',
    params:{
        token:token
    }
})