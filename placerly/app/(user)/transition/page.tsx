"use client"
import { useState } from "react"
import { CreateTransitionQuery, TransitionListQuery, TransitionDeleteQuery } from "../../../api/query/TransitionQuery"
import { useStore } from "@/store"
import { Plus, Trash2, UserPen } from "lucide-react"
import { Spinner } from "@radix-ui/themes"
import toast from "react-hot-toast"

function Transition() {
  const { data, isLoading, error } = TransitionListQuery()
  const createTransitionMutation = CreateTransitionQuery()
  const deleteTransitionMutation = TransitionDeleteQuery()
  const transitions = data?.data || []
  const [showExecutorForm, setShowExecutorForm] = useState(false);
  const [showBenificiaryForm, setShowBenificiaryForm] = useState(false);
  const { userid } = useStore()

  // Form states
  const [newTransition, setNewTransition] = useState({
    name: "",
    email: "",
    phone: ""
  });

  const executorTrn = transitions.filter(trn => trn.type === 'Executor');
  const beneficiaryTrn = transitions.filter(trn => trn.type === 'Benificiary');

  const handleCreateTransition = async (type: 'Executor' | 'Benificiary') => {
    if (!newTransition.name || !newTransition.email || !newTransition.phone || !userid) return;

    await createTransitionMutation.mutateAsync({
      userId: userid,
      name: newTransition.name,
      type,
      email: newTransition.email,
      phone: newTransition.phone
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
    setNewTransition({ name: "", email: "", phone: "" });
    setShowExecutorForm(false);
    setShowBenificiaryForm(false);
  };

  const handleDeleteTransition = async (id: string) => {
    await deleteTransitionMutation.mutateAsync(id, {
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
        <div className="text-red-400">Error loading transitions. Please try again.</div>
      </div>
    );
  }
  return (
    <>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">Executor</h2>
          <p className="text-neutral-400 text-sm mt-1">
            Add a trusted person to manage your digital footprint
          </p>
        </div>
      </div>
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Executors */}
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="flex items-center gap-2">
                <UserPen className="h-5 w-5 text-blue-400" />
                <h3 className="text-[15px] font-medium tracking-tight">Executors</h3>
              </div>

            </div>
            <button
              onClick={() => setShowExecutorForm(!showExecutorForm)}
              className="flex items-center gap-1 px-3 py-1.5 bg-blue-500/10 text-blue-400 rounded-md text-xs font-medium hover:bg-blue-500/20 transition-colors"
            >
              <Plus className="h-3 w-3" />
              Add
            </button>
          </div>

          {showExecutorForm && (
            <div className="mb-4 p-3 bg-white/5 rounded-lg border border-white/10">
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Executor name"
                  value={newTransition.name}
                  onChange={(e) => setNewTransition({ ...newTransition, name: e.target.value })}
                  className="w-full bg-white/5 outline outline-white/10 focus:outline-blue-500/40 placeholder:text-neutral-500 rounded-md px-3 py-2 text-[13px] text-neutral-100"
                />
                <input
                  type="email"
                  placeholder="Executor email"
                  value={newTransition.email}
                  onChange={(e) => setNewTransition({ ...newTransition, email: e.target.value })}
                  className="w-full bg-white/5 outline outline-white/10 focus:outline-blue-500/40 placeholder:text-neutral-500 rounded-md px-3 py-2 text-[13px] text-neutral-100"
                />
                <input
                  type="text"
                  placeholder="Executor phone"
                  value={newTransition.phone}
                  onChange={(e) => setNewTransition({ ...newTransition, phone: e.target.value })}
                  className="w-full bg-white/5 outline outline-white/10 focus:outline-blue-500/40 placeholder:text-neutral-500 rounded-md px-3 py-2 text-[13px] text-neutral-100"
                />
                <div className="flex gap-2">
                  <button
                    onClick={() => handleCreateTransition('Executor')}
                    disabled={createTransitionMutation.isPending}
                    className="flex-1 bg-blue-500 text-white rounded-md px-3 py-2 text-[13px] font-medium hover:bg-blue-600 transition-colors disabled:opacity-50"
                  >
                    {createTransitionMutation.isPending ? 'Adding...' : 'Add Executor'}
                  </button>
                  <button
                    onClick={() => setShowExecutorForm(false)}
                    className="px-3 py-2 text-neutral-400 text-[13px] hover:text-neutral-300 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="space-y-3">
            {executorTrn.map((trn) => (
              <div key={trn._id} className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10">
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="text-[13px] font-medium text-neutral-100">{trn.name}</h4>
                  </div>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-xs text-neutral-400">{trn.email}</span>
                    <span className="text-xs text-neutral-500">{trn.phone}</span>
                  </div>
                </div>
                <button
                  onClick={() => handleDeleteTransition(trn._id)}
                  disabled={deleteTransitionMutation.isPending}
                  className="ml-3 p-1.5 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded transition-colors disabled:opacity-50"
                >
                  <Trash2 className="h-3 w-3" />
                </button>
              </div>
            ))}
            {executorTrn.length === 0 && (
              <p className="text-center text-neutral-500 text-[13px] py-4">
                No Executors added yet
              </p>
            )}
          </div>
        </div>

        {/* Beneficiary */}
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="flex items-center gap-2">
                <UserPen className="h-5 w-5 text-green-400" />
                <h3 className="text-[15px] font-medium tracking-tight">Beneficiary</h3>
              </div>

            </div>
            <button
              onClick={() => setShowBenificiaryForm(!showBenificiaryForm)}
              className="flex items-center gap-1 px-3 py-1.5 bg-green-500/10 text-green-400 rounded-md text-xs font-medium hover:bg-green-500/20 transition-colors"
            >
              <Plus className="h-3 w-3" />
              Add
            </button>
          </div>

          {showBenificiaryForm && (
            <div className="mb-4 p-3 bg-white/5 rounded-lg border border-white/10">
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Executor name"
                  value={newTransition.name}
                  onChange={(e) => setNewTransition({ ...newTransition, name: e.target.value })}
                  className="w-full bg-white/5 outline outline-white/10 focus:outline-green-500/40 placeholder:text-neutral-500 rounded-md px-3 py-2 text-[13px] text-neutral-100"
                />
                <input
                  type="email"
                  placeholder="Executor email"
                  value={newTransition.email}
                  onChange={(e) => setNewTransition({ ...newTransition, email: e.target.value })}
                  className="w-full bg-white/5 outline outline-white/10 focus:outline-green-500/40 placeholder:text-neutral-500 rounded-md px-3 py-2 text-[13px] text-neutral-100"
                />
                <input
                  type="text"
                  placeholder="Executor phone"
                  value={newTransition.phone}
                  onChange={(e) => setNewTransition({ ...newTransition, phone: e.target.value })}
                  className="w-full bg-white/5 outline outline-white/10 focus:outline-green-500/40 placeholder:text-neutral-500 rounded-md px-3 py-2 text-[13px] text-neutral-100"
                />
                <div className="flex gap-2">
                  <button
                    onClick={() => handleCreateTransition('Benificiary')}
                    disabled={createTransitionMutation.isPending}
                    className="flex-1 bg-green-500 text-white rounded-md px-3 py-2 text-[13px] font-medium hover:bg-green-600 transition-colors disabled:opacity-50"
                  >
                    {createTransitionMutation.isPending ? 'Adding...' : 'Add Beneficiary'}
                  </button>
                  <button
                    onClick={() => setShowBenificiaryForm(false)}
                    className="px-3 py-2 text-neutral-400 text-[13px] hover:text-neutral-300 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="space-y-3">
            {beneficiaryTrn.map((trn) => (
              <div key={trn._id} className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10">
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="text-[13px] font-medium text-neutral-100">{trn.name}</h4>
                  </div>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-xs text-neutral-400">{trn.email}</span>
                    <span className="text-xs text-neutral-400">{trn.phone}</span>
                  </div>
                </div>
                <button
                  onClick={() => handleDeleteTransition(trn._id)}
                  disabled={deleteTransitionMutation.isPending}
                  className="ml-3 p-1.5 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded transition-colors disabled:opacity-50"
                >
                  <Trash2 className="h-3 w-3" />
                </button>
              </div>
            ))}
            {beneficiaryTrn.length === 0 && (
              <p className="text-center text-neutral-500 text-[13px] py-4">
                No Beneficiaries added yet
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
export default Transition
