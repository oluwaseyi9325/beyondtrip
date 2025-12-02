import Container from '@/layout/driver/container'
import EarningTable from '@/layout/driver/tables/earnings'
import { useDriverEarnings } from '@/services/earning.service'
import React from 'react'


function Earnings() {
   const { data } = useDriverEarnings()
   const earningData= data?.earnings?.recent
  //  console.log(data?.earnings?.recent,"earningsdsss")

  return (
    <Container active='Earnings'>
       <EarningTable data={earningData}/>
    </Container>
  )
}

export default Earnings
