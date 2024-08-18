import React , {useState} from 'react'
import AddProgram from '../Components/Programs/AddProgram'
import ShowPrograms from '../Components/Programs/ShowPrograms'

function Programs() {
  const [refresh , setRefresh] = useState(false)
  const handleToggleRefresh = () => {
    setRefresh(!refresh)
  }
  return (
    <div>
      <AddProgram handleToggleRefresh={handleToggleRefresh}/>
      <ShowPrograms refresh={refresh}/>
    </div>
  )
}

export default Programs
