import React from 'react'
import {ClipLoader} from 'react-spinners'

const override = {
    diplay: 'block',
    margin: '100px auto'
}
const Spinner = ({loading}) => {
  return (
    <ClipLoader
        color='#4338ca'
        loading={loading}
        cssOverride={override}
        size={80}
    />
  )
}

export default Spinner