import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function FCreate()
{
  const user = await prisma.user.create({
    data: {
      email: 'user@naver.com',
      password: '1234',
      name: '자바스크립트 문법공부',
      habit: {
        create: [
          { content: '아침운동하기', executedAt: new Date() },
          { content: '명상하기', executedAt: new Date() },
          { content: '함수공부', executedAt: new Date() },
          { content: '아침식사', executedAt: new Date() },
          { content: '화살표함수공부부', executedAt: new Date() },
          { content: '10분간 휴식식', executedAt: new Date() },
          { content: '점심식사', executedAt: new Date() },
          { content: '심호흡및 명상', executedAt: new Date() },
          { content: '함수,화살표함수 반복 학습습', executedAt: new Date() },
          { content: '저녁운동하기', executedAt: new Date() },
        ]
      }
    }
  });
  console.log('생성됨', user);
}

export { FCreate, prisma };
