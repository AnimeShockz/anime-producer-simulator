"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast"; // Fixed import path
import { useRouter } from "next/navigation";

interface Props {
  isEligible: boolean;
  onProduce: () => void;
}

const ProduceButton = ({ isEligible, onProduce }: Props) => {
  const { toast } = useToast(); // Now correctly imported
  const router = useRouter();

  const handleProduce = () => {
    onProduce();
  };

  return (
    <Button
      onClick={handleProduce}
      disabled={!isEligible}
      className="w-full justify-between"
      variant={isEligible ? "default" : "secondary"}
    >
      {isEligible ? "Produce Show" : "Ineligible (Budget Too Low)"}
    </Button>
  );
};

export default ProduceButton;