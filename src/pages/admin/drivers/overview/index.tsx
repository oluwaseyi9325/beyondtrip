import Container from '@/layout/admin/container'
import Text from "@/components/typography";

import React from 'react'

function index() {
  return (
    <>
      <Container active='Overview' title='Drivers - Overview' >
        <section className="w-full px-4 py-6 flex flex-col gap-6">
          {/* Header */}
          <Text className="text-[24px] " weight="700" color="black">
            Drivers Management
          </Text>
          <div>
            
          </div>

        </section>
      </Container>
    </>
  )
}

export default index
