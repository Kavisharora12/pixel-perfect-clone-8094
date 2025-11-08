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
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Malaria Cell Detection
          </h1>
          <p className="text-muted-foreground text-lg">
            Upload an image of a cell to predict if it is infected with malaria.
          </p>
        </header>

        <main className="space-y-6">
          <div className="text-center mb-6">
            <p className="text-foreground">Choose an image...</p>
          </div>

          <ImageUpload
            onImageSelect={handleImageSelect}
            selectedImage={selectedImage}
            onClear={handleClear}
          />

          {selectedImage && (
            <div className="text-center text-muted-foreground">
              <p>Uploaded Image.</p>
            </div>
          )}

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
