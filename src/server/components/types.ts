interface IUser
{
  query: string;
  email: string;
  password: string;
  name: string;
  introduction: string;
  image: string;
  point: number;
  items: {
    content: string;
    desc: string;
    contentTime: number;
    started: boolean;
    completed: boolean;
    scheduledAt: Date
  }
}
export type { IUser };