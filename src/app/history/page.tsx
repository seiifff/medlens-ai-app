import { Header } from '@/components/header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock } from 'lucide-react';

export default function HistoryPage() {
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
          <Card className="bg-card/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Clock className="h-6 w-6 text-primary" />
                No History Yet
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                When you analyze a prescription on the Home page, it will show up here. For now, this is just a placeholder.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  );
}
