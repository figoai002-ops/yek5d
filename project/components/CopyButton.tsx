"use client";

import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface CopyButtonProps {
  text: string;
  children?: React.ReactNode;
  className?: string;
  label?: string;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
}

export function CopyButton({ text, children, className, label, variant = "outline", size = "default" }: CopyButtonProps) {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success('Panoya kopyalandı');
    } catch (error) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      toast.success('Panoya kopyalandı');
    }
  };
  
  return (
    <Button
      onClick={handleCopy}
      variant={variant}
      size={size}
      className={className}
    >
      {children || label || 'Kopyala'}
    </Button>
  );
}