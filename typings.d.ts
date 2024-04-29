interface BoardState {
    column: Map<string, Column>
}

type TypedColumn = 'todo' | 'Inprogress' | 'done'

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