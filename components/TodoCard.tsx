'use client'
import getUrl from "@/lib/getUrl";
import { useBoardStore } from "@/store/BoardStore";
import { DraggableProvidedDragHandleProps, DraggableProvidedDraggableProps } from "@hello-pangea/dnd";
import { XCircleIcon } from "@heroicons/react/24/solid";
import { getURL } from "next/dist/shared/lib/utils";
import Image from "next/image";
import { useEffect, useState } from "react";

type Props= {
    todo: Todo;
    index: number;
    id: TypedColumn;
    innerRef: (element: HTMLElement | null) => void;
    draggableProps: DraggableProvidedDraggableProps;
    dragHandleProps: DraggableProvidedDragHandleProps | null | undefined;
}

const TodoCard = ({todo, index, id, innerRef, draggableProps, dragHandleProps}: Props) => {

    const deleteTask = useBoardStore(state => state.deleteTask)
    const [imageUrl, setImageUrl] = useState<string | null>(null)

    useEffect(() => {
        if(todo.image) {
            const fetchImage = async () => {
                const url = await getUrl(todo.image)
                if(url) {
                    setImageUrl(url.toString())
                }
            }

            fetchImage()
        }
    }, [todo])

    return (
        <div {...draggableProps} {...dragHandleProps} ref={innerRef} className="bg-white rounded-md space-y-2 drop-shadow-md">
            <div className="flex justify-between items-center p-5">
                <p>{todo.title}</p>
                <button className="text-red-500 hover:text-red-600" onClick={() => deleteTask(index, todo, id)}>
                    <XCircleIcon className="ml-5 h-8 w-8"/>
                </button>
            </div>

            {imageUrl && (
                <div className="h-full w-full rounded-b-md">
                    <Image src={imageUrl} alt='task image' width={400} height={200} className="w-full object-contain rounded-b-md"/>
                </div>
            )}

        </div>
    )
}

export default TodoCard;