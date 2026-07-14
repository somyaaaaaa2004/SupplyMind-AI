import { useMemo, useState } from 'react';
import { Download, MessageSquare, Paperclip, Plus, Search } from 'lucide-react';

import { PageHeader } from '@/components/common/PageHeader';
import { StatusBadge } from '@/components/common/StatusBadge';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import {
  formatCurrency,
  PR_STATUS_LABEL,
  PURCHASE_REQUESTS,
  type PRStatus,
  type PurchaseRequest,
} from '@/lib/mock-data';

const STATUS_TONE: Record<PRStatus, 'neutral' | 'success' | 'warning' | 'danger' | 'info'> = {
  draft: 'neutral',
  pending_approval: 'warning',
  approved: 'success',
  rejected: 'danger',
  converted: 'info',
};

const PRIORITY_TONE: Record<PurchaseRequest['priority'], 'neutral' | 'success' | 'warning' | 'danger' | 'info'> = {
  low: 'neutral',
  medium: 'info',
  high: 'warning',
  urgent: 'danger',
};

export default function PurchaseRequests() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<PRStatus | 'all'>('all');
  const [selected, setSelected] = useState<PurchaseRequest | null>(null);
  const [newOpen, setNewOpen] = useState(false);

  const filtered = useMemo(() => {
    return PURCHASE_REQUESTS.filter((pr) => {
      const matchesStatus = statusFilter === 'all' || pr.status === statusFilter;
      const matchesSearch =
        !search ||
        pr.title.toLowerCase().includes(search.toLowerCase()) ||
        pr.id.toLowerCase().includes(search.toLowerCase()) ||
        pr.requester.toLowerCase().includes(search.toLowerCase());
      return matchesStatus && matchesSearch;
    });
  }, [search, statusFilter]);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Purchase Requests"
        description="Track requests from submission through approval and conversion to a PO."
        actions={
          <Dialog open={newOpen} onOpenChange={setNewOpen}>
            <DialogTrigger asChild>
              <Button data-testid="button-new-pr">
                <Plus className="size-4" />
                New Request
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-lg">
              <DialogHeader>
                <DialogTitle>New Purchase Request</DialogTitle>
                <DialogDescription>
                  Submit a request for approval. This demo doesn't persist new requests yet.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <Label htmlFor="pr-title">Title</Label>
                  <Input id="pr-title" placeholder="e.g. Replacement conveyor motors" data-testid="input-pr-title" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <Label htmlFor="pr-category">Category</Label>
                    <Input id="pr-category" placeholder="Raw Materials" data-testid="input-pr-category" />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="pr-amount">Estimated amount</Label>
                    <Input id="pr-amount" type="number" placeholder="0.00" data-testid="input-pr-amount" />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="pr-notes">Justification</Label>
                  <Textarea id="pr-notes" placeholder="Why is this needed?" data-testid="input-pr-notes" />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setNewOpen(false)} data-testid="button-cancel-pr">
                  Cancel
                </Button>
                <Button
                  onClick={() => {
                    setNewOpen(false);
                    toast.success('Purchase request submitted for approval');
                  }}
                  data-testid="button-submit-pr"
                >
                  Submit for approval
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        }
      />

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1 sm:max-w-xs">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search requests..."
            className="pl-9"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            data-testid="input-search-pr"
          />
        </div>
        <Select value={statusFilter} onValueChange={(v) => setStatusFilter(v as PRStatus | 'all')}>
          <SelectTrigger className="sm:w-52" data-testid="select-status-filter">
            <SelectValue placeholder="All statuses" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All statuses</SelectItem>
            {Object.entries(PR_STATUS_LABEL).map(([value, label]) => (
              <SelectItem key={value} value={value}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button variant="outline" onClick={() => toast.info('Exporting requests as CSV')} data-testid="button-export-pr">
          <Download className="size-4" />
          Export
        </Button>
      </div>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Requester</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead>Needed by</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((pr) => (
              <TableRow
                key={pr.id}
                className="cursor-pointer"
                onClick={() => setSelected(pr)}
                data-testid={`row-pr-${pr.id}`}
              >
                <TableCell className="font-mono text-xs text-muted-foreground">{pr.id}</TableCell>
                <TableCell className="max-w-64 truncate font-medium">{pr.title}</TableCell>
                <TableCell>{pr.requester}</TableCell>
                <TableCell className="text-muted-foreground">{pr.category}</TableCell>
                <TableCell>
                  <StatusBadge label={pr.priority} tone={PRIORITY_TONE[pr.priority]} />
                </TableCell>
                <TableCell>
                  <StatusBadge label={PR_STATUS_LABEL[pr.status]} tone={STATUS_TONE[pr.status]} />
                </TableCell>
                <TableCell className="text-right font-medium">{formatCurrency(pr.amount, pr.currency)}</TableCell>
                <TableCell className="text-muted-foreground">{pr.neededBy}</TableCell>
              </TableRow>
            ))}
            {filtered.length === 0 && (
              <TableRow>
                <TableCell colSpan={8} className="py-10 text-center text-sm text-muted-foreground">
                  No purchase requests match your filters.
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
                  <StatusBadge label={PR_STATUS_LABEL[selected.status]} tone={STATUS_TONE[selected.status]} />
                </SheetTitle>
                <SheetDescription>{selected.title}</SheetDescription>
              </SheetHeader>
              <div className="space-y-6 px-4 pb-6">
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="text-xs text-muted-foreground">Requester</p>
                    <p className="font-medium">{selected.requester}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Department</p>
                    <p className="font-medium">{selected.department}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Vendor</p>
                    <p className="font-medium">{selected.vendor ?? '—'}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Needed by</p>
                    <p className="font-medium">{selected.neededBy}</p>
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
                      <span>{formatCurrency(selected.amount, selected.currency)}</span>
                    </div>
                  </div>
                </div>

                {selected.approvalTimeline.length > 0 && (
                  <div>
                    <p className="mb-2 text-sm font-medium">Approval timeline</p>
                    <div className="space-y-3">
                      {selected.approvalTimeline.map((step, i) => (
                        <div key={i} className="flex items-start gap-3">
                          <span
                            className={`mt-1 size-2 shrink-0 rounded-full ${
                              step.status === 'approved'
                                ? 'bg-success'
                                : step.status === 'rejected'
                                  ? 'bg-destructive'
                                  : 'bg-warning'
                            }`}
                          />
                          <div>
                            <p className="text-sm">
                              <span className="font-medium">{step.step}</span> — {step.approver}
                            </p>
                            <p className="text-xs text-muted-foreground">{step.time ?? 'Awaiting action'}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {selected.attachments.length > 0 && (
                  <div>
                    <p className="mb-2 flex items-center gap-1.5 text-sm font-medium">
                      <Paperclip className="size-3.5" /> Attachments
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {selected.attachments.map((file) => (
                        <Badge key={file} variant="outline" className="font-normal">
                          {file}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <p className="mb-2 flex items-center gap-1.5 text-sm font-medium">
                    <MessageSquare className="size-3.5" /> Comments
                  </p>
                  <div className="space-y-3">
                    {selected.comments.map((c) => (
                      <div key={c.id} className="rounded-lg bg-muted/50 p-3">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium">{c.author}</p>
                          <p className="text-xs text-muted-foreground">{c.time}</p>
                        </div>
                        <p className="mt-1 text-sm text-muted-foreground">{c.text}</p>
                      </div>
                    ))}
                    {selected.comments.length === 0 && (
                      <p className="text-sm text-muted-foreground">No comments yet.</p>
                    )}
                  </div>
                  <div className="mt-3 flex gap-2">
                    <Input placeholder="Add a comment..." data-testid="input-add-comment" />
                    <Button
                      variant="outline"
                      onClick={() => toast.success('Comment added')}
                      data-testid="button-add-comment"
                    >
                      Post
                    </Button>
                  </div>
                </div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
