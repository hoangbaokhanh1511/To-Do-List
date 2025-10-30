export interface ITask {
    id: string, 
    text: string,
    status: string
}

export interface ITaskCreate {
    text: string,
    status: string
}