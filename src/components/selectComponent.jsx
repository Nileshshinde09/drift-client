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
import { TAGLIST as TagList } from "@/constants";

const FormSchema = z.object({
  tag: z.string(),
});

const SelectComponent = ({ setTag,selectedTag }) => {
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      tag: "",
    },
  });

  const tag = useWatch({
    control: form.control,
    name: "tag",
  });

  useEffect(() => {
    if (tag) {
      setTag(tag)
    }
  }, [tag]);

  return (
    <Form {...form}>
      <form>
        <FormField
          control={form.control}
          name="tag"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Controller
                  control={form.control}
                  name="tag"
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder={ selectedTag ||`Select a Tag`} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Tags</SelectLabel>
                          {[...new Set(TagList)].map((tag,index) => (
                            <SelectItem key={tag} value={tag}>
                              {tag.charAt(0).toUpperCase() + tag.slice(1)}
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

export default SelectComponent;
