import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuShortcut,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"

const MessangerContextMenue = ({ children }) => {
  return (
    <ContextMenu>
      <ContextMenuTrigger className=" flex h-fit w-fit items-center justify-center rounded-md border border-dashed text-sm">
        {
          children
        }
      </ContextMenuTrigger>
      <ContextMenuContent className="w-64">
        <ContextMenuItem inset>
          Delete
          <ContextMenuShortcut></ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem inset>
          Edit
          <ContextMenuShortcut></ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem inset>
          info
          <ContextMenuShortcut></ContextMenuShortcut>
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  )
}
export default MessangerContextMenue;