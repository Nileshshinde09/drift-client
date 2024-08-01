import React, { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller, useWatch } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ANO_GROP_TOPICS } from "@/constants";
ANO_GROP_TOPICS.sort()

const FormSchema = z.object({
  topic: z.string(),
});

const SelectGroupTopic = ({ setTopic,selectedTopic }) => {
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      topic: "",
    },
  });

  const topic = useWatch({
    control: form.control,
    name: "topic",
  });

  useEffect(() => {
    if (topic) {
      setTopic(topic)
    }
  }, [topic]);

  return (
    <Form {...form}>
      <form>
        <FormField
          control={form.control}
          name="topic"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Controller
                  control={form.control}
                  name="topic"
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder={ selectedTopic ||`Select a Topic`} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Topics</SelectLabel>
                          {[...new Set(ANO_GROP_TOPICS)].map((topic,index) => (
                            <SelectItem key={topic} value={topic}>
                              {topic.charAt(0).toUpperCase() + topic.slice(1)}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  )}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};

export default SelectGroupTopic;
