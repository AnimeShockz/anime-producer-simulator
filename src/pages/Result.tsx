"use client";

import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Result: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4">
      <h1 className="mb-4 text-3xl font-bold text-gray-800">
        Production Complete!
      </h1>
      <p className="mb-6 text-center text-gray-600">
        Your anime has been produced. Check the simulator results or start a new game.
      </p>
      <div className="flex gap-4">
        <Button onClick={() => navigate("/")}>Home</Button>
        <Button variant="outline" onClick={() => navigate("/game")}>
          New Production
        </Button>
      </div>
    </div>
  );
};

export default Result;