import React from 'react'
import Card from '~/components/Card'
import { api } from '~/utils/api'

export default function Dashboard() {
  const query = api.vehicles;
  const todayEntries = query.getTodayTotal.useQuery()
  console.log(todayEntries.data);
  

  return (
    <div className='container'>
      <Card >
        <div></div>
      </Card>
    </div>
  )
}
