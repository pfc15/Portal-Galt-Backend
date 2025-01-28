'use client';

import React from 'react';
import { ChangeEvent } from 'react';

interface InputProps {
  placeholder?: string;
  className?: string;
  type?: string;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default function InputGalt({
  placeholder = 'Digite aqui...',
  className = '',
  type = 'text',
  value,
  onChange,
}: InputProps) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border mb-5 border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-main_color focus:bg-white ${className}`}
    />
  );
}
