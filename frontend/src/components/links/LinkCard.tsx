import React from 'react';
import { useStore, LinkItem } from '@/store/useStore';
import { GripVertical, Trash2, Link as LinkIcon, Type, Share2 } from 'lucide-react';
import { DraggableProvidedDragHandleProps } from '@hello-pangea/dnd';
import clsx from 'clsx';

interface LinkCardProps {
  link: LinkItem;
  dragHandleProps: DraggableProvidedDragHandleProps | null | undefined;
  isDragging: boolean;
}

export const LinkCard: React.FC<LinkCardProps> = ({ link, dragHandleProps, isDragging }) => {
  const { updateLink, removeLink } = useStore();

  const getIcon = () => {
    if (link.type === 'HEADER') return <Type className="w-5 h-5 text-purple-500" />;
    if (link.type === 'SOCIAL') return <Share2 className="w-5 h-5 text-blue-500" />;
    return <LinkIcon className="w-5 h-5 text-gray-500" />;
  };

  return (
    <div className={clsx(
      "bg-white rounded-2xl border transition-shadow flex items-center p-4",
      isDragging ? "shadow-2xl border-gray-300 scale-105" : "shadow-sm border-gray-100 hover:shadow-md"
    )}>
      {/* Drag Handle */}
      <div 
        {...dragHandleProps} 
        className="cursor-grab p-2 text-gray-400 hover:text-gray-900 active:cursor-grabbing transition-colors"
      >
        <GripVertical className="w-5 h-5" />
      </div>

      <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center ml-2 mr-4">
        {getIcon()}
      </div>

      {/* Input Fields */}
      <div className="flex-1 flex flex-col space-y-2 mr-4">
        <input
          type="text"
          value={link.title}
          onChange={(e) => updateLink(link.id, { title: e.target.value })}
          placeholder={link.type === 'HEADER' ? "Başlık Girin" : "Başlık"}
          className="w-full bg-transparent font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-100 rounded px-1"
        />
        {link.type !== 'HEADER' && (
          <input
            type="text"
            value={link.url}
            onChange={(e) => updateLink(link.id, { url: e.target.value })}
            placeholder="URL (örn: https://example.com)"
            className="w-full bg-transparent text-sm text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-100 rounded px-1"
          />
        )}
      </div>

      {/* Actions (Toggle & Delete) */}
      <div className="flex items-center space-x-4">
        {/* Toggle Switch */}
        <button
          onClick={() => updateLink(link.id, { isActive: !link.isActive })}
          className={clsx(
            "relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none",
            link.isActive ? "bg-green-500" : "bg-gray-200"
          )}
        >
          <span
            className={clsx(
              "inline-block h-4 w-4 transform rounded-full bg-white transition-transform",
              link.isActive ? "translate-x-6" : "translate-x-1"
            )}
          />
        </button>

        <button 
          onClick={() => removeLink(link.id)}
          className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
