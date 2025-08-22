"use client"
import { PeopleForm } from "@/components/PeopleForm";
import { PeopleList } from "@/components/PeopleList";
import { useFinancialStore } from "@/stores/financialStore";

function Transition() {
  const { getExecutors, getBeneficiaries, addExecutor, addBeneficiary } = useFinancialStore();
  
  const executors = getExecutors();
  const beneficiaries = getBeneficiaries();

  return (
    <>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">Transition</h2>
          <p className="text-neutral-400 text-sm mt-1">Add executors and beneficiaries to manage access</p>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Executors */}
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
          <h3 className="text-[15px] font-medium tracking-tight">Executor</h3>
          <p className="text-xs text-neutral-400 mt-1">Add a trusted person to manage your digital footprint</p>

          <PeopleForm 
            type="executor"
            onSubmit={(person) => addExecutor(person)}
          />

          <div className="mt-5">
            <h4 className="text-[13px] text-neutral-300 font-medium">Added executors</h4>
            <div className="mt-2">
              <PeopleList 
                people={executors}
                type="executor"
              />
            </div>
          </div>
        </div>

        {/* Beneficiaries */}
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
          <h3 className="text-[15px] font-medium tracking-tight">Other beneficiary</h3>
          <p className="text-xs text-neutral-400 mt-1">Add other beneficiaries for your profile</p>

          <PeopleForm 
            type="beneficiary"
            onSubmit={(person) => addBeneficiary(person)}
          />

          <div className="mt-5">
            <h4 className="text-[13px] text-neutral-300 font-medium">Added beneficiaries</h4>
            <div className="mt-2">
              <PeopleList 
                people={beneficiaries}
                type="beneficiary"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Transition
