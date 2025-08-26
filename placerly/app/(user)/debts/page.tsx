"use client"
import { useState } from "react";
import { Plus, Trash2,CreditCard, HandCoins} from "lucide-react";
import {DebtDeleteQuery, DebtListQuery, CreateDebtQuery} from "../../../api/query/DebtQuery"
import { useStore } from "@/store";

const creditProviders = [
  "American Express", "Barclays", "HSBC", "Halifax", "Lloyds", 
  "Natwest", "Santander", "Capital One"
];

const mortgageProviders = [
  "Nationwide", "Yorkshire Building Society", "Skipton Building Society", 
  "Santander", "Halifax", "Barclays", "HSBC", "Lloyds"
];

export default function Debts() {
  const { data, isLoading, error } = DebtListQuery();
  const debts = data?.data || []
  const createDebtMutation = CreateDebtQuery()
  const deleteDebtMutation = DebtDeleteQuery()
  const [creditSearch, setCreditSearch] = useState("");
  const [mortgageSearch, setMortgageSearch] = useState("");
  const [showCreditForm, setShowCreditForm] = useState(false);
  const [showMortgageForm, setShowMortgageForm] = useState(false);
    const { userid } = useStore()

    // Form states
  const [newDebt, setNewDebt] = useState({
    accountName: "",
    accountNumber: "",
    provider: ""
  });
    const creditDebts = debts.filter(debt => debt.type === 'Credit');
  const mortgageDebts = debts.filter(debt => debt.type === 'Mortgage');

const handleCreateDebt = async (type: 'Credit' | 'Mortgage') => {
    if (!newDebt.accountName || !newDebt.provider || !userid) return;

    await createDebtMutation.mutateAsync({
      userId: userid as string,
      accountName: newDebt.accountName,
      type,
      accountNumber: newDebt.accountNumber,
      provider: newDebt.provider
    });

    // Reset form
    setNewDebt({ accountName: "", accountNumber: "", provider: "" });
    setShowCreditForm(false);
    setShowMortgageForm(false);
    setCreditSearch("");
    setMortgageSearch("");
  };
    const handleDeleteDebt = async (id: string) => {
    await deleteDebtMutation.mutateAsync(id);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(value);
  };

  const totalCreditDebt = creditDebts.reduce((sum, debt) => sum + debt.outstandingAmount, 0);
  const totalMortgageDebt = mortgageDebts.reduce((sum, debt) => sum + debt.outstandingAmount, 0);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-neutral-400">Loading debts...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-red-400">Error loading debts. Please try again.</div>
      </div>
    );
  }


  return (
   <>
         <div className="flex items-center justify-between">
           <div>
             <h2 className="text-2xl font-semibold tracking-tight">Debts</h2>
             <p className="text-neutral-400 text-sm mt-1">
               Link your credit cards and mortgage accounts
             </p>
           </div>
           <div className="text-right">
             <p className="text-sm text-neutral-400">Total Debts</p>
             <p className="text-2xl font-semibold text-yellow-400">
               {formatCurrency(totalCreditDebt + totalMortgageDebt)}
             </p>
           </div>
         </div>
   
         <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
           {/* Credit Cards */}
           <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
             <div className="flex items-center justify-between mb-4">
               <div>
                 <div className="flex items-center gap-2">
                   <CreditCard className="h-5 w-5 text-red-400" />
                   <h3 className="text-[15px] font-medium tracking-tight">Credit Cards</h3>
                 </div>
                 <p className="text-xs text-neutral-400 mt-1">
                   Total: {formatCurrency(totalCreditDebt)}
                 </p>
               </div>
               <button
                 onClick={() => setShowCreditForm(!showCreditForm)}
                 className="flex items-center gap-1 px-3 py-1.5 bg-red-500/10 text-red-400 rounded-md text-xs font-medium hover:bg-red-500/20 transition-colors"
               >
                 <Plus className="h-3 w-3" />
                 Add
               </button>
             </div>
   
             {showCreditForm && (
               <div className="mb-4 p-3 bg-white/5 rounded-lg border border-white/10">
                 <div className="space-y-3">
                   <select
                     value={newDebt.provider}
                     onChange={(e) => setNewDebt({ ...newDebt, provider: e.target.value })}
                     className="w-full bg-white/5 outline outline-white/10 focus:outline-red-500/40 text-neutral-100 rounded-md px-3 py-2 text-[13px]"
                   >
                     <option value="">Select provider</option>
                     {creditProviders.map(provider => (
                       <option key={provider} value={provider} className="bg-neutral-800">
                         {provider}
                       </option>
                     ))}
                   </select>
                   <input
                     type="text"
                     placeholder="Account name"
                     value={newDebt.accountName}
                     onChange={(e) => setNewDebt({ ...newDebt, accountName: e.target.value })}
                     className="w-full bg-white/5 outline outline-white/10 focus:outline-red-500/40 placeholder:text-neutral-500 rounded-md px-3 py-2 text-[13px] text-neutral-100"
                   />
                   <input
                     type="text"
                     placeholder="Account number"
                     value={newDebt.accountNumber}
                     onChange={(e) => setNewDebt({ ...newDebt, accountNumber: e.target.value })}
                     className="w-full bg-white/5 outline outline-white/10 focus:outline-red-500/40 placeholder:text-neutral-500 rounded-md px-3 py-2 text-[13px] text-neutral-100"
                   />
                   <div className="flex gap-2">
                     <button
                       onClick={() => handleCreateDebt('Credit')}
                       disabled={createDebtMutation.isPending}
                       className="flex-1 bg-red-500 text-white rounded-md px-3 py-2 text-[13px] font-medium hover:bg-red-600 transition-colors disabled:opacity-50"
                     >
                       {createDebtMutation.isPending ? 'Adding...' : 'Add Account'}
                     </button>
                     <button
                       onClick={() => setShowCreditForm(false)}
                       className="px-3 py-2 text-neutral-400 text-[13px] hover:text-neutral-300 transition-colors"
                     >
                       Cancel
                     </button>
                   </div>
                 </div>
               </div>
             )}
   
             <div className="space-y-3">
               {creditDebts.map((debt) => (
                 <div key={debt._id} className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10">
                   <div className="flex-1">
                     <div className="flex items-center justify-between">
                       <h4 className="text-[13px] font-medium text-neutral-100">{debt.provider}</h4>
                       <span className="text-[13px] font-semibold text-red-400">
                         {formatCurrency(debt.outstandingAmount)}
                       </span>
                     </div>
                     <div className="flex items-center justify-between mt-1">
                       <span className="text-xs text-neutral-400">{debt.accountName}</span>
                       {debt.accountNumber && (
                         <span className="text-xs text-neutral-500">{debt.accountNumber}</span>
                       )}
                     </div>
                   </div>
                   <button
                     onClick={() => handleDeleteDebt(debt._id)}
                     disabled={deleteDebtMutation.isPending}
                     className="ml-3 p-1.5 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded transition-colors disabled:opacity-50"
                   >
                     <Trash2 className="h-3 w-3" />
                   </button>
                 </div>
               ))}
               {creditDebts.length === 0 && (
                 <p className="text-center text-neutral-500 text-[13px] py-4">
                   No credit cards added
                 </p>
               )}
             </div>
           </div>
   
           {/* Mortgage Accounts */}
           <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
             <div className="flex items-center justify-between mb-4">
               <div>
                 <div className="flex items-center gap-2">
                   <HandCoins className="h-5 w-5 text-yellow-400" />
                   <h3 className="text-[15px] font-medium tracking-tight">Mortgage accounts</h3>
                 </div>
                 <p className="text-xs text-neutral-400 mt-1">
                   Total: {formatCurrency(totalMortgageDebt)}
                 </p>
               </div>
               <button
                 onClick={() => setShowMortgageForm(!showMortgageForm)}
                 className="flex items-center gap-1 px-3 py-1.5 bg-yellow-500/10 text-yellow-400 rounded-md text-xs font-medium hover:bg-yellow-500/20 transition-colors"
               >
                 <Plus className="h-3 w-3" />
                 Add
               </button>
             </div>
   
             {showMortgageForm && (
               <div className="mb-4 p-3 bg-white/5 rounded-lg border border-white/10">
                 <div className="space-y-3">
                   <select
                     value={newDebt.provider}
                     onChange={(e) => setNewDebt({ ...newDebt, provider: e.target.value })}
                     className="w-full bg-white/5 outline outline-white/10 focus:outline-blue-500/40 text-neutral-100 rounded-md px-3 py-2 text-[13px]"
                   >
                     <option value="">Select provider</option>
                     {mortgageProviders.map(provider => (
                       <option key={provider} value={provider} className="bg-neutral-800">
                         {provider}
                       </option>
                     ))}
                   </select>
                   <input
                     type="text"
                     placeholder="Account name"
                     value={newDebt.accountName}
                     onChange={(e) => setNewDebt({ ...newDebt, accountName: e.target.value })}
                     className="w-full bg-white/5 outline outline-white/10 focus:outline-blue-500/40 placeholder:text-neutral-500 rounded-md px-3 py-2 text-[13px] text-neutral-100"
                   />
                   <input
                     type="text"
                     placeholder="Account Number"
                     value={newDebt.accountNumber}
                     onChange={(e) => setNewDebt({ ...newDebt, accountNumber: e.target.value })}
                     className="w-full bg-white/5 outline outline-white/10 focus:outline-blue-500/40 placeholder:text-neutral-500 rounded-md px-3 py-2 text-[13px] text-neutral-100"
                   />
                   <div className="flex gap-2">
                     <button
                       onClick={() => handleCreateDebt('Mortgage')}
                       disabled={createDebtMutation.isPending}
                       className="flex-1 bg-yellow-500 text-white rounded-md px-3 py-2 text-[13px] font-medium hover:bg-yellow-600 transition-colors disabled:opacity-50"
                     >
                       {createDebtMutation.isPending ? 'Adding...' : 'Add Account'}
                     </button>
                     <button
                       onClick={() => setShowMortgageForm(false)}
                       className="px-3 py-2 text-neutral-400 text-[13px] hover:text-neutral-300 transition-colors"
                     >
                       Cancel
                     </button>
                   </div>
                 </div>
               </div>
             )}
   
             <div className="space-y-3">
               {mortgageDebts.map((debt) => (
                 <div key={debt._id} className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10">
                   <div className="flex-1">
                     <div className="flex items-center justify-between">
                       <h4 className="text-[13px] font-medium text-neutral-100">{debt.provider}</h4>
                       <span className="text-[13px] font-semibold text-yellow-400">
                         {formatCurrency(debt.outstandingAmount)}
                       </span>
                     </div>
                     <div className="flex items-center justify-between mt-1">
                       <span className="text-xs text-neutral-400">{debt.accountName}</span>
                       {debt.accountNumber && (
                         <span className="text-xs text-neutral-500">{debt.accountNumber}</span>
                       )}
                     </div>
                   </div>
                   <button
                     onClick={() => handleDeleteDebt(debt._id)}
                     disabled={deleteDebtMutation.isPending}
                     className="ml-3 p-1.5 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded transition-colors disabled:opacity-50"
                   >
                     <Trash2 className="h-3 w-3" />
                   </button>
                 </div>
               ))}
               {mortgageDebts.length === 0 && (
                 <p className="text-center text-neutral-500 text-[13px] py-4">
                   No mortgage accounts added
                 </p>
               )}
             </div>
           </div>
         </div>
       </>
  );
}

