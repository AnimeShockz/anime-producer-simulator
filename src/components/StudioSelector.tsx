"use client";

import React from "react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface StudioSelectorProps {
  value: string;
  onChange: (value: string) => void;
  studios: { id: string; name: string }[];
}

const StudioSelector: React.FC<StudioSelectorProps> = ({
  value,
  onChange,
  studios,
}) => {
  return (
    <div className="flex flex-col">
      <Label className="mb-1 font-medium">Studio</Label>
      <Select onValueChange={onChange} value={value}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select a studio" />
        </SelectTrigger>
        <SelectContent>
          {studios.map((studio) => (
            <SelectItem key={studio.id} value={studio.id}>
              {studio.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default StudioSelector;