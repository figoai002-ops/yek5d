"use client";

import { Button } from '@/components/ui/button';

interface QtyInputProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  className?: string;
}

export function QtyInput({ value, onChange, min = 1, max = 99, className }: QtyInputProps) {
  const handleDecrease = () => {
    if (value > min) {
      onChange(value - 1);
    }
  };
  
  const handleIncrease = () => {
    if (value < max) {
      onChange(value + 1);
    }
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value);
    if (!isNaN(newValue) && newValue >= min && newValue <= max) {
      onChange(newValue);
    }
  };
  
  return (
    <div className={`flex items-center border rounded-lg ${className}`}>
      <Button
        variant="ghost"
        size="sm"
        onClick={handleDecrease}
        disabled={value <= min}
        className="h-8 w-8 rounded-r-none border-r"
      >
        -
      </Button>
      
      <input
        type="number"
        value={value}
        onChange={handleInputChange}
        min={min}
        max={max}
        className="w-16 h-8 text-center text-sm bg-transparent border-0 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
      />
      
      <Button
        variant="ghost"
        size="sm"
        onClick={handleIncrease}
        disabled={value >= max}
        className="h-8 w-8 rounded-l-none border-l"
      >
        +
      </Button>
    </div>
  );
}