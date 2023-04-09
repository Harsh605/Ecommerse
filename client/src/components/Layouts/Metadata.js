import React from 'react'
import { Helmet, HelmetProvider } from 'react-helmet-async'
const Metadata = ({title}) => {
  return (
    <Helmet>
        <title>{title}</title>
    </Helmet>
  )
}

export default Metadata