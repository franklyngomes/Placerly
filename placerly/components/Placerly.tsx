"use client"
import { useState } from "react";
import Link from "next/link";
import { Search, Plus, Banknote, CreditCard, ShieldCheck, PlugZap, Link as LinkIcon, FilePlus2, UserRoundPlus } from "lucide-react";
import { ActivityChart } from "@/components/ActivityChart";
import { useFinancialStore } from "@/stores/financialStore";
import { useStore } from "@/store";

const organizationData = {
  cash: ["Barclays", "Lloyds", "HSBC", "Monzo"],
  stocks: ["Vanguard", "Freetrade", "AJ Bell", "Nutmeg"],
  credit: ["American Express", "Barclays", "HSBC"],
  mortgage: ["Nationwide", "Santander", "Skipton"],
  life: ["Aviva", "Legal & General", "Zurich"],
  home: ["Admiral", "Direct Line", "Halifax"],
  energy: ["Octopus Energy", "British Gas", "EDF Energy"],
  water: ["Thames Water", "Severn Trent", "Scottish Water"]
};

function Placerly() {
  const { getCounts, getConnectedCounts, getRecentPeople } = useFinancialStore();
  const [quickCategory, setQuickCategory] = useState<string>("assets.cash");
  const [quickInput, setQuickInput] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const {user} = useStore() 
  console.log(user)
  
  const counts = getCounts();
  const connectedCounts = getConnectedCounts();
  const people = getRecentPeople();

  const quickCategories = [
    { id: "assets.cash", label: "Cash" },
    { id: "assets.stocks", label: "Stocks" },
    { id: "debts.credit", label: "Credit" },
    { id: "debts.mortgage", label: "Mortgage" },
    { id: "insurances.life", label: "Life" },
    { id: "insurances.home", label: "Home" },
    { id: "utilities.energy", label: "Energy" },
    { id: "utilities.water", label: "Water" },
  ];

  return (
    <>
      {/* Header */}
      <header className="hidden md:flex items-center justify-between py-6">
        <div className="">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">Hello {user?.firstName}!</h2>
          <p className="text-neutral-400 text-sm mt-1">Overview of your financial footprint and quick actions.</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative group">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-neutral-400" />
            <input 
              type="text" 
              placeholder="Search across assets, debts, insurers..."
              className="w-[280px] bg-white/5 outline outline-white/10 placeholder:text-neutral-500 rounded-md pl-9 pr-10 py-2.5 text-[13px] text-neutral-100" 
            />
            <button className="absolute right-1.5 top-1.5 px-2 py-1 text-xs rounded bg-white/5 hover:bg-white/10 outline outline-white/10">
              Go
            </button>
          </div>
          <button className="px-3 py-2 rounded-md bg-custom-600 hover:bg-custom-500 text-[13px] font-bold outline outline-custom-600">
            <div className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Quick Add
            </div>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="col-span-1 lg:col-span-2">
          {/* At a Glance */}
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold tracking-tight">At a glance</h2>
                <p className="text-neutral-400 text-[13px] mt-1">Linked entities by category</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-neutral-400">Last 30 days</span>
              </div>
            </div>
            
            <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="rounded-lg bg-white/[0.04] outline  outline-white/10 p-4 hover:outline-white/20 hover:-translate-y-0.5 transition">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-neutral-400">Assets</span>
                  <Banknote className="h-4 w-4 text-neutral-300" />
                </div>
                <div className="mt-2 text-xl font-semibold tracking-tight">
                  {connectedCounts.assets}/{counts.assets}
                </div>
                <div className="text-xs text-neutral-500 mt-1">Cash & Shares</div>
              </div>

              <div className="rounded-lg bg-white/[0.04] outline outline-white/10 p-4 hover:outline-white/20 hover:-translate-y-0.5 transition">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-neutral-400">Debts</span>
                  <CreditCard className="h-4 w-4 text-neutral-300" />
                </div>
                <div className="mt-2 text-xl font-semibold tracking-tight">
                  {connectedCounts.debts}/{counts.debts}
                </div>
                <div className="text-xs text-neutral-500 mt-1">Cards & Mortgages</div>
              </div>

              <div className="rounded-lg bg-white/[0.04] outline outline-white/10 p-4 hover:outline-white/20 hover:-translate-y-0.5 transition">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-neutral-400">Insurances</span>
                  <ShieldCheck className="h-4 w-4 text-neutral-300" />
                </div>
                <div className="mt-2 text-xl font-semibold tracking-tight">
                  {connectedCounts.insurances}/{counts.insurances}
                </div>
                <div className="text-xs text-neutral-500 mt-1">Life & Home</div>
              </div>

              <div className="rounded-lg bg-white/[0.04] outline outline-white/10 p-4 hover:outline-white/20 hover:-translate-y-0.5 transition">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-neutral-400">Utilities</span>
                  <PlugZap className="h-4 w-4 text-neutral-300" />
                </div>
                <div className="mt-2 text-xl font-semibold tracking-tight">
                  {connectedCounts.utilities}/{counts.utilities}
                </div>
                <div className="text-xs text-neutral-500 mt-1">Energy & Water</div>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Activity Chart */}
              <div className="rounded-lg bg-white/[0.04] outline outline-white/10 p-4">
                <h3 className="text-[15px] font-medium tracking-tight">Link activity</h3>
                <p className="text-xs text-neutral-400 mt-1">Recent additions by category</p>
                <div className="mt-3">
                  <div className="relative rounded-md outline outline-white/10 p-3 bg-white/[0.03]">
                    <div className="text-xs text-neutral-400">Last 14 days</div>
                    <div className="mt-3 h-36">
                      <ActivityChart />
                    </div>
                  </div>
                </div>
              </div>

              {/* Upcoming Tasks */}
              <div className="rounded-lg bg-white/[0.04] outline outline-white/10 p-4">
                <h3 className="text-[15px] font-medium tracking-tight">Upcoming tasks</h3>
                <p className="text-xs text-neutral-400 mt-1">Complete your setup</p>
                <ul className="mt-3 space-y-2">
                  <li className="flex items-center justify-between rounded-md bg-white/[0.03] outline outline-white/10 p-3 hover:outline-white/20">
                    <div className="flex items-center gap-3">
                      <LinkIcon className="h-4 w-4 text-neutral-300" />
                      <span className="text-[13px]">Link a cash account</span>
                    </div>
                    <Link href="/assets" className="text-xs font-bold text-custom-300 hover:text-custom-200">Go</Link>
                  </li>
                  <li className="flex items-center justify-between rounded-md bg-white/[0.03] outline outline-white/10 p-3 hover:outline-white/20">
                    <div className="flex items-center gap-3">
                      <FilePlus2 className="h-4 w-4 text-neutral-300" />
                      <span className="text-[13px]">Add life insurance</span>
                    </div>
                    <Link href="/insurances" className="text-xs font-bold text-custom-300 hover:text-custom-200">Go</Link>
                  </li>
                  <li className="flex items-center justify-between rounded-md bg-white/[0.03] outline outline-white/10 p-3 hover:outline-white/20">
                    <div className="flex items-center gap-3">
                      <UserRoundPlus className="h-4 w-4 text-neutral-300" />
                      <span className="text-[13px]">Add an executor</span>
                    </div>
                    <Link href="/transition" className="text-xs font-bold text-custom-300 hover:text-custom-200">Go</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Major Organizations */}
          <div className="mt-6 rounded-xl border border-white/10 bg-white/[0.03] p-5">
            <h3 className="text-[15px] font-medium tracking-tight">Major organizations</h3>
            <p className="text-xs text-neutral-400 mt-1">Across segments of your financial life</p>

            <div className="mt-4 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-3">
              {Object.entries(organizationData).map(([category, orgs]) => (
                <div key={category} className="rounded-lg bg-white/[0.04] outline outline-white/10 p-3">
                  <div className="text-[11px] text-neutral-400 capitalize">{category}</div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {orgs.map((org) => (
                      <span key={org} className="px-2 py-1 rounded-md text-xs bg-white/[0.06] outline outline-white/10">
                        {org}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="col-span-1">
          {/* Quick Link */}
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
            <h3 className="text-[15px] font-medium tracking-tight">Quick link an account</h3>
            <p className="text-xs text-neutral-400 mt-1">Start typing to see suggestions</p>
            <div className="mt-3">
              <div className="grid grid-cols-3 gap-2">
                {quickCategories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setQuickCategory(cat.id)}
                    className={`px-3 py-2 text-xs rounded-md bg-white/[0.04] outline outline-white/10 hover:bg-white/[0.08] ${
                      quickCategory === cat.id ? 'ring-1 ring-custom-400/40 bg-white/[0.08]' : ''
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
              <div className="mt-3 relative">
                <input
                  type="text"
                  placeholder="e.g., Barclays, Vanguard, Aviva..."
                  value={quickInput}
                  onChange={(e) => setQuickInput(e.target.value)}
                  onFocus={() => setShowSuggestions(true)}
                  onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                  className="w-full bg-white/5 outline outline-white/10 focus:outline-custom-500/40 placeholder:text-neutral-500 rounded-md px-3 py-2.5 text-[13px] text-neutral-100"
                />
              </div>
              <button className="mt-3 w-full px-3 py-2.5 rounded-md bg-custom-600/90 hover:bg-custom-500 text-sm font-bold outline  outline-custom-400/40">
                Link selected
              </button>
            </div>
          </div>

          {/* Executors & Beneficiaries */}
          <div className="mt-6 rounded-xl border border-white/10 bg-white/[0.03] p-5">
            <h3 className="text-[15px] font-medium tracking-tight">Executors & Beneficiaries</h3>
            <p className="text-xs text-neutral-400 mt-1">Manage access to your digital footprint</p>
            <div className="mt-3 space-y-2">
              {people.length === 0 ? (
                <div className="text-xs text-neutral-500 px-3 py-2">No people added yet.</div>
              ) : (
                people.map((person) => (
                  <div key={person.email} className="flex items-center justify-between gap-3 rounded-md bg-white/[0.03] outline outline-white/10 p-3">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-custom-500/20 flex items-center justify-center text-custom-300 text-xs outline outline-custom-400/30">
                        {person.name.slice(0, 1).toUpperCase()}
                      </div>
                      <div className="text-[13px]">{person.name}</div>
                    </div>
                    <span className={`px-2 py-0.5 rounded-full text-[11px] bg-white/[0.04] outline  outline-white/10 ${
                      person.type === 'executor' ? 'text-custom-300' : 'text-emerald-300'
                    }`}>
                      {person.type === 'executor' ? 'Executor' : 'Beneficiary'}
                    </span>
                  </div>
                ))
              )}
            </div>
            <Link 
              href="/placerly/transition"
              className="mt-3 w-full px-3 py-2.5 rounded-md bg-custom-600/90 hover:bg-custom-500 outline outline-custom-400/40 text-sm font-bold block text-center"
            >
              Manage in Transition
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
export default Placerly