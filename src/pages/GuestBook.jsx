import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getDatabase, ref, onValue } from 'firebase/database';

// 날짜 형식 변환 함수
const formatDate = (date) => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1
  const day = String(d.getDate()).padStart(2, '0');
  const hours = String(d.getHours()).padStart(2, '0');
  const minutes = String(d.getMinutes()).padStart(2, '0');
  const seconds = String(d.getSeconds()).padStart(2, '0');
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

export default function GuestBook() {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const db = getDatabase();
    const boardRef = ref(db, 'board');
    onValue(boardRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        // 게시글들을 배열로 변환하고, 작성일(date)을 기준으로 내림차순 정렬
        const sortedPosts = Object.values(data).sort((a, b) => {
          const dateA = new Date(a.date);
          const dateB = new Date(b.date);
          return dateB - dateA; // 내림차순 정렬 (최신 날짜가 먼저)
        });
        setPosts(sortedPosts);
      }
    });
  }, []);

  const handleWriteClick = () => {
    navigate('/write');
  };

  return (
    <section className='w-full text-center'>
      <h2 className='text-2xl font-bold my-4'>방명록</h2>
      <button
        className='bg-blue-500 text-white mx-4 px-3 py-1 rounded-md mb-4 border border-blue-500 hover:brightness-110 float-right'
        onClick={handleWriteClick}
      >
        글쓰기
      </button>
      <table className="table-auto w-full border-collapse border border-gray-300 text-center">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 px-4 py-2 w-1/12">No</th>
            <th className="border border-gray-300 px-4 py-2 w-5/12">내용</th>
            <th className="border border-gray-300 px-4 py-2 w-2/12">작성자</th>
            <th className="border border-gray-300 px-4 py-2 w-2/12">작성일</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post, index) => (
            <tr key={post.id} className="hover:bg-gray-100">
              <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
              <td className="border border-gray-300 px-4 py-2 text-left">{post.content}</td>
              <td className="border border-gray-300 px-4 py-2">
                <img
                  src={post.user.photoURL}
                  alt={post.user.name}
                  className="inline-block w-6 h-6 rounded-full mr-2"
                />
                {post.user.name}
              </td>
              <td className="border border-gray-300 px-4 py-2">{formatDate(post.date)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
