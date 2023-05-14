import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions = {
    session: {
        strategy: 'jwt',
    },
    providers: [
        CredentialsProvider({
            name: 'Sign in',
            credentials: {
                email: {
                    label: 'Email',
                    type: 'email',
                    placeholder: 'example@example.com',
                },
                password: {label: 'Password', type: 'password'},
            },
            async authorize(credentials) {
                // Call pocketbase API
                const res = await fetch('https://qualiun.pockethost.io/api/collections/users/auth-with-password', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        identity: credentials.email,
                        password: credentials.password,
                    }),
                });
                let json = await res.json();
                if (res.status === 200) {
                    return json;
                } else {
                    return null;
                }
            },
        }),
    ],
};