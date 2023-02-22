export interface Task {
    id:string,
    index: number,
    userID : string,
    description: string;
    date: Date;
    comment: string,
    status: string;
    isEditMode ?: boolean;
  }
  