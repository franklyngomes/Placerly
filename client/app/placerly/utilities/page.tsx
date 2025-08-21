"use client"
import { useState } from "react";
import { Search } from "lucide-react";
import { AccountsList } from "@/components/placerly/AccountsList";
import { SuggestionsDropdown } from "@/components/placerly/SuggestionsDropdown";
import { useFinancialStore } from "@/stores/financialStore";

const energyProviders = [
  "British Gas", "Centrica", "EDF Energy", "National Grid", 
  "Octopus Energy", "Scottish Power", "Shell", "SSE"
];

const waterProviders = [
  "Affinity Water", "Scottish Water", "Severn Trent Water", "South West Water", 
  "South East Water", "Southern Water", "Thames Water", "Yorkshire Water"
];

export function Utilities() {
  const { getAccounts, addAccount } = useFinancialStore();
  const [energySearch, setEnergySearch] = useState("");
  const [waterSearch, setWaterSearch] = useState("");
  const [showEnergySuggestions, setShowEnergySuggestions] = useState(false);
  const [showWaterSuggestions, setShowWaterSuggestions] = useState(false);

  const energyAccounts = getAccounts("utilities.energy");
  const waterAccounts = getAccounts("utilities.water");

  const handleAddAccount = (name: string, category: string) => {
    addAccount(category, name);
    if (category === "utilities.energy") {
      setEnergySearch("");
      setShowEnergySuggestions(false);
    } else {
      setWaterSearch("");
      setShowWaterSuggestions(false);
    }
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">Utilities</h2>
          <p className="text-neutral-400 text-sm mt-1">Link energy and water accounts</p>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Energy */}
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
          <h3 className="text-[15px] font-medium tracking-tight">Energy</h3>
          <p className="text-xs text-neutral-400 mt-1">
            British Gas, Centrica, EDF Energy, National Grid, Octopus Energy, Scottish Power, Shell, SSE
          </p>

          <div className="mt-3">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-neutral-400" />
              <input
                type="text"
                placeholder="Search & add energy provider"
                value={energySearch}
                onChange={(e) => setEnergySearch(e.target.value)}
                onFocus={() => setShowEnergySuggestions(true)}
                onBlur={() => setTimeout(() => setShowEnergySuggestions(false), 200)}
                className="w-full bg-white/5 outline outline-1 outline-white/10 focus:outline-indigo-500/40 placeholder:text-neutral-500 rounded-md pl-9 pr-3 py-2.5 text-[13px] text-neutral-100"
              />
              {showEnergySuggestions && (
                <SuggestionsDropdown
                  query={energySearch}
                  suggestions={energyProviders}
                  existingAccounts={energyAccounts}
                  onSelect={(name) => handleAddAccount(name, "utilities.energy")}
                />
              )}
            </div>
            <div className="mt-4">
              <AccountsList
                accounts={energyAccounts}
                category="utilities.energy"
              />
            </div>
          </div>
        </div>

        {/* Water */}
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
          <h3 className="text-[15px] font-medium tracking-tight">Water</h3>
          <p className="text-xs text-neutral-400 mt-1">
            Affinity Water, Scottish Water, Severn Trent Water, South West Water, South East Water, Southern Water, Thames Water, Yorkshire Water
          </p>

          <div className="mt-3">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-neutral-400" />
              <input
                type="text"
                placeholder="Search & add water provider"
                value={waterSearch}
                onChange={(e) => setWaterSearch(e.target.value)}
                onFocus={() => setShowWaterSuggestions(true)}
                onBlur={() => setTimeout(() => setShowWaterSuggestions(false), 200)}
                className="w-full bg-white/5 outline outline-1 outline-white/10 focus:outline-indigo-500/40 placeholder:text-neutral-500 rounded-md pl-9 pr-3 py-2.5 text-[13px] text-neutral-100"
              />
              {showWaterSuggestions && (
                <SuggestionsDropdown
                  query={waterSearch}
                  suggestions={waterProviders}
                  existingAccounts={waterAccounts}
                  onSelect={(name) => handleAddAccount(name, "utilities.water")}
                />
              )}
            </div>
            <div className="mt-4">
              <AccountsList
                accounts={waterAccounts}
                category="utilities.water"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
