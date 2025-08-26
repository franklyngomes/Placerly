"use client"
import { useEffect, useState } from "react";
import Link from "next/link";
import { Banknote, CreditCard, ShieldCheck, PlugZap, Link as LinkIcon, FilePlus2, UserRoundPlus } from "lucide-react";
import { useStore } from "@/store";
import Barclays from "@/icons/Barclays";
import Lloyds from "@/icons/LLoyds";
import HSBC from "@/icons/HSBC";
import Monzo from "@/icons/Monzo";
import Vanguard from "@/icons/Vanguard";
import FreeTrade from "@/icons/FreeTrade";
import AJBell from "@/icons/AJBell";
import Nutmeg from "@/icons/Nutmeg";
import AmericanExpress from "@/icons/AmericanExpress";
import NationWide from "@/icons/NationWide";
import Santander from "@/icons/Santander";
import Skipton from "@/icons/Skipton";
import Octopus from "@/icons/Octopus";
import ScottishWater from "@/icons/ScottishWater";
import ThamesWater from "@/icons/ThamesWater";
import SeverenTrent from "@/icons/SeverenTrent";
import BritishGas from "@/icons/BritishGas";
import EDF from "@/icons/EDF";
import Admiral from "@/icons/Admiral";
import DirectLine from "@/icons/DirectLine";
import Halifax from "@/icons/Halifax";
import Aviva from "@/icons/Aviva";
import LegalGeneral from "@/icons/LegalGeneral";
import Zurich from "@/icons/Zurich";
import {AssetListQuery} from "../api/query/AssetsQuery"
import {DebtListQuery} from "../api/query/DebtQuery"
import {InsuranceListQuery} from "../api/query/InsuranceQuery"
import {TransitionListQuery} from "../api/query/TransitionQuery"
import {UtilityListQuery} from "../api/query/UtilityQuery"


const organizationData = {
  cash: [
    {
      name: "Barclays",
      icon: Barclays
    },
    {
      name: "Lloyds",
      icon: Lloyds
    },
    {
      name: "HSBC",
      icon: HSBC
    },
    {
      name: "Monzo",
      icon: Monzo
    }
  ],
  stocks: [{ name: "Vanguard", icon: Vanguard }, { name: "Freetrade", icon: FreeTrade }, { name: "AJ Bell", icon: AJBell }, { name: "Nutmeg", icon: Nutmeg }],
  credit: [{ name: "American Express", icon: AmericanExpress }, { name: "Barclays", icon: Barclays }, { name: "HSBC", icon: HSBC }],
  mortgage: [{ name: "Nationwide", icon: NationWide }, { name: "Santander", icon: Santander }, { name: "Skipton", icon: Skipton }],
  life: [{ name: "Aviva", icon: Aviva }, { name: "Legal & General", icon: LegalGeneral }, { name: "Zurich", icon: Zurich }],
  home: [{ name: "Admiral", icon: Admiral }, { name: "Direct Line", icon: DirectLine }, { name: "Halifax", icon: Halifax }],
  energy: [{ name: "Octopus Energy", icon: Octopus }, { name: "British Gas", icon: BritishGas }, { name: "EDF Energy", icon: EDF }],
  water: [{ name: "Thames Water", icon: ThamesWater }, { name: "Severn Trent", icon: SeverenTrent }, { name: "Scottish Water", icon: ScottishWater }]
};

