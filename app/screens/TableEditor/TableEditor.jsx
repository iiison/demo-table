import React, { useState, useEffect } from 'react'

import { Table } from '$COMPONENTS'
import tableDataFormatter from './tableDataFormatter'

function fetchTable(id) {
  return {
    hash : 'not_used',
    data : {
      headers : [ 
        {
          name : 'col-1',
          display_name : 'col-1',
          type : 'decimal',
          format_hint : 'int'
        },
        {
          name : 'col-2',
          display_name : 'col-2',
          type : 'currency',
          format_hint : 'float'
        },
        {
          name : 'col-3',
          display_name : 'col-3',
          type : 'boolean',
          format_hint : 'date'
        }
      ],
      rows : [
        ['123', '32.32', '1234123'],
        ['123', '32', '1234123'],
        ['123', '32.32', '1234123'],
        ['123', '32.32', '1234123'],
      ]
    }
  }
}

function makeTableDataMap(data) {
  return data.reduce((map, row, currIndex) => ({
    ...map,
    [currIndex] : row
  }), {})
}

export default function TableEditor() {
  const [ tableDataMap, setTableDataMap ] = useState()
  const [ tableHeaders, setTableHeaders ] = useState([])
  const [ tableHash, setTableHash ] = useState([])
  const [ activeRows, setActiveRows ] = useState([])

  useEffect(() => {
    const {
      hash,
      data : { headers, rows : data }
    } = fetchTable()

    const rowsMap = makeTableDataMap(data)
    setTableDataMap(rowsMap)
    setTableHeaders(headers)
    setTableHash(hash)
    setActiveRows(Object.keys(rowsMap))
  }, [])

  return (
    tableDataMap === undefined
    ? <h2>No Data</h2>
    : (
      <div className='grid col-12'>
        <Table
          rows={activeRows}
          map={tableDataMap}
          headers={tableHeaders}
          formatter={tableDataFormatter}
        />
      </div> 
    )
  )
}
