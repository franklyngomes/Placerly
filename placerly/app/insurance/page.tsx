"use client"
import { useState } from "react";
import { Search } from "lucide-react";
import { AccountsList } from "@/components/AccountsList";
import { SuggestionsDropdown } from "@/components/SuggestionsDropdown";
import { useFinancialStore } from "@/stores/financialStore";

const lifeProviders = [
  "Aviva", "Royal London", "Legal & General", "Scottish Widows", 
  "Liverpool Victoria", "Zurich", "Vitality"
];

const homeProviders = [
  "Admiral", "Direct Line", "Halifax", "Hastings Direct", 
  "Liverpool Victoria", "Swinton Insurance"
];

function Insurances() {
  const { getAccounts, addAccount } = useFinancialStore();
  const [lifeSearch, setLifeSearch] = useState("");
  const [homeSearch, setHomeSearch] = useState("");
  const [showLifeSuggestions, setShowLifeSuggestions] = useState(false);
  const [showHomeSuggestions, setShowHomeSuggestions] = useState(false);

  const lifeAccounts = getAccounts("insurances.life");
  const homeAccounts = getAccounts("insurances.home");

  const handleAddAccount = (name: string, category: string) => {
    addAccount(category, name);
    if (category === "insurances.life") {
      setLifeSearch("");
      setShowLifeSuggestions(false);
    } else {
      setHomeSearch("");
      setShowHomeSuggestions(false);
    }
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">Insurances</h2>
          <p className="text-neutral-400 text-sm mt-1">Link life and home insurance accounts</p>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Life Insurance */}
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
          <h3 className="text-[15px] font-medium tracking-tight">Life insurance</h3>
          <p className="text-xs text-neutral-400 mt-1">
            Aviva, Royal London, Legal & General, Scottish Widows, Liverpool Victoria, Zurich, Vitality
          </p>

          <div className="mt-3">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-neutral-400" />
              <input
                type="text"
                placeholder="Search & add life insurance"
                value={lifeSearch}
                onChange={(e) => setLifeSearch(e.target.value)}
                onFocus={() => setShowLifeSuggestions(true)}
                onBlur={() => setTimeout(() => setShowLifeSuggestions(false), 200)}
                className="w-full bg-white/5 outline outline-1 outline-white/10 focus:outline-custom-500/40 placeholder:text-neutral-500 rounded-md pl-9 pr-3 py-2.5 text-[13px] text-neutral-100"
              />
              {showLifeSuggestions && (
                <SuggestionsDropdown
                  query={lifeSearch}
                  suggestions={lifeProviders}
                  existingAccounts={lifeAccounts}
                  onSelect={(name) => handleAddAccount(name, "insurances.life")}
                />
              )}
            </div>
            <div className="mt-4">
              <AccountsList
                accounts={lifeAccounts}
                category="insurances.life"
              />
            </div>
          </div>
        </div>

        {/* Home Insurance */}
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
          <h3 className="text-[15px] font-medium tracking-tight">Home insurance</h3>
          <p className="text-xs text-neutral-400 mt-1">
            Admiral, Direct Line, Halifax, Hastings Direct, Liverpool Victoria, Swinton Insurance
          </p>

          <div className="mt-3">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-neutral-400" />
              <input
                type="text"
                placeholder="Search & add home insurance"
                value={homeSearch}
                onChange={(e) => setHomeSearch(e.target.value)}
                onFocus={() => setShowHomeSuggestions(true)}
                onBlur={() => setTimeout(() => setShowHomeSuggestions(false), 200)}
                className="w-full bg-white/5 outline outline-1 outline-white/10 focus:outline-custom-500/40 placeholder:text-neutral-500 rounded-md pl-9 pr-3 py-2.5 text-[13px] text-neutral-100"
              />
              {showHomeSuggestions && (
                <SuggestionsDropdown
                  query={homeSearch}
                  suggestions={homeProviders}
                  existingAccounts={homeAccounts}
                  onSelect={(name) => handleAddAccount(name, "insurances.home")}
                />
              )}
            </div>
            <div className="mt-4">
              <AccountsList
                accounts={homeAccounts}
                category="insurances.home"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Insurances
