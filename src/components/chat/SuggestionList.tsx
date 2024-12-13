interface SuggestionListProps {
  suggestions: string[];
  onSuggestionClick: (suggestion: string) => void;
}

export const SuggestionList = ({ suggestions, onSuggestionClick }: SuggestionListProps) => {
  return (
    <div className="flex flex-wrap justify-center gap-2 max-w-md px-4">
      {suggestions.map((suggestion) => (
        <button
          key={suggestion}
          onClick={() => onSuggestionClick(suggestion)}
          className="bg-medical-accent text-medical-primary px-4 py-2 rounded-full text-sm hover:bg-medical-secondary hover:text-white transition-colors"
        >
          {suggestion}
        </button>
      ))}
    </div>
  );
};

export default SuggestionList;