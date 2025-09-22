'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Mail, 
  Send, 
  Inbox, 
  Loader2, 
  CheckCircle, 
  AlertCircle,
  Calendar,
  User,
  MessageSquare
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Email {
  subject: string;
  from: string;
  date: string;
  preview?: string;
}

interface EmailResponse {
  success: boolean;
  emails: Email[];
  total: number;
  message?: string;
  error?: string;
}

interface SendResponse {
  success: boolean;
  message?: string;
  error?: string;
}

export default function EmailManagementPage() {
  const { toast } = useToast();
  
  // Form state
  const [recipient, setRecipient] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);
  
  // Inbox state
  const [emails, setEmails] = useState<Email[]>([]);
  const [loading, setLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const handleSendEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!recipient || !subject || !message) {
      toast({
        title: "Hata",
        description: "Tüm alanları doldurun",
        variant: "destructive"
      });
      return;
    }

    setSending(true);
    
    try {
      const response = await fetch('/api/send-test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: recipient,
          subject,
          message,
          type: 'custom'
        })
      });

      const result: SendResponse = await response.json();

      if (result.success) {
        toast({
          title: "Başarılı",
          description: result.message || "Email başarıyla gönderildi",
        });
        // Form temizle
        setRecipient('');
        setSubject('');
        setMessage('');
      } else {
        toast({
          title: "Hata",
          description: result.error || "Email gönderilemedi",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Hata", 
        description: "Bağlantı hatası",
        variant: "destructive"
      });
    } finally {
      setSending(false);
    }
  };

  const handleSendTestEmail = async () => {
    setSending(true);
    
    try {
      const response = await fetch('/api/send-test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'test' })
      });

      const result: SendResponse = await response.json();

      if (result.success) {
        toast({
          title: "Test Email Gönderildi",
          description: result.message || "Test email başarıyla gönderildi",
        });
      } else {
        toast({
          title: "Hata",
          description: result.error || "Test email gönderilemedi",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Hata",
        description: "Bağlantı hatası",
        variant: "destructive"
      });
    } finally {
      setSending(false);
    }
  };

  const fetchEmails = async () => {
    setLoading(true);
    
    try {
      const response = await fetch('/api/read-test?limit=15');
      const result: EmailResponse = await response.json();

      if (result.success) {
        setEmails(result.emails);
        setLastUpdated(new Date());
        toast({
          title: "Gelen Kutusu Güncellendi",
          description: `${result.total} email alındı`,
        });
      } else {
        toast({
          title: "Hata",
          description: result.error || "Emailler alınamadı",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Hata",
        description: "Bağlantı hatası",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center space-x-2 mb-6">
        <Mail className="h-6 w-6 text-blue-600" />
        <h1 className="text-2xl font-bold">Email Yönetimi</h1>
        <Badge variant="outline">Hostinger IMAP/SMTP</Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Email Gönderme Formu */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Send className="h-5 w-5" />
              <span>Email Gönder</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={handleSendEmail} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="recipient" className="text-sm font-medium">
                  Alıcı
                </label>
                <Input
                  id="recipient"
                  type="email"
                  placeholder="ornek@domain.com"
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="subject" className="text-sm font-medium">
                  Konu
                </label>
                <Input
                  id="subject"
                  type="text"
                  placeholder="Email konusu"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium">
                  Mesaj
                </label>
                <Textarea
                  id="message"
                  placeholder="Email içeriği..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={6}
                  required
                />
              </div>

              <div className="flex space-x-2">
                <Button 
                  type="submit" 
                  disabled={sending}
                  className="flex-1"
                >
                  {sending ? (
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  ) : (
                    <Send className="h-4 w-4 mr-2" />
                  )}
                  Email Gönder
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  onClick={handleSendTestEmail}
                  disabled={sending}
                >
                  {sending ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <CheckCircle className="h-4 w-4" />
                  )}
                  Test
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Gelen Kutusu */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Inbox className="h-5 w-5" />
                <span>Gelen Kutusu</span>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={fetchEmails}
                disabled={loading}
              >
                {loading ? (
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                ) : (
                  <Inbox className="h-4 w-4 mr-2" />
                )}
                Gelen Mailleri Gör
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {lastUpdated && (
              <p className="text-sm text-gray-500 mb-4">
                Son güncelleme: {lastUpdated.toLocaleString('tr-TR')}
              </p>
            )}

            <div className="space-y-3 max-h-96 overflow-y-auto">
              {emails.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <MessageSquare className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p>Henüz email alınmadı</p>
                  <p className="text-sm">Gelen kutusunu kontrol etmek için butona tıklayın</p>
                </div>
              ) : (
                emails.map((email, index) => (
                  <div key={index} className="border rounded-lg p-3 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium text-sm line-clamp-1">
                        {email.subject}
                      </h4>
                      <Badge variant="secondary" className="text-xs ml-2 whitespace-nowrap">
                        {new Date(email.date).toLocaleDateString('tr-TR')}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center space-x-2 text-xs text-gray-600">
                      <User className="h-3 w-3" />
                      <span className="truncate">{email.from}</span>
                    </div>
                    
                    {email.preview && (
                      <div className="mt-2 text-xs text-gray-500 line-clamp-2">
                        {email.preview}
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>

            {emails.length > 0 && (
              <div className="mt-4 pt-3 border-t">
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>{emails.length} email görüntüleniyor</span>
                  <div className="flex items-center space-x-1">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>IMAP Bağlantısı Aktif</span>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* İstatistikler */}
      <Card>
        <CardHeader>
          <CardTitle>Email Sistemi Durumu</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="flex items-center justify-center space-x-2 text-green-600">
                <CheckCircle className="h-5 w-5" />
                <span className="font-medium">SMTP</span>
              </div>
              <p className="text-sm text-gray-500">smtp.hostinger.com:465</p>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center space-x-2 text-green-600">
                <CheckCircle className="h-5 w-5" />
                <span className="font-medium">IMAP</span>
              </div>
              <p className="text-sm text-gray-500">imap.hostinger.com:993</p>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center space-x-2 text-blue-600">
                <Mail className="h-5 w-5" />
                <span className="font-medium">Hesap</span>
              </div>
              <p className="text-sm text-gray-500">y.emrekaranfil@yeklab.com</p>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center space-x-2 text-purple-600">
                <Calendar className="h-5 w-5" />
                <span className="font-medium">Güncelleme</span>
              </div>
              <p className="text-sm text-gray-500">
                {lastUpdated ? lastUpdated.toLocaleTimeString('tr-TR') : 'Henüz yok'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}