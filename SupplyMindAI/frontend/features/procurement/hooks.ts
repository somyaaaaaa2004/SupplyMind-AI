/**
 * Procurement TanStack Query hooks.
 */

'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import * as api from './api';
import { PROCUREMENT_QUERY_KEYS } from './constants';
import type {
  PRFilters,
  POFilters,
  VendorFilters,
  RFQFilters,
  PaginationState,
  PurchaseRequest,
  PurchaseOrder,
  Vendor,
  RFQ,
} from './types';

// ─── Purchase Requests ────────────────────────────────────────────────────────

export function usePurchaseRequests(
  filters: PRFilters,
  pagination: PaginationState,
) {
  return useQuery({
    queryKey: [PROCUREMENT_QUERY_KEYS.PR_LIST, filters, pagination],
    queryFn: () => api.fetchPurchaseRequests(filters, pagination),
  });
}

export function usePurchaseRequest(id: string | null) {
  return useQuery({
    queryKey: [PROCUREMENT_QUERY_KEYS.PR_DETAIL, id],
    queryFn: () => api.fetchPurchaseRequest(id!),
    enabled: !!id,
  });
}

export function useCreatePR() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: Partial<PurchaseRequest>) =>
      api.createPurchaseRequest(payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: [PROCUREMENT_QUERY_KEYS.PR_LIST] });
      toast.success('Purchase request created successfully');
    },
    onError: (err: Error) => {
      toast.error(err.message || 'Failed to create purchase request');
    },
  });
}

export function useUpdatePR() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: Partial<PurchaseRequest> }) =>
      api.updatePurchaseRequest(id, payload),
    onSuccess: (_, { id }) => {
      qc.invalidateQueries({ queryKey: [PROCUREMENT_QUERY_KEYS.PR_LIST] });
      qc.invalidateQueries({ queryKey: [PROCUREMENT_QUERY_KEYS.PR_DETAIL, id] });
      toast.success('Purchase request updated');
    },
    onError: (err: Error) => {
      toast.error(err.message || 'Failed to update purchase request');
    },
  });
}

export function useSubmitPR() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => api.submitPurchaseRequest(id),
    onSuccess: (_, id) => {
      qc.invalidateQueries({ queryKey: [PROCUREMENT_QUERY_KEYS.PR_LIST] });
      qc.invalidateQueries({ queryKey: [PROCUREMENT_QUERY_KEYS.PR_DETAIL, id] });
      toast.success('Purchase request submitted for approval');
    },
    onError: (err: Error) => {
      toast.error(err.message || 'Failed to submit purchase request');
    },
  });
}

export function useApprovePR() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, comment }: { id: string; comment?: string }) =>
      api.approvePurchaseRequest(id, comment),
    onSuccess: (_, { id }) => {
      qc.invalidateQueries({ queryKey: [PROCUREMENT_QUERY_KEYS.PR_LIST] });
      qc.invalidateQueries({ queryKey: [PROCUREMENT_QUERY_KEYS.PR_DETAIL, id] });
      toast.success('Purchase request approved');
    },
    onError: (err: Error) => {
      toast.error(err.message || 'Failed to approve purchase request');
    },
  });
}

export function useRejectPR() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, comment }: { id: string; comment: string }) =>
      api.rejectPurchaseRequest(id, comment),
    onSuccess: (_, { id }) => {
      qc.invalidateQueries({ queryKey: [PROCUREMENT_QUERY_KEYS.PR_LIST] });
      qc.invalidateQueries({ queryKey: [PROCUREMENT_QUERY_KEYS.PR_DETAIL, id] });
      toast.success('Purchase request rejected');
    },
    onError: (err: Error) => {
      toast.error(err.message || 'Failed to reject purchase request');
    },
  });
}

export function useCancelPR() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, comment }: { id: string; comment?: string }) =>
      api.cancelPurchaseRequest(id, comment),
    onSuccess: (_, { id }) => {
      qc.invalidateQueries({ queryKey: [PROCUREMENT_QUERY_KEYS.PR_LIST] });
      qc.invalidateQueries({ queryKey: [PROCUREMENT_QUERY_KEYS.PR_DETAIL, id] });
      toast.success('Purchase request cancelled');
    },
    onError: (err: Error) => {
      toast.error(err.message || 'Failed to cancel purchase request');
    },
  });
}

export function useAddComment() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, content }: { id: string; content: string }) =>
      api.addPRComment(id, content),
    onSuccess: (_, { id }) => {
      qc.invalidateQueries({ queryKey: [PROCUREMENT_QUERY_KEYS.PR_DETAIL, id] });
      toast.success('Comment added');
    },
    onError: (err: Error) => {
      toast.error(err.message || 'Failed to add comment');
    },
  });
}

export function useAddAttachment() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, formData }: { id: string; formData: FormData }) =>
      api.addPRAttachment(id, formData),
    onSuccess: (_, { id }) => {
      qc.invalidateQueries({ queryKey: [PROCUREMENT_QUERY_KEYS.PR_DETAIL, id] });
      toast.success('Attachment uploaded');
    },
    onError: (err: Error) => {
      toast.error(err.message || 'Failed to upload attachment');
    },
  });
}

// ─── Purchase Orders ──────────────────────────────────────────────────────────

export function usePurchaseOrders(
  filters: POFilters,
  pagination: PaginationState,
) {
  return useQuery({
    queryKey: [PROCUREMENT_QUERY_KEYS.PO_LIST, filters, pagination],
    queryFn: () => api.fetchPurchaseOrders(filters, pagination),
  });
}

