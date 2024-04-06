'use clent';
import { Button } from '@nextui-org/react';

type ButtonType = {
  label: string;
  onClick: () => void;
  disabled?: boolean;
};

export type ConfirmButtonsProps = {
  confirm: ButtonType;
  cancel: ButtonType;
};

export function ConfirmButtons({ confirm, cancel }: ConfirmButtonsProps) {
  const { onClick: clickConfirm } = confirm;
  const { onClick: clickCancel } = cancel;

  return (
    <div className="flex justify-end gap-4">
      <Button onClick={clickConfirm} color="primary">
        {confirm.label}
      </Button>
      <Button onClick={clickCancel} color="primary">
        {cancel.label}
      </Button>
    </div>
  );
}
