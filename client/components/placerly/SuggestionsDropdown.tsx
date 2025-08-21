"use client"
import { Plus } from "lucide-react";
import type { ConnectedAccount } from "@/stores/financialStore";

interface SuggestionsDropdownProps {
  query: string;
  suggestions: string[];
  existingAccounts: ConnectedAccount[];
  onSelect: (name: string) => void;
}

export function SuggestionsDropdown({
  query,
  suggestions,
  existingAccounts,
  onSelect
}: SuggestionsDropdownProps) {
  const existingSet = new Set(existingAccounts.map(account => account.name));
  
  const filteredSuggestions = suggestions
    .filter(suggestion => 
      suggestion.toLowerCase().includes(query.toLowerCase()) && 
      !existingSet.has(suggestion)
    )
    .slice(0, 8);

  if (filteredSuggestions.length === 0) {
    return null;
  }

  return (
    <div className="absolute z-20 mt-1 w-full rounded-md bg-neutral-900 outline outline-1 outline-white/10 max-h-56 overflow-auto">
      {filteredSuggestions.map((suggestion) => (
        <button
          key={suggestion}
          type="button"
          className="w-full flex items-center justify-between text-left px-3 py-2 text-[13px] hover:bg-white/5 transition-colors"
          onClick={() => onSelect(suggestion)}
        >
          <span>{suggestion}</span>
          <Plus className="h-4 w-4 text-neutral-400" />
        </button>
      ))}
    </div>
  );
}
