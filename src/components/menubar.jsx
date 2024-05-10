import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui/menubar"
import axios from "axios"

const MainMenubar = () => {
  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>Home</MenubarTrigger>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>Feed</MenubarTrigger>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>
        </MenubarTrigger>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>Profile</MenubarTrigger>
      </MenubarMenu>
    </Menubar>
  )
}
export default MainMenubar