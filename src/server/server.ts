import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
// 프리즈마 라이브러러
import { bPrisma, FPCreate, FPUpdate } from './components/prisma_create';
import { IUser } from './components/types';
import prisma from './components/prisma';
//
/*-------------------------------------------------------------
변수 미리 선언
-------------------------------------------------------------*/
const url = process.env.NEXT_PUBLIC_SERVER_URL || 'localhost';
const port = Number(process.env.NEXT_PUBLIC_SERVER_PORT);
const server = express();
/*-------------------------------------------------------------
cors정책에 따라서 .use(cors())는 제일 먼저 선언되어야 한다.
메서드 미리 선언
-------------------------------------------------------------*/
server.use(cors());
server.use(express.json());
const router = express.Router();
server.use(router);

/*-------------------------------------------------------------
라우터
-------------------------------------------------------------*/
router.route('/')
  .get((req: Request, res: Response) =>
  {
    console.log('쿼리', req.query);
    console.log('파라미터', req.params);
    console.log('바디', req.body);

    res.status(200).send();
  })
  .post((req: Request, res: Response) =>
  {
    const i = req.body;
    if (i.query === 'create')
    {
      const user: IUser = req.body;
      try { FPCreate(user) }
      catch (err) { console.log('에러발생 : ', err); }

      res.status(200).send('CREATE');
    }
    else if (i.query === 'update')
    {
      //if (i.items != null || i.items != undefined)
      if (i.items)
      {
        const user: IUser = req.body;
        try { FPUpdate(user) }
        catch (err) { console.log('에러발생 : ', err); }
        res.status(200).send('UPDATE');
      }
      else { res.status(200).send('NACK'); }

    }
    else
    {
      res.status(200).send('NACK');
    }

  })
/*-------------------------------------------------------------
서버 시작
-------------------------------------------------------------*/
server.listen(port, url, () =>
{
  console.log(`${url}:${port} 서버시작`);
});
/*-------------------------------------------------------------
프리즈마 로그
-------------------------------------------------------------*/
prisma.$on('query', (e) =>
{
  console.log('timestamp: ', e.timestamp);
})
/*-------------------------------------------------------------
Ctrl + C , 종료 , 예외발생
-------------------------------------------------------------*/
process.on('SIGINT', async () =>
{
  if (bPrisma === true)
  {
    console.log('프로세스가 종료됩니다. 데이터베이스 연결을 정리합니다.');
    await prisma.$disconnect();
  }
  else
  {
    console.log('프로세스가 종료됩니다.');
  }
  process.exit(0);
});

process.on('exit', (code) =>
{
  console.log(`프로세스가 종료되었습니다. 종료 코드: ${code}`);
});

process.on('uncaughtException', (err) =>
{
  console.error('처리되지 않은 예외 발생:', err); process.exit(1);
});
