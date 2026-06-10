"use client";

import React, { useState } from "react";
import { useToast } from "@/hooks/use-toast"; // Fixed import path
import { Button } from "@/components/ui/button";

const BudgetSelector = () => {
  const [selectedBudget, setSelectedBudget] = useState("average");
  const { toast } = useToast(); // Now correctly imported

  const handleBudgetChange = (event) => {
    setSelectedBudget(event.target.value);
    toast.success(`Budget selected: ${event.target.value}`);
  };

  return (
    <div className="flex flex-col space-y-2">
      <label className="text-sm font-medium">Select Budget</label>
      <select
        value={selectedBudget}
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