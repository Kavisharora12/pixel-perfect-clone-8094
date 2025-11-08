interface ClassificationResultProps {
  isClassifying: boolean;
  result: string | null;
}

export const ClassificationResult = ({ isClassifying, result }: ClassificationResultProps) => {
  if (!isClassifying && !result) return null;

  const isInfected = result?.toLowerCase().includes('infected') && !result?.toLowerCase().includes('uninfected');

  return (
    <div className="w-full max-w-2xl mx-auto space-y-4">
      {isClassifying ? (
        <div className="rounded-lg p-8 text-center border bg-card">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-muted border-t-primary rounded-full animate-spin" />
            <div>
              <p className="text-foreground font-medium text-lg mb-1">Analyzing Cell Sample</p>
              <p className="text-muted-foreground text-sm">Please wait...</p>
            </div>
          </div>
        </div>
      ) : result ? (
        <div className={`rounded-lg p-8 border-2 ${isInfected ? 'border-destructive bg-destructive/5' : 'border-primary bg-primary/5'}`}>
          <div className="flex flex-col items-center gap-4">
            <div className={`p-3 rounded-full ${isInfected ? 'bg-destructive/10' : 'bg-primary/10'}`}>
              {isInfected ? (
                <svg className="w-10 h-10 text-destructive" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              ) : (
                <svg className="w-10 h-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              )}
            </div>
            <div className="text-center">
              <p className={`font-semibold text-xl mb-1 ${isInfected ? 'text-destructive' : 'text-primary'}`}>
                {result}
              </p>
              <p className="text-muted-foreground text-sm">
                {isInfected ? 'Immediate attention recommended' : 'No malaria parasites detected'}
              </p>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};
