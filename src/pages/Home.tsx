import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { PlusCircle } from "lucide-react";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto p-8">
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-6 text-center">
        <h1 className="text-4xl font-bold text-gray-800">Welcome to Second Opinion</h1>
        <p className="text-xl text-muted-foreground max-w-md">
          Get started by creating your first second opinion or view your previous ones.
        </p>
        <div className="flex gap-4">
          <Button
            onClick={() => navigate("/previous-opinions")}
            variant="outline"
            size="lg"
            className="gap-2"
          >
            View Previous Opinions
          </Button>
          <Button
            onClick={() => navigate("/saved")}
            variant="outline"
            size="lg"
            className="gap-2"
          >
            View Saved Opinions
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Home;