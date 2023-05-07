export interface User {
  id: number;
  name: string;
  avatar: string;
}

export interface Message {
  id: string;
  user: User;
  text: string;
  timestamp: number | string;
}

export interface IMessage {
  me?: boolean,
  content?:string
  id:string
}
