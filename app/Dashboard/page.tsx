'use client'
import useAuthCheck from '@/hooks/useAuthCheck'
import React from 'react'

const page = () => {
  useAuthCheck();
  return (
    <div>This one is Dashboard page over here</div>
  )
}

export default page