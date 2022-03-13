export interface Course {
  title: string;
  teacher: string;
  description: string;
  topic: string;
}

export interface Student {
  name: string;
  email: string;
  avatar: string;
}

export interface IStudent extends Student {
  _id: string;
}

export interface ICourse extends Course {
  _id: string;
}
