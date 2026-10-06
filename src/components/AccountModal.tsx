import React, { useState, useEffect } from 'react';
import { X, User, CheckCircle2, Phone, Mail, MapPin, LogOut } from 'lucide-react';

export interface CustomerProfile {
  fullName: string;
  phone: string;
  email?: string;
  county?: string;
  address?: string;
}

interface AccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: CustomerProfile | null;
  onSaveProfile: (profile: CustomerProfile) => void;
  onSignOut: () => void;
}

export const AccountModal: React.FC<AccountModalProps> = ({
  isOpen,
  onClose,
  profile,
  onSaveProfile,
  onSignOut,
}) => {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [county, setCounty] = useState('Nairobi');
  const [address, setAddress] = useState('');
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    if (profile) {
      setFullName(profile.fullName || '');
      setPhone(profile.phone || '');
      setEmail(profile.email || '');
      setCounty(profile.county || 'Nairobi');
      setAddress(profile.address || '');
    } else {
      setFullName('');
      setPhone('');
      setEmail('');
      setCounty('Nairobi');
      setAddress('');
    }
  }, [profile, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !phone.trim()) {
      alert('Please enter your Name and Mobile Number.');
      return;
    }

    onSaveProfile({
      fullName: fullName.trim(),
      phone: phone.trim(),
      email: email.trim(),
      county,
      address: address.trim(),
    });

    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 1200);
  };

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6"
      onClick={onClose}
    >
      <div 
        className="relative bg-white w-full max-w-md rounded-3xl shadow-2xl p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
            <User className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-black text-slate-900">
              {profile ? 'Customer Profile' : 'Sign In / Account'}
            </h2>
            <p className="text-xs text-slate-500">
              Save your details for instant pre-fill at checkout.
            </p>
          </div>
        </div>

        {savedSuccess ? (
          <div className="py-8 text-center bg-emerald-50 rounded-2xl border border-emerald-200">
            <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto mb-2" />
            <h3 className="font-bold text-sm text-slate-900">Details Saved!</h3>
            <p className="text-xs text-slate-600 mt-1">Your details will be used at checkout.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Full Name *
              </label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Full Name"
                className="w-full text-xs p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-amber-500 focus:outline-none bg-slate-50/50"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Mobile Number *
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="07... or +254..."
                  className="w-full text-xs p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-amber-500 focus:outline-none bg-slate-50/50"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email Address"
                  className="w-full text-xs p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-amber-500 focus:outline-none bg-slate-50/50"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                County
              </label>
              <select
                value={county}
                onChange={(e) => setCounty(e.target.value)}
                className="w-full text-xs p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-amber-500 focus:outline-none bg-slate-50/50 font-semibold"
              >
                <option value="Nairobi">Nairobi</option>
                <option value="Kiambu">Kiambu</option>
                <option value="Machakos">Machakos</option>
                <option value="Kajiado">Kajiado</option>
                <option value="Mombasa">Mombasa</option>
                <option value="Nakuru">Nakuru</option>
                <option value="Kisumu">Kisumu</option>
                <option value="Other County">Other County (Kenya)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Default Delivery Address
              </label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Street address, building, estate"
                className="w-full text-xs p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-amber-500 focus:outline-none bg-slate-50/50"
              />
            </div>

            <div className="pt-2 flex items-center gap-3">
              <button
                type="submit"
                className="flex-1 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow active:scale-95 transition-all"
              >
                {profile ? 'Update Details' : 'Save Details / Sign In'}
              </button>

              {profile && (
                <button
                  type="button"
                  onClick={onSignOut}
                  className="px-4 py-3.5 rounded-xl border border-rose-200 text-rose-600 hover:bg-rose-50 font-bold text-xs flex items-center gap-1.5 transition-colors"
                  title="Sign out on this device"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Sign Out</span>
                </button>
              )}
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
