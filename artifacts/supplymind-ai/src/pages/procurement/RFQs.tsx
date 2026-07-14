import { Plus } from 'lucide-react';

import { PageHeader } from '@/components/common/PageHeader';
import { StatusBadge } from '@/components/common/StatusBadge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { toast } from 'sonner';
import { formatCurrency, RFQS, type RFQ } from '@/lib/mock-data';

const STATUS_TONE: Record<RFQ['status'], 'neutral' | 'success' | 'warning' | 'info'> = {
  open: 'warning',
  closed: 'neutral',
  awarded: 'success',
};

const RESPONSE_TONE: Record<string, 'neutral' | 'success' | 'warning' | 'danger'> = {
  submitted: 'success',
  awaiting: 'warning',
  declined: 'danger',
};

export default function RFQs() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Requests for Quote"
        description="Compare vendor bids and award the best offer."
        actions={
          <Button onClick={() => toast.info('RFQ builder coming soon')} data-testid="button-new-rfq">
            <Plus className="size-4" />
            New RFQ
          </Button>
        }
      />

      <div className="space-y-4">
        {RFQS.map((rfq) => (
          <Card key={rfq.id} data-testid={`card-rfq-${rfq.id}`}>
            <CardHeader className="flex-row items-start justify-between space-y-0">
              <div>
                <CardTitle className="flex items-center gap-2 text-base">
                  <span className="font-mono text-sm text-muted-foreground">{rfq.id}</span>
                  {rfq.title}
                </CardTitle>
                <p className="mt-1 text-xs text-muted-foreground">
                  Issued by {rfq.issuedBy} on {rfq.issuedAt} · Deadline {rfq.deadline}
                </p>
              </div>
              <StatusBadge
                label={rfq.status.charAt(0).toUpperCase() + rfq.status.slice(1)}
                tone={STATUS_TONE[rfq.status]}
              />
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Vendor</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Quoted price</TableHead>
                    <TableHead className="text-right">Lead time</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rfq.responses.map((r) => (
                    <TableRow key={r.vendor}>
                      <TableCell className="font-medium">{r.vendor}</TableCell>
                      <TableCell>
                        <StatusBadge
                          label={r.status.charAt(0).toUpperCase() + r.status.slice(1)}
                          tone={RESPONSE_TONE[r.status]}
                        />
                      </TableCell>
                      <TableCell className="text-right">
                        {r.status === 'submitted' ? formatCurrency(r.price) : '—'}
                      </TableCell>
                      <TableCell className="text-right text-muted-foreground">
                        {r.status === 'submitted' ? `${r.leadTimeDays} days` : '—'}
                      </TableCell>
                      <TableCell className="text-right">
                        {r.status === 'submitted' && rfq.status !== 'awarded' ? (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => toast.success(`${r.vendor} awarded ${rfq.id}`)}
                            data-testid={`button-award-${rfq.id}-${r.vendor.replace(/\s+/g, '-')}`}
                          >
                            Award
                          </Button>
                        ) : (
                          <span className="text-xs text-muted-foreground">—</span>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
