'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Header } from '@/components/header';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Clock, Pill } from 'lucide-react';

type HistoryItem = {
  id: string;
  image: string;
  explanation: string;
  date: string;
};

export default function HistoryPage() {
  const [history, setHistory] = useState<HistoryItem[]>([]);

  useEffect(() => {
    const storedHistory = localStorage.getItem('medlens-history');
    if (storedHistory) {
      setHistory(JSON.parse(storedHistory));
    }
  }, []);

  return (
    <>
      <Header />
      <main className="flex-1 pb-24 md:pb-8">
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-primary to-accent text-transparent bg-clip-text">
              Scan History
            </h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Review your previously analyzed prescriptions.
            </p>
          </div>

          {history.length === 0 ? (
            <Card className="bg-card/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Clock className="h-6 w-6 text-primary" />
                  No History Yet
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  When you analyze a prescription on the Home page, it will show up here.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-6">
              {history.map((item) => (
                <Card key={item.id} className="bg-card/50 overflow-hidden animate-in fade-in-50">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-xl">Prescription Scan</CardTitle>
                        <CardDescription>{item.date}</CardDescription>
                      </div>
                      <Image
                        src={item.image}
                        alt="Prescription thumbnail"
                        width={80}
                        height={80}
                        className="rounded-lg object-cover shadow-md ml-4"
                      />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value={item.id}>
                        <AccordionTrigger>
                          <div className="flex items-center gap-2">
                            <Pill className="h-5 w-5 text-primary"/>
                            View AI Explanation
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                          <p className="text-base whitespace-pre-wrap leading-relaxed text-muted-foreground">
                            {item.explanation}
                          </p>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  );
}
