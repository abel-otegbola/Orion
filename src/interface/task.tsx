export interface TaskData {
    [x: string]: string | undefined,
    id: string,
    title: string,
    durationStart: string,
    durationEnd: string,
    date: string,
    priority: 'low' | 'medium' | 'high',
    parentId?: string,
    createdAt?: string;
    updatedAt?: string;
    status: string,
    description: string,
    category: string
}

type ValuePiece = Date | null;

export type Value = ValuePiece | [ValuePiece, ValuePiece];