interface SuggestionListProps {
  suggestions: string[];
  onSuggestionClick: (suggestion: string) => void;
}

export const SuggestionList = ({ suggestions, onSuggestionClick }: SuggestionListProps) => {
  return (
    <div className="flex flex-col gap-3 max-w-md mx-auto w-full px-4">
      {suggestions.map((suggestion) => (
        <button
          key={suggestion}
          onClick={() => onSuggestionClick(suggestion)}
          className="w-full bg-blue-50 text-blue-500 px-6 py-3 rounded-full text-sm hover:bg-blue-100 transition-colors text-center"
        >
          {suggestion}
        </button>
      ))}
    </div>
  );
};

export default SuggestionList;