import { Link } from "react-router-dom"
import DriftLogo from "../../assets/Applogo/driftLogo.png"
import SettingDrawer from "@/components/drawer"
import { Drawer,DrawerTrigger } from "@/components/ui/drawer"
import {
  UserPlus2,
  Home,
  Package,
  PanelLeft,
  Search,
  Settings,
  ShoppingCart,
  Users2,
  SquarePlus,
  LayoutList,
  LayoutDashboard
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { BackgroundAnimation } from '@/components'

const Dashboard = ({ children }) => {
  return (
    <Drawer>
      <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <BackgroundAnimation />
        <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
          <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
            <Link
              to={"/"}
              className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
            >
              <div alt="drift logo" className="bg-black transition-all group-hover:scale-110">
                <img src={DriftLogo} className="scale-150" />
              </div>

            </Link>
            <Tooltip>
              <TooltipTrigger>
                <Link
                  to={"/"}
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                >
                  <Home className="h-5 w-5" />
                  <span className="sr-only">Home</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Home</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger>
                <Link
                  to={"/dashboard"}
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-accent-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                >
                  <LayoutDashboard className="h-5 w-5" />
                  <span className="sr-only">Dashboard</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Dashboard</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger>
                <Link
                  to={"/feed"}
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                >
                  <  LayoutList className="h-5 w-5" />
                  <span className="sr-only">Feed</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Feed</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger>
                <Link
                  to={"/create-post"}
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                >
                  <  SquarePlus className="h-5 w-5" />
                  <span className="sr-only">Create Post</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Create Post</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger>
                <Link
                  to={"/find-peoples"}
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                >
                  <UserPlus2 className="h-5 w-5" />
                  <span className="sr-only">Find Peoples</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Find Peoples</TooltipContent>
            </Tooltip>
          </nav>
          <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
            <Tooltip>
              <TooltipTrigger>
              <DrawerTrigger className="bg-transparent flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground">
                  <Button variant="outline" className="" >
                      <Settings className="h-5 w-5" />
                    </Button>
                  </DrawerTrigger>
              </TooltipTrigger>
              <TooltipContent side="right">Settings</TooltipContent>
            </Tooltip>
          </nav>
        </aside>
        <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
          <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
            <Sheet>
              <SheetTrigger>
                <Button size="icon" variant="outline" className="sm:hidden">
                  <PanelLeft className="h-5 w-5" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="sm:max-w-xs">
                <nav className="grid gap-6 text-lg font-medium">
                  <Link
                    to={"/"}
                    className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
                  >
                    <div alt="drift logo" className="bg-black transition-all group-hover:scale-110">
                      <img src={DriftLogo} className="scale-150" />
                    </div>

                  </Link>
                  <Link
                    to={"#"}
                    className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                  >
                    <Home className="h-5 w-5" />
                    Dashboard
                  </Link>
                  <Link
                    to={"#"}
                    className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                  >
                    <ShoppingCart className="h-5 w-5" />
                    Orders
                  </Link>
                  <Link
                    to={"#"}
                    className="flex items-center gap-4 px-2.5 text-foreground"
                  >
                    <Package className="h-5 w-5" />
                    Products
                  </Link>
                  <Link
                    to={"#"}
                    className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                  >
                    <Users2 className="h-5 w-5" />
                    Customers
                  </Link>
                  <DrawerTrigger>
                    <Button variant="outline" className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground">
                      <UserPlus2 className="h-5 w-5" />
                      Settings
                    </Button>
                  </DrawerTrigger>
                </nav>
              </SheetContent>
            </Sheet>
            <div className="relative ml-auto flex-1 md:grow-0">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search..."
                className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Button
                  variant="outline"
                  size="icon"
                  className="overflow-hidden rounded-full"
                >
                  <img
                    src="https://res.cloudinary.com/db3pdtxym/image/upload/v1714934153/AnoAvatar/zxeagtki3rlepyahsx3m.png"
                    width={36}
                    height={36}
                    alt="Avatar"
                    className="overflow-hidden rounded-full"
                  />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Support</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </header>
          <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          </main>
        </div>
            {
              children
            }
          <SettingDrawer />
      </div>
    </Drawer>
  )
}

export default Dashboard