"use client";

import { Button } from '@/components/ui/button';
import { downloadEmailAsHtml } from '@/lib/email';

interface DownloadHtmlButtonProps {
  html: string;
  filename: string;
  children?: React.ReactNode;
  className?: string;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
}

export function DownloadHtmlButton({ 
  html, 
  filename, 
  children, 
  className,
  variant = "outline",
  size = "default"
}: DownloadHtmlButtonProps) {
  const handleDownload = () => {
    downloadEmailAsHtml(html, filename);
  };
  
  return (
    <Button
      onClick={handleDownload}
      variant={variant}
      size={size}
      className={className}
    >
      {children || '📄 İndir'}
    </Button>
  );
}