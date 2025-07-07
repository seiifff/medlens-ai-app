'use client';

import { Header } from '@/components/header';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Brush, Bell } from 'lucide-react';

export default function SettingsPage() {
  return (
    <>
      <Header />
      <main className="flex-1 pb-24 md:pb-8">
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-primary to-accent text-transparent bg-clip-text">
              Settings
            </h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Customize your MedLens experience.
            </p>
          </div>

          <div className="space-y-8">
            <Card className="bg-card/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Brush className="h-6 w-6 text-primary" />
                  Appearance
                </CardTitle>
                <CardDescription>
                  Adjust the look and feel of the app.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between space-x-2 p-4 rounded-lg bg-background">
                  <Label htmlFor="dark-mode" className="flex flex-col space-y-1">
                    <span>Luminous Theme</span>
                    <span className="font-normal leading-snug text-muted-foreground">
                      The current theme is enabled by default.
                    </span>
                  </Label>
                  <Switch id="dark-mode" checked disabled />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Bell className="h-6 w-6 text-primary" />
                  Notifications
                </CardTitle>
                <CardDescription>
                   Manage your notification preferences (placeholders).
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center justify-between space-x-2 p-4 rounded-lg bg-background">
                    <Label htmlFor="push-notifications" className="flex flex-col space-y-1">
                        <span>Push Notifications</span>
                        <span className="font-normal leading-snug text-muted-foreground">
                            Receive updates on your device.
                        </span>
                    </Label>
                    <Switch id="push-notifications" />
                </div>
                <div className="flex items-center justify-between space-x-2 p-4 rounded-lg bg-background">
                    <Label htmlFor="email-notifications" className="flex flex-col space-y-1">
                        <span>Email Notifications</span>
                         <span className="font-normal leading-snug text-muted-foreground">
                            Get important updates via email.
                         </span>
                    </Label>
                    <Switch id="email-notifications" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </>
  );
}
