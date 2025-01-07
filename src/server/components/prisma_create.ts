import prisma from "./prisma";
import { IUser } from "./types";
let bPrisma = false;

/*---------------------------------
레코드 생성
----------------------------------*/
async function FPCreate(user: IUser)
{
  const data: any = {
    query: user.query,
    email: user.email,
    password: user.password,
    name: user.name,
    introduction: user.introduction,
    image: user.image,
    point: user.point,
  };
  if (user.items)
  {
    data.items = {
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
  bPrisma = true;
  const room = await prisma.user.create({ data });
  return room;
};
/*---------------------------------
레코드 업데이트
----------------------------------*/
async function FPUpdate(user: IUser)
{
  const where: any = { email: user.email };

  const data: any = {
    query: user.query,
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
  bPrisma = true;
  const room = await prisma.user.update({ where, data });
  return room;
};

export { bPrisma, FPCreate, FPUpdate };

