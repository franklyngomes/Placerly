"use client"
import { Building2, Trash2, CheckCircle, Clock } from "lucide-react";
import { useFinancialStore, type ConnectedAccount } from "@/stores/financialStore";
import { useState } from "react";
import { ConnectAccountModal, type AccountCredentials } from "./ConnectAccountModal";

interface AccountsListProps {
  accounts: ConnectedAccount[];
  category: string;
}

export function AccountsList({ accounts, category }: AccountsListProps) {
  const { removeAccount, connectAccount, disconnectAccount } = useFinancialStore();
  const [selectedAccount, setSelectedAccount] = useState<ConnectedAccount | null>(null);
  const [showModal, setShowModal] = useState(false);

  if (accounts.length === 0) {
    return (
      <div className="text-xs text-neutral-500 px-3 py-2">
        Nothing linked yet
      </div>
    );
  }

  const handleConnect = (account: ConnectedAccount) => {
    setSelectedAccount(account);
    setShowModal(true);
  };

  const handleModalConnect = (credentials: AccountCredentials) => {
    if (selectedAccount) {
      connectAccount(category, selectedAccount.name, {
        username: credentials.username,
        accountNumber: credentials.accountNumber
      });
    }
  };

  const handleDisconnect = (accountName: string) => {
    disconnectAccount(category, accountName);
  };

  const handleRemove = (accountName: string) => {
    removeAccount(category, accountName);
  };

  const getAccountType = () => {
    const [, type] = category.split('.');
    return type;
  };

  return (
    <>
      <div className="space-y-2">
        {accounts.map((account) => {
          return (
            <div
              key={`${category}-${account.name}`}
              className={`group flex items-center justify-between gap-3 rounded-md bg-white/[0.03] outline outline-1 outline-white/10 p-3 hover:bg-white/[0.04] hover:outline-white/20 transition ${
                account.isConnected ? 'ring-1 ring-emerald-500/30' : ''
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Building2 className="h-4 w-4 text-neutral-300" />
                  {account.isConnected && (
                    <CheckCircle className="absolute -top-1 -right-1 h-3 w-3 text-emerald-400 bg-neutral-900 rounded-full" />
                  )}
                </div>
                <div>
                  <div className="text-[13px] flex items-center gap-2">
                    {account.name}
                    {account.isConnected && (
                      <span className="text-xs text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                        Connected
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-neutral-500">
                    {account.isConnected ? (
                      <span>
                        Connected as {account.credentials?.username}
                        {account.credentials?.accountNumber && account.credentials.accountNumber.length >= 4 && ` • ****${account.credentials.accountNumber.slice(-4)}`}
                      </span>
                    ) : (
                      <span>
                        <Clock className="inline h-3 w-3 mr-1" />
                        Not connected
                      </span>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                {account.isConnected && (
                  <button
                    onClick={() => handleConnect(account)}
                    className="px-2.5 py-1.5 rounded-md bg-white/[0.04] hover:bg-white/[0.08] outline outline-1 outline-white/10 text-xs transition-colors"
                  >
                    Manage
                  </button>
                )}

                {account.isConnected && (
                  <button
                    onClick={() => handleDisconnect(account.name)}
                    className="px-2.5 py-1.5 rounded-md bg-red-500/10 hover:bg-red-500/20 outline outline-1 outline-red-500/20 text-xs text-red-300 transition-colors"
                  >
                    Disconnect
                  </button>
                )}

                {!account.isConnected && (
                  <button
                    onClick={() => handleConnect(account)}
                    className="px-2.5 py-1.5 rounded-md bg-indigo-600/20 hover:bg-indigo-600/30 outline outline-1 outline-indigo-500/30 text-xs text-indigo-300 transition-colors"
                  >
                    Connect
                  </button>
                )}

                <button
                  onClick={() => handleRemove(account.name)}
                  className="p-2 rounded-md hover:bg-white/[0.06] outline outline-1 outline-white/10 transition-colors"
                  aria-label="Remove account"
                >
                  <Trash2 className="h-4 w-4 text-neutral-300" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Connect Account Modal */}
      <ConnectAccountModal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          setSelectedAccount(null);
        }}
        onConnect={handleModalConnect}
        accountName={selectedAccount?.name || ''}
        accountType={getAccountType()}
      />
    </>
  );
}
