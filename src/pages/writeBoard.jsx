import React, { useState } from 'react';
import Button from '../ui/Button';
import { useMutation } from '@tanstack/react-query';
import { postBoard } from '../api/firebase';

export default function WriteBoard() {
    const [contents, setContents] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [success, setSuccess] = useState(null);

    const postBoard = useMutation((contents) => postBoard(contents), {
        onSuccess: () => {
          setSuccess('새 글이 등록되었습니다.');
          setTimeout(() => setSuccess(null), 4000);
        },
      });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setContents((prev) => ({ ...prev, [name]: value }));
      };

      // 방명록 내용을 Firebase에 등록함
      const handleSubmit = (e) => {
        e.preventDefault();
        postBoard(contents).then(() => {
            setSuccess('성공적으로 제품이 추가되었습니다.');
            setTimeout(() => {setSuccess(null);}, 4000);
        })
        .finally(() => setIsSubmitting(false));
    };

    return (
        <section className='w-full text-center'>
          <h2 className='text-2xl font-bold my-4'>새 글 작성</h2>
          {success && <p className='my-2'>✅ {success}</p>}
          <form className='flex flex-col px-12' onSubmit={handleSubmit}>
            <input
              type='text'
              name='content'
              value={contents.content ?? ''}
              placeholder='내용'
              required
              onChange={handleChange}
            />
            <Button
              text={isSubmitting ? '등록 중...' : '등록하기'}
              disabled={isSubmitting}
            />
          </form>
        </section>
      );
}
