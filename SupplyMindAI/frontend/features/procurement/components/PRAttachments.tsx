'use client';

import React, { useRef } from 'react';
import { Paperclip, Download, FileText, FileImage, FileSpreadsheet, File, Upload, X } from 'lucide-react';
import { format } from 'date-fns';
import type { Attachment } from '../types';

interface PRAttachmentsProps {
  attachments: Attachment[];
  onUpload?: (files: FileList) => void;
  uploading?: boolean;
  editable?: boolean;
}

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1048576) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1048576).toFixed(1)} MB`;
}

function getFileIcon(type: string) {
  if (type.includes('image')) return <FileImage className="h-5 w-5 text-[#3B82F6]" />;
  if (type.includes('spreadsheet') || type.includes('excel') || type.includes('csv'))
    return <FileSpreadsheet className="h-5 w-5 text-[#22C55E]" />;
  if (type.includes('pdf')) return <FileText className="h-5 w-5 text-[#EF4444]" />;
  return <File className="h-5 w-5 text-[#9CA3AF]" />;
}

export function PRAttachments({ attachments, onUpload, uploading = false, editable = true }: PRAttachmentsProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="space-y-4">
      {editable && (
        <div
          onClick={() => inputRef.current?.click()}
          className="cursor-pointer rounded-xl border-2 border-dashed border-white/10 bg-[#0F172A] p-6 text-center hover:border-[#3B82F6]/50 hover:bg-[#3B82F6]/5 transition-all"
        >
          <input
            ref={inputRef}
            type="file"
            multiple
            className="hidden"
            onChange={(e) => e.target.files && onUpload?.(e.target.files)}
          />
          {uploading ? (
            <div className="flex flex-col items-center gap-2">
              <div className="h-6 w-6 animate-spin rounded-full border-2 border-[#3B82F6]/30 border-t-[#3B82F6]" />
              <p className="text-sm text-[#9CA3AF]">Uploading...</p>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <Upload className="h-8 w-8 text-[#6B7280]" />
              <p className="text-sm text-[#9CA3AF]">
                <span className="font-medium text-[#3B82F6]">Click to upload</span> or drag and drop
              </p>
              <p className="text-xs text-[#6B7280]">PDF, Excel, Images, Docs up to 10MB</p>
            </div>
          )}
        </div>
      )}

      {attachments.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-8 text-[#6B7280]">
          <Paperclip className="mb-2 h-8 w-8 opacity-50" />
          <p className="text-sm">No attachments yet</p>
        </div>
      ) : (
        <div className="space-y-2">
          {attachments.map((att) => (
            <div
              key={att.id}
              className="flex items-center gap-3 rounded-xl border border-white/10 bg-[#0F172A] px-4 py-3"
            >
              <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-white/5">
                {getFileIcon(att.fileType)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="truncate text-sm font-medium text-[#F9FAFB]">{att.fileName}</p>
                <p className="text-xs text-[#6B7280]">
                  {formatBytes(att.fileSize)} · Uploaded by {att.uploadedBy} ·{' '}
                  {format(new Date(att.uploadedAt), 'MMM d, yyyy')}
                </p>
              </div>
              <a
                href={att.url}
                download={att.fileName}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-[#6B7280] hover:bg-white/5 hover:text-[#F9FAFB] transition-colors"
              >
                <Download className="h-4 w-4" />
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
