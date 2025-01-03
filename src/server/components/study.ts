import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
interface IUser
{
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
async function FPCreate(user: IUser)
{
  const room = await prisma.user.create({
    data: {
      email: user.email,
      password: user.password,
      name: user.name,
      introduction: user.introduction,
      image: user.image,
      point: user.point,
      items: {
        create: {
          content: user.items.content,
          desc: user.items.desc,
          contentTime: user.items.contentTime,
          started: user.items.started,
          completed: user.items.completed,
          scheduledAt: user.items.scheduledAt,
        }
      }
    }
  });
  return room;
}

export { FPCreate, prisma };
export type { IUser }
