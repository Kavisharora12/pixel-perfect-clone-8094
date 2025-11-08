interface ClassificationResultProps {
  isClassifying: boolean;
  result: string | null;
}

export const ClassificationResult = ({ isClassifying, result }: ClassificationResultProps) => {
  if (!isClassifying && !result) return null;

  return (
    <div className="w-full max-w-2xl mx-auto mt-6 space-y-4">
      {isClassifying ? (
        <div className="text-center">
          <p className="text-foreground">Classifying...</p>
        </div>
      ) : result ? (
        <div className="text-center">
          <p className="text-foreground text-lg">{result}</p>
        </div>
      ) : null}
    </div>
  );
};
