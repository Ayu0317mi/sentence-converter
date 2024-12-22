'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { convertJapaneseClient } from "../actions/japaneseActions";

export default function JapaneseConverter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleConvert = async (style: "polite" | "casual" | "formal") => {
    setIsLoading(true);
    const result = await convertJapaneseClient(input, style);
    setIsLoading(false);
    if (result.success) {
      setOutput(result.result);
    } else {
      setOutput("Error: " + result.error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Japanese Sentence Converter</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Input
              placeholder="Enter your sentence in Japanese"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <div className="grid grid-cols-3 gap-2">
              <Button onClick={() => handleConvert("polite")} disabled={isLoading}>
                Polite
              </Button>
              <Button onClick={() => handleConvert("casual")} disabled={isLoading}>
                Casual
              </Button>
              <Button onClick={() => handleConvert("formal")} disabled={isLoading}>
                Formal
              </Button>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <div className="w-full">
            <h3 className="text-lg font-semibold mb-2">Result:</h3>
            <p className="p-2 bg-gray-100 rounded">{isLoading ? "Converting..." : output}</p>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
