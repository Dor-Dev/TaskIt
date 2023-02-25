import { Timestamp } from "rxjs";

export interface Task {
    id:string,
    userID : string,
    description: string;
    date: any;
    comment: string,
    status: string;
    isEditMode ?: boolean;
    createDate: number;
  }
  