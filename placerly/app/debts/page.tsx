"use client"
import { useState } from "react";
import { Search } from "lucide-react";
import { AccountsList } from "@/components/AccountsList";
import { SuggestionsDropdown } from "@/components/SuggestionsDropdown";
import { useFinancialStore } from "@/stores/financialStore";

const creditProviders = [
  "American Express", "Barclays", "HSBC", "Halifax", "Lloyds", 
  "Natwest", "Santander", "Capital One"
];

const mortgageProviders = [
  "Nationwide", "Yorkshire Building Society", "Skipton Building Society", 
  "Santander", "Halifax", "Barclays", "HSBC", "Lloyds"
];

function Debts() {
  const { getAccounts, addAccount } = useFinancialStore();
  const [creditSearch, setCreditSearch] = useState("");
  const [mortgageSearch, setMortgageSearch] = useState("");
  const [showCreditSuggestions, setShowCreditSuggestions] = useState(false);
  const [showMortgageSuggestions, setShowMortgageSuggestions] = useState(false);

  const creditAccounts = getAccounts("debts.credit");
  const mortgageAccounts = getAccounts("debts.mortgage");

  const handleAddAccount = (name: string, category: string) => {
    addAccount(category, name);
    if (category === "debts.credit") {
      setCreditSearch("");
      setShowCreditSuggestions(false);
    } else {
      setMortgageSearch("");
      setShowMortgageSuggestions(false);
    }
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">Debts</h2>
          <p className="text-neutral-400 text-sm mt-1">Link your credit cards and mortgage accounts</p>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Credit Cards */}
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
          <h3 className="text-[15px] font-medium tracking-tight">Credit card accounts</h3>
          <p className="text-xs text-neutral-400 mt-1">American Express, Barclays, HSBC</p>

          <div className="mt-3">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-neutral-400" />
              <input
                type="text"
                placeholder="Search & add credit card"
                value={creditSearch}
                onChange={(e) => setCreditSearch(e.target.value)}
                onFocus={() => setShowCreditSuggestions(true)}
                onBlur={() => setTimeout(() => setShowCreditSuggestions(false), 200)}
                className="w-full bg-white/5 outline outline-1 outline-white/10 focus:outline-custom-500/40 placeholder:text-neutral-500 rounded-md pl-9 pr-3 py-2.5 text-[13px] text-neutral-100"
              />
              {showCreditSuggestions && (
                <SuggestionsDropdown
                  query={creditSearch}
                  suggestions={creditProviders}
                  existingAccounts={creditAccounts}
                  onSelect={(name) => handleAddAccount(name, "debts.credit")}
                />
              )}
            </div>
            <div className="mt-4">
              <AccountsList
                accounts={creditAccounts}
                category="debts.credit"
              />
            </div>
          </div>
        </div>

        {/* Mortgages */}
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
          <h3 className="text-[15px] font-medium tracking-tight">Mortgage accounts</h3>
          <p className="text-xs text-neutral-400 mt-1">
            Nationwide, Yorkshire Building Society, Skipton Building Society, Santander
          </p>

          <div className="mt-3">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-neutral-400" />
              <input
                type="text"
                placeholder="Search & add mortgage"
                value={mortgageSearch}
                onChange={(e) => setMortgageSearch(e.target.value)}
                onFocus={() => setShowMortgageSuggestions(true)}
                onBlur={() => setTimeout(() => setShowMortgageSuggestions(false), 200)}
                className="w-full bg-white/5 outline outline-1 outline-white/10 focus:outline-custom-500/40 placeholder:text-neutral-500 rounded-md pl-9 pr-3 py-2.5 text-[13px] text-neutral-100"
              />
              {showMortgageSuggestions && (
                <SuggestionsDropdown
                  query={mortgageSearch}
                  suggestions={mortgageProviders}
                  existingAccounts={mortgageAccounts}
                  onSelect={(name) => handleAddAccount(name, "debts.mortgage")}
                />
              )}
            </div>
            <div className="mt-4">
              <AccountsList
                accounts={mortgageAccounts}
                category="debts.mortgage"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Debts
