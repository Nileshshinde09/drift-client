import { Link } from "react-router-dom";
import DriftLogo from "../../assets/Applogo/driftLogo.png";
import { CreatePostDialog, SettingDrawer, UserProfileDropdown, BackgroundAnimation } from "@/components";
import { Drawer, DrawerTrigger } from "@/components/ui/drawer";
import {
  UserPlus2, Home, Package, PanelLeft, Settings,
  ShoppingCart, Users2, SquarePlus, LayoutList,
  LayoutDashboard, CircleUserRoundIcon,
  MessageSquareMoreIcon, VenetianMaskIcon, FilmIcon
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useSelector } from "react-redux";
const Dashboard = ({ children }) => {
  const userData = useSelector(state=>state.auth.userData)
  return (
    <Drawer>
      <div className="relative flex min-h-screen w-full flex-col bg-muted/40">
        <BackgroundAnimation />
        <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
          <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
            <Link
              to="/"
              className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
            >
              <div className="bg-black transition-all group-hover:scale-110">
                <img src={DriftLogo} alt="drift logo" className="scale-150" />
              </div>
            </Link>

            <Tooltip>
              <TooltipTrigger>
                <Link
                  to="/"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                >
                  <Home className="h-5 w-5 stroke-lime-500" />
                  <span className="sr-only">Home</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Home</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger>
                <Link
                  to="/dashboard"
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-accent-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                >
                  <LayoutDashboard className="h-5 w-5 stroke-orange-500" />
                  <span className="sr-only">Dashboard</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Dashboard</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger>
                <Link
                  to="/messanger"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                >
                  <MessageSquareMoreIcon className="h-5 w-5 stroke-violet-400" />
                  <span className="sr-only">Messanger</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Messanger</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger>
                <Link
                  to="/journeyjournals"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                >
                  <VenetianMaskIcon className="h-5 w-5 stroke-blue-500" />
                  <span className="sr-only">Journey Journals</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Journey Journals</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger>
                <Link
                  to="/video-feed"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                >
                  <FilmIcon className="h-5 w-5 stroke-red-400" />
                  <span className="sr-only">Video Feed</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Video Feed</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger>
                <Link
                  to={`/profile/@${userData?.username}`}
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                >
                  <CircleUserRoundIcon className="h-5 w-5 stroke-green-500" />
                  <span className="sr-only">Profile</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Profile</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger>
                <div className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8">
                  <CreatePostDialog>
                    <SquarePlus className="h-5 w-5 stroke-pink-400" />
                  </CreatePostDialog>
                  <span className="sr-only">Create Post</span>
                </div>
              </TooltipTrigger>
              <TooltipContent side="right">Create Post</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger>
                <Link
                  to="/find-peoples"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                >
                  <UserPlus2 className="h-5 w-5 stroke-yellow-400" />
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
                  <Button variant="ghost" className="rounded-full">
                    <Settings className="h-5 w-5 stroke-sky-400" />
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
                    to="/"
                    className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
                  >
                    <div className="bg-black transition-all group-hover:scale-110">
                      <img src={DriftLogo} alt="drift logo" className="scale-150" />
                    </div>
                  </Link>

                  <Link
                    to="/"
                    className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                  >
                    <Home className="h-5 w-5" />
                    Home
                  </Link>

                  <Link
                    to="/dashboard"
                    className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                  >
                    <LayoutDashboard className="h-5 w-5" />
                    Dashboard
                  </Link>

                  <Link
                    to="/messanger"
                    className="flex items-center gap-4 px-2.5 text-foreground"
                  >
                    <MessageSquareMoreIcon className="h-5 w-5" />
                    Messanger
                  </Link>

                  <Link
                    to="/journeyjournals"
                    className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                  >
                    <VenetianMaskIcon className="h-5 w-5" />
                    Journey Journals
                  </Link>

                  <Link
                    to="/video-feed"
                    className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                  >
                    <FilmIcon className="h-5 w-5" />
                    Video Feed
                  </Link>

                  <Link
                    to={`/profile/@${userData?.username}`}
                    className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                  >
                    <CircleUserRoundIcon className="h-5 w-5" />
                    Profile
                  </Link>

                  <Link
                    to="/find-peoples"
                    className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                  >
                    <UserPlus2 className="h-5 w-5" />
                    Find Peoples
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>
            <h2 className="mx-auto text-center scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
            </h2>
            <div className="text-center relative ml-auto flex-1 md:grow-0">
            </div>
            <UserProfileDropdown />
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