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
    <div className="min-h-screen py-12 px-4 bg-background">
      <div className="container mx-auto max-w-4xl">
        <header className="text-center mb-12">
          <div className="inline-block mb-4">
            <div className="w-16 h-16 mx-auto rounded-lg bg-primary flex items-center justify-center">
              <svg className="w-8 h-8 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            Malaria Cell Detection
          </h1>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
            AI-powered analysis to detect malaria infection in cell samples
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
