//page.tsx
//test page
'use client'

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { testSentenceClient } from '../actions/testActions';

export default function SentenceConverter() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [selectedStyle, setSelectedStyle] = useState<'natural' | 'professional' | 'casual' | 'shorter' | 'aussie' | ''>('');
  const [isLoading, setIsLoading] = useState(false);
  const [copySuccess, setCopySuccess] = useState('');

  const handleConvert = async (style: 'natural' | 'professional' | 'casual' | 'shorter' | 'aussie') => {
    setIsLoading(true);
    setSelectedStyle(style); 
    const result = await testSentenceClient(input, style);
    setIsLoading(false);
    if (result.success) {
      setOutput(result.result);
      setCopySuccess(''); 
    } else {
      setOutput('Error: ' + result.error);
    }
  };

  const handleCopy = () => {
    if (output) {
      navigator.clipboard.writeText(output).then(() => {
        setCopySuccess('Copied to clipboard!');
        setTimeout(() => setCopySuccess(''), 2000); // Clear message after 2 seconds
      });
    }
  };

  // Automatically adjust the textarea height based on content
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    e.target.style.height = 'auto'; // Reset the height
    e.target.style.height = `${e.target.scrollHeight}px`; 
  };

  return (
    <div className="container mx-auto p-4">
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Test Page</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <textarea
              placeholder="Enter your sentence here"
              value={input}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded resize-none overflow-hidden"
              rows={1} // Start with a single row
            />
            <div className="grid grid-cols-2 gap-2">
              <Button onClick={() => handleConvert('natural')} disabled={isLoading}>
                Natural English
              </Button>
              <Button onClick={() => handleConvert('professional')} disabled={isLoading}>
                Professional
              </Button>
              <Button onClick={() => handleConvert('casual')} disabled={isLoading}>
                More Casual
              </Button>
              <Button onClick={() => handleConvert('shorter')} disabled={isLoading}>
                In Short
              </Button>
              <Button onClick={() => handleConvert('aussie')} disabled={isLoading}>
                Aussie Slang
              </Button>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <div className="w-full space-y-2">
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-semibold">Result:</h3>
              {selectedStyle && (
                <span className="text-sm text-gray-600">({selectedStyle})</span>
              )}
            </div>
            <div className="flex items-center gap-2">
              <p className="flex-1 p-2 bg-gray-100 rounded">{isLoading ? 'Converting...' : output}</p>
              {output && (
                <Button onClick={handleCopy} variant="secondary">
                  Copy
                </Button>
              )}
            </div>
            {copySuccess && <p className="text-green-500 text-sm">{copySuccess}</p>}
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}