import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { MdElectricCar } from "react-icons/md";
import { BsFillPencilFill } from 'react-icons/bs';
import User from './User';
import Button from '../ui/Button';
import { useAuthContext } from '../context/AuthContext';


export default function Navbar() {
    const {user, login, logout } = useAuthContext();
    return (
        <header className='flex justify-between border-b border-gray-300 p-2'>
            <Link to='/' className='flex items-center text-2xl text-brand'>
                <MdElectricCar />
                <h4>전기차 충전소 찾기</h4>
            </Link>
            <nav className='flex items-center gap-4 font-semibold'>
                <Link to='/'>HOME</Link>
                <Link to='/about'>ABOUT</Link>
                <Link to='/guestbook'>방명록</Link>
                {user && user.isAdmin && (
                    <Link to='/write' className='text-2xl'>
                        <BsFillPencilFill />
                    </Link>
                )}
                {user && <Link to='/carts'>My Page</Link>}
                {user && <User user={user} />}
                {!user && <Button text={'Login'} onClick={login} />}
                {user && <Button text={'Logout'} onClick={logout} />}
            </nav>
        </header>
    );
}