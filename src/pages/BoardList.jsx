import React, { useEffect, useState } from 'react';
import { getBoard } from '../api/firebase';

export default function BoardList() {
  const [boards, setBoards] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getBoard();
        setBoards(data);
      } catch (error) {
        console.error("게시판 데이터를 불러오는 중 오류:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return <p>로딩 중...</p>;
  }

  if (boards.length === 0) {
    return <p>게시판에 데이터가 없습니다.</p>;
  }

  return (
    <ul>
      {boards.map((board) => (
        <li key={board.id}>
          <p>{board.user.name}: {board.content}</p>
          <p>{board.date}</p>
        </li>
      ))}
    </ul>
  );
}