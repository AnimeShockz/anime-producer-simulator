"use client";

import React from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

const BudgetSelector: React.FC<Props> = ({ value, onChange }) => {
  const { toast } = useToast();

  const handleBudgetChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newVal = event.target.value;
    onChange(newVal);
    toast.success(`Budget selected: ${newVal}`);
  };

  return (
    <div className="flex flex-col space-y-2">
      <label className="text-sm font-medium">Select Budget</label>
      <select
        value={value}
        onChange={handleBudgetChange}
        className="w-full p-2 border border-gray-300 rounded-md"
      >
        <option value="shoestring">Shoestring</option>
        <option value="low">Low</option>
        <option value="average">Average</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
        <option value="prestige">Prestige</option>
      </select>
    </div>
  );
};

export default BudgetSelector;