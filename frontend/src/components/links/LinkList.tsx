import React, { useState } from 'react';
import { useStore } from '@/store/useStore';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import { LinkCard } from './LinkCard';
import { AddWidgetMenu } from './AddWidgetMenu';
import { Plus } from 'lucide-react';
import { motion } from 'framer-motion';

export const LinkList = () => {
  const { links, reorderLinks } = useStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    reorderLinks(result.source.index, result.destination.index);
  };

  return (
    <div className="max-w-2xl mx-auto w-full pb-32">
      {/* Add Widget Button */}
      <div className="relative mb-10">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="w-full flex items-center justify-center space-x-2 py-4 bg-gray-900 text-white rounded-2xl font-semibold shadow-lg shadow-gray-900/20 transition-all z-20 relative"
        >
          <Plus className={`w-5 h-5 transition-transform duration-300 ${isMenuOpen ? 'rotate-45' : ''}`} />
          <span>Yeni Ekle</span>
        </motion.button>

        {/* Dropdown Menu */}
        <AddWidgetMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      </div>

      {/* Draggable Link List */}
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="links-list">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="space-y-4"
            >
              {links.map((link, index) => (
                <Draggable key={link.id} draggableId={link.id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      className={`${snapshot.isDragging ? 'z-50 opacity-90' : 'z-10'}`}
                    >
                      <LinkCard
                        link={link}
                        dragHandleProps={provided.dragHandleProps}
                        isDragging={snapshot.isDragging}
                      />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};
