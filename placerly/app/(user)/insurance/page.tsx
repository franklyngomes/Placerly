"use client"
import { useState } from "react";
import { House, Umbrella } from "lucide-react";
import { Plus, Trash2 } from "lucide-react";
import { InsuranceListQuery, CreateInsuranceQuery, InsuranceDeleteQuery } from "../../../api/query/InsuranceQuery"
import { useStore } from "@/store";

const lifeProviders = [
  "Aviva", "Royal London", "Legal & General", "Scottish Widows",
  "Liverpool Victoria", "Zurich", "Vitality"
];

const homeProviders = [
  "Admiral", "Direct Line", "Halifax", "Hastings Direct",
  "Liverpool Victoria", "Swinton Insurance"
];

function Insurances() {
  const { data, isLoading, error } = InsuranceListQuery()
  const insurances = data?.data || [];
  const { userid } = useStore()
  const createInsuranceMutation = CreateInsuranceQuery()
  const deleteInsuranceMutation = InsuranceDeleteQuery()
  const [lifeSearch, setLifeSearch] = useState("");
  const [homeSearch, setHomeSearch] = useState("");
  const [showLifeForm, setShowLifeForm] = useState(false);
  const [showHomeForm, setShowHomeForm] = useState(false);

  // Form states
  const [newInsurance, setNewInsurance] = useState({
    policyNumber: "",
    coverageAmount: "",
    provider: "",
    premium: ""
  });
  const lifeInsurance = insurances.filter(insc => insc.type === 'Life');
  const homeInsurance = insurances.filter(insc => insc.type === 'Home');

  const handleCreateInsurance = async (type: 'Life' | 'Home') => {
    if (!newInsurance.policyNumber || !newInsurance.provider) return;

    await createInsuranceMutation.mutateAsync({
      userId: userid,
      policyNumber: newInsurance.policyNumber,
      type,
      coverageAmount: newInsurance.coverageAmount,
      provider: newInsurance.provider,
      premium: newInsurance.premium
    });

    // Reset form
    setNewInsurance({ policyNumber: "", coverageAmount: "", provider: "", premium: "" });
    setShowLifeForm(false);
    setShowHomeForm(false);
    setLifeSearch("");
    setHomeSearch("");
  };

  const handleDeleteInsurance = async (id: string) => {
    await deleteInsuranceMutation.mutateAsync(id);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(value);
  };

  const totalLifeValue = lifeInsurance.reduce((sum, insc) => sum + insc.coverageAmount, 0);
  const totalHomeValue = homeInsurance.reduce((sum, insc) => sum + insc.coverageAmount, 0);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-neutral-400">Loading Insurances...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-red-400">Error loading Insurances. Please try again.</div>
      </div>
    );
  }

  return (
    <>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">Insurance</h2>
          <p className="text-neutral-400 text-sm mt-1">
              Link life and home insurance accounts
          </p>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Life Insurance Accounts */}
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="flex items-center gap-2">
                <Umbrella className="h-5 w-5 text-green-400" />
                <h3 className="text-[15px] font-medium tracking-tight">Life Insurance</h3>
              </div>
              <p className="text-xs text-neutral-400 mt-1">
                Total: {formatCurrency(totalLifeValue)}
              </p>
            </div>
            <button
              onClick={() => setShowLifeForm(!showLifeForm)}
              className="flex items-center gap-1 px-3 py-1.5 bg-green-500/10 text-green-400 rounded-md text-xs font-medium hover:bg-green-500/20 transition-colors"
            >
              <Plus className="h-3 w-3" />
              Add
            </button>
          </div>

          {showLifeForm && (
            <div className="mb-4 p-3 bg-white/5 rounded-lg border border-white/10">
              <div className="space-y-3">
                <select
                  value={newInsurance.provider}
                  onChange={(e) => setNewInsurance({ ...newInsurance, provider: e.target.value })}
                  className="w-full bg-white/5 outline outline-white/10 focus:outline-green-500/40 text-neutral-100 rounded-md px-3 py-2 text-[13px]"
                >
                  <option value="">Select provider</option>
                  {lifeProviders.map(provider => (
                    <option key={provider} value={provider} className="bg-neutral-800">
                      {provider}
                    </option>
                  ))}
                </select>
                <input
                  type="text"
                  placeholder="Policy Number"
                  value={newInsurance.policyNumber}
                  onChange={(e) => setNewInsurance({ ...newInsurance, policyNumber: e.target.value })}
                  className="w-full bg-white/5 outline outline-white/10 focus:outline-green-500/40 placeholder:text-neutral-500 rounded-md px-3 py-2 text-[13px] text-neutral-100"
                />
                <input
                  type="text"
                  placeholder="Coverage Amount"
                  value={newInsurance.coverageAmount}
                  onChange={(e) => setNewInsurance({ ...newInsurance, coverageAmount: e.target.value })}
                  className="w-full bg-white/5 outline outline-white/10 focus:outline-green-500/40 placeholder:text-neutral-500 rounded-md px-3 py-2 text-[13px] text-neutral-100"
                />
                <input
                  type="text"
                  placeholder="Premium"
                  value={newInsurance.premium}
                  onChange={(e) => setNewInsurance({ ...newInsurance, premium: e.target.value })}
                  className="w-full bg-white/5 outline outline-white/10 focus:outline-green-500/40 placeholder:text-neutral-500 rounded-md px-3 py-2 text-[13px] text-neutral-100"
                />
                <div className="flex gap-2">
                  <button
                    onClick={() => handleCreateInsurance('Life')}
                    disabled={createInsuranceMutation.isPending}
                    className="flex-1 bg-green-500 text-white rounded-md px-3 py-2 text-[13px] font-medium hover:bg-green-600 transition-colors disabled:opacity-50"
                  >
                    {createInsuranceMutation.isPending ? 'Adding...' : 'Add Account'}
                  </button>
                  <button
                    onClick={() => setShowLifeForm(false)}
                    className="px-3 py-2 text-neutral-400 text-[13px] hover:text-neutral-300 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="space-y-3">
            {lifeInsurance.map((insc) => (
              <div key={insc._id} className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10">
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="text-[13px] font-medium text-neutral-100">{insc.provider}</h4>
                    <span className="text-[13px] font-semibold text-green-400">
                      {formatCurrency(insc.coverageAmount)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-xs text-neutral-400">{insc.policyNumber}</span>
                    {insc.premium&& (
                      <span className="text-xs text-neutral-400">Premium: {insc.premium}</span>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => handleDeleteInsurance(insc._id)}
                  disabled={deleteInsuranceMutation.isPending}
                  className="ml-3 p-1.5 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded transition-colors disabled:opacity-50"
                >
                  <Trash2 className="h-3 w-3" />
                </button>
              </div>
            ))}
            {lifeInsurance.length === 0 && (
              <p className="text-center text-neutral-500 text-[13px] py-4">
                No life insurance added yet
              </p>
            )}
          </div>
        </div>

        {/* Home Insurance */}
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="flex items-center gap-2">
                <House className="h-5 w-5 text-blue-400" />
                <h3 className="text-[15px] font-medium tracking-tight">Home insurance</h3>
              </div>
              <p className="text-xs text-neutral-400 mt-1">
                Total: {formatCurrency(totalHomeValue)}
              </p>
            </div>
            <button
              onClick={() => setShowHomeForm(!showHomeForm)}
              className="flex items-center gap-1 px-3 py-1.5 bg-blue-500/10 text-blue-400 rounded-md text-xs font-medium hover:bg-blue-500/20 transition-colors"
            >
              <Plus className="h-3 w-3" />
              Add
            </button>
          </div>

          {showHomeForm && (
            <div className="mb-4 p-3 bg-white/5 rounded-lg border border-white/10">
              <div className="space-y-3">
                <select
                  value={newInsurance.provider}
                  onChange={(e) => setNewInsurance({ ...newInsurance, provider: e.target.value })}
                  className="w-full bg-white/5 outline outline-white/10 focus:outline-blue-500/40 text-neutral-100 rounded-md px-3 py-2 text-[13px]"
                >
                  <option value="">Select provider</option>
                  {homeProviders.map(provider => (
                    <option key={provider} value={provider} className="bg-neutral-800">
                      {provider}
                    </option>
                  ))}
                </select>
                 <input
                  type="text"
                  placeholder="Policy Number"
                  value={newInsurance.policyNumber}
                  onChange={(e) => setNewInsurance({ ...newInsurance, policyNumber: e.target.value })}
                  className="w-full bg-white/5 outline outline-white/10 focus:outline-green-500/40 placeholder:text-neutral-500 rounded-md px-3 py-2 text-[13px] text-neutral-100"
                />
                <input
                  type="text"
                  placeholder="Coverage Amount"
                  value={newInsurance.coverageAmount}
                  onChange={(e) => setNewInsurance({ ...newInsurance, coverageAmount: e.target.value })}
                  className="w-full bg-white/5 outline outline-white/10 focus:outline-green-500/40 placeholder:text-neutral-500 rounded-md px-3 py-2 text-[13px] text-neutral-100"
                />
                <input
                  type="text"
                  placeholder="Premium"
                  value={newInsurance.premium}
                  onChange={(e) => setNewInsurance({ ...newInsurance, premium: e.target.value })}
                  className="w-full bg-white/5 outline outline-white/10 focus:outline-green-500/40 placeholder:text-neutral-500 rounded-md px-3 py-2 text-[13px] text-neutral-100"
                />
                <div className="flex gap-2">
                  <button
                    onClick={() => handleCreateInsurance('Home')}
                    disabled={createInsuranceMutation.isPending}
                    className="flex-1 bg-blue-500 text-white rounded-md px-3 py-2 text-[13px] font-medium hover:bg-blue-600 transition-colors disabled:opacity-50"
                  >
                    {createInsuranceMutation.isPending ? 'Adding...' : 'Add Account'}
                  </button>
                  <button
                    onClick={() => setShowHomeForm(false)}
                    className="px-3 py-2 text-neutral-400 text-[13px] hover:text-neutral-300 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="space-y-3">
            {homeInsurance.map((insc) => (
              <div key={insc._id} className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10">
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="text-[13px] font-medium text-neutral-100">{insc.provider}</h4>
                    <span className="text-[13px] font-semibold text-green-400">
                      {formatCurrency(insc.coverageAmount)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-xs text-neutral-400">{insc.policyNumber}</span>
                    {insc.premium&& (
                      <span className="text-xs text-neutral-400">Premium: {insc.premium}</span>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => handleDeleteInsurance(insc._id)}
                  disabled={deleteInsuranceMutation.isPending}
                  className="ml-3 p-1.5 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded transition-colors disabled:opacity-50"
                >
                  <Trash2 className="h-3 w-3" />
                </button>
              </div>
            ))}
            {homeInsurance.length === 0 && (
              <p className="text-center text-neutral-500 text-[13px] py-4">
                No home insurance added yet
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
export default Insurances
