import React, { Suspense } from 'react'
import {BarLoader} from "react-spinners"

const Layout = ({children}) => {
  return (
    <div className="px-5">
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-6xl font-bold gradient-title">Industry Insights</h1>
      </div>
      <Suspense fallback={<BarLoader/>}>{children}</Suspense>
    </div>
  )
}

export default Layout
