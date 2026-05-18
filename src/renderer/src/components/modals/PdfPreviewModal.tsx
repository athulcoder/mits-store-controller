import { X, FileText } from 'lucide-react';
import { Button } from '../ui/button';

interface PdfPreviewModalProps {
  isOpen: boolean;
  fileName: string | null;
  onClose: () => void;
}

export function PdfPreviewModal({ isOpen, fileName, onClose }: PdfPreviewModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="w-[800px] h-[600px] bg-zinc-900 border border-zinc-800 rounded-xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between p-4 border-b border-zinc-800 bg-zinc-950">
          <div className="flex items-center gap-2 text-zinc-100 font-medium">
            <FileText className="w-5 h-5 text-blue-500" />
            {fileName}
          </div>
          <button onClick={onClose} className="p-1 rounded-md text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="flex-1 bg-zinc-950 p-8 flex items-center justify-center">
          <div className="w-[400px] h-full bg-white shadow-xl rounded-sm flex items-center justify-center flex-col gap-4">
             <FileText className="w-16 h-16 text-zinc-300" />
             <p className="text-zinc-400 font-medium">PDF Preview Simulation</p>
             <p className="text-sm text-zinc-500">File: {fileName}</p>
          </div>
        </div>
        <div className="p-4 border-t border-zinc-800 bg-zinc-900 flex justify-end">
          <Button onClick={onClose}>Close Preview</Button>
        </div>
      </div>
    </div>
  );
}
