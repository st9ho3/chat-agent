"use client"

import Notification from '@/app/components/shared/notification'
import { useHomeContext } from '@/app/context/homeContext/homeContext'
import React from 'react'

const page = () => {
  const {state} = useHomeContext()

  return (
    <div>
   { state.notification.isOpen && <Notification />}
    </div>
  )
}

export default page
