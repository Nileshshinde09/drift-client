import React from 'react'
import { Button } from '../ui/button'
import { Form } from '../ui/form'
import { Auth } from '@/services'
import { useToast } from '../ui/use-toast'
import { useNavigate } from 'react-router-dom'
import { cn } from '@/lib/utils'
import { useDispatch } from 'react-redux'
import { logout } from '@/app/slices/authSlices'

const Logout = ({className,props}) => {
  const dispatch = useDispatch()
  const  navigate = useNavigate()
  const { toast } = useToast();
  const onSubmit = (event) => {
    event.preventDefault()
      ; (
        async () => {
          try {
            const logoutResponse = await Auth.logout();
            if (logoutResponse.data) {
              toast({
                title: logoutResponse.data.message || "Logout user Sucessfully !"
              })
              dispatch(logout())
            }
          } catch (error) {
            toast({
              titile: error.message || "Something went wrong while logging out.",
              variant: "destructive"
            })
          }

        }
      )();
  }
  return (
    <Form>
      <form onSubmit={onSubmit}>
        <Button className={cn("text-center",className)} {...props} variant="ghost" type="submit">Logout</Button>
      </form>
    </Form>
  )
}

export default Logout