import DefaultLayout from '@/components/Layouts/DefaultLaout'
import TableReferal from '@/components/Tables/TableReferal'
import React from 'react'

const PartnersReferal = () => {
  return (
    <DefaultLayout>
      <div className='mx-auto max-w-7xl'>
         <TableReferal/>
      </div>
    </DefaultLayout>
  )
}

export default PartnersReferal