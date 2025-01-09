import React, { useEffect, useState } from 'react';
import { getAuth } from "firebase/auth";
import { getDatabase, ref, onValue, remove } from "firebase/database";
import User from '../components/User';

export default function MyPage() {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const auth = getAuth();
  const database = getDatabase();

  // 현재 사용자 정보 가져오기
  useEffect(() => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      setUser(currentUser);
    }
  }, [auth]);

  // 사용자가 작성한 게시물 가져오기
  useEffect(() => {
    if (user) {
      const userPostsRef = ref(database, 'board');
      onValue(userPostsRef, (snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          const userPosts = Object.values(data).filter(
            (post) => post.user.name === user.displayName
          );

          // 작성일을 기준으로 내림차순 정렬
          const sortedPosts = userPosts.sort((a, b) => new Date(b.date) - new Date(a.date));
          setPosts(sortedPosts);
        } else {
          setPosts([]);
        }
      });
    }
  }, [user, database]);

  // 게시물 삭제 함수
  const handleDeletePost = (postId) => {
    const postRef = ref(database, 'board/' + postId);
    remove(postRef)
      .then(() => {
        console.log('게시물이 삭제되었습니다.');
        setPosts(posts.filter(post => post.id !== postId));  // UI에서 게시물 삭제
      })
      .catch((error) => {
        console.error("게시물 삭제 중 오류 발생: ", error);
      });
  };

  if (!user) {
    return <p>로그인이 필요합니다.</p>;
  }

  return (
    <div className="container mx-auto p-4">
      {/* 사용자 정보 */}
      <section className="mt-6 mb-6">
        <h2 className="text-2xl font-bold mb-4">내 정보</h2>
        <User user={user} />
        <p className="text-gray-700 mt-2">
          {user.email}
        </p>
      </section>

      {/* 사용자가 작성한 게시물 */}
      <section>
        <h2 className="text-2xl font-bold mt-20 mb-6">내 게시물</h2>
        {posts.length > 0 ? (
          <ul>
            {posts.map((post) => (
              <li key={post.id} className="p-4 border rounded mb-2">
                <p className="">{post.content}</p>
                <p className="mt-5">작성일: {post.date}</p>
                <button
                  onClick={() => handleDeletePost(post.id)}
                  className="text-red-600 mt-2 text-right"
                >
                  삭제
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>작성한 게시물이 없습니다.</p>
        )}
      </section>
    </div>
  );
}
