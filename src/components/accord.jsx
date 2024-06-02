import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

const Accord = ({ question = "", children }) => {
    return (
        <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
                <AccordionTrigger>
                    <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                        {question}
                    </h3>
                </AccordionTrigger>
                <AccordionContent>
                <div className="text-lg font-semibold">
                    {
                        children
                    }
                </div>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    )
}
export default Accord