import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getDatabase, ref, onValue } from 'firebase/database';

export default function GuestBook() {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const db = getDatabase();
    const boardRef = ref(db, 'board');
    onValue(boardRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setPosts(Object.values(data));
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
        className='bg-blue-500 text-white mx-4 px-3 py-1 rounded-md mb-4 border border-blue-500 float-right'
        onClick={handleWriteClick}
      >
        글쓰기
      </button>
      <table className="table-auto w-full border-collapse border border-gray-300 text-center">
      <thead>
        <tr className="bg-gray-200">
          <th className="border border-gray-300 px-4 py-2">No</th>
          <th className="border border-gray-300 px-4 py-2">내용</th>
          <th className="border border-gray-300 px-4 py-2">작성자</th>
          <th className="border border-gray-300 px-4 py-2">작성일</th>
        </tr>
      </thead>
      <tbody>
        {posts.map((post, index) => (
          <tr key={post.id} className="hover:bg-gray-100">
            <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
            <td className="border border-gray-300 px-4 py-2">{post.title}</td>
            <td className="border border-gray-300 px-4 py-2">
              <img
                src={post.user.photoURL}
                alt={post.user.name}
                className="inline-block w-6 h-6 rounded-full mr-2"
              />
              {post.user.name}
            </td>
            <td className="border border-gray-300 px-4 py-2">{post.date}</td>
          </tr>
        ))}
      </tbody>
      </table>
    </section>
  );
}
