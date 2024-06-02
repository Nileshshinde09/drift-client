import React from 'react'
import { Copyright } from 'lucide-react'
import { Link } from 'react-router-dom'
const copyright = () => {
  return (
    <Link to={"/@DriftSocial/copyright"}>
    <h4 className="scroll-m-20 text-xl font-semibold tracking-tight flex items-center space-x-2">
      <Copyright className=''/>
      <div>
          2024 Drift Social. All rights reserved
      </div>
    </h4>
    </Link>
  )
}

export default copyright