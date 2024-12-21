'use client'

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { convertSentenceClient } from './actions/actions'; // Updated import

export default function SentenceConverter() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleConvert = async (style: 'natural' | 'professional' | 'casual' | 'shorter') => {
    setIsLoading(true);
    const result = await convertSentenceClient(input, style); // Use the updated function
    setIsLoading(false);
    if (result.success) {
      setOutput(result.result);
    } else {
      setOutput('Error: ' + result.error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Sentence Converter</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Input
              placeholder="Enter your sentence here"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <div className="grid grid-cols-2 gap-2">
              <Button onClick={() => handleConvert('natural')} disabled={isLoading}>
                Convert to Natural
              </Button>
              <Button onClick={() => handleConvert('professional')} disabled={isLoading}>
                More Professional
              </Button>
              <Button onClick={() => handleConvert('casual')} disabled={isLoading}>
                More Casual
              </Button>
              <Button onClick={() => handleConvert('shorter')} disabled={isLoading}>
                Shorter
              </Button>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <div className="w-full">
            <h3 className="text-lg font-semibold mb-2">Result:</h3>
            <p className="p-2 bg-gray-100 rounded">{isLoading ? 'Converting...' : output}</p>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}