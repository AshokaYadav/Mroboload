'use client'
import FormComponent from '@/components/IdManageent/FormComponent';
import useAuthCheck from '@/hooks/useAuthCheck'
import React, { useEffect } from 'react'

const page = () => {
  useAuthCheck();
  return (
    <>
    <FormComponent/>
    </>
  )
}

export default page