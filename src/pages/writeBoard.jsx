import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate 훅 추가
import { postBoard } from '../api/firebase'; // Firebase 관련 API
import Button from '../ui/Button'; // 버튼 컴포넌트

export default function WriteBoard() {
  const [content, setContent] = useState(''); // 글 내용 상태
  const [isSubmitting, setIsSubmitting] = useState(false); // 제출 중 상태
  const [success, setSuccess] = useState(null); // 성공 메시지 상태
  const navigate = useNavigate(); // useNavigate 훅 사용

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await postBoard({ content }); // Firebase에 데이터 저장
      setSuccess('글이 성공적으로 등록되었습니다! 잠시 후 방명록으로 돌아갑니다.');
      setContent(''); // 입력 필드 초기화
      setTimeout(() => setSuccess(null), 1000); // 1초 후 성공 메시지 제거
      setTimeout(() => {
        navigate('/guestbook'); // 1초 후 /guestbook으로 이동
      }, 1000); 
    } catch (error) {
      console.error('글 등록 중 오류:', error);
      alert('글 등록에 실패했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="w-full max-w-lg mx-auto my-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-4">새 글 작성</h2>
      {success && (
        <p className="mb-4 text-green-600 font-semibold text-center">
          ✅ {success}
        </p>
      )}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <textarea
          name="content"
          value={content}
          placeholder="내용을 입력하세요..."
          onChange={(e) => setContent(e.target.value)}
          rows="5"
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          required
        ></textarea>
        <Button
          text={isSubmitting ? '등록 중...' : '등록하기'}
          disabled={isSubmitting}
        />
      </form>
    </section>
  );
}
