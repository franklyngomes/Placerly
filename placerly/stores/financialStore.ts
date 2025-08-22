import { useState, useEffect } from 'react';

export interface Person {
  name: string;
  email: string;
  phone: string;
  status?: string;
  type: 'executor' | 'beneficiary';
}

export interface ConnectedAccount {
  name: string;
  isConnected: boolean;
  connectionDate?: string;
  credentials?: {
    username: string;
    accountNumber?: string;
  };
}

interface FinancialStore {
  accounts: Record<string, ConnectedAccount[]>;
  executors: Person[];
  beneficiaries: Person[];
}

const STORAGE_KEY = 'financial-hub-data';

const defaultData: FinancialStore = {
  accounts: {
    'assets.cash': [],
    'assets.stocks': [],
    'debts.credit': [],
    'debts.mortgage': [],
    'insurances.life': [],
    'insurances.home': [],
    'utilities.energy': [],
    'utilities.water': [],
  },
  executors: [],
  beneficiaries: [],
};

function loadFromStorage(): FinancialStore {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      return { ...defaultData, ...parsed };
    }
  } catch (error) {
    console.error('Failed to load data from localStorage:', error);
  }
  return defaultData;
}

function saveToStorage(data: FinancialStore) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Failed to save data to localStorage:', error);
  }
}

