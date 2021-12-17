import React, { useEffect, useState, useRef } from 'react'
import { PropTypes } from 'prop-types'

import { Select } from '$COMPONENTS'

function getSchemas() {
  return [
    {
      name        : 'some schema',
      description : 'some schema description',
    },
    {
      name        : 'another schema',
      description : 'another schema description',
    }
  ]
}

function fetchSchemaDetails() {
  return {
    name : 'Schema Name',
    description : 'Schema description',
    columns : [
      {
        name : 'Col-1',
        description : 'col-1 description',
        display_name : 'col-1 name',
        type : 'bool'
      },
      {
        name : 'Col-2',
        description : 'col-2 description',
        display_name : 'col-2 name',
        type : 'string'
      }
    ]
  }
}

function handleSchemaChange(formData, setSchema) {
  return (value) => {
    formData.current = {
      ...formData.current,
      schema : value
    }

    const schemaDetails = fetchSchemaDetails(value)

    setSchema(schemaDetails)
  }
}

function SchemasSelection({ schemas, formData, setSchema }) {
  const options = schemas.reduce((acc, { name, description, id }) => {
    return [
      ...acc,
      {
        display : (
          <>
            <h3 className='col-12 t-capitalize'>{name}</h3>
            <p className='col-12 t-capitalize'>{description}</p>
          </>
        ),
        id : id || name
      }
    ]
  }, [])
  const selectProps = {
    options,
    label    : 'Select Schema',
    onChange : handleSchemaChange(formData, setSchema)
  }
  return (
    <div className='grid col-12'>
      <Select {...selectProps} />
    </div>
  )
}

SchemasSelection.propTypes = {
  formData : PropTypes.object.isRequired,
  setSchema : PropTypes.func.isRequired,
  schemas  : PropTypes.arrayOf(PropTypes.shape({
    name        : PropTypes.string.isRequired,
    description : PropTypes.string.isRequired
  }))
}

function SchemaOptions({ schema }) {
  return (
    <div className='margin-tb-xl col-12'>
      <h3>Choose Columns</h3>
      <div className='grid col-12'>
        {schema.columns.map(({display_name, description, name}) => (
          <div className='col-12' key={name}>
            <h4>{display_name}</h4>
              <p>{description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

SchemaOptions.propTypes = {
  schema: PropTypes.shape({
    name        : PropTypes.string,
    description : PropTypes.string,
    columns     : PropTypes.arrayOf(PropTypes.shape({
      name         : PropTypes.string.isRequired,
      description  : PropTypes.string.isRequired,
      display_name : PropTypes.string,
      type         : PropTypes.string,
      format_hint  : PropTypes.string
    }))
  })
}


function CreateNewTable() {
  const formData = useRef({})
  const [schemas, setSchemas] = useState([])
  const [schemaDetails, setSchema] = useState()
  const [tableAddress, setTableAddress] = useState('')

  useEffect(() => {
    const allSchemas = getSchemas()
    
    setSchemas(allSchemas)
  }, [])

  return (
    <div className='grid col-12'>
      <div className='col-12 padded-l'>
        <div className='grid'>
          <h2 className='margin-bottom-l col-12'>Create New Table</h2>
          <div className='grid col-12'>
            {
              schemas.length > 0
                ? (
                  <SchemasSelection
                    schemas={schemas}
                    formData={formData}
                    setSchema={setSchema}
                  />
                )
                : <h3>No Schemas Found</h3>
            }
          </div>
          {schemaDetails !== undefined && <SchemaOptions schema={schemaDetails} />}
        </div>
      </div>
    </div>
  )
}

export default CreateNewTable
