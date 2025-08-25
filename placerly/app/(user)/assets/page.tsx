"use client"
import { useState } from "react";
import { Plus, Trash2,DollarSign, TrendingUp } from "lucide-react";
import { AssetListQuery, CreateAssetQuery, AssetDeleteQuery } from "../../../api/query/AssetsQuery";
import { useStore } from "@/store";

const cashProviders = [
  "Barclays", "Lloyds", "Marcus", "Natwest", "HSBC", "Monzo",
  "Starling", "Revolut", "Halifax", "Santander"
];

const stocksProviders = [
  "Vanguard", "Moneyfarm", "AJ Bell", "Freetrade", "Nutmeg",
  "Wealthify", "Hargreaves Lansdown", "Interactive Investor"
];

export default function Assets() {
  const { data, isLoading, error } = AssetListQuery();
  const createAssetMutation = CreateAssetQuery();
  const deleteAssetMutation = AssetDeleteQuery();
  const assets = data?.data || [];
  const [cashSearch, setCashSearch] = useState("");
  const [stocksSearch, setStocksSearch] = useState("");
  const [showCashForm, setShowCashForm] = useState(false);
  const [showStocksForm, setShowStocksForm] = useState(false);
  const { userid } = useStore()

  // Form states
  const [newAsset, setNewAsset] = useState({
    accountName: "",
    accountNumber: "",
    provider: ""
  });

  const cashAssets = assets.filter(asset => asset.type === 'Cash');
  const stocksAssets = assets.filter(asset => asset.type === 'Stocks');

  const handleCreateAsset = async (type: 'Cash' | 'Stocks') => {
    if (!newAsset.accountName || !newAsset.provider) return;

    await createAssetMutation.mutateAsync({
      userId: userid,
      accountName: newAsset.accountName,
      type,
      accountNumber: newAsset.accountNumber,
      provider: newAsset.provider
    });

    // Reset form
    setNewAsset({ accountName: "", accountNumber: "", provider: "" });
    setShowCashForm(false);
    setShowStocksForm(false);
    setCashSearch("");
    setStocksSearch("");
  };

  const handleDeleteAsset = async (id: string) => {
    await deleteAssetMutation.mutateAsync(id);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(value);
  };

  const totalCashValue = cashAssets.reduce((sum, asset) => sum + asset.balance, 0);
  const totalStocksValue = stocksAssets.reduce((sum, asset) => sum + asset.balance, 0);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-neutral-400">Loading assets...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-red-400">Error loading assets. Please try again.</div>
      </div>
    );
  }

  return (
    <>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">Assets</h2>
          <p className="text-neutral-400 text-sm mt-1">
            Manage your cash and investment accounts
          </p>
        </div>
        <div className="text-right">
          <p className="text-sm text-neutral-400">Total Assets</p>
          <p className="text-2xl font-semibold text-green-400">
            {formatCurrency(totalCashValue + totalStocksValue)}
          </p>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Cash Accounts */}
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-green-400" />
                <h3 className="text-[15px] font-medium tracking-tight">Cash accounts</h3>
              </div>
              <p className="text-xs text-neutral-400 mt-1">
                Total: {formatCurrency(totalCashValue)}
              </p>
            </div>
            <button
              onClick={() => setShowCashForm(!showCashForm)}
              className="flex items-center gap-1 px-3 py-1.5 bg-green-500/10 text-green-400 rounded-md text-xs font-medium hover:bg-green-500/20 transition-colors"
            >
              <Plus className="h-3 w-3" />
              Add
            </button>
          </div>

          {showCashForm && (
            <div className="mb-4 p-3 bg-white/5 rounded-lg border border-white/10">
              <div className="space-y-3">
                <select
                  value={newAsset.provider}
                  onChange={(e) => setNewAsset({ ...newAsset, provider: e.target.value })}
                  className="w-full bg-white/5 outline outline-white/10 focus:outline-green-500/40 text-neutral-100 rounded-md px-3 py-2 text-[13px]"
                >
                  <option value="">Select provider</option>
                  {cashProviders.map(provider => (
                    <option key={provider} value={provider} className="bg-neutral-800">
                      {provider}
                    </option>
                  ))}
                </select>
                <input
                  type="text"
                  placeholder="Account name"
                  value={newAsset.accountName}
                  onChange={(e) => setNewAsset({ ...newAsset, accountName: e.target.value })}
                  className="w-full bg-white/5 outline outline-white/10 focus:outline-green-500/40 placeholder:text-neutral-500 rounded-md px-3 py-2 text-[13px] text-neutral-100"
                />
                <input
                  type="text"
                  placeholder="Account number"
                  value={newAsset.accountNumber}
                  onChange={(e) => setNewAsset({ ...newAsset, accountNumber: e.target.value })}
                  className="w-full bg-white/5 outline outline-white/10 focus:outline-green-500/40 placeholder:text-neutral-500 rounded-md px-3 py-2 text-[13px] text-neutral-100"
                />
                <div className="flex gap-2">
                  <button
                    onClick={() => handleCreateAsset('Cash')}
                    disabled={createAssetMutation.isPending}
                    className="flex-1 bg-green-500 text-white rounded-md px-3 py-2 text-[13px] font-medium hover:bg-green-600 transition-colors disabled:opacity-50"
                  >
                    {createAssetMutation.isPending ? 'Adding...' : 'Add Account'}
                  </button>
                  <button
                    onClick={() => setShowCashForm(false)}
                    className="px-3 py-2 text-neutral-400 text-[13px] hover:text-neutral-300 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="space-y-3">
            {cashAssets.map((asset) => (
              <div key={asset._id} className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10">
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="text-[13px] font-medium text-neutral-100">{asset.provider}</h4>
                    <span className="text-[13px] font-semibold text-green-400">
                      {formatCurrency(asset.balance)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-xs text-neutral-400">{asset.accountName}</span>
                    {asset.accountNumber && (
                      <span className="text-xs text-neutral-500">{asset.accountNumber}</span>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => handleDeleteAsset(asset._id)}
                  disabled={deleteAssetMutation.isPending}
                  className="ml-3 p-1.5 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded transition-colors disabled:opacity-50"
                >
                  <Trash2 className="h-3 w-3" />
                </button>
              </div>
            ))}
            {cashAssets.length === 0 && (
              <p className="text-center text-neutral-500 text-[13px] py-4">
                No cash accounts added yet
              </p>
            )}
          </div>
        </div>

        {/* Stocks Accounts */}
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-blue-400" />
                <h3 className="text-[15px] font-medium tracking-tight">Stocks & shares accounts</h3>
              </div>
              <p className="text-xs text-neutral-400 mt-1">
                Total: {formatCurrency(totalStocksValue)}
              </p>
            </div>
            <button
              onClick={() => setShowStocksForm(!showStocksForm)}
              className="flex items-center gap-1 px-3 py-1.5 bg-blue-500/10 text-blue-400 rounded-md text-xs font-medium hover:bg-blue-500/20 transition-colors"
            >
              <Plus className="h-3 w-3" />
              Add
            </button>
          </div>

          {showStocksForm && (
            <div className="mb-4 p-3 bg-white/5 rounded-lg border border-white/10">
              <div className="space-y-3">
                <select
                  value={newAsset.provider}
                  onChange={(e) => setNewAsset({ ...newAsset, provider: e.target.value })}
                  className="w-full bg-white/5 outline outline-white/10 focus:outline-blue-500/40 text-neutral-100 rounded-md px-3 py-2 text-[13px]"
                >
                  <option value="">Select provider</option>
                  {stocksProviders.map(provider => (
                    <option key={provider} value={provider} className="bg-neutral-800">
                      {provider}
                    </option>
                  ))}
                </select>
                <input
                  type="text"
                  placeholder="Account name"
                  value={newAsset.accountName}
                  onChange={(e) => setNewAsset({ ...newAsset, accountName: e.target.value })}
                  className="w-full bg-white/5 outline outline-white/10 focus:outline-blue-500/40 placeholder:text-neutral-500 rounded-md px-3 py-2 text-[13px] text-neutral-100"
                />
                <input
                  type="text"
                  placeholder="Account Number"
                  value={newAsset.accountNumber}
                  onChange={(e) => setNewAsset({ ...newAsset, accountNumber: e.target.value })}
                  className="w-full bg-white/5 outline outline-white/10 focus:outline-blue-500/40 placeholder:text-neutral-500 rounded-md px-3 py-2 text-[13px] text-neutral-100"
                />
                <div className="flex gap-2">
                  <button
                    onClick={() => handleCreateAsset('Stocks')}
                    disabled={createAssetMutation.isPending}
                    className="flex-1 bg-blue-500 text-white rounded-md px-3 py-2 text-[13px] font-medium hover:bg-blue-600 transition-colors disabled:opacity-50"
                  >
                    {createAssetMutation.isPending ? 'Adding...' : 'Add Account'}
                  </button>
                  <button
                    onClick={() => setShowStocksForm(false)}
                    className="px-3 py-2 text-neutral-400 text-[13px] hover:text-neutral-300 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="space-y-3">
            {stocksAssets.map((asset) => (
              <div key={asset._id} className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10">
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="text-[13px] font-medium text-neutral-100">{asset.provider}</h4>
                    <span className="text-[13px] font-semibold text-blue-400">
                      {formatCurrency(asset.balance)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-xs text-neutral-400">{asset.accountName}</span>
                    {asset.accountNumber && (
                      <span className="text-xs text-neutral-500">{asset.accountNumber}</span>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => handleDeleteAsset(asset.id)}
                  disabled={deleteAssetMutation.isPending}
                  className="ml-3 p-1.5 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded transition-colors disabled:opacity-50"
                >
                  <Trash2 className="h-3 w-3" />
                </button>
              </div>
            ))}
            {stocksAssets.length === 0 && (
              <p className="text-center text-neutral-500 text-[13px] py-4">
                No investment accounts added yet
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}