"use client"
import { useState } from "react";
import { Plus, Trash2, PlugZap, Droplet } from "lucide-react";
import { useStore } from "@/store";
import {CreateUtilityQuery, UtilityDeleteQuery,UtilityListQuery} from "../../../api/query/UtilityQuery"
import { Spinner } from "@radix-ui/themes";
import toast from "react-hot-toast";

const energyProviders = [
  "British Gas", "Centrica", "EDF Energy", "National Grid", 
  "Octopus Energy", "Scottish Power", "Shell", "SSE"
];

const waterProviders = [
  "Affinity Water", "Scottish Water", "Severn Trent Water", "South West Water", 
  "South East Water", "Southern Water", "Thames Water", "Yorkshire Water"
];

function Utilities() {
  const { data, isLoading, error } = UtilityListQuery();
  const createUtilityMutation = CreateUtilityQuery()
  const deleteUtilityMutation = UtilityDeleteQuery()
  const utilities = data?.data || []
  const {userid} = useStore()
  const [energySearch, setEnergySearch] = useState("");
  const [waterSearch, setWaterSearch] = useState("");
  const [showEnergyForm, setShowEnergyForm] = useState(false);
  const [showWaterForm, setShowWaterForm] = useState(false);

  // Form states
  const [newUtility, setNewUtility] = useState({
    billingCycle: "",
    accountNumber: "",
    provider: "",
    outstandingBill: ""
  });

  const energyUtility = utilities.filter(util => util.type === 'Energy');
  const waterUtility = utilities.filter(util => util.type === 'Water');

  const handleCreateUtility = async (type: 'Energy' | 'Water') => {
    if (!newUtility.accountNumber || !newUtility.provider || !userid) return;

    await createUtilityMutation.mutateAsync({
      userId: userid,
      outstandingBill: newUtility.outstandingBill,
      type,
      accountNumber: newUtility.accountNumber,
      provider: newUtility.provider,
      billingCycle: newUtility.billingCycle
    }, {
      onSuccess: (res) => {
        if (res.error) {
          toast.error(res?.message)
        }else if(res?.status){
          toast.success(res?.message)
        }
      },
    });

    // Reset form
    setNewUtility({ billingCycle: "", accountNumber: "", provider: "", outstandingBill: "" });
    setShowEnergyForm(false);
    setShowWaterForm(false);
    setEnergySearch("");
    setWaterSearch("");
  };

  const handleDeleteUtility = async (id: string) => {
    await deleteUtilityMutation.mutateAsync(id, {
      onSuccess: (res) => {
        if (res.error) {
          toast.error(res?.message)
        }else if(res?.status){
          toast.success(res?.message)
        }
      },
    });
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(value);
  };

  const totalEnergyValue = energyUtility.reduce((sum, util) => sum + util.outstandingBill, 0);
  const totalWaterValue = waterUtility.reduce((sum, util) => sum + util.outstandingBill, 0);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-white"><Spinner size="3" /></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-red-400">Error loading utilities. Please try again.</div>
      </div>
    );
  }


  return (
    <>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">Utilities</h2>
          <p className="text-neutral-400 text-sm mt-1">
            Manage your electricity and water accounts
          </p>
        </div>
        <div className="text-right">
          <p className="text-sm text-neutral-400">Total Pending Bill</p>
          <p className="text-2xl font-semibold text-green-400">
            {formatCurrency(totalEnergyValue + totalWaterValue)}
          </p>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Energy Accounts */}
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="flex items-center gap-2">
                <PlugZap className="h-5 w-5 text-green-400" />
                <h3 className="text-[15px] font-medium tracking-tight">Energy accounts</h3>
              </div>
              <p className="text-xs text-neutral-400 mt-1">
                Total: {formatCurrency(totalEnergyValue)}
              </p>
            </div>
            <button
              onClick={() => setShowEnergyForm(!showEnergyForm)}
              className="flex items-center gap-1 px-3 py-1.5 bg-green-500/10 text-green-400 rounded-md text-xs font-medium hover:bg-green-500/20 transition-colors"
            >
              <Plus className="h-3 w-3" />
              Add
            </button>
          </div>

          {showEnergyForm && (
            <div className="mb-4 p-3 bg-white/5 rounded-lg border border-white/10">
              <div className="space-y-3">
                <select
                  value={newUtility.provider}
                  onChange={(e) => setNewUtility({ ...newUtility, provider: e.target.value })}
                  className="w-full bg-white/5 outline outline-white/10 focus:outline-green-500/40 text-neutral-100 rounded-md px-3 py-2 text-[13px]"
                >
                  <option value="">Select provider</option>
                  {energyProviders.map(provider => (
                    <option key={provider} value={provider} className="bg-neutral-800">
                      {provider}
                    </option>
                  ))}
                </select>
                <input
                  type="text"
                  placeholder="Account number"
                  value={newUtility.accountNumber}
                  onChange={(e) => setNewUtility({ ...newUtility, accountNumber: e.target.value })}
                  className="w-full bg-white/5 outline outline-white/10 focus:outline-green-500/40 placeholder:text-neutral-500 rounded-md px-3 py-2 text-[13px] text-neutral-100"
                />
                <input
                  type="text"
                  placeholder="Billing Cycle"
                  value={newUtility.billingCycle}
                  onChange={(e) => setNewUtility({ ...newUtility, billingCycle: e.target.value })}
                  className="w-full bg-white/5 outline outline-white/10 focus:outline-green-500/40 placeholder:text-neutral-500 rounded-md px-3 py-2 text-[13px] text-neutral-100"
                />
                <input
                  type="text"
                  placeholder="Outstanding Bill"
                  value={newUtility.outstandingBill}
                  onChange={(e) => setNewUtility({ ...newUtility, outstandingBill : e.target.value })}
                  className="w-full bg-white/5 outline outline-white/10 focus:outline-green-500/40 placeholder:text-neutral-500 rounded-md px-3 py-2 text-[13px] text-neutral-100"
                />
                <div className="flex gap-2">
                  <button
                    onClick={() => handleCreateUtility('Energy')}
                    disabled={createUtilityMutation.isPending}
                    className="flex-1 bg-green-500 text-white rounded-md px-3 py-2 text-[13px] font-medium hover:bg-green-600 transition-colors disabled:opacity-50"
                  >
                    {createUtilityMutation.isPending ? 'Adding...' : 'Add Account'}
                  </button>
                  <button
                    onClick={() => setShowEnergyForm(false)}
                    className="px-3 py-2 text-neutral-400 text-[13px] hover:text-neutral-300 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="space-y-3">
            {energyUtility.map((util) => (
              <div key={util._id} className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10">
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="text-[13px] font-medium text-neutral-100">{util.provider}</h4>
                    <span className="text-[13px] font-semibold text-green-400">
                      {formatCurrency(util.outstandingBill)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-xs text-neutral-400">{util.billingCycle}</span>
                    {util.accountNumber && (
                      <span className="text-xs text-neutral-500">{util.accountNumber}</span>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => handleDeleteUtility(util._id)}
                  disabled={deleteUtilityMutation.isPending}
                  className="ml-3 p-1.5 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded transition-colors disabled:opacity-50"
                >
                  <Trash2 className="h-3 w-3" />
                </button>
              </div>
            ))}
            {energyUtility.length === 0 && (
              <p className="text-center text-neutral-500 text-[13px] py-4">
                No energy accounts added yet
              </p>
            )}
          </div>
        </div>

        {/* Water Accounts */}
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="flex items-center gap-2">
                <Droplet className="h-5 w-5 text-blue-400" />
                <h3 className="text-[15px] font-medium tracking-tight">Water Accounts</h3>
              </div>
              <p className="text-xs text-neutral-400 mt-1">
                Total: {formatCurrency(totalWaterValue)}
              </p>
            </div>
            <button
              onClick={() => setShowWaterForm(!showWaterForm)}
              className="flex items-center gap-1 px-3 py-1.5 bg-blue-500/10 text-blue-400 rounded-md text-xs font-medium hover:bg-blue-500/20 transition-colors"
            >
              <Plus className="h-3 w-3" />
              Add
            </button>
          </div>

          {showWaterForm && (
            <div className="mb-4 p-3 bg-white/5 rounded-lg border border-white/10">
              <div className="space-y-3">
                <select
                  value={newUtility.provider}
                  onChange={(e) => setNewUtility({ ...newUtility, provider: e.target.value })}
                  className="w-full bg-white/5 outline outline-white/10 focus:outline-blue-500/40 text-neutral-100 rounded-md px-3 py-2 text-[13px]"
                >
                  <option value="">Select provider</option>
                  {waterProviders.map(provider => (
                    <option key={provider} value={provider} className="bg-neutral-800">
                      {provider}
                    </option>
                  ))}
                </select>
                <input
                  type="text"
                  placeholder="Account number"
                  value={newUtility.accountNumber}
                  onChange={(e) => setNewUtility({ ...newUtility, accountNumber: e.target.value })}
                  className="w-full bg-white/5 outline outline-white/10 focus:outline-green-500/40 placeholder:text-neutral-500 rounded-md px-3 py-2 text-[13px] text-neutral-100"
                />
                <input
                  type="text"
                  placeholder="Billing Cycle"
                  value={newUtility.billingCycle}
                  onChange={(e) => setNewUtility({ ...newUtility, billingCycle: e.target.value })}
                  className="w-full bg-white/5 outline outline-white/10 focus:outline-green-500/40 placeholder:text-neutral-500 rounded-md px-3 py-2 text-[13px] text-neutral-100"
                />
                <input
                  type="text"
                  placeholder="Outstanding Bill"
                  value={newUtility.outstandingBill}
                  onChange={(e) => setNewUtility({ ...newUtility, outstandingBill : e.target.value })}
                  className="w-full bg-white/5 outline outline-white/10 focus:outline-green-500/40 placeholder:text-neutral-500 rounded-md px-3 py-2 text-[13px] text-neutral-100"
                />
                <div className="flex gap-2">
                  <button
                    onClick={() => handleCreateUtility('Water')}
                    disabled={createUtilityMutation.isPending}
                    className="flex-1 bg-blue-500 text-white rounded-md px-3 py-2 text-[13px] font-medium hover:bg-blue-600 transition-colors disabled:opacity-50"
                  >
                    {createUtilityMutation.isPending ? 'Adding...' : 'Add Account'}
                  </button>
                  <button
                    onClick={() => setShowWaterForm(false)}
                    className="px-3 py-2 text-neutral-400 text-[13px] hover:text-neutral-300 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="space-y-3">
            {waterUtility.map((util) => (
              <div key={util._id} className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10">
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="text-[13px] font-medium text-neutral-100">{util.provider}</h4>
                    <span className="text-[13px] font-semibold text-blue-400">
                      {formatCurrency(util.outstandingBill)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-xs text-neutral-400">{util.billingCycle}</span>
                    {util.accountNumber && (
                      <span className="text-xs text-neutral-500">{util.accountNumber}</span>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => handleDeleteUtility(util._id)}
                  disabled={deleteUtilityMutation.isPending}
                  className="ml-3 p-1.5 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded transition-colors disabled:opacity-50"
                >
                  <Trash2 className="h-3 w-3" />
                </button>
              </div>
            ))}
            {waterUtility.length === 0 && (
              <p className="text-center text-neutral-500 text-[13px] py-4">
                No water accounts added yet
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
export default Utilities
