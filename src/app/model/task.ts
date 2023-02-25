import { Timestamp } from "rxjs";

export interface Task {
    id:string,
    userID : string,
    description: string;
    date: Date;
    comment: string,
    status: string;
    isEditMode ?: boolean;
    createDate: number;
  }
  