function Placerly() {
  const [mounted, setMounted] = useState(false);
  const { user } = useStore()
  const {data: assets} = AssetListQuery()
  const {data: debt} = DebtListQuery()
  const {data: insurance} = InsuranceListQuery()
  const {data: utility} = UtilityListQuery()
  const {data: transition} = TransitionListQuery()

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;
  return (
    <>
      {/* Header */}
      <header className="hidden md:flex items-center justify-between py-6">
        <div className="">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">Hello {user?.firstName ?? "there"}!</h2>
          <p className="text-neutral-400 text-sm mt-1">Overview of your financial footprint and quick actions.</p>
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
            </div>

            <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="rounded-lg bg-white/[0.04] outline  outline-white/10 p-4 hover:outline-white/20 hover:-translate-y-0.5 transition">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-neutral-400">Assets</span>
                  <Banknote className="h-4 w-4 text-neutral-300" />
                </div>
                <div className="mt-2 text-xl font-semibold tracking-tight">
                  {assets?.data.length ?? 0}/2
                </div>
                <div className="text-xs text-neutral-500 mt-1">Cash & Shares</div>
              </div>

              <div className="rounded-lg bg-white/[0.04] outline outline-white/10 p-4 hover:outline-white/20 hover:-translate-y-0.5 transition">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-neutral-400">Debts</span>
                  <CreditCard className="h-4 w-4 text-neutral-300" />
                </div>
                <div className="mt-2 text-xl font-semibold tracking-tight">
                  {debt?.data.length ?? 0}/2
                </div>
                <div className="text-xs text-neutral-500 mt-1">Cards & Mortgages</div>
              </div>

              <div className="rounded-lg bg-white/[0.04] outline outline-white/10 p-4 hover:outline-white/20 hover:-translate-y-0.5 transition">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-neutral-400">Insurances</span>
                  <ShieldCheck className="h-4 w-4 text-neutral-300" />
                </div>
                <div className="mt-2 text-xl font-semibold tracking-tight">
                 {insurance?.data.length ?? 0}/2
                </div>
                <div className="text-xs text-neutral-500 mt-1">Life & Home</div>
              </div>

              <div className="rounded-lg bg-white/[0.04] outline outline-white/10 p-4 hover:outline-white/20 hover:-translate-y-0.5 transition">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-neutral-400">Utilities</span>
                  <PlugZap className="h-4 w-4 text-neutral-300" />
                </div>
                <div className="mt-2 text-xl font-semibold tracking-tight">
                  {utility?.data.length ?? 0}/2
                </div>
                <div className="text-xs text-neutral-500 mt-1">Energy & Water</div>
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
                    {orgs.map((org, index) => {
                      const Icon = org.icon;
                      return (
                        <span key={index} className="px-2 py-1 rounded-md text-xs bg-white/[0.25] outline outline-white/10">
                          {org.name} {Icon && <Icon />}
                        </span>
                      )
                    }
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="col-span-1">

          {/* Executors & Beneficiaries */}
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
            <h3 className="text-[15px] font-medium tracking-tight">Executors & Beneficiaries</h3>
            <p className="text-xs text-neutral-400 mt-1">Manage access to your digital footprint</p>
            <div className="mt-3 space-y-2">
              {transition?.data.length === 0 ? (
                <div className="text-xs text-neutral-500 px-3 py-2">No people added yet.</div>
              ) : (
                transition?.data.map((person, index) => (
                  <div key={index} className="flex items-center justify-between gap-3 rounded-md bg-white/[0.03] outline outline-white/10 p-3">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-custom-500/20 flex items-center justify-center text-custom-300 text-xs outline outline-custom-400/30">
                        {person.name.slice(0, 1).toUpperCase()}
                      </div>
                      <div className="text-[13px]">{person.name}</div>
                    </div>
                    <span className={`px-2 py-0.5 rounded-full text-[11px] bg-white/[0.04] outline  outline-white/10 ${person.type === 'executor' ? 'text-custom-300' : 'text-emerald-300'
                      }`}>
                      {person.type === 'Executor' ? 'Executor' : 'Beneficiary'}
                    </span>
                  </div>
                ))
              )}
            </div>
            <Link
              href="/transition"
              className="mt-3 w-full px-3 py-2.5 rounded-md bg-custom-600/90 hover:bg-custom-500 outline outline-custom-400/40 text-sm font-bold block text-center"
            >
              Manage in Transition
            </Link>
          </div>

          {/* Upcoming Tasks */}
          <div className="rounded-lg bg-white/[0.04] outline outline-white/10 p-4 mt-6">
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
                <Link href="/insurance" className="text-xs font-bold text-custom-300 hover:text-custom-200">Go</Link>
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
    </>
  );
}
export default Placerly