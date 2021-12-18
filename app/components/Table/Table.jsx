import React from 'react'
import { PropTypes } from 'prop-types'

export default function Table({ headers, rows, map, formatter }) {
  return (
    <table className='col-12 t-center'>
      <thead>
        <tr>
          {headers.map(({ display_name, name }) => (
            <th key={name}>{display_name}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {
          rows.map((row) => (
            <tr key={row}>
              {
                map[row].map((value, index) => (
                  <td key={value}>
                    <div className='col-12 grid-center grid-middle'>
                      {formatter(headers[index].format_hint, value)}
                    </div>
                  </td>
                ))
              }
            </tr>
          ))
        }
      </tbody>
    </table>
  )
}

Table.propTypes = {
  formatter : PropTypes.func,
  map       : PropTypes.object,
  rows      : PropTypes.arrayOf(PropTypes.number),
  headers   : PropTypes.arrayOf(PropTypes.shape({
    display_name : PropTypes.string,
    format_hint  : PropTypes.string,
    name         : PropTypes.string,
    type         : PropTypes.string
  }))
}
