"use client";

import type { CartTotals } from '@/stores/cart';
import { tl } from '@/lib/format';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface OrderSummaryProps {
  totals: CartTotals;
  className?: string;
}

export function OrderSummary({ totals, className }: OrderSummaryProps) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="text-lg">Sipariş Özeti</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex justify-between text-sm">
          <span>Ara Toplam:</span>
          <span>{tl(totals.subtotal)}</span>
        </div>
        
        <div className="flex justify-between text-sm">
          <span>Kargo:</span>
          <span className={totals.shipping === 0 ? "text-green-600 font-medium" : ""}>
            {totals.shipping === 0 ? 'Ücretsiz' : tl(totals.shipping)}
          </span>
        </div>
        
        {totals.discount > 0 && (
          <div className="flex justify-between text-sm text-red-600">
            <span>İndirim:</span>
            <span>-{tl(totals.discount)}</span>
          </div>
        )}
        
        <hr className="my-2" />
        
        <div className="flex justify-between text-lg font-bold">
          <span>TOPLAM:</span>
          <span className="text-red-600">{tl(totals.total)}</span>
        </div>
        
        {totals.subtotal > 0 && totals.subtotal < 300 && (
          <div className="text-xs text-muted-foreground mt-3 p-2 bg-yellow-50 rounded-md border border-yellow-200">
            <span className="text-amber-600 font-medium">
              {tl(300 - totals.subtotal)} daha ekleyin, kargo ücretsiz olsun!
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}