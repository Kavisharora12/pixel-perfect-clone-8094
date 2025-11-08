import { useState } from "react";
import { ImageUpload } from "@/components/ImageUpload";
import { ClassificationResult } from "@/components/ClassificationResult";

const Index = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [isClassifying, setIsClassifying] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const handleImageSelect = (file: File) => {
    setSelectedImage(file);
    setResult(null);
    
    // Simulate classification
    setIsClassifying(true);
    setTimeout(() => {
      setIsClassifying(false);
      // Randomly determine if infected or uninfected for demo
      const infected = Math.random() > 0.5;
      setResult(infected ? "The cell is Infected." : "The cell is Uninfected.");
    }, 2000);
  };

  const handleClear = () => {
    setSelectedImage(null);
    setResult(null);
    setIsClassifying(false);
  };

  return (
    <div className="min-h-screen py-12 px-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-[100px] animate-float" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/20 rounded-full blur-[120px] animate-float" style={{ animationDelay: '2s' }} />
      <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-secondary/20 rounded-full blur-[100px] animate-float" style={{ animationDelay: '4s' }} />
      
      <div className="container mx-auto max-w-4xl relative z-10">
        <header className="text-center mb-16 animate-float">
          <div className="inline-block mb-6">
            <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-primary via-accent to-secondary p-1 animate-glow">
              <div className="w-full h-full rounded-xl bg-background flex items-center justify-center">
                <svg className="w-10 h-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-gradient-primary leading-tight">
            Malaria Cell Detection
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto">
            Advanced AI-powered analysis to predict malaria infection in cell samples with precision and speed.
          </p>
        </header>

        <main className="space-y-8">
          <ImageUpload
            onImageSelect={handleImageSelect}
            selectedImage={selectedImage}
            onClear={handleClear}
          />

          <ClassificationResult
            isClassifying={isClassifying}
            result={result}
          />
        </main>
      </div>
    </div>
  );
};

export default Index;
