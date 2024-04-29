import { databases } from "@/appwrite"


export const getTodosGroupedByColumn = async () => {
    const data = await databases.listDocuments(
        process.env.NEXT_PUBLIC_DATABASE_ID!,
        process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID!
    )

    const todos = data.documents;

    //group columns by the same column type

    const columns = todos.reduce((acc, todo) => {
        if(!acc.get(todo.status)) {
            acc.set(todo.status, {
                id: todo.status,
                todos: []
            })
        }

        acc.get(todo.status)!.todos.push({
            $id: todo.$id,
            $createdAt: todo.$createdAt,
            status: todo.status,
            title: todo.title,
            ...(todo.image && {image: JSON.parse(todo.image)})
        });

        return acc;

    }, new Map<TypedColumn, Column>)  

    const columnTypes: TypedColumn[] = ['todo', 'Inprogress', 'done']

    // make sure all columns have a place in the array even if there is no todos in that column

    for(const columnType of columnTypes) {
        if(!columns.get(columnType)) {
            columns.set(columnType, {
                id: columnType,
                todos: []
            })
        }
    }

    //sort columns by columnTypes
    const sortedColumns = new Map(
        Array.from(columns.entries()).sort((a, b) => (
            columnTypes.indexOf(a[0]) - columnTypes.indexOf(b[0])
        ))
    )

    const board: Board = {
        columns: sortedColumns
    }

    return board;

}