'use client';

import React from 'react';
import { Plus, Trash2 } from 'lucide-react';
import type { PRItem } from '../types';
import { UNIT_OPTIONS } from '../constants';

interface PRItemsTableProps {
  items: PRItem[];
  editable?: boolean;
  onChange?: (items: PRItem[]) => void;
  currency?: string;
}

function formatCurrency(amount: number, currency = 'USD') {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(amount);
}

function emptyItem(): PRItem {
  return {
    id: Math.random().toString(36).slice(2),
    name: '',
    quantity: 1,
    unit: 'PCS',
    estimatedUnitPrice: 0,
    totalPrice: 0,
  };
}

export function PRItemsTable({ items, editable = false, onChange, currency = 'USD' }: PRItemsTableProps) {
  const total = items.reduce((s, i) => s + (i.totalPrice || 0), 0);

  function handleAdd() {
    onChange?.([...items, emptyItem()]);
  }

  function handleRemove(id: string) {
    onChange?.(items.filter((i) => i.id !== id));
  }

  function handleChange(id: string, field: keyof PRItem, value: string | number) {
    const updated = items.map((item) => {
      if (item.id !== id) return item;
      const next = { ...item, [field]: value };
      if (field === 'quantity' || field === 'estimatedUnitPrice') {
        next.totalPrice = Number(next.quantity) * Number(next.estimatedUnitPrice);
      }
      return next;
    });
    onChange?.(updated);
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-white/10">
      <table className="w-full min-w-[600px] text-sm">
        <thead>
          <tr className="border-b border-white/10 bg-[#0F172A]">
            <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-[#6B7280]">#</th>
            <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-[#6B7280]">Item Name</th>
            <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-[#6B7280]">Qty</th>
            <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-[#6B7280]">Unit</th>
            <th className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wider text-[#6B7280]">Unit Price</th>
            <th className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wider text-[#6B7280]">Total</th>
            {editable && <th className="px-4 py-3" />}
          </tr>
        </thead>
        <tbody>
          {items.length === 0 ? (
            <tr>
              <td colSpan={editable ? 7 : 6} className="px-4 py-8 text-center text-[#6B7280]">
                No items added yet.
              </td>
            </tr>
          ) : (
            items.map((item, idx) => (
              <tr key={item.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                <td className="px-4 py-3 text-[#6B7280]">{idx + 1}</td>
                <td className="px-4 py-3">
                  {editable ? (
                    <input
                      value={item.name}
                      onChange={(e) => handleChange(item.id, 'name', e.target.value)}
                      placeholder="Item name..."
                      className="w-full rounded-md border border-white/10 bg-[#0F172A] px-2 py-1 text-sm text-[#F9FAFB] placeholder-[#6B7280] focus:border-[#3B82F6] focus:outline-none"
                    />
                  ) : (
                    <span className="text-[#F9FAFB]">{item.name}</span>
                  )}
                </td>
                <td className="px-4 py-3">
                  {editable ? (
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => handleChange(item.id, 'quantity', Number(e.target.value))}
                      className="w-20 rounded-md border border-white/10 bg-[#0F172A] px-2 py-1 text-sm text-[#F9FAFB] focus:border-[#3B82F6] focus:outline-none"
                    />
                  ) : (
                    <span className="text-[#F9FAFB]">{item.quantity}</span>
                  )}
                </td>
                <td className="px-4 py-3">
                  {editable ? (
                    <select
                      value={item.unit}
                      onChange={(e) => handleChange(item.id, 'unit', e.target.value)}
                      className="rounded-md border border-white/10 bg-[#0F172A] px-2 py-1 text-sm text-[#F9FAFB] focus:border-[#3B82F6] focus:outline-none"
                    >
                      {UNIT_OPTIONS.map((u) => (
                        <option key={u.value} value={u.value}>{u.value}</option>
                      ))}
                    </select>
                  ) : (
                    <span className="text-[#9CA3AF]">{item.unit}</span>
                  )}
                </td>
                <td className="px-4 py-3 text-right">
                  {editable ? (
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={item.estimatedUnitPrice}
                      onChange={(e) => handleChange(item.id, 'estimatedUnitPrice', Number(e.target.value))}
                      className="w-28 rounded-md border border-white/10 bg-[#0F172A] px-2 py-1 text-right text-sm text-[#F9FAFB] focus:border-[#3B82F6] focus:outline-none"
                    />
                  ) : (
                    <span className="text-[#F9FAFB]">{formatCurrency(item.estimatedUnitPrice, currency)}</span>
                  )}
                </td>
                <td className="px-4 py-3 text-right font-medium text-[#3B82F6]">
                  {formatCurrency(item.totalPrice, currency)}
                </td>
                {editable && (
                  <td className="px-4 py-3">
                    <button
                      onClick={() => handleRemove(item.id)}
                      className="rounded p-1 text-[#6B7280] hover:text-[#EF4444] transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </td>
                )}
              </tr>
            ))
          )}
        </tbody>
        <tfoot>
          <tr className="border-t border-white/10 bg-[#0F172A]">
            {editable ? (
              <td colSpan={7} className="px-4 py-3">
                <div className="flex items-center justify-between">
                  <button
                    onClick={handleAdd}
                    className="flex items-center gap-1.5 rounded-lg border border-white/10 px-3 py-1.5 text-xs text-[#3B82F6] hover:bg-[#3B82F6]/10 transition-colors"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    Add Item
                  </button>
                  <span className="text-sm font-semibold text-[#F9FAFB]">
                    Total: <span className="text-[#3B82F6]">{formatCurrency(total, currency)}</span>
                  </span>
                </div>
              </td>
            ) : (
              <>
                <td colSpan={5} className="px-4 py-3 text-right text-sm font-medium text-[#9CA3AF]">
                  Total Estimated Budget
                </td>
                <td className="px-4 py-3 text-right text-sm font-semibold text-[#3B82F6]">
                  {formatCurrency(total, currency)}
                </td>
              </>
            )}
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
