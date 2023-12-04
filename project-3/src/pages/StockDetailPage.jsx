import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import finhub from '../apis/finhub'
import { useState } from 'react'
import { StockChart } from '../components/StockChart'
import { StockData } from '../components/StockData'

const StockDetailPage = () => {

    const { symbol } = useParams()
    const [chartData, setChartData] = useState()

    const formatData=(data)=>{
        return data.t.map((el,index)=>{
            return{
                x:el*1000,
                y:Math.floor(data.c[index])
            }
        })
    }

    useEffect(() => {
        const fetchData = async () => {
            const date = new Date()
            const currentTime = Math.floor(date.getTime() / 1000)
            let oneDay
            if (date.getDay() === 6) {
                oneDay = currentTime - 60 * 60 * 24 * 2
            }
            else if (date.getDay() === 0) {
                oneDay = currentTime - 60 * 60 * 24 * 3
            }
            else {
                oneDay = currentTime - 60 * 24 * 60
            }
            const oneWeek = currentTime - 24 * 60 * 60 * 7
            const oneYear = currentTime - 24 * 60 * 60 * 365

            try {
                const responses = await Promise.all([finhub.get('/stock/candle', {
                    params: {
                        symbol,
                        from: oneDay,
                        to: currentTime,
                        resolution: 30
                    }
                }), finhub.get('/stock/candle', {
                    params: {
                        symbol,
                        from: oneWeek,
                        to: currentTime,
                        resolution: 60
                    }
                }), finhub.get('/stock/candle', {
                    params: {
                        symbol,
                        from: oneYear,
                        to: currentTime,
                        resolution: "W"
                    }
                })])
                console.log(responses)
                setChartData({
                    day: formatData(responses[0].data),
                    week: formatData(responses[1].data),
                    year: formatData(responses[2].data)
                })
            } catch (error) {
                console.log(error)
            }
            
        }
        fetchData()
    }, [symbol])

    return (
        <div>
            {chartData && (
                <div>
                    <StockChart chartData={chartData} symbol={symbol}/>
                    <StockData symbol={symbol}/>
                </div>
            )}
        </div>
    )

}

export default StockDetailPage;