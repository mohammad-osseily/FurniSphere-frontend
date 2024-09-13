'use client'

import React, { useState } from 'react'
import AdminSidebar from '../../components/AdminSidebar'
import ThreeDManipulation from '../../components/ThreeDManipulation'
import Add3DProduct from '../../components/Add3DProduct'

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <div className="p-3">{children}</div>}
    </div>
  )
}

export default function ThreeDPage() {
  const [tabValue, setTabValue] = useState(0)

  const handleTabChange = (newValue: number) => {
    setTabValue(newValue)
  }

  return (
    <div className="flex h-screen">
      <AdminSidebar />
 
    </div>
  )
}