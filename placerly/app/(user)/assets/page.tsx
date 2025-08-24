"use client"
import { useState } from "react";
import { Search } from "lucide-react";
import { AccountsList } from "@/components/AccountsList";
import { SuggestionsDropdown } from "@/components/SuggestionsDropdown";
import { useFinancialStore } from "@/stores/financialStore";

const cashProviders = [
  "Barclays", "Lloyds", "Marcus", "Natwest", "HSBC", "Monzo", 
  "Starling", "Revolut", "Halifax", "Santander"
];

const stocksProviders = [
  "Vanguard", "Moneyfarm", "AJ Bell", "Freetrade", "Nutmeg", 
  "Wealthify", "Hargreaves Lansdown", "Interactive Investor"
];

 function Assets() {
  const { getAccounts, addAccount } = useFinancialStore();
  const [cashSearch, setCashSearch] = useState("");
  const [stocksSearch, setStocksSearch] = useState("");
  const [showCashSuggestions, setShowCashSuggestions] = useState(false);
  const [showStocksSuggestions, setShowStocksSuggestions] = useState(false);

  const cashAccounts = getAccounts("assets.cash");
  const stocksAccounts = getAccounts("assets.stocks");

  const handleAddAccount = (name: string, category: string) => {
    addAccount(category, name);
    if (category === "assets.cash") {
      setCashSearch("");
      setShowCashSuggestions(false);
    } else {
      setStocksSearch("");
      setShowStocksSuggestions(false);
    }
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">Assets</h2>
          <p className="text-neutral-400 text-sm mt-1">Link cash and stocks/shares accounts</p>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Cash Accounts */}
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-[15px] font-medium tracking-tight">Cash accounts</h3>
              <p className="text-xs text-neutral-400 mt-1">
                Barclays, Lloyds, Marcus, Natwest, HSBC, Monzo, Starling, Revolut
              </p>
            </div>
          </div>
          <div className="mt-3">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-neutral-400" />
              <input
                type="text"
                placeholder="Search & add cash account"
                value={cashSearch}
                onChange={(e) => setCashSearch(e.target.value)}
                onFocus={() => setShowCashSuggestions(true)}
                onBlur={() => setTimeout(() => setShowCashSuggestions(false), 200)}
                className="w-full bg-white/5 outline outline-1 outline-white/10 focus:outline-custom-500/40 placeholder:text-neutral-500 rounded-md pl-9 pr-3 py-2.5 text-[13px] text-neutral-100"
              />
              {showCashSuggestions && (
                <SuggestionsDropdown
                  query={cashSearch}
                  suggestions={cashProviders}
                  existingAccounts={cashAccounts}
                  onSelect={(name) => handleAddAccount(name, "assets.cash")}
                />
              )}
            </div>
            <div className="mt-4">
              <AccountsList
                accounts={cashAccounts}
                category="assets.cash"
              />
            </div>
          </div>
        </div>

        {/* Stocks Accounts */}
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-[15px] font-medium tracking-tight">Stocks & shares accounts</h3>
              <p className="text-xs text-neutral-400 mt-1">
                Vanguard, Moneyfarm, AJ Bell, Freetrade, Nutmeg, Wealthify, Hargreaves Lansdown, Interactive Investor
              </p>
            </div>
          </div>
          <div className="mt-3">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-neutral-400" />
              <input
                type="text"
                placeholder="Search & add stocks/shares account"
                value={stocksSearch}
                onChange={(e) => setStocksSearch(e.target.value)}
                onFocus={() => setShowStocksSuggestions(true)}
                onBlur={() => setTimeout(() => setShowStocksSuggestions(false), 200)}
                className="w-full bg-white/5 outline outline-1 outline-white/10 focus:outline-custom-500/40 placeholder:text-neutral-500 rounded-md pl-9 pr-3 py-2.5 text-[13px] text-neutral-100"
              />
              {showStocksSuggestions && (
                <SuggestionsDropdown
                  query={stocksSearch}
                  suggestions={stocksProviders}
                  existingAccounts={stocksAccounts}
                  onSelect={(name) => handleAddAccount(name, "assets.stocks")}
                />
              )}
            </div>
            <div className="mt-4">
              <AccountsList
                accounts={stocksAccounts}
                category="assets.stocks"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Assets

