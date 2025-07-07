'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { useToast } from '@/hooks/use-toast';
import { explainPrescription } from '@/ai/flows/explain-prescription';
import { Header } from '@/components/header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileUp, Loader2, Pill, Sparkles, X } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

export default function Home() {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageData, setImageData] = useState<string | null>(null);
  const [explanation, setExplanation] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setImagePreview(result);
        setImageData(result);
        setExplanation(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setImagePreview(null);
    setImageData(null);
    setExplanation(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleExplain = async () => {
    if (!imageData) {
      toast({
        title: 'No Image Selected',
        description: 'Please upload an image of your prescription first.',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    setExplanation(null);

    try {
      const result = await explainPrescription({ photoDataUri: imageData });
      setExplanation(result.explanation);
    } catch (error) {
      console.error(error);
      toast({
        title: 'An Error Occurred',
        description: 'Failed to explain the prescription. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <>
      <Header />
      <main className="flex-1 pb-24 md:pb-8">
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-primary via-purple-500 to-pink-500 text-transparent bg-clip-text">
              MedLens
            </h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Understand your prescription instantly. Just upload a photo and let our AI provide a simple explanation.
            </p>
          </div>

          <Card className="w-full shadow-lg border-2 border-dashed border-primary/20 hover:border-primary/50 transition-colors duration-300">
            <CardContent className="p-8 flex flex-col items-center text-center">
              <div className="relative w-full max-w-md mb-6">
                <input
                  type="file"
                  id="prescription-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageChange}
                  disabled={isLoading}
                  ref={fileInputRef}
                />
                <label
                  htmlFor="prescription-upload"
                  className="cursor-pointer block"
                >
                  {imagePreview ? (
                    <Image
                      src={imagePreview}
                      alt="Prescription preview"
                      width={400}
                      height={400}
                      className="rounded-lg object-contain mx-auto max-h-80 w-auto shadow-md"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center p-10 border-2 border-dashed rounded-lg text-muted-foreground hover:bg-muted/50 transition-colors">
                      <FileUp className="h-12 w-12 mb-4" />
                      <span className="font-semibold">Click to upload or drag & drop</span>
                      <span className="text-sm">PNG, JPG, or WEBP</span>
                    </div>
                  )}
                </label>
                {imagePreview && !isLoading && (
                  <Button
                    variant="destructive"
                    size="icon"
                    className="absolute top-2 right-2 rounded-full h-8 w-8 z-10"
                    onClick={(e) => {
                      e.preventDefault();
                      handleRemoveImage();
                    }}
                  >
                    <X className="h-4 w-4" />
                    <span className="sr-only">Remove image</span>
                  </Button>
                )}
              </div>

              <Button
                onClick={handleExplain}
                disabled={!imagePreview || isLoading}
                size="lg"
                className="rounded-full font-bold text-base px-8 py-6 shadow-lg transform hover:scale-105 transition-transform"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-5 w-5" />
                    Explain Prescription
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {isLoading && (
            <Card className="mt-8 w-full shadow-lg">
              <CardHeader className="flex flex-row items-center gap-2">
                <div className="p-2 bg-primary/20 rounded-full">
                  <Pill className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>AI Explanation</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 p-6">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </CardContent>
            </Card>
          )}

          {explanation && (
            <Card className="mt-8 w-full shadow-lg animate-in fade-in-50 slide-in-from-bottom-5 duration-500">
              <CardHeader className="flex flex-row items-center gap-3 bg-primary/10">
                <div className="p-2 bg-primary/20 rounded-full">
                  <Pill className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl">Your Simplified Explanation</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <p className="text-base whitespace-pre-wrap leading-relaxed">
                  {explanation}
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </>
  );
}
