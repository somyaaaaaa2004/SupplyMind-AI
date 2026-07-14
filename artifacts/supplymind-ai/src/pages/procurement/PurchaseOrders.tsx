import { useMemo, useState } from 'react';
import { Download, Search } from 'lucide-react';

import { PageHeader } from '@/components/common/PageHeader';
import { StatusBadge } from '@/components/common/StatusBadge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { toast } from 'sonner';
import {
  formatCurrency,
  PO_STATUS_LABEL,
  PURCHASE_ORDERS,
  type POStatus,
  type PurchaseOrder,
} from '@/lib/mock-data';

const STATUS_TONE: Record<POStatus, 'neutral' | 'success' | 'warning' | 'danger' | 'info'> = {
  issued: 'info',
  in_transit: 'warning',
  delivered: 'success',
  closed: 'neutral',
  disputed: 'danger',
};

export default function PurchaseOrders() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<POStatus | 'all'>('all');
  const [selected, setSelected] = useState<PurchaseOrder | null>(null);

  const filtered = useMemo(() => {
    return PURCHASE_ORDERS.filter((po) => {
      const matchesStatus = statusFilter === 'all' || po.status === statusFilter;
      const matchesSearch =
        !search ||
        po.vendor.toLowerCase().includes(search.toLowerCase()) ||
        po.id.toLowerCase().includes(search.toLowerCase());
      return matchesStatus && matchesSearch;
    });
  }, [search, statusFilter]);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Purchase Orders"
        description="Monitor issued orders through delivery and closure."
      />

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1 sm:max-w-xs">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search orders..."
            className="pl-9"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            data-testid="input-search-po"
          />
        </div>
        <Select value={statusFilter} onValueChange={(v) => setStatusFilter(v as POStatus | 'all')}>
          <SelectTrigger className="sm:w-52" data-testid="select-po-status-filter">
            <SelectValue placeholder="All statuses" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All statuses</SelectItem>
            {Object.entries(PO_STATUS_LABEL).map(([value, label]) => (
              <SelectItem key={value} value={value}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button variant="outline" onClick={() => toast.info('Exporting orders as CSV')} data-testid="button-export-po">
          <Download className="size-4" />
          Export
        </Button>
      </div>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>PO ID</TableHead>
              <TableHead>Linked PR</TableHead>
              <TableHead>Vendor</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead>Issued</TableHead>
              <TableHead>Expected delivery</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((po) => (
              <TableRow
                key={po.id}
                className="cursor-pointer"
                onClick={() => setSelected(po)}
                data-testid={`row-po-${po.id}`}
              >
                <TableCell className="font-mono text-xs text-muted-foreground">{po.id}</TableCell>
                <TableCell className="font-mono text-xs text-muted-foreground">{po.prId ?? '—'}</TableCell>
                <TableCell className="font-medium">{po.vendor}</TableCell>
                <TableCell>
                  <StatusBadge label={PO_STATUS_LABEL[po.status]} tone={STATUS_TONE[po.status]} />
                </TableCell>
                <TableCell className="text-right font-medium">{formatCurrency(po.amount)}</TableCell>
                <TableCell className="text-muted-foreground">{po.issuedAt}</TableCell>
                <TableCell className="text-muted-foreground">{po.expectedDelivery}</TableCell>
              </TableRow>
            ))}
            {filtered.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} className="py-10 text-center text-sm text-muted-foreground">
                  No purchase orders match your filters.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Card>

      <Sheet open={!!selected} onOpenChange={(open) => !open && setSelected(null)}>
        <SheetContent className="w-full overflow-y-auto sm:max-w-lg">
          {selected && (
            <>
              <SheetHeader>
                <SheetTitle className="flex items-center gap-2">
                  <span className="font-mono text-sm text-muted-foreground">{selected.id}</span>
                  <StatusBadge label={PO_STATUS_LABEL[selected.status]} tone={STATUS_TONE[selected.status]} />
                </SheetTitle>
                <SheetDescription>{selected.vendor}</SheetDescription>
              </SheetHeader>
              <div className="space-y-6 px-4 pb-6">
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="text-xs text-muted-foreground">Linked PR</p>
                    <p className="font-medium">{selected.prId ?? '—'}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Issued</p>
                    <p className="font-medium">{selected.issuedAt}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Expected delivery</p>
                    <p className="font-medium">{selected.expectedDelivery}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Total</p>
                    <p className="font-medium">{formatCurrency(selected.amount)}</p>
                  </div>
                </div>

                <div>
                  <p className="mb-2 text-sm font-medium">Line items</p>
                  <div className="space-y-2 rounded-lg border border-border p-3">
                    {selected.items.map((item, i) => (
                      <div key={i} className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">
                          {item.qty}× {item.name}
                        </span>
                        <span className="font-medium">{formatCurrency(item.qty * item.unitPrice)}</span>
                      </div>
                    ))}
                    <Separator />
                    <div className="flex items-center justify-between text-sm font-semibold">
                      <span>Total</span>
                      <span>{formatCurrency(selected.amount)}</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => toast.success('Order confirmation downloaded')}
                    data-testid="button-download-po"
                  >
                    <Download className="size-4" />
                    Download PDF
                  </Button>
                </div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
