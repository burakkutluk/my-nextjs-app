/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { useState } from "react";
import { Board } from "../data/board";
import { Columns } from "../types";
import { onDragEnd } from "../helpers/onDragEnd";
import { AddOutline } from "react-ionicons";
import AddModal from "../components/Modals/AddModal";
import Task from "../components/Task/index";

const Home = () => {
  const [columns, setColumns] = useState<Columns>(Board);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedColumn, setSelectedColumn] = useState("");

  const openModal = (columnId: string) => {
    setSelectedColumn(columnId);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleAddTask = (taskData: any) => {
    const newBoard = { ...columns };
    newBoard[selectedColumn].items.push(taskData);
    setColumns(newBoard); // Ensure state updates
  };

  return (
    <>
      <DragDropContext
        onDragEnd={(result: any) => onDragEnd(result, columns, setColumns)}
      >
        <div className="w-full flex items-start justify-between px-5 pb-8 md:gap-0 gap-10">
          {Object.entries(columns).map(([columnId, column]: any) => (
            <div className="w-full flex flex-col gap-0" key={columnId}>
              {/* Droppable component defines a droppable area */}
              <Droppable droppableId={columnId} key={columnId}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={`flex flex-col md:w-[290px] w-[250px] gap-3 items-center py-5 ${
                      snapshot.isDraggingOver ? "bg-gray-100" : ""
                    }`}
                  >
                    {/* Column title */}
                    <div className="flex items-center justify-center py-[10px] w-full bg-white rounded-lg shadow-sm text-[#555] font-medium text-[15px]">
                      {column.name}
                    </div>

                    {/* Each task inside the column */}
                    {column.items.map((task: any, index: any) => (
                      <Draggable
                        key={task.id.toString()}
                        draggableId={task.id.toString()}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps} // Make sure to pass dragHandleProps as well
                            style={{
                              ...provided.draggableProps.style,
                              padding: "8px",
                              marginBottom: "8px",
                              backgroundColor: snapshot.isDragging
                                ? "#f0f0f0"
                                : "white",
                              borderRadius: "4px",
                              boxShadow: snapshot.isDragging
                                ? "0 1px 3px rgba(0,0,0,0.2)"
                                : "0 1px 2px rgba(0,0,0,0.1)",
                            }}
                          >
                            {/* Render your task */}
                            <Task 
                              task={task} 
                              provided={provided} 
                              onColorChange={() => {}} 
                            />
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>

              {/* Button to add a new card */}
              <div
                onClick={() => openModal(columnId)}
                className="flex cursor-pointer items-center justify-center gap-1 py-[10px] md:w-[90%] w-full opacity-90 bg-white rounded-lg shadow-sm text-[#555] font-medium text-[15px]"
              >
                <AddOutline color={"#555"} />
                Add Card
              </div>
            </div>
          ))}
        </div>
      </DragDropContext>

      {/* Add Modal for creating tasks */}
      <AddModal
        isOpen={modalOpen}
        onClose={closeModal}
        setOpen={setModalOpen}
        handleAddTask={handleAddTask}
      />
    </>
  );
};

export default Home;
