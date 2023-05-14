'use client';
import {createContext, useState, useContext} from 'react';

const authContext = createContext();

export function ProvideAuth({children}) {
    const auth = useProvideAuth();
    return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export function useAuth() {
    return useContext(authContext);
}

function useProvideAuth() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);

    const signIn = async (email, password) => {
        setLoading(true);
        await fetch('https://qualiun.pockethost.io/api/collections/users/auth-with-password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                identity: email,
                password,
            }),
        }).then(async (res) => {
            if (res.status === 200) {
                const data = await res.json();
                setUser(data);
                setLoading(false);
                return data;
            } else {
                setUser(null);
                setLoading(false);
                return null;
            }
        }).catch((err) => {
            console.log(err);
        });

    };

    const signout = () => {
    };

    return {
        user,
        signIn,
        signout,
        loading,
    };
}