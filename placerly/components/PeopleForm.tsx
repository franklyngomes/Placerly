"use client"
import { useState } from "react";

interface PeopleFormProps {
  type: 'executor' | 'beneficiary';
  onSubmit: (person: { name: string; email: string; phone: string }) => void;
}

export function PeopleForm({ type, onSubmit }: PeopleFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.email.trim()) {
      return;
    }

    onSubmit(formData);
    setFormData({ name: '', email: '', phone: '' });
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4 space-y-3">
      <div>
        <label className="block text-xs text-neutral-300 mb-1">
          Name of the {type}
        </label>
        <input
          type="text"
          required
          placeholder="Full name"
          value={formData.name}
          onChange={(e) => handleChange('name', e.target.value)}
          className="w-full bg-white/5 outline outline-1 outline-white/10 focus:outline-custom-500/40 placeholder:text-neutral-500 rounded-md px-3 py-2.5 text-[13px] text-neutral-100"
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <label className="block text-xs text-neutral-300 mb-1">
            Email Address of the {type}
          </label>
          <input
            type="email"
            required
            placeholder="name@example.com"
            value={formData.email}
            onChange={(e) => handleChange('email', e.target.value)}
            className="w-full bg-white/5 outline outline-1 outline-white/10 focus:outline-custom-500/40 placeholder:text-neutral-500 rounded-md px-3 py-2.5 text-[13px] text-neutral-100"
          />
        </div>
        
        <div>
          <label className="block text-xs text-neutral-300 mb-1">
            Contact Number
          </label>
          <input
            type="tel"
            required
            placeholder="+44 0000 000000"
            value={formData.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
            className="w-full bg-white/5 outline outline-1 outline-white/10 focus:outline-custom-500/40 placeholder:text-neutral-500 rounded-md px-3 py-2.5 text-[13px] text-neutral-100"
          />
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <button
          type="submit"
          className="px-3 py-2.5 rounded-md bg-custom-600/90 hover:bg-custom-500 text-[13px] font-medium outline outline-1 outline-custom-400/40 transition-colors"
        >
          Add {type}
        </button>
      </div>
    </form>
  );
}
