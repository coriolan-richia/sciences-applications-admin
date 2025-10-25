"use client";

// La page de login
export default function LoadingPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-primary/5 via-background to-accent/5 p-4">
      <div className="flex gap-8">
        <div className="h-8 shadow-xl aspect-square rounded-full bg-primary"></div>
        <div className="h-8 shadow-xl aspect-square rounded-full bg-accent"></div>
        <div className="h-8 shadow-xl aspect-square rounded-full bg-chart-3"></div>
      </div>
    </div>
  );
}
