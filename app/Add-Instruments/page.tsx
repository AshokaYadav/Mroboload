'use client'
import useAuthCheck from '@/hooks/useAuthCheck'
import React from 'react'

const page = () => {
  useAuthCheck();
  return (
    <div>Ashoka this one is totally differnet page over her lorem1000</div>
  )
}

export default page