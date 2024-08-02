import React from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  TabsContent,
  Tabs
} from "@/components/ui/tabs"
import { DashboardPostRowComponents } from '@/components'
import { useSelector } from 'react-redux'
import { useDocumentTitle } from 'usehooks-ts'
const dashboard = () => {
  const user=useSelector(state=>state.auth.userData)
  useDocumentTitle(`${user?.username} Dashboard💎Drift`)
  return (
    <div className='mx-20 overflow-y-scroll h-screen pb-[10rem] no-scrollbar'>
      <Tabs defaultValue="all">
      <TabsContent value="all">
              <Card x-chunk="dashboard-06-chunk-0">
                <CardHeader>
                  <CardTitle className="mx-auto">Manage Your Posts</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="hidden w-[100px] sm:table-cell">
                          <span className="sr-only">Image</span>
                        </TableHead>
                        <TableHead>Caption</TableHead>
                        
                        <TableHead className="hidden md:table-cell">
                          Tags
                        </TableHead>
                        <TableHead className="hidden md:table-cell">
                          Comments
                        </TableHead>
                        <TableHead className="hidden md:table-cell">
                          Likes
                        </TableHead>
                        <TableHead className="hidden md:table-cell">
                          Created at
                        </TableHead>
                        <TableHead className="hidden md:table-cell">
                          last Updated at
                        </TableHead>
                        <TableHead className="hidden md:table-cell">
                          Edit
                        </TableHead>
                        <TableHead className="hidden md:table-cell">
                          Delete
                        </TableHead>
                        <TableHead>
                          <span className="sr-only">Actions</span>
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>

                    <DashboardPostRowComponents/>

                    </TableBody>
                  </Table>
                </CardContent>
                <CardFooter>
                 
                </CardFooter>
              </Card>
            </TabsContent>
            </Tabs>
    </div>
  )
}

export default dashboard
