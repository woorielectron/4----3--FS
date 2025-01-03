import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
import { FPCreate, prisma, IUser } from './components/study';

/*-------------------------------------------------------------
변수 미리 선언
-------------------------------------------------------------*/
const url = process.env.NEXT_PUBLIC_URL || 'localhost';
const port = Number(process.env.NEXT_PUBLIC_PORT);
const server = express();
/*-------------------------------------------------------------
cors정책에 따라서 .use(cors())는 제일 먼저 선언되어야 한다.
메서드 미리 선언
-------------------------------------------------------------*/
server.use(cors());
const router = express.Router();
server.use(router);

/*-------------------------------------------------------------
라우터
-------------------------------------------------------------*/
router.route('/')
  .get((req: Request, res: Response) =>
  {

  })
  .post((req: Request, res: Response) =>
  {

  })

/*-------------------------------------------------------------
서버 시작
-------------------------------------------------------------*/
server.listen(port, url, () =>
{
  console.log(`${url}:${port} 서버시작`);
});

let user: IUser;

try
{
  FPCreate(user)
}
catch (err)
{
  console.log('에러발생 : ', err);
  await prisma.$disconnect()
}

