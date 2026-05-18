import { AlertTriangle } from 'lucide-react';
import { Button } from '../ui/button';

interface CancelConfirmModalProps {
  isOpen: boolean;
  orderId: string | null;
  onConfirm: () => void;
  onCancel: () => void;
}

export function CancelConfirmModal({ isOpen, orderId, onConfirm, onCancel }: CancelConfirmModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="w-[400px] bg-zinc-900 border border-zinc-800 rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="p-6">
          <div className="flex items-center gap-3 text-red-500 mb-4">
            <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-semibold text-zinc-100">Cancel Order?</h2>
          </div>
          <p className="text-zinc-400 text-sm mb-6">
            Are you sure you want to cancel order <span className="font-semibold text-zinc-100">{orderId}</span>? 
            This action cannot be undone.
          </p>
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={onCancel}>
              Keep Order
            </Button>
            <Button variant="destructive" onClick={onConfirm}>
              Yes, Cancel Order
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
