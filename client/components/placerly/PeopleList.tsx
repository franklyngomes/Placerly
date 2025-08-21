"use client"
import { useState } from "react";
import { Trash2 } from "lucide-react";
import { useFinancialStore } from "@/stores/financialStore";
import type { Person } from "@/stores/financialStore";

interface PeopleListProps {
  people: Person[];
  type: 'executor' | 'beneficiary';
}

export function PeopleList({ people, type }: PeopleListProps) {
  const { removePerson, updatePersonStatus } = useFinancialStore();
  const [processingInvites, setProcessingInvites] = useState<Set<string>>(new Set());

  if (people.length === 0) {
    return (
      <div className="text-xs text-neutral-500 px-3 py-2">
        Nothing linked yet
      </div>
    );
  }

  const handleSendInvite = async (person: Person) => {
    setProcessingInvites(prev => new Set([...prev, person.email]));
    
    // Simulate invite sending
    updatePersonStatus(person.email, type, 'Invitation sent');
    
    setTimeout(() => {
      updatePersonStatus(person.email, type, 'Access granted');
      setProcessingInvites(prev => {
        const newSet = new Set(prev);
        newSet.delete(person.email);
        return newSet;
      });
    }, 1000);
  };

  const handleRemove = (email: string) => {
    removePerson(email, type);
  };

  return (
    <div className="space-y-2">
      {people.map((person) => {
        const isProcessing = processingInvites.has(person.email);
        
        return (
          <div
            key={person.email}
            className={`flex items-center justify-between gap-3 rounded-md bg-white/[0.03] outline outline-1 outline-white/10 p-3 transition-all ${
              person.status === 'Access granted' ? 'ring-1 ring-indigo-400/30' : ''
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-300 text-xs outline outline-1 outline-indigo-400/30">
                {person.name.slice(0, 1).toUpperCase()}
              </div>
              <div>
                <div className="text-[13px]">{person.name}</div>
                <div className="text-xs text-neutral-500">{person.email}</div>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-xs text-neutral-400">
                {isProcessing ? 'Processing...' : person.status || 'Pending invite'}
              </span>
              
              <button
                onClick={() => handleSendInvite(person)}
                disabled={isProcessing}
                className="px-2.5 py-1.5 rounded-md bg-white/[0.04] hover:bg-white/[0.08] outline outline-1 outline-white/10 text-xs disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {person.status === 'Access granted' ? 'Re-invite' : 'Send invite'}
              </button>
              
              <button
                onClick={() => handleRemove(person.email)}
                className="p-2 rounded-md hover:bg-white/[0.06] outline outline-1 outline-white/10 transition-colors"
                aria-label="Remove person"
              >
                <Trash2 className="h-4 w-4 text-neutral-300" />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
