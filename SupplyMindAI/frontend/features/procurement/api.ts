/**
 * Procurement API wrapper functions.
 * All calls go through the shared Axios instance.
 */

import { apiClient } from '@/services/api';
import type {
  PurchaseRequest,
  PurchaseOrder,
  Vendor,
  RFQ,
  PRFilters,
  POFilters,
  VendorFilters,
  RFQFilters,
  PaginationState,
  PaginatedResponse,
} from './types';

// ─── Helpers ──────────────────────────────────────────────────────────────────

function buildParams(
  filters: Record<string, unknown>,
  pagination: PaginationState,
) {
  const params: Record<string, unknown> = {
    page: pagination.page,
    limit: pagination.limit,
  };
  Object.entries(filters).forEach(([k, v]) => {
    if (v !== undefined && v !== null && v !== '') params[k] = v;
  });
  return params;
}

// ─── Purchase Requests ────────────────────────────────────────────────────────

export async function fetchPurchaseRequests(
  filters: PRFilters,
  pagination: PaginationState,
): Promise<PaginatedResponse<PurchaseRequest>> {
  const params = buildParams(filters as Record<string, unknown>, pagination);
  const res = await apiClient.get('/procurement/requests', { params });
  return res.data;
}

export async function fetchPurchaseRequest(id: string): Promise<PurchaseRequest> {
  const res = await apiClient.get(`/procurement/requests/${id}`);
  return res.data.data ?? res.data;
}

export async function createPurchaseRequest(
  payload: Partial<PurchaseRequest>,
): Promise<PurchaseRequest> {
  const res = await apiClient.post('/procurement/requests', payload);
  return res.data.data ?? res.data;
}

export async function updatePurchaseRequest(
  id: string,
  payload: Partial<PurchaseRequest>,
): Promise<PurchaseRequest> {
  const res = await apiClient.put(`/procurement/requests/${id}`, payload);
  return res.data.data ?? res.data;
}

export async function deletePurchaseRequest(id: string): Promise<void> {
  await apiClient.delete(`/procurement/requests/${id}`);
}

export async function submitPurchaseRequest(id: string): Promise<PurchaseRequest> {
  const res = await apiClient.post(`/procurement/requests/${id}/submit`);
  return res.data.data ?? res.data;
}

export async function approvePurchaseRequest(
  id: string,
  comment?: string,
): Promise<PurchaseRequest> {
  const res = await apiClient.post(`/procurement/requests/${id}/approve`, { comment });
  return res.data.data ?? res.data;
}

export async function rejectPurchaseRequest(
  id: string,
  comment: string,
): Promise<PurchaseRequest> {
  const res = await apiClient.post(`/procurement/requests/${id}/reject`, { comment });
  return res.data.data ?? res.data;
}

export async function cancelPurchaseRequest(
  id: string,
  comment?: string,
): Promise<PurchaseRequest> {
  const res = await apiClient.post(`/procurement/requests/${id}/cancel`, { comment });
  return res.data.data ?? res.data;
}

export async function addPRComment(
  id: string,
  content: string,
): Promise<PurchaseRequest> {
  const res = await apiClient.post(`/procurement/requests/${id}/comments`, { content });
  return res.data.data ?? res.data;
}

export async function addPRAttachment(
  id: string,
  formData: FormData,
): Promise<PurchaseRequest> {
  const res = await apiClient.post(
    `/procurement/requests/${id}/attachments`,
    formData,
    { headers: { 'Content-Type': 'multipart/form-data' } },
  );
  return res.data.data ?? res.data;
}

export async function exportPRPdf(id: string): Promise<Blob> {
  const res = await apiClient.get(`/procurement/requests/${id}/export/pdf`, {
    responseType: 'blob',
  });
  return res.data;
}

export async function exportPRExcel(id: string): Promise<Blob> {
  const res = await apiClient.get(`/procurement/requests/${id}/export/excel`, {
    responseType: 'blob',
  });
  return res.data;
}

// ─── Purchase Orders ──────────────────────────────────────────────────────────

export async function fetchPurchaseOrders(
  filters: POFilters,
  pagination: PaginationState,
): Promise<PaginatedResponse<PurchaseOrder>> {
  const params = buildParams(filters as Record<string, unknown>, pagination);
  const res = await apiClient.get('/procurement/orders', { params });
  return res.data;
}

export async function fetchPurchaseOrder(id: string): Promise<PurchaseOrder> {
  const res = await apiClient.get(`/procurement/orders/${id}`);
  return res.data.data ?? res.data;
}

export async function createPurchaseOrder(
  payload: Partial<PurchaseOrder>,
): Promise<PurchaseOrder> {
  const res = await apiClient.post('/procurement/orders', payload);
  return res.data.data ?? res.data;
}

export async function updatePurchaseOrder(
  id: string,
  payload: Partial<PurchaseOrder>,
): Promise<PurchaseOrder> {
  const res = await apiClient.put(`/procurement/orders/${id}`, payload);
  return res.data.data ?? res.data;
}

export async function patchPurchaseOrderStatus(
  id: string,
  status: string,
): Promise<PurchaseOrder> {
  const res = await apiClient.patch(`/procurement/orders/${id}/status`, { status });
  return res.data.data ?? res.data;
}

// ─── Vendors ──────────────────────────────────────────────────────────────────

export async function fetchVendors(
  filters: VendorFilters,
  pagination: PaginationState,
): Promise<PaginatedResponse<Vendor>> {
  const params = buildParams(filters as Record<string, unknown>, pagination);
  const res = await apiClient.get('/vendors', { params });
  return res.data;
}

export async function fetchVendor(id: string): Promise<Vendor> {
  const res = await apiClient.get(`/vendors/${id}`);
  return res.data.data ?? res.data;
}

export async function createVendor(payload: Partial<Vendor>): Promise<Vendor> {
  const res = await apiClient.post('/vendors', payload);
  return res.data.data ?? res.data;
}

export async function updateVendor(
  id: string,
  payload: Partial<Vendor>,
): Promise<Vendor> {
  const res = await apiClient.put(`/vendors/${id}`, payload);
  return res.data.data ?? res.data;
}

// ─── RFQ ──────────────────────────────────────────────────────────────────────

export async function fetchRFQList(
  filters: RFQFilters,
  pagination: PaginationState,
): Promise<PaginatedResponse<RFQ>> {
  const params = buildParams(filters as Record<string, unknown>, pagination);
  const res = await apiClient.get('/procurement/rfq', { params });
  return res.data;
}

export async function fetchRFQ(id: string): Promise<RFQ> {
  const res = await apiClient.get(`/procurement/rfq/${id}`);
  return res.data.data ?? res.data;
}

export async function createRFQ(payload: Partial<RFQ>): Promise<RFQ> {
  const res = await apiClient.post('/procurement/rfq', payload);
  return res.data.data ?? res.data;
}

export async function sendRFQ(id: string): Promise<RFQ> {
  const res = await apiClient.post(`/procurement/rfq/${id}/send`);
  return res.data.data ?? res.data;
}

export async function submitRFQQuote(
  id: string,
  quote: Record<string, unknown>,
): Promise<RFQ> {
  const res = await apiClient.post(`/procurement/rfq/${id}/quotes`, quote);
  return res.data.data ?? res.data;
}

export async function awardRFQ(id: string, vendorId: string): Promise<RFQ> {
  const res = await apiClient.post(`/procurement/rfq/${id}/award`, { vendorId });
  return res.data.data ?? res.data;
}
