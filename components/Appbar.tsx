'use client'
import React from 'react'
import { signIn, signOut, useSession } from 'next-auth/react'
const Appbar = () => {
    const session = useSession()
    return (
        <div className='text-3xl flex justify-between'>
            <div>
            Appbar</div>
            <div>
                {session.data?.user ? <button onClick={() => signOut()} className='px-2 py-2 bg-red-400 rounded-lg'>Sign Out</button> : <button className='px-2 py-2 bg-green-400 rounded-lg' onClick={() => signIn()}> Sign in</button> }
                
            </div>
        </div>
    )
}

export default Appbar