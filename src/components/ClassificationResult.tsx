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
        <div className="glass-card rounded-2xl p-8 text-center border animate-glow">
          <div className="flex flex-col items-center gap-4">
            <div className="relative w-16 h-16">
              <div className="absolute inset-0 rounded-full border-4 border-primary/30 animate-ping" />
              <div className="absolute inset-0 rounded-full border-4 border-t-primary border-r-accent border-b-secondary border-l-primary/30 animate-spin" />
            </div>
            <div>
              <p className="text-foreground font-semibold text-xl mb-1">Analyzing Cell Sample</p>
              <p className="text-muted-foreground text-sm">Using advanced AI detection...</p>
            </div>
          </div>
        </div>
      ) : result ? (
        <div className={`glass-card rounded-2xl p-8 border-2 ${isInfected ? 'border-destructive/50 glow-primary' : 'border-secondary/50 glow-secondary'}`}>
          <div className="flex flex-col items-center gap-4">
            <div className={`p-4 rounded-full ${isInfected ? 'bg-gradient-to-br from-destructive/20 to-accent/20' : 'bg-gradient-to-br from-secondary/20 to-secondary-glow/20'}`}>
              {isInfected ? (
                <svg className="w-12 h-12 text-destructive" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              ) : (
                <svg className="w-12 h-12 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              )}
            </div>
            <div className="text-center">
              <p className={`font-bold text-2xl mb-2 ${isInfected ? 'text-gradient-primary' : 'text-gradient-secondary'}`}>
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
