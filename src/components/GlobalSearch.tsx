import React, { useState, useMemo } from 'react';
import { Company, Contact, Application } from '../types';
import { Search, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface GlobalSearchProps {
  companies: Company[];
  contacts: Contact[];
  applications: Application[];
  onSearch?: (query: string) => void;
}

export const GlobalSearch: React.FC<GlobalSearchProps> = ({
  companies,
  contacts,
  applications,
  onSearch,
}) => {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const results = useMemo(() => {
    if (!query.trim()) return { companies: [], contacts: [], applications: [] };

    const q = query.toLowerCase();
    return {
      companies: companies.filter(
        c => c.name.toLowerCase().includes(q) || c.arabicName?.toLowerCase().includes(q)
      ),
      contacts: contacts.filter(
        c => c.fullName.toLowerCase().includes(q) || c.email.toLowerCase().includes(q)
      ),
      applications: applications.filter(
        a =>
          companies.find(c => c.id === a.companyId)?.name.toLowerCase().includes(q) ||
          contacts.find(co => co.id === a.contactId)?.fullName.toLowerCase().includes(q)
      ),
    };
  }, [query, companies, contacts, applications]);

  const handleClear = () => {
    setQuery('');
    setIsOpen(false);
  };

  return (
    <div className="relative flex-1 max-w-md">
      <div className="relative">
        <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-tertiary" />
        <input
          type="text"
          placeholder="Search companies, contacts, apps... (⌘K)"
          value={query}
          onChange={e => {
            setQuery(e.target.value);
            setIsOpen(true);
            onSearch?.(e.target.value);
          }}
          onFocus={() => setIsOpen(true)}
          className="w-full pl-10 pr-10 py-2 bg-bg-tertiary border border-border-color rounded-lg text-text-primary placeholder-text-tertiary focus:outline-none focus:ring-2 focus:ring-primary"
        />
        {query && (
          <button
            onClick={handleClear}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-tertiary hover:text-text-primary"
          >
            <X size={18} />
          </button>
        )}
      </div>

      {/* Results Dropdown */}
      <AnimatePresence>
        {isOpen && query && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 right-0 mt-2 bg-bg-secondary border border-border-color rounded-lg shadow-lg max-h-96 overflow-y-auto z-50"
          >
            {/* Companies */}
            {results.companies.length > 0 && (
              <div className="p-3 border-b border-border-color">
                <p className="text-xs font-bold text-text-tertiary mb-2">COMPANIES</p>
                {results.companies.slice(0, 3).map(c => (
                  <div
                    key={c.id}
                    className="px-3 py-2 hover:bg-bg-tertiary rounded cursor-pointer transition-colors"
                  >
                    <p className="font-semibold text-text-primary text-sm">{c.name}</p>
                    <p className="text-xs text-text-tertiary">{c.industry}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Contacts */}
            {results.contacts.length > 0 && (
              <div className="p-3 border-b border-border-color">
                <p className="text-xs font-bold text-text-tertiary mb-2">CONTACTS</p>
                {results.contacts.slice(0, 3).map(c => (
                  <div
                    key={c.id}
                    className="px-3 py-2 hover:bg-bg-tertiary rounded cursor-pointer transition-colors"
                  >
                    <p className="font-semibold text-text-primary text-sm">{c.fullName}</p>
                    <p className="text-xs text-text-tertiary">{c.email}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Applications */}
            {results.applications.length > 0 && (
              <div className="p-3">
                <p className="text-xs font-bold text-text-tertiary mb-2">APPLICATIONS</p>
                {results.applications.slice(0, 3).map(a => (
                  <div
                    key={a.id}
                    className="px-3 py-2 hover:bg-bg-tertiary rounded cursor-pointer transition-colors"
                  >
                    <p className="font-semibold text-text-primary text-sm">
                      {companies.find(c => c.id === a.companyId)?.name}
                    </p>
                    <p className="text-xs text-text-tertiary capitalize">{a.status}</p>
                  </div>
                ))}
              </div>
            )}

            {/* No Results */}
            {results.companies.length === 0 && results.contacts.length === 0 && results.applications.length === 0 && (
              <div className="p-6 text-center">
                <p className="text-text-tertiary text-sm">No results found</p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
