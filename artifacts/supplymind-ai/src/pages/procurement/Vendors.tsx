import { useMemo, useState } from 'react';
import { Mail, MapPin, Plus, Search, Star } from 'lucide-react';

import { PageHeader } from '@/components/common/PageHeader';
import { StatusBadge } from '@/components/common/StatusBadge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { toast } from 'sonner';
import { formatCurrency, VENDORS, type Vendor, type VendorStatus } from '@/lib/mock-data';

const STATUS_TONE: Record<VendorStatus, 'neutral' | 'success' | 'warning' | 'danger'> = {
  active: 'success',
  pending_review: 'warning',
  suspended: 'danger',
};

const STATUS_LABEL: Record<VendorStatus, string> = {
  active: 'Active',
  pending_review: 'Pending Review',
  suspended: 'Suspended',
};

export default function Vendors() {
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<Vendor | null>(null);

  const filtered = useMemo(() => {
    return VENDORS.filter(
      (v) =>
        !search ||
        v.name.toLowerCase().includes(search.toLowerCase()) ||
        v.category.toLowerCase().includes(search.toLowerCase()),
    );
  }, [search]);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Vendors"
        description="Manage supplier relationships, performance, and risk."
        actions={
          <Button onClick={() => toast.info('Vendor onboarding flow coming soon')} data-testid="button-add-vendor">
            <Plus className="size-4" />
            Add Vendor
          </Button>
        }
      />

      <div className="relative max-w-xs">
        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search vendors..."
          className="pl-9"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          data-testid="input-search-vendor"
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {filtered.map((vendor) => (
          <Card
            key={vendor.id}
            className="cursor-pointer p-5 hover-elevate"
            onClick={() => setSelected(vendor)}
            data-testid={`card-vendor-${vendor.id}`}
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-3">
                <Avatar className="size-10">
                  <AvatarFallback className="bg-primary/15 font-semibold text-primary">
                    {vendor.name.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium leading-tight">{vendor.name}</p>
                  <p className="text-xs text-muted-foreground">{vendor.category}</p>
                </div>
              </div>
              <StatusBadge label={STATUS_LABEL[vendor.status]} tone={STATUS_TONE[vendor.status]} />
            </div>
            <div className="mt-4 flex items-center gap-1 text-sm">
              <Star className="size-3.5 fill-warning text-warning" />
              <span className="font-medium">{vendor.rating}</span>
              <span className="text-xs text-muted-foreground">/ 5.0</span>
            </div>
            <div className="mt-3">
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>On-time delivery</span>
                <span className="font-medium text-foreground">{vendor.onTimeRate}%</span>
              </div>
              <Progress value={vendor.onTimeRate} className="mt-1.5 h-1.5" />
            </div>
            <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <MapPin className="size-3" /> {vendor.location}
              </span>
              <span className="font-medium text-foreground">{formatCurrency(vendor.ytdSpend)} YTD</span>
            </div>
          </Card>
        ))}
      </div>

      <Sheet open={!!selected} onOpenChange={(open) => !open && setSelected(null)}>
        <SheetContent className="w-full overflow-y-auto sm:max-w-lg">
          {selected && (
            <>
              <SheetHeader>
                <SheetTitle className="flex items-center gap-2">
                  {selected.name}
                  <StatusBadge label={STATUS_LABEL[selected.status]} tone={STATUS_TONE[selected.status]} />
                </SheetTitle>
                <SheetDescription>{selected.category}</SheetDescription>
              </SheetHeader>
              <div className="space-y-6 px-4 pb-6">
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="text-xs text-muted-foreground">Rating</p>
                    <p className="flex items-center gap-1 font-medium">
                      <Star className="size-3.5 fill-warning text-warning" /> {selected.rating}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">On-time rate</p>
                    <p className="font-medium">{selected.onTimeRate}%</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">YTD spend</p>
                    <p className="font-medium">{formatCurrency(selected.ytdSpend)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Location</p>
                    <p className="font-medium">{selected.location}</p>
                  </div>
                </div>
                <div className="rounded-lg border border-border p-3">
                  <p className="text-xs text-muted-foreground">Primary contact</p>
                  <p className="mt-1 font-medium">{selected.contact}</p>
                  <p className="mt-0.5 flex items-center gap-1.5 text-sm text-muted-foreground">
                    <Mail className="size-3.5" /> {selected.email}
                  </p>
                </div>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => toast.success('RFQ draft started for ' + selected.name)}
                  data-testid="button-send-rfq"
                >
                  Send RFQ
                </Button>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
