export interface INote {
    id: string;
    title: string;
    text: string;
    user: string;
    createdAt: string;
    updatedAt: string;
}
export interface ITodo {
    [ x: string ]: string,
    id: string;
    text: string;
    user: string;
    status: string;
    duration: string;
    createdAt: string;
    updatedAt: string;
}
export interface Iflashcard {
    id: string;
    text: string;
    user: string;
    noteId: string;
    createdAt: string;
    updatedAt: string;
}