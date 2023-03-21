import React from "react";
import { useDrag } from "react-dnd";

interface Props {
  id: number;
  src: string;
}

function Image({ id, src }: Props) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "image",
    item: { id: id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));
  return (
    <img
      ref={drag}
      src={src}
      width="80%"
      style={{
        border: isDragging ? "1px solid #25a07f" : "0px",
      }}
    />
  );
}

export default Image;
