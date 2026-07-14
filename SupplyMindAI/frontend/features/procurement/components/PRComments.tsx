'use client';

import React, { useState } from 'react';
import { Send, MessageSquare } from 'lucide-react';
import { format } from 'date-fns';
import type { Comment } from '../types';

interface PRCommentsProps {
  comments: Comment[];
  onSubmit: (content: string) => void;
  loading?: boolean;
  currentUserName?: string;
  currentUserAvatar?: string;
}

function getInitials(name: string) {
  return name
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

function getAvatarColor(name: string) {
  const colors = [
    'bg-blue-500', 'bg-purple-500', 'bg-green-500',
    'bg-yellow-500', 'bg-red-500', 'bg-pink-500',
  ];
  const idx = name.charCodeAt(0) % colors.length;
  return colors[idx];
}

export function PRComments({
  comments,
  onSubmit,
  loading = false,
  currentUserName = 'You',
}: PRCommentsProps) {
  const [text, setText] = useState('');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!text.trim()) return;
    onSubmit(text.trim());
    setText('');
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Comments list */}
      <div className="space-y-4">
        {comments.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10 text-[#6B7280]">
            <MessageSquare className="mb-2 h-8 w-8 opacity-50" />
            <p className="text-sm">No comments yet. Be the first to comment.</p>
          </div>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="flex gap-3">
              <div
                className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-xs font-semibold text-white ${getAvatarColor(comment.userName)}`}
              >
                {comment.userAvatar ? (
                  <img src={comment.userAvatar} alt={comment.userName} className="h-8 w-8 rounded-full object-cover" />
                ) : (
                  getInitials(comment.userName)
                )}
              </div>
              <div className="flex-1 rounded-xl border border-white/10 bg-[#0F172A] px-4 py-3">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-medium text-[#F9FAFB]">{comment.userName}</span>
                  <span className="text-xs text-[#6B7280]">
                    {format(new Date(comment.createdAt), 'MMM d, yyyy · HH:mm')}
                  </span>
                </div>
                <p className="text-sm text-[#9CA3AF] leading-relaxed">{comment.content}</p>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} className="flex gap-3">
        <div
          className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-xs font-semibold text-white ${getAvatarColor(currentUserName)}`}
        >
          {getInitials(currentUserName)}
        </div>
        <div className="flex flex-1 items-end gap-2">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Add a comment..."
            rows={2}
            className="flex-1 resize-none rounded-xl border border-white/10 bg-[#0F172A] px-4 py-2.5 text-sm text-[#F9FAFB] placeholder-[#6B7280] focus:border-[#3B82F6] focus:outline-none focus:ring-1 focus:ring-[#3B82F6]"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && e.metaKey) handleSubmit(e);
            }}
          />
          <button
            type="submit"
            disabled={!text.trim() || loading}
            className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#3B82F6] text-white disabled:opacity-50 hover:bg-[#2563EB] transition-colors"
          >
            {loading ? (
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/20 border-t-white" />
            ) : (
              <Send className="h-4 w-4" />
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
