import React from 'react';
export interface IDialogProps {
  open?: boolean;
  selectedValue?: string;
  onClose?: (value: string) => void;
  children: React.Component;
  title: string;
  ariaLabel: string;
  loading?: boolean;
}
