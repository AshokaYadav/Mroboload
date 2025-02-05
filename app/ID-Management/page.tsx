'use client'
import FormComponent from '@/components/IdManageent/FormComponent';
import useAuthCheck from '@/hooks/useAuthCheck'
import React from 'react'

const Page = () => {
  useAuthCheck();
  return (
    <>
    <FormComponent/>
    </>
  )
}

export default Page