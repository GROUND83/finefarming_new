import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function EventWrap({ event }: { event: any }) {
  return (
    <Accordion
      type="single"
      collapsible
      className=" col-span-12 bg-primary "
      defaultValue={"item-1"}
    >
      <AccordionItem value="item-1">
        <AccordionTrigger className="px-4">
          <div className=" w-full flex flex-row items-center justify-center gap-3">
            <p className="text-sm  text-white">EVENT</p>
            <p className="text-lg text-white font-semibold">{event.title}</p>
          </div>
        </AccordionTrigger>
        <AccordionContent className=" p-6 bg-neutral-100">
          <p className=" text-sm lg:text-base whitespace-pre-line  text-center">
            {event.description}
          </p>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
