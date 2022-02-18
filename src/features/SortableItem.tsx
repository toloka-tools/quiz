import React, { useState } from "react";
import {
  useSortable,
  SortableContext,
  verticalListSortingStrategy,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";

export function SortableItem<itemProps>(p: {
  props: any;
  component: (p: itemProps) => JSX.Element;
}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: p.props.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {p.component(p.props)}
    </div>
  );
}

function SortableContainer<itemProps>(p: {
  items: (itemProps & { id: string })[];
  ItemComponent: (p: itemProps) => JSX.Element;
  ContainerComponent: (p: {
    children: JSX.Element[] | JSX.Element;
  }) => JSX.Element;
  handleDragEnd: any;
}) {
  const [activeId, setActiveId] = useState(null);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );
  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={p.handleDragEnd}
    >
      <SortableContext items={p.items} strategy={verticalListSortingStrategy}>
        {p.ContainerComponent({
          children: p.items.map((props, id) => (
            <SortableItem
              props={{ ...props, id: id }}
              component={p.ItemComponent}
            />
          )),
        })}
      </SortableContext>
    </DndContext>
  );
  function handleDragStart(event: { active: any }) {
    const { active } = event;

    setActiveId(active.id);
  }
}

export const SortableContainerMaker =
  (ItemComponent: any, ContainerComponent: any) =>
  (p: { items: any[]; handleDragEnd: any }) =>
    (
      <SortableContainer
        items={p.items}
        ItemComponent={ItemComponent}
        ContainerComponent={ContainerComponent}
        handleDragEnd={p.handleDragEnd}
      />
    );
