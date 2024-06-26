'use client'
import { useBoardStore } from '@/store/BoardStore';
import React, { useEffect, useState } from 'react';
import { DragDropContext, DropResult, Droppable } from '@hello-pangea/dnd';
import Column from '@/components/Column'


const Board = () => {

    const [getBoard, board, setBoardState, updateTodoInDB] = useBoardStore(state => [
        state.getBoard,
        state.board,
        state.setBoardState,
        state.updateTodoInDB
    ])

    useEffect(() => {
        getBoard()
        
    }, [getBoard])

    const handleOnDragEnd = (result: DropResult) => {
        const { destination, source, type } = result;
    
        // Check if user dragged card outside of board
        if (!destination) return;
    
        // Handle column drag
        if (type === "column") {
          const entries: any = Array.from(board.columns.entries());
          const [removed] = entries.splice(source.index, 1);
          entries.splice(destination.index, 0, removed);
          
          const rearrangedColumns = new Map(entries);
          setBoardState({ ...board, columns: rearrangedColumns });
          return;
        }
    
        // This step is needed as the indexes are stored as numbers 0,1,2 etc. instead of id's with DND library
        const columns = Array.from(board.columns);
        const startColIndex: any = columns[Number(source.droppableId)];
        const finishColIndex: any = columns[Number(destination.droppableId)];
    
        const startCol: Column = {
          id: startColIndex[0],
          todos: startColIndex[1].todos,
        };
    
        const finishCol: Column = {
          id: finishColIndex[0],
          todos: finishColIndex[1].todos,
        };
    
        if (!startCol || !finishCol) return;
    
        if (source.index === destination.index && startCol === finishCol) return;
    
        const newTodos = startCol.todos;
        const [todoMoved] = newTodos.splice(source.index, 1);
    
        if (startCol.id === finishCol.id) {
          // same column task drag
          newTodos.splice(destination.index, 0, todoMoved);
          const newCol = {
            id: startCol.id,
            todos: newTodos,
          };
          const newColumns = new Map(board.columns);
          newColumns.set(startCol.id, newCol);
    
          setBoardState({ ...board, columns: newColumns });
        } else {
          // different column task drag
          const finishTodos = Array.from(finishCol.todos);
          finishTodos.splice(destination.index, 0, todoMoved);
          const newColumns = new Map(board.columns);
          const newCol = {
            id: startCol.id,
            todos: newTodos,
          };
    
          newColumns.set(startCol.id, newCol);
          newColumns.set(finishCol.id, {
            id: finishCol.id,
            todos: finishTodos,
          });
    
          updateTodoInDB(todoMoved, finishCol.id);
    
          setBoardState({ ...board, columns: newColumns });
        }
      };

      return (
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="board" direction="horizontal" type="column">
            {(provided) => (
              <div
                className="grid grid-cols-1 md:grid-cols-3 gap-5 p-5 max-w-7xl mx-auto"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {Array.from(board.columns.entries()).map((entry: any, index) => (
                    <Column key={entry[0]} id={entry[0]} todos={entry[1].todos} index={index} />
                ))}
    
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      );
}

export default Board;