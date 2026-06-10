"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom"; // ← React Router navigation

interface Props {
  isEligible: boolean;
  onProduce: () => void;
}

const ProduceButton: React.FC<Props> = ({ isEligible, onProduce }) => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleClick = () => {
    onProduce();
    // The Simulator page already handles navigation after production,
    // but we keep this hook in case other pages need it.
  };

  return (
    <Button
      onClick={handleClick}
      disabled={!isEligible}
      className="w-full justify-between"
      variant={isEligible ? "default" : "secondary"}
    >
      {isEligible ? "Produce Show" : "Ineligible (Budget Too Low)"}
    </Button>
  );
};

export default ProduceButton;