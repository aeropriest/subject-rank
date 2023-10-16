"use client"
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from "@/components/ui/button"
import { Check, ChevronsUpDown, PlusSquare, Trash2, ArrowUpDown } from "lucide-react"

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
          className="w-[200px] justify-between p-2 text-xs font-normal text-left"
          variant="outline"
          role="combobox"
          aria-expanded={open}

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
                className="text-xs font-normal text-left"
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



  const handleDeleteRow = (index) => {
    const newData = [...data];
    newData.splice(index, 1);
    setData(newData);
  };

  const [newSubject, setNewSubject] = useState(''); // State to hold the new subject

  const handleAddRow = () => {
    const newRow = { subject: newSubject, difficulty: '', enjoyment: '', workload: '' };
    const newData = [...data, newRow];
    setData(newData);
    setNewSubject(''); // Clear the input field
  };

  const [sortAscending, setSortAscending] = useState(true); // Track sorting direction

  const handleSort = () => {
    const newData = [...data];
    newData.sort((a, b) => {
      const sumA = parseInt(a.difficulty) + parseInt(a.enjoyment) + parseInt(a.workload);
      const sumB = parseInt(b.difficulty) + parseInt(b.enjoyment) + parseInt(b.workload);
      if (sortAscending) {
        return sumA - sumB;
      } else {
        return sumB - sumA;
      }
    });

    setData(newData);
    setSortAscending(!sortAscending); // Toggle sorting direction
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-4">
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="p-2 text-sm font-normal text-left"></th>
            <th className="p-2 text-sm font-normal text-left">Subject</th>
            <th className="p-2 text-sm font-normal text-left">Difficulty</th>
            <th className="p-2 text-sm font-normal text-left">Enjoyment</th>
            <th className="p-2 text-sm font-normal text-left">Workload</th>
            <th className="p-2 text-sm font-normal text-left">Rank
              <Button
                onClick={handleSort}
                className="p-0 bg-transparent border-none"
                style={{ backgroundColor: 'transparent' }}
              >
                <ArrowUpDown color="black" size={15} style={{ backgroundColor: 'transparent' }} />
              </Button>
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              <td className="p-2">
                <Button className="p-0 bg-transparent border-none"
                  style={{ backgroundColor: 'transparent' }}
                  onClick={() => handleDeleteRow(index)}><Trash2 color="red" size={15} style={{ backgroundColor: 'transparent' }} /></Button>
              </td>
              <td className="p-2">
                <Input
                  className="p-2 text-xs font-normal text-left"
                  type="text"
                  value={row.subject}
                  onChange={(event) => handleChange(event, index, 'subject')}
                // className="w-full p-1 border rounded-md"
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
              <td className="p-2 text-xs font-normal text-left">
                {parseInt(row.difficulty) + parseInt(row.enjoyment) + parseInt(row.workload)}
              </td>
            </tr>
          ))}
          <tr>
            <td className="p-2">
              <Button className="p-0 bg-transparent border-none"
                style={{ backgroundColor: 'transparent' }}
                onClick={handleAddRow}><PlusSquare color="blue" size={15} style={{ backgroundColor: 'transparent' }} /></Button>
            </td>
            <td className="p-2">
              <Input
                className="w-[200px] justify-between p-2 text-xs font-normal text-left"
                type="text"
                placeholder="Subject..."
                // className="w-full p-1 border rounded-md"
                onChange={(val) => setNewSubject(val.target.value)}
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default YourComponent;
