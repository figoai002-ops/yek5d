'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Download, Eye, Trash2, RefreshCw, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { CopyButton } from '@/components/CopyButton';
import { DownloadHtmlButton } from '@/components/DownloadHtmlButton';
import { tl } from '@/lib/format';
import { getAllOrders, getEmails, clearAllOrders, clearAllEmails } from '@/lib/storage';
import type { Order, EmailRecord } from '@/types/ecom';

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [emails, setEmails] = useState<EmailRecord[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const loadData = () => {
    setIsLoading(true);
    const allOrders = getAllOrders();
    const allEmails = getEmails();
    setOrders(allOrders);
    setEmails(allEmails);
    setIsLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleClearAll = () => {
    if (confirm('Tüm siparişleri ve e-postaları silmek istediğinizden emin misiniz?')) {
      clearAllOrders();
      clearAllEmails();
      loadData();
    }
  };

  const getOrderEmail = (orderId: string) => {
    return emails.find(email => email.id === `order_${orderId}`);
  };

  const downloadAllOrdersJson = () => {
    const data = {
      orders,
      emails,
      exportDate: new Date().toISOString(),
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `siparisler-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (isLoading) {
    return (
      <main className="container mx-auto py-8 px-4">
        <div className="text-center">
          <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-4" />
          <p>Siparişler yükleniyor...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="container mx-auto py-8 px-4">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <Link 
            href="/"
            className="flex items-center text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Ana Sayfa
          </Link>
          <h1 className="text-2xl font-bold">Yerel Siparişler</h1>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button variant="outline" onClick={loadData}>
            <RefreshCw className="w-4 h-4 mr-2" />
            Yenile
          </Button>
          
          {orders.length > 0 && (
            <>
              <Button variant="outline" onClick={downloadAllOrdersJson}>
                <Download className="w-4 h-4 mr-2" />
                JSON İndir
              </Button>
              
              <Button variant="destructive" onClick={handleClearAll}>
                <Trash2 className="w-4 h-4 mr-2" />
                Hepsini Sil
              </Button>
            </>
          )}
        </div>
      </div>

      {orders.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <Package className="w-16 h-16 mx-auto text-muted-foreground/50 mb-4" />
            <h2 className="text-xl font-semibold mb-2">Henüz Sipariş Yok</h2>
            <p className="text-muted-foreground mb-6">
              LocalStorage'da kayıtlı sipariş bulunamadı.
            </p>
            <Link href="/hizli-teslimat">
              <Button>Test Siparişi Ver</Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          {/* Summary */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <p className="text-2xl font-bold">{orders.length}</p>
                <p className="text-sm text-muted-foreground">Toplam Sipariş</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4 text-center">
                <p className="text-2xl font-bold text-green-600">
                  {orders.filter(o => o.paymentStatus === 'paid').length}
                </p>
                <p className="text-sm text-muted-foreground">Ödenmiş</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4 text-center">
                <p className="text-2xl font-bold text-orange-600">
                  {orders.filter(o => o.paymentStatus === 'pending').length}
                </p>
                <p className="text-sm text-muted-foreground">Bekleyen</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4 text-center">
                <p className="text-2xl font-bold text-red-600">
                  {tl(orders.reduce((sum, order) => sum + order.totals.total, 0))}
                </p>
                <p className="text-sm text-muted-foreground">Toplam Tutar</p>
              </CardContent>
            </Card>
          </div>

          {/* Orders Table */}
          <Card>
            <CardHeader>
              <CardTitle>Sipariş Listesi</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Sipariş No</TableHead>
                    <TableHead>Müşteri</TableHead>
                    <TableHead>Tarih</TableHead>
                    <TableHead>Ürün Sayısı</TableHead>
                    <TableHead>Tutar</TableHead>
                    <TableHead>Durum</TableHead>
                    <TableHead>İşlemler</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders.map((order) => {
                    const orderEmail = getOrderEmail(order.id);
                    const itemCount = order.items.reduce((sum, item) => sum + item.qty, 0);
                    const hasQuickDelivery = order.items.some(item => item.isQuickDelivery);
                    
                    return (
                      <TableRow key={order.id}>
                        <TableCell className="font-mono">
                          <div className="flex items-center space-x-2">
                            <span>{order.id}</span>
                            <CopyButton text={order.id} size="sm" />
                          </div>
                        </TableCell>
                        
                        <TableCell>
                          <div>
                            <p className="font-medium">
                              {order.customerInfo.firstName} {order.customerInfo.lastName}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {order.customerInfo.email}
                            </p>
                          </div>
                        </TableCell>
                        
                        <TableCell>
                          <div className="text-sm">
                            <p>{new Date(order.createdAt).toLocaleDateString('tr-TR')}</p>
                            <p className="text-muted-foreground">
                              {new Date(order.createdAt).toLocaleTimeString('tr-TR', {
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </p>
                          </div>
                        </TableCell>
                        
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <span>{itemCount} ürün</span>
                            {hasQuickDelivery && (
                              <Badge variant="secondary" className="bg-red-100 text-red-700">
                                HIZLI
                              </Badge>
                            )}
                          </div>
                        </TableCell>
                        
                        <TableCell className="font-semibold">
                          {tl(order.totals.total)}
                        </TableCell>
                        
                        <TableCell>
                          <div className="space-y-1">
                            <Badge variant={order.paymentStatus === 'paid' ? 'default' : 'secondary'}>
                              {order.paymentStatus === 'paid' ? 'Ödendi' : 'Bekliyor'}
                            </Badge>
                            <Badge variant="outline" className="block w-fit">
                              {order.paymentMethod === 'card' ? 'Kart' : 'Havale'}
                            </Badge>
                          </div>
                        </TableCell>
                        
                        <TableCell>
                          <div className="flex items-center space-x-1">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button 
                                  variant="ghost" 
                                  size="sm"
                                  onClick={() => setSelectedOrder(order)}
                                >
                                  <Eye className="w-4 h-4" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                                <DialogHeader>
                                  <DialogTitle>Sipariş Detayı - {order.id}</DialogTitle>
                                </DialogHeader>
                                
                                {selectedOrder && (
                                  <div className="space-y-4">
                                    {/* Customer Info */}
                                    <div>
                                      <h4 className="font-semibold mb-2">Müşteri Bilgileri</h4>
                                      <div className="text-sm space-y-1 bg-gray-50 p-3 rounded">
                                        <p><strong>{selectedOrder.customerInfo.firstName} {selectedOrder.customerInfo.lastName}</strong></p>
                                        <p>{selectedOrder.customerInfo.email}</p>
                                        <p>{selectedOrder.customerInfo.phone}</p>
                                        <p>{selectedOrder.customerInfo.address}</p>
                                        <p>
                                          {selectedOrder.customerInfo.district && `${selectedOrder.customerInfo.district}, `}
                                          {selectedOrder.customerInfo.city}
                                          {selectedOrder.customerInfo.postalCode && ` ${selectedOrder.customerInfo.postalCode}`}
                                        </p>
                                      </div>
                                    </div>
                                    
                                    {/* Order Items */}
                                    <div>
                                      <h4 className="font-semibold mb-2">Ürünler</h4>
                                      <div className="space-y-2">
                                        {selectedOrder.items.map((item) => (
                                          <div key={item.id} className="flex items-center space-x-3 p-2 border rounded">
                                            <div className="relative w-12 h-12 rounded overflow-hidden">
                                              <Image
                                                src={item.image}
                                                alt={item.name}
                                                fill
                                                className="object-cover"
                                                sizes="48px"
                                              />
                                            </div>
                                            <div className="flex-1">
                                              <p className="font-medium text-sm">{item.name}</p>
                                              <p className="text-xs text-muted-foreground">
                                                {item.qty} × {tl(item.price)} = {tl(item.price * item.qty)}
                                              </p>
                                            </div>
                                            {item.isQuickDelivery && (
                                              <Badge className="bg-red-500 text-xs">HIZLI</Badge>
                                            )}
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                    
                                    {/* Totals */}
                                    <div>
                                      <h4 className="font-semibold mb-2">Ödeme</h4>
                                      <div className="text-sm space-y-1 bg-gray-50 p-3 rounded">
                                        <div className="flex justify-between">
                                          <span>Ara Toplam:</span>
                                          <span>{tl(selectedOrder.totals.subtotal)}</span>
                                        </div>
                                        <div className="flex justify-between">
                                          <span>Kargo:</span>
                                          <span>{selectedOrder.totals.shipping === 0 ? 'Ücretsiz' : tl(selectedOrder.totals.shipping)}</span>
                                        </div>
                                        <div className="flex justify-between font-semibold pt-1 border-t">
                                          <span>Toplam:</span>
                                          <span>{tl(selectedOrder.totals.total)}</span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </DialogContent>
                            </Dialog>
                            
                            {orderEmail && (
                              <DownloadHtmlButton
                                html={orderEmail.html}
                                filename={`siparis-${order.id}.html`}
                                size="sm"
                              />
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Emails Section */}
          {emails.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>E-posta Kayıtları ({emails.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {emails.map((email) => (
                    <div key={email.id} className="flex items-center justify-between p-3 border rounded">
                      <div className="flex-1">
                        <p className="font-medium text-sm">{email.subject}</p>
                        <p className="text-xs text-muted-foreground">
                          {email.to} • {new Date(email.createdAt).toLocaleString('tr-TR')}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline" className="text-xs">
                          {email.type}
                        </Badge>
                        <DownloadHtmlButton
                          html={email.html}
                          filename={`email-${email.id}.html`}
                          size="sm"
                        />
                        <CopyButton
                          text={email.html}
                          size="sm"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </main>
  );
}