export function usePurchaseOrder(id: string | null) {
  return useQuery({
    queryKey: [PROCUREMENT_QUERY_KEYS.PO_DETAIL, id],
    queryFn: () => api.fetchPurchaseOrder(id!),
    enabled: !!id,
  });
}

export function useCreatePO() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: Partial<PurchaseOrder>) =>
      api.createPurchaseOrder(payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: [PROCUREMENT_QUERY_KEYS.PO_LIST] });
      toast.success('Purchase order created successfully');
    },
    onError: (err: Error) => {
      toast.error(err.message || 'Failed to create purchase order');
    },
  });
}

export function useUpdatePO() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: Partial<PurchaseOrder> }) =>
      api.updatePurchaseOrder(id, payload),
    onSuccess: (_, { id }) => {
      qc.invalidateQueries({ queryKey: [PROCUREMENT_QUERY_KEYS.PO_LIST] });
      qc.invalidateQueries({ queryKey: [PROCUREMENT_QUERY_KEYS.PO_DETAIL, id] });
      toast.success('Purchase order updated');
    },
    onError: (err: Error) => {
      toast.error(err.message || 'Failed to update purchase order');
    },
  });
}

export function usePatchPOStatus() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) =>
      api.patchPurchaseOrderStatus(id, status),
    onSuccess: (_, { id }) => {
      qc.invalidateQueries({ queryKey: [PROCUREMENT_QUERY_KEYS.PO_LIST] });
      qc.invalidateQueries({ queryKey: [PROCUREMENT_QUERY_KEYS.PO_DETAIL, id] });
      toast.success('Purchase order status updated');
    },
    onError: (err: Error) => {
      toast.error(err.message || 'Failed to update status');
    },
  });
}

// ─── Vendors ──────────────────────────────────────────────────────────────────

export function useVendors(
  filters: VendorFilters,
  pagination: PaginationState,
) {
  return useQuery({
    queryKey: [PROCUREMENT_QUERY_KEYS.VENDOR_LIST, filters, pagination],
    queryFn: () => api.fetchVendors(filters, pagination),
  });
}

export function useVendor(id: string | null) {
  return useQuery({
    queryKey: [PROCUREMENT_QUERY_KEYS.VENDOR_DETAIL, id],
    queryFn: () => api.fetchVendor(id!),
    enabled: !!id,
  });
}

export function useCreateVendor() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: Partial<Vendor>) => api.createVendor(payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: [PROCUREMENT_QUERY_KEYS.VENDOR_LIST] });
      toast.success('Vendor created successfully');
    },
    onError: (err: Error) => {
      toast.error(err.message || 'Failed to create vendor');
    },
  });
}

export function useUpdateVendor() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: Partial<Vendor> }) =>
      api.updateVendor(id, payload),
    onSuccess: (_, { id }) => {
      qc.invalidateQueries({ queryKey: [PROCUREMENT_QUERY_KEYS.VENDOR_LIST] });
      qc.invalidateQueries({ queryKey: [PROCUREMENT_QUERY_KEYS.VENDOR_DETAIL, id] });
      toast.success('Vendor updated');
    },
    onError: (err: Error) => {
      toast.error(err.message || 'Failed to update vendor');
    },
  });
}

// ─── RFQ ──────────────────────────────────────────────────────────────────────

export function useRFQList(filters: RFQFilters, pagination: PaginationState) {
  return useQuery({
    queryKey: [PROCUREMENT_QUERY_KEYS.RFQ_LIST, filters, pagination],
    queryFn: () => api.fetchRFQList(filters, pagination),
  });
}

export function useRFQ(id: string | null) {
  return useQuery({
    queryKey: [PROCUREMENT_QUERY_KEYS.RFQ_DETAIL, id],
    queryFn: () => api.fetchRFQ(id!),
    enabled: !!id,
  });
}

export function useCreateRFQ() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: Partial<RFQ>) => api.createRFQ(payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: [PROCUREMENT_QUERY_KEYS.RFQ_LIST] });
      toast.success('RFQ created successfully');
    },
    onError: (err: Error) => {
      toast.error(err.message || 'Failed to create RFQ');
    },
  });
}

export function useSendRFQ() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => api.sendRFQ(id),
    onSuccess: (_, id) => {
      qc.invalidateQueries({ queryKey: [PROCUREMENT_QUERY_KEYS.RFQ_LIST] });
      qc.invalidateQueries({ queryKey: [PROCUREMENT_QUERY_KEYS.RFQ_DETAIL, id] });
      toast.success('RFQ sent to vendors');
    },
    onError: (err: Error) => {
      toast.error(err.message || 'Failed to send RFQ');
    },
  });
}

export function useAwardRFQ() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, vendorId }: { id: string; vendorId: string }) =>
      api.awardRFQ(id, vendorId),
    onSuccess: (_, { id }) => {
      qc.invalidateQueries({ queryKey: [PROCUREMENT_QUERY_KEYS.RFQ_LIST] });
      qc.invalidateQueries({ queryKey: [PROCUREMENT_QUERY_KEYS.RFQ_DETAIL, id] });
      toast.success('RFQ awarded successfully');
    },
    onError: (err: Error) => {
      toast.error(err.message || 'Failed to award RFQ');
    },
  });
}
