"use client"
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from "@/components/ui/button"
import { Check, ChevronsUpDown, PlusSquare, Trash2 } from "lucide-react"

import { cn } from "@/lib/utils"

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

const difficultyOptions = [
  { value: "1", label: "Easy" },
  { value: "2", label: "Medium" },
  { value: "3", label: "Hard" },
]

const enjoymentOptions = [
  { value: "1", label: "Dislike" },
  { value: "2", label: "Neutral" },
  { value: "3", label: "Like" },
]

const workloadOptions = [
  { value: "1", label: "Low" },
  { value: "2", label: "Medium" },
  { value: "3", label: "High" },
]

const Combobox = ({ data, value, setValue, handleChange }) => {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? data.find((option) => option.value === value)?.label
            : "Select..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandEmpty>No option found.</CommandEmpty>
          <CommandGroup>
            {data.map((option) => (
              <CommandItem
                key={option.value}
                onSelect={(currentValue) => {
                  setValue(currentValue === value ? "" : currentValue);
                  setOpen(false);
                  handleChange({ target: { value: option.value } });
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === option.value ? "opacity-100" : "opacity-0"
                  )}
                />
                {option.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

const YourComponent = () => {
  const [data, setData] = useState([
    {
      subject: 'Business Management',
      difficulty: "3",
      enjoyment: "3",
      workload: "2",
    },
    {
      subject: 'Economics',
      difficulty: "2",
      enjoyment: "2",
      workload: "1",
    },
  ]);

  const handleChange = (event, index, key) => {
    const newData = [...data];
    newData[index][key] = event.target.value;
    setData(newData);
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-4">
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="p-2 text-left">Subject</th>
            <th className="p-2 text-left">Difficulty</th>
            <th className="p-2 text-left">Enjoyment</th>
            <th className="p-2 text-left">Workload</th>
            <th className="p-2 text-left">Rank</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              <td className="p-2">
                <Input
                  type="text"
                  value={row.subject}
                  onChange={(event) => handleChange(event, index, 'subject')}
                  className="w-full p-1 border rounded-md"
                />
              </td>
              <td className="p-2">
                <Combobox
                  data={difficultyOptions}
                  value={row.difficulty}
                  setValue={(value) =>
                    handleChange({ target: { value } }, index, 'difficulty')
                  }
                  handleChange={(event) => handleChange(event, index, 'difficulty')}
                />
              </td>
              <td className="p-2">
                <Combobox
                  data={enjoymentOptions}
                  value={row.enjoyment}
                  setValue={(value) =>
                    handleChange({ target: { value } }, index, 'enjoyment')
                  }
                  handleChange={(event) => handleChange(event, index, 'enjoyment')}
                />
              </td>
              <td className="p-2">
                <Combobox
                  data={workloadOptions}
                  value={row.workload}
                  setValue={(value) =>
                    handleChange({ target: { value } }, index, 'workload')
                  }
                  handleChange={(event) => handleChange(event, index, 'workload')}
                />
              </td>
              <td className="p-2">
                {parseInt(row.difficulty) + parseInt(row.enjoyment) + parseInt(row.workload)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default YourComponent;
