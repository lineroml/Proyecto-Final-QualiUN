import PocketBase from 'pocketbase';
import {NextResponse} from 'next/server';

const pb = new PocketBase('https://qualiun.pockethost.io/');

export async function POST(request) {
    const body = await request.json();
    const {email, password} = body;
    console.log('================= Start API Call =================');
    console.log('Email:', email);

    // Find if there are any users with the provided email
    try {
        const users = await pb.collection('users').getFullList({
            filter: `email = "${email}"`,
        });
        console.log('Users:', users);
        if (users && users.length > 0) {
            console.log('Ya existe una cuenta con este correo!');
            return NextResponse.json({
                message: 'Ya existe una cuenta con este correo!',
                error: true,
            });
        }
    } catch {
        // do nothing
        console.log('No hay usuarios con este correo');
    }

    // check if email is an actual email from @uninorte.edu.co
    if (!email.endsWith('@uninorte.edu.co')) {

        return NextResponse.json({
            message: 'Email inválido!',
            error: true,
        });
    }

    // check if password is at least 8 characters long, has at least 1 number and 1 letter
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!passwordRegex.test(password)) {
        return NextResponse.json({
            message: 'Contraseña inválida!',
            error: true,
        });
    }
    try {

        await pb.collection('users').create({
            email,
            username: email.split('@')[0],
            password,
            passwordConfirm: password,

        });
        console.log('Usuario Creado!');
        await pb.collection('users').requestVerification(email);

        console.log('Correo enviado!');
        return NextResponse.json({
            message: 'Correo enviado!',
            error: false,
        });
    } catch (err) {
        console.log('Error creando usuario', err);
        return NextResponse.json({
            message: 'Error creando usuario',
            error: true,
        });
    }

}