export function useFinancialStore() {
  const [data, setData] = useState<FinancialStore>(loadFromStorage);

  // Save to localStorage whenever data changes
  useEffect(() => {
    saveToStorage(data);
  }, [data]);

  const getAccounts = (category: string): ConnectedAccount[] => {
    return data.accounts[category] || [];
  };

  const getAccountNames = (category: string): string[] => {
    return (data.accounts[category] || []).map(account => account.name);
  };

  const addAccount = (category: string, name: string) => {
    const existingAccounts = data.accounts[category] || [];
    if (!existingAccounts.some(account => account.name === name)) {
      const newAccount: ConnectedAccount = {
        name,
        isConnected: false
      };
      setData(prev => ({
        ...prev,
        accounts: {
          ...prev.accounts,
          [category]: [...existingAccounts, newAccount]
        }
      }));
    }
  };

  const connectAccount = (category: string, accountName: string, credentials: { username: string; accountNumber?: string }) => {
    setData(prev => ({
      ...prev,
      accounts: {
        ...prev.accounts,
        [category]: (prev.accounts[category] || []).map(account => 
          account.name === accountName 
            ? {
                ...account,
                isConnected: true,
                connectionDate: new Date().toISOString(),
                credentials: {
                  username: credentials.username,
                  accountNumber: credentials.accountNumber
                }
              }
            : account
        )
      }
    }));
  };

  const disconnectAccount = (category: string, accountName: string) => {
    setData(prev => ({
      ...prev,
      accounts: {
        ...prev.accounts,
        [category]: (prev.accounts[category] || []).map(account => 
          account.name === accountName 
            ? {
                ...account,
                isConnected: false,
                connectionDate: undefined,
                credentials: undefined
              }
            : account
        )
      }
    }));
  };

  const removeAccount = (category: string, name: string) => {
    setData(prev => ({
      ...prev,
      accounts: {
        ...prev.accounts,
        [category]: (prev.accounts[category] || []).filter(account => account.name !== name)
      }
    }));
  };

  const getCounts = () => {
    const assetsCash = data.accounts['assets.cash']?.length || 0;
    const assetsStocks = data.accounts['assets.stocks']?.length || 0;
    const debtsCredit = data.accounts['debts.credit']?.length || 0;
    const debtsMortgage = data.accounts['debts.mortgage']?.length || 0;
    const insurancesLife = data.accounts['insurances.life']?.length || 0;
    const insurancesHome = data.accounts['insurances.home']?.length || 0;
    const utilitiesEnergy = data.accounts['utilities.energy']?.length || 0;
    const utilitiesWater = data.accounts['utilities.water']?.length || 0;

    return {
      assets: assetsCash + assetsStocks,
      debts: debtsCredit + debtsMortgage,
      insurances: insurancesLife + insurancesHome,
      utilities: utilitiesEnergy + utilitiesWater,
    };
  };

  const getConnectedCounts = () => {
    const assetsCash = data.accounts['assets.cash']?.filter(a => a.isConnected).length || 0;
    const assetsStocks = data.accounts['assets.stocks']?.filter(a => a.isConnected).length || 0;
    const debtsCredit = data.accounts['debts.credit']?.filter(a => a.isConnected).length || 0;
    const debtsMortgage = data.accounts['debts.mortgage']?.filter(a => a.isConnected).length || 0;
    const insurancesLife = data.accounts['insurances.life']?.filter(a => a.isConnected).length || 0;
    const insurancesHome = data.accounts['insurances.home']?.filter(a => a.isConnected).length || 0;
    const utilitiesEnergy = data.accounts['utilities.energy']?.filter(a => a.isConnected).length || 0;
    const utilitiesWater = data.accounts['utilities.water']?.filter(a => a.isConnected).length || 0;

    return {
      assets: assetsCash + assetsStocks,
      debts: debtsCredit + debtsMortgage,
      insurances: insurancesLife + insurancesHome,
      utilities: utilitiesEnergy + utilitiesWater,
    };
  };

  const getExecutors = (): Person[] => {
    return data.executors;
  };

  const getBeneficiaries = (): Person[] => {
    return data.beneficiaries;
  };

  const getRecentPeople = (): Person[] => {
    const allPeople = [...data.executors, ...data.beneficiaries];
    return allPeople.slice(0, 4); // Return first 4 for dashboard
  };

  const addExecutor = (person: Omit<Person, 'type'>) => {
    const newExecutor: Person = { ...person, type: 'executor', status: 'Pending invite' };
    setData(prev => ({
      ...prev,
      executors: [...prev.executors, newExecutor]
    }));
  };

  const addBeneficiary = (person: Omit<Person, 'type'>) => {
    const newBeneficiary: Person = { ...person, type: 'beneficiary', status: 'Pending invite' };
    setData(prev => ({
      ...prev,
      beneficiaries: [...prev.beneficiaries, newBeneficiary]
    }));
  };

  const removePerson = (email: string, type: 'executor' | 'beneficiary') => {
    setData(prev => ({
      ...prev,
      [type === 'executor' ? 'executors' : 'beneficiaries']: 
        prev[type === 'executor' ? 'executors' : 'beneficiaries'].filter(p => p.email !== email)
    }));
  };

  const updatePersonStatus = (email: string, type: 'executor' | 'beneficiary', status: string) => {
    setData(prev => ({
      ...prev,
      [type === 'executor' ? 'executors' : 'beneficiaries']: 
        prev[type === 'executor' ? 'executors' : 'beneficiaries'].map(p => 
          p.email === email ? { ...p, status } : p
        )
    }));
  };

  // Helper function to get chart data
  const getActivityData = () => {
    const connectedCounts = getConnectedCounts();
    // Simple distribution for demo: spread counts over last 14 days
    const days = 14;
    const distributeCount = (count: number) => {
      const arr = Array(days).fill(0);
      if (count <= 0) return arr;
      let remaining = count;
      let i = days - 1;
      while (remaining > 0) {
        arr[i] += 1;
        remaining -= 1;
        i = (i - 2 + days) % days; // step back with wrap for variation
      }
      return arr;
    };

    return {
      assets: distributeCount(connectedCounts.assets),
      debts: distributeCount(connectedCounts.debts),
      insurances: distributeCount(connectedCounts.insurances),
      utilities: distributeCount(connectedCounts.utilities),
    };
  };

  return {
    // Account management
    getAccounts,
    getAccountNames,
    addAccount,
    connectAccount,
    disconnectAccount,
    removeAccount,
    getCounts,
    getConnectedCounts,
    
    // People management
    getExecutors,
    getBeneficiaries,
    getRecentPeople,
    addExecutor,
    addBeneficiary,
    removePerson,
    updatePersonStatus,
    
    // Chart data
    getActivityData,
  };
}
