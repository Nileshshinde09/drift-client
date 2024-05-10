import React from 'react'
import { Checkbox } from "@/components/ui/checkbox"
const TNC = () => {
  return (
    <>
      <div className="items-top flex space-x-2">
        <Checkbox id="terms1" />
        <div className="grid gap-1.5 leading-none">
          <label
            htmlFor="terms1"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Accept terms and conditions
          </label>
          <p className="text-sm dark:text-muted-foreground text-muted">
            You agree to our Terms of Service and Privacy Policy.
          </p>
        </div>
      </div>
    </>
  )
}

export default TNC
