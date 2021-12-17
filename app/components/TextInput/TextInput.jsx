import React, { useState, useEffect } from 'react'
import { PropTypes } from 'prop-types'

import styles from './styles.css'

function handleInputChange(setValue) {
  return (event) => {
    event.persist()

    setValue(event.target.value)
  }
}

export default function TextInput({
  classes = '',
  type = 'text',
  placeholder = '',
  onChange,
  label
}) {
  const [value, setValue] = useState('')
  const inputProps = {
    type,
    value,
    placeholder
  }

  useEffect(() => onChange(value), [value])

  return (
    <div className={`grid-middle col-12 ${classes}`}>
      {label && (<div className='label col-12 margin-bottom-s'>{label}</div>)}
      <input
        className={`col-12 ${styles.input}`}
        {...inputProps}
        onChange={handleInputChange(setValue)}
      />
    </div>
  )
}

TextInput.propTypes = {
  label       : PropTypes.string.isRequired,
  onChange    : PropTypes.func.isRequired,
  classes     : PropTypes.string,
  placeholder : PropTypes.string,
  type        : PropTypes.oneOf(['email', 'text', 'number', 'tel', 'password', 'textarea'])
}
