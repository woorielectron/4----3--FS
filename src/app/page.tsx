'use client'
import axios from 'axios';
import studyImage from '@/image/root/공부의숲3x.png';
import { IUser } from '@/server/components/types';
import Image from "next/image";
import styles from "./page.module.css";
import { JSX, useState, createContext, useContext, useRef } from 'react';

const provContext = createContext(null);
/*-------------------------------------------------------------
메인페이지
-------------------------------------------------------------*/
export default function PHome()
{
  const [enable, setEnable] = useState<number>(0x1);
  const [login, setLogin] = useState<IUser>(null);

  function fnMakeRoom()
  {
    setEnable(e => e ^ 1);
  }
  return (
    <provContext.Provider value={{ login, setLogin }}>
      <div className={styles.CMain} >       {/*--- 전체태그를 포함 */}
        <div className={styles.CNav}>       {/*--- 공부의숲 문구와 공부방만들기 버튼을 고정*/}
          <div className={styles.CImage}>   {/*--- 공부의 숲 이미지*/}
            <Image src={studyImage} alt='공부의숲' />
          </div>
          {/*--------------------------------------공부방 만들기 버튼*/}
          <input className={`${styles.CButton} ${styles.CFont}`} type='button'
            value="공부방 만들기" onClick={fnMakeRoom}
            title="아래의 값들을 입력한후에 다시 '공부방만들기' 클릭하면 공부방이 생성됩니다."
          />
        </div>
        {/*--- 로그인  */}
        {(enable & 0x01) && <FMakeRoom />}
      </div>
    </provContext.Provider>
  );
}
/*-------------------------------------------------------------
공부방 만들기
-------------------------------------------------------------*/
function FMakeRoom()
{
  const WIDTH_GRID_IMAGE = 200;
  const HEIGHT_GRID_IMAGE = 200;
  const [item, setItem] = useState<JSX.Element[]>([]);
  const { login, setLogin } = useContext(provContext);
  const loginEnable = useRef<number>(0);
  // 배경 이미지 선택
  function hImage(e)
  {
    const url = new URL(decodeURIComponent(e.currentTarget.querySelector('img').src));
    setLogin({ ...login, image: url.searchParams.get('url') });
  }
  // 로그인 정보 입력
  function hLogin({ target })
  {
    switch (target.name)
    {
      case '공부방이름': setLogin({ ...login, name: target.value }); break;
      case '이메일': setLogin({ ...login, email: target.value }); break;
      case '비밀번호':
        setLogin({ ...login, password: target.value });
        loginEnable.current = 0;
        break;
      case '비밀번호확인': if (target.value === login.password)
      {
        if (login.password === 'codeit1234') loginEnable.current = 1;
        else loginEnable.current = 0;
      }
      else { console.log('-------') }
        break;
      case '소개글': setLogin({ ...login, introduction: target.value }); break;

      default: break;
    }
  }
  // 아이템 추가버튼
  async function hAddItem({ target })
  {
    if (loginEnable.current === 1)  //이메일,비밀번호 일치
    {
      //생성
      if (login.query === null || login.query === undefined)
      {
        setLogin({ ...login, query: 'create' })
        login.query = 'create';
        // 전송
        const url = `${process.env.NEXT_PUBLIC_CLIENT_URL}:${process.env.NEXT_PUBLIC_CLIENT_PORT}`
        const res = await axios.post(url, login);
        if (res.data === 'CREATE')
        {
          target.innerText = `➕ 추가 (CREATE)`;
          setLogin({ ...login, query: 'update' });
          setItem(e => [...e, <FAddItem key={e.length}></FAddItem>]);
        }
        else { target.innerText = `❓ 추가(응답 틀림)`; }
      }

      //업데이트
      else if (login.query === 'update')
      {
        // 전송
        const url = `${process.env.NEXT_PUBLIC_CLIENT_URL}:${process.env.NEXT_PUBLIC_CLIENT_PORT}`
        const res = await axios.post(url, login);
        if (res.data === 'UPDATE')
        {
          target.innerText = `➕ 추가 (UPDATE)`;
          setLogin({ ...login, query: 'update' });
          setItem(e => [...e, <FAddItem key={e.length}></FAddItem>]);
        }
        else { target.innerText = `❓ 추가(응답 틀림)`; }
      }
      else { target.innerText = `➕ 추가?`; }
    }
    else { target.innerText = `❌ 추가(비밀번호 틀림)`; }
  }
  //----------------------------------------------------------
  return (
    <div className={styles.CMakeRoom}>
      {/*--- 배경선택 */}
      <fieldset className={styles.CGridBoundary}> {/*---배경그림 전체 테두리  */}
        <legend className={`${styles.CFont} ${styles.CGridLetter} `}>배경선택</legend> {/*--- 글씨 */}
        {/*-------------------------------------------- 배경그림 8개 grid 배열 */}
        <div className={`${styles.CGrid} ${styles.CGridBox} `}>
          <div className={styles.CGridBox1}>
            <button className={styles.CGridBoxButton} onClick={hImage}>
              <Image width={WIDTH_GRID_IMAGE} height={HEIGHT_GRID_IMAGE}
                className={styles.CGridBoxImage}
                src='https://images.unsplash.com/photo-1515092741719-fff72bab4a2a?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHN0dWR5JTIwZm9yZXN0fGVufDB8fDB8fHww' alt='그림' >
              </Image>
            </button>
          </div>
          <div className={styles.CGridBox2}>
            <button className={styles.CGridBoxButton} onClick={hImage}>
              <Image width={WIDTH_GRID_IMAGE} height={HEIGHT_GRID_IMAGE}
                className={styles.CGridBoxImage}
                src='https://images.unsplash.com/photo-1517673132405-a56a62b18caf?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c3R1ZHl8ZW58MHx8MHx8fDI%3D' alt='그림' />
            </button>
          </div>
          <div className={styles.CGridBox3}>
            <button className={styles.CGridBoxButton} onClick={hImage}>
              <Image width={WIDTH_GRID_IMAGE} height={HEIGHT_GRID_IMAGE}
                className={styles.CGridBoxImage}
                src='https://images.unsplash.com/photo-1525708827920-7d53586a1ab1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fHN0dWR5fGVufDB8fDB8fHwy' alt='그림' />
            </button>
          </div>
          <div className={styles.CGridBox4}>
            <button className={styles.CGridBoxButton} onClick={hImage}>
              <Image width={WIDTH_GRID_IMAGE} height={HEIGHT_GRID_IMAGE}
                className={styles.CGridBoxImage}
                src='https://images.unsplash.com/photo-1529158062015-cad636e205a0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Ym9va3xlbnwwfHwwfHx8Mg%3D%3D' alt='그림' />
            </button>
          </div>
          <div className={styles.CGridBox5}>
            <button className={styles.CGridBoxButton} onClick={hImage}>
              <Image width={WIDTH_GRID_IMAGE} height={HEIGHT_GRID_IMAGE}
                className={styles.CGridBoxImage}
                src='https://images.unsplash.com/photo-1535905557558-afc4877a26fc?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Ym9va3xlbnwwfHwwfHx8Mg%3D%3D' alt='그림' />
            </button>
          </div>
          <div className={styles.CGridBox6}>
            <button className={styles.CGridBoxButton} onClick={hImage}>
              <Image width={WIDTH_GRID_IMAGE} height={HEIGHT_GRID_IMAGE}
                className={styles.CGridBoxImage}
                src='https://images.unsplash.com/photo-1512820790803-83ca734da794?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGJvb2t8ZW58MHx8MHx8fDI%3D' alt='그림' />
            </button>
          </div>
          <div className={styles.CGridBox7}>
            <button className={styles.CGridBoxButton} onClick={hImage}>
              <Image width={WIDTH_GRID_IMAGE} height={HEIGHT_GRID_IMAGE}
                className={styles.CGridBoxImage}
                src='https://images.unsplash.com/photo-1490332695540-5acc256ec383?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGJvb2t8ZW58MHx8MHx8fDI%3D' alt='그림' />
            </button>
          </div>
          <div className={styles.CGridBox8}>
            <button className={styles.CGridBoxButton} onClick={hImage}>
              <Image width={WIDTH_GRID_IMAGE} height={HEIGHT_GRID_IMAGE}
                className={styles.CGridBoxImage}
                src='https://images.unsplash.com/photo-1517770413964-df8ca61194a6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Ym9va3xlbnwwfHwwfHx8Mg%3D%3D' alt='그림' />
            </button>
          </div>
        </div>
      </fieldset>
      {/*-------------------------------------------------- 공부방 기본설정 */}
      {/*--- 공부방이름 */}
      <div className={styles.CMakeRoomBox}>
        <label className={`${styles.CFont} ${styles.CLabel} `}>공부방이름</label>  {/*--- 공부방이름*/}
        <input type='text'
          className={`${styles.CFont_noto_sans_kr} ${styles.CInputText} `}
          name="공부방이름" onChange={hLogin}
          placeholder='공부방이름' />
      </div>
      {/*--- 이메일 */}
      <div className={styles.CMakeRoomBox}>
        <label className={`${styles.CFont} ${styles.CLabel} `}>이메일</label>      {/*--- 이메일*/}
        <input type='text'
          className={`${styles.CFont_noto_sans_kr} ${styles.CInputText} `}
          name="이메일" onChange={hLogin}
          placeholder='이메일' />
      </div>
      {/*--- 비밀번호 */}
      <div className={styles.CMakeRoomBox}>
        <label className={`${styles.CFont} ${styles.CLabel} `}>비밀번호</label>    {/*--- 비밀번호*/}
        <input type='text'
          className={`${styles.CFont_noto_sans_kr} ${styles.CInputText} `}
          name="비밀번호" onChange={hLogin}
          placeholder='비밀번호' />
      </div>
      {/*--- 비밀번호 확인 */}
      <div className={styles.CMakeRoomBox}>
        <label className={`${styles.CFont} ${styles.CLabel} `}>비밀번호확인</label> {/*--- 비밀번호확인*/}
        <input type='text'
          className={`${styles.CFont_noto_sans_kr} ${styles.CInputText} `}
          name="비밀번호확인" onChange={hLogin}
          placeholder='비밀번호확인' />
      </div>
      {/*--- 공부방소개 */}
      <div className={styles.CMakeRoomBox}>
        <fieldset className={styles.CGridBoundary}>                               {/*--- 소개글*/}
          <legend className={`${styles.CFont} ${styles.CGridLetter} `}>📌소개</legend>
          <textarea rows={5} cols={50}
            className={`${styles.CFont_noto_sans_kr} ${styles.CTextArea} `}
            name="소개글" onChange={hLogin}
            placeholder='소개글'>
          </textarea>
        </fieldset>
      </div>
      {/*--- 아이템 추가 */}
      {item.map((item) =>
      {
        return item;
      })}
      <div className={styles.CMakeRoomBox}>
        <button className={`${styles.CFont} ${styles.CAddButton} `} onClick={hAddItem}>➕ 추가</button>
      </div>
    </div>
  );
}
/*-------------------------------------------------------------
아이템 추가
-------------------------------------------------------------*/
function FAddItem()
{
  return (
    <div className={styles.CItemBox}>
      {/*--- 아이템 */}
      <div>
        <label className={`${styles.CFont} ${styles.CItemLevel} `}>아이템</label>
      </div>
      <div>
        <input type='text'
          className={`${styles.CFont_noto_sans_kr} ${styles.CItemText} `}
          placeholder='아이템 이름' />
      </div>
      {/*--- 아이템 타이머 */}
      <div>
        <label className={`${styles.CFont} ${styles.CItemLevel} `}>아이템 타이머</label>
      </div>
      <div>
        <input type='text'
          className={`${styles.CFont_noto_sans_kr} ${styles.CItemText} `}
          placeholder='타이머값' />
      </div>
      {/*--- 아이템 시작일 */}
      <div>
        <label className={`${styles.CFont} ${styles.CItemLevel} `}>아이템 시작일</label>
      </div>
      <div>
        <input type='text'
          className={`${styles.CFont_noto_sans_kr} ${styles.CItemText} `}
          placeholder='시작일' />
      </div>
    </div>
  )
}