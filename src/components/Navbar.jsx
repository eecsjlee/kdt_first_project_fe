import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { MdElectricCar } from "react-icons/md";
import { BsFillPencilFill } from 'react-icons/bs';

export default function Navbar() {
    const [user, setUser] = useState();
    return (
        <header className='flex justify-between border-b border-gray-300 p-2'>
            <Link to='/' className='flex items-center text-4xl text-brand'>
                <MdElectricCar />
                <h4>부산 동래구 전기차 충전 시설 조회</h4>
            </Link>
            <nav className='flex items-center gap-4 font-semibold'>
                <Link to='/products'>Products</Link>
                <Link to='/carts'>Carts</Link>
                <Link to='/products/new' className='text-2xl'>
                    <BsFillPencilFill />
                </Link>
            </nav>
        </header>
    );
}