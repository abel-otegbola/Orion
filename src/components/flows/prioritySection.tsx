'use client'
import React from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { TaskData } from '@/interface/task';
import { X } from '@phosphor-icons/react';

// Draggable Task Item Component
function DraggableTask({ task, onDelete }: { task: TaskData; onDelete: () => void }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    isDragging,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    opacity: isDragging ? 0.8 : 1,
    background: isDragging ? '#272727ff' : '',
    border: isDragging ? '1px solid #ddd' : '1px solid rgba(156, 163, 175, 0.2)',
    cursor: 'grab',
    boxShadow: isDragging ? '0 10px 15px -3px rgba(0, 0, 0, 0.1)' : 'none',
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex items-center justify-between gap-8 rounded shadow border border-gray-500/[0.2] p-2 mb-1"
      {...attributes}
      {...listeners}
    >
      <p className="flex gap-2 items-center">
        {/* Drag Handle */}
        <span className="cursor-grab text-gray-500" {...listeners} {...attributes}>
          ≡
        </span>
        {task.title}
      </p>
      <button
        onClick={onDelete}
        className="text-gray-500 hover:text-red-500 transition"
      >
        <X />
      </button>
    </div>
  );
}

// Main Component
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function TaskList({ tasks, setTasks }: { tasks: TaskData[], setTasks: (aug0: any) => void }) {

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor)
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (active.id !== over?.id) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      setTasks((prev: any[]) => {
        const oldTasks = [...prev];
        const oldIndex = prev.findIndex((t) => t.id === active.id);
        const newIndex = prev.findIndex((t) => t.id === over?.id);

        return arrayMove(oldTasks, oldIndex, newIndex);
      });
    }
  }

  return (
    <div className="flex flex-col p-4 gap-1 rounded bg-gray-700/[0.09] overflow-y-auto h-[230px]">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={tasks.map((t) => t.id)}
          strategy={verticalListSortingStrategy}
        >
          {tasks.map((task) => (
            <DraggableTask
              key={task.id}
              task={task}
              onDelete={() => setTasks(tasks.filter((t) => t.id !== task.id))}
            />
          ))}
        </SortableContext>
      </DndContext>
    </div>
  );
}