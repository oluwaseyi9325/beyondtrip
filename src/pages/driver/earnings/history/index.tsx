import { earningData } from '@/data/earningData'
import Container from '@/layout/driver/container'
import EarningTable from '@/layout/driver/tables/earnings'
import React from 'react'


function Earnings() {
 

  return (
    <Container active='Earnings'>
       <EarningTable data={earningData}/>
    </Container>
  )
}

export default Earnings
