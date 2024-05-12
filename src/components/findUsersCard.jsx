import { Avatar } from ".";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    CommandShortcut,
} from "@/components/ui/command"

const FindUsers = () => {
    return (
        <Command className="rounded-lg border shadow-md">
            <CommandInput placeholder="Type a command or search..." />
            <CommandList>
                <CommandItem> <Avatar username={"striver7"} fullName={"Nilesh Kashinath Shinde"} /> </CommandItem>
                <CommandItem> <Avatar username={"striver7"} fullName={"Nilesh Kashinath Shinde"} /> </CommandItem>
                <CommandItem> <Avatar username={"striver7"} fullName={"Nilesh Kashinath Shinde"} /> </CommandItem>
                <CommandItem> <Avatar username={"striver7"} fullName={"Nilesh Kashinath Shinde"} /> </CommandItem>
                <CommandItem> <Avatar username={"striver7"} fullName={"Nilesh Kashinath Shinde"} /> </CommandItem>
                <CommandItem> <Avatar username={"striver7"} fullName={"Nilesh Kashinath Shinde"} /> </CommandItem>
            </CommandList>
        </Command>
    )
}
export default FindUsers;