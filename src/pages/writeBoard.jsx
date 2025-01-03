import React, { useState } from 'react';
import Button from '../components/ui/Button';
import { useMutation } from '@tanstack/react-query';

export default function writeBoard() {
    const [product, setProduct] = useState({});
    const [file, setFile] = useState();
    const [isUploading, setIsUploading] = useState(false);
    const [success, setSuccess] = useState();
    const addNewProduct = useMutation(({product, url}) => addNewProduct(product, url), {
        onSuccess: () => queryClient.invalidateQueries(['products']),
    });

    const handleChange = (e) => {
        const {name, value, files} = e.target;
        if (name === 'file') {
            setFile(files && files[0]);
            console.log(files[0]);
            return;
        }
        setProduct((product) => ({ ...product, [name]: value }));
    };
    
    // 제품의 사진을 Cloudinary에 업로드하고 URL을 획득하고 Firebase에 새로운 제품을 추가함
    const handleSubmit = (e) => {
        e.preventDefault();
        setIsUploading(true);
        uploadImage(file).then((url) => {addNewProduct(product, url).then(() => {
            setSuccess('새 글이 등록되었습니다.');
            setTimeout(() => {setSuccess(null);}, 4000);
            });
        })
        
        .finally(() => setIsUploading(false));
    };

    return (
        <section className='w-full text-center'>
            <h2 className='text-2xl font-bold my-4'>새 글 작성</h2>
            {success && <p className='my-2'>✅{success}</p>}
            <form className='flex flex-col px-12' onSubmit={handleSubmit}>
                <input 
                    type='text' 
                    name='title' 
                    value={contents.title ?? ''} 
                    placeholder='제목' 
                    required 
                    onChange={handleChange} 
                />
                <input 
                    type='number' 
                    name='price' 
                    value={product.price ?? ''} 
                    placeholder='가격' 
                    required 
                    onChange={handleChange} 
                />
                    <input 
                    type='text' 
                    name='category' 
                    value={product.category ?? ''} 
                    placeholder='카테고리' 
                    required 
                    onChange={handleChange} 
                />
                    <input 
                    type='text' 
                    name='description' 
                    value={product.description ?? ''} 
                    placeholder='제품 설명' 
                    required 
                    onChange={handleChange} 
                />
                    <input 
                    type='text' 
                    name='options' 
                    value={product.options ?? ''} 
                    placeholder='옵션들(콤마로 구분)' 
                    required 
                    onChange={handleChange} 
                />
                <Button
                    text={isUploading ? '업로드중...' : '등록하기'}
                    disabled={isUploading}
                />
            </form>
        </section>);
}
