export interface INote {
    [ x: string ]: string,
    id: string;
    _id: string;
    title: string;
    text: string;
    user: string;
    createdAt: string;
    updatedAt: string;
}
export interface ITodo {
    [ x: string ]: string | undefined,
    id: string;
    title: string;
    description: string;
    user?: string;
    status?: string;
    duration?: string;
    createdAt?: string;
    updatedAt?: string;
}
export interface Iflashcard {
    id: string;
    text: string;
    user: string;
    noteId: string;
    createdAt: string;
    updatedAt: string;
}