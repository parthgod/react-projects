import './App.css'
import ViewTable from './pages/ViewTable'
import ViewDetails from './pages/ViewDetails'
import { useGlobalContext } from './context'

function App() {

  const { isClicked } = useGlobalContext()

  return (
    <>
      {isClicked ? <ViewDetails /> : <ViewTable />}
    </>
  )
}

export default App
