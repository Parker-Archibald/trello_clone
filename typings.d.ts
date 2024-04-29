interface BoardState {
    column: Map<TypedColumn, Column>
}

type TypedColumn = 'todo' | 'Inprogress' | 'done'

type Board = any

interface Column {
    id: TypedColumn,
    todos: Todo[]
}

interface Todo {
    $id: string;
    $createdAt: string;
    title: string;
    status: TypedColumn;
    image?: string;
}

interface Image {
    bucketId: string;
    fileId: string;
}