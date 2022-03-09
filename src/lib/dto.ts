export interface Course {
  title: string;
  teacher: string;
  description: string;
  topic: string;
}

export interface ICourse extends Course {
  _id: string;
}
