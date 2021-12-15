import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'

import styles from './styles.css'

function getMockTables() {
  return [
    {
      name : 'This Table',
      desc : 'Some Desc',
      cols : 12,
      rows : 5,
      id   : 123,
    },
    {
      name : 'Second Table',
      desc : 'Some Desc',
      cols : 12,
      rows : 5,
      id   : 323,
    },
    {
      name : 'Third Table',
      desc : 'Third table Desc',
      cols : 12,
      id   : 923,
      rows : 5
    }
  ]
}

function getUserData() {
  return {
    isAdmin : true
  }
}

function renderTable(accessibleTables, isAdmin) {
  const history = useHistory()

  return (
    <div className='col-12 padded-l'>
      <div className='grid'>
        <div className='margin-bottom-l col-12'>
          <div className='grid-spaceBetween col-12'>
            <h2 className='col-9'>You have access to {accessibleTables.length} table(s)</h2>
            {isAdmin && <button
              onClick={() => history.push('/table/new')}
              className={`col-2 ${styles.button}`}
            >Create New Table</button>}
          </div>
        </div>
        <div className='grid col-12'>
          {accessibleTables.map(({ name, desc, cols, rows, id }) => (
            <div
              className={`col-12 ${styles.tableRow}`}
              onClick={() => history.push(`/table/${id}`)}
              role='link'
              key={name}
            >
              <h3 className='grid-middle'>
                {name} 
                <span className={`${styles.smalls}`}>({rows} rows & {cols} columns)</span>
              </h3>
              <p>{desc}</p>
            </div>
            
          ))}
        </div>
      </div>
    </div>
  )
}

const Home = () => {
  const [userData, setUserData] = useState({})
  const [accessibleTables, setAccessibleTables] = useState([])
  const { isAdmin = false } = userData

  useEffect(() => {
    const tables = getMockTables()
    const userInfo = getUserData()

    setAccessibleTables(tables)
    setUserData(userInfo)
  }, [])

  return (
    <div className='col-12 grid'>
      {
        accessibleTables.length > 0 
          ? renderTable(accessibleTables, isAdmin)
          : <h1 className='col-12'>No Accessible Tables</h1>
      }
    </div>
  )
}

export default Home

