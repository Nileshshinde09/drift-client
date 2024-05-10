// import React from 'react'
// import { Moon, Sun } from "lucide-react"
// import { Button } from "@/components/ui/button"
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu"
// import { setTheme } from '@/app/slices/themeSlice'
// import { useDispatch } from 'react-redux'
// const themeButton = () => {
//   const dispatch = useDispatch()
//   return (
//     <DropdownMenu>
//       <DropdownMenuTrigger asChild>
//         <Button variant="outline" size="icon">
//           <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
//           <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
//           <span className="sr-only">Toggle theme</span>
//         </Button>
//       </DropdownMenuTrigger>
//       <DropdownMenuContent align="end">
//         <DropdownMenuItem onClick={() => dispatch(setTheme("light"))}>
//           Light
//         </DropdownMenuItem>
//         <DropdownMenuItem onClick={() => dispatch(setTheme("dark"))}>
//           Dark
//         </DropdownMenuItem>
//         <DropdownMenuItem onClick={() => dispatch(setTheme("system"))}>
//           System
//         </DropdownMenuItem>
//       </DropdownMenuContent>
//     </DropdownMenu>
//   )
// }


// export default themeButton




import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { setTheme } from '@/app/slices/themeSlice'
import { useDispatch } from 'react-redux'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const FormSchema = z.object({
  theme: z
    .string({
      required_error: "Please select an theme to display.",
    })
})

const themeButton=()=>{
  const form = useForm({
    resolver: zodResolver(FormSchema),
  })
  const dispatch = useDispatch()

  return (
    <Form {...form}>
      <form className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="theme"
          render={({ field }) => (
            <FormItem>
              <Select defaultValue={field.value} onValueChange={(e)=>{dispatch(setTheme(e))}}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select theme" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="system">System</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="light">Light</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}
export default themeButton