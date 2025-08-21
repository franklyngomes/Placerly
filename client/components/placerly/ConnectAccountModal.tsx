"use client"
import { useState, useEffect } from "react";
import { X, Lock, User, CreditCard, Building2 } from "lucide-react";

interface ConnectAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConnect: (credentials: AccountCredentials) => void;
  accountName: string;
  accountType: string;
}

export interface AccountCredentials {
  username: string;
  password: string;
  accountNumber?: string;
  securityCode?: string;
}

export function ConnectAccountModal({ 
  isOpen, 
  onClose, 
  onConnect, 
  accountName, 
  accountType 
}: ConnectAccountModalProps) {
  const [credentials, setCredentials] = useState<AccountCredentials>({
    username: '',
    password: '',
    accountNumber: '',
    securityCode: '',
  });
  
  const [isConnecting, setIsConnecting] = useState(false);

  // Reset form when modal opens/closes
  useEffect(() => {
    if (!isOpen) {
      setCredentials({
        username: '',
        password: '',
        accountNumber: '',
        securityCode: '',
      });
      setIsConnecting(false);
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!credentials.username || !credentials.password) {
      return;
    }

    setIsConnecting(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    onConnect(credentials);
    setIsConnecting(false);
    onClose();
  };

  const handleChange = (field: keyof AccountCredentials, value: string) => {
    setCredentials(prev => ({ ...prev, [field]: value }));
  };

  if (!isOpen) return null;

  const getAccountIcon = () => {
    switch (accountType) {
      case 'credit':
        return <CreditCard className="h-5 w-5 text-indigo-400" />;
      case 'cash':
      case 'stocks':
      case 'mortgage':
        return <Building2 className="h-5 w-5 text-indigo-400" />;
      default:
        return <Lock className="h-5 w-5 text-indigo-400" />;
    }
  };

  const requiresAccountNumber = ['credit', 'mortgage', 'stocks'].includes(accountType);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative w-full max-w-md mx-4 bg-neutral-900 rounded-xl border border-white/10 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            {getAccountIcon()}
            <div>
              <h2 className="text-lg font-semibold tracking-tight">Connect Account</h2>
              <p className="text-sm text-neutral-400">{accountName}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-md hover:bg-white/5 outline outline-1 outline-white/10 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="text-sm text-neutral-300 mb-4">
            Enter your {accountName} login credentials to securely connect your account.
          </div>

          {/* Username/Email */}
          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-2">
              Username or Email
            </label>
            <div className="relative">
              <User className="absolute left-3 top-3 h-4 w-4 text-neutral-400" />
              <input
                type="text"
                required
                placeholder="Enter your username or email"
                value={credentials.username}
                onChange={(e) => handleChange('username', e.target.value)}
                className="w-full bg-white/5 outline outline-1 outline-white/10 focus:outline-indigo-500/40 placeholder:text-neutral-500 rounded-md pl-10 pr-3 py-3 text-sm text-neutral-100"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-neutral-400" />
              <input
                type="password"
                required
                placeholder="Enter your password"
                value={credentials.password}
                onChange={(e) => handleChange('password', e.target.value)}
                className="w-full bg-white/5 outline outline-1 outline-white/10 focus:outline-indigo-500/40 placeholder:text-neutral-500 rounded-md pl-10 pr-3 py-3 text-sm text-neutral-100"
              />
            </div>
          </div>

          {/* Account Number (for credit cards, mortgages, etc.) */}
          {requiresAccountNumber && (
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2">
                Account Number (Optional)
              </label>
              <div className="relative">
                <CreditCard className="absolute left-3 top-3 h-4 w-4 text-neutral-400" />
                <input
                  type="text"
                  placeholder="Last 4 digits or full account number"
                  value={credentials.accountNumber}
                  onChange={(e) => handleChange('accountNumber', e.target.value)}
                  className="w-full bg-white/5 outline outline-1 outline-white/10 focus:outline-indigo-500/40 placeholder:text-neutral-500 rounded-md pl-10 pr-3 py-3 text-sm text-neutral-100"
                />
              </div>
            </div>
          )}

          {/* Security Notice */}
          <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-lg p-3">
            <div className="flex items-start gap-2">
              <Lock className="h-4 w-4 text-indigo-400 mt-0.5 shrink-0" />
              <div className="text-xs text-indigo-200">
                Your credentials are encrypted and securely stored. We use bank-level security to protect your information.
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 rounded-md bg-white/5 hover:bg-white/10 outline outline-1 outline-white/10 text-sm font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isConnecting || !credentials.username || !credentials.password}
              className="flex-1 px-4 py-3 rounded-md bg-indigo-600/90 hover:bg-indigo-500 disabled:bg-neutral-700 disabled:text-neutral-500 outline outline-1 outline-indigo-400/40 disabled:outline-neutral-600 text-sm font-medium transition-colors"
            >
              {isConnecting ? 'Connecting...' : 'Connect Account'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
