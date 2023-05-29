import PocketBase from 'pocketbase';
import { NextResponse } from 'next/server';

const pb = new PocketBase('https://qualiun.pockethost.io/');

export const dynamic = 'force-dynamic';

export async function POST(request, context) {
  const { token } = context.params;
  console.log('================= Start API Call =================');
  console.log('Token:', token);
  try {
    await pb.collection('users').confirmVerification(token);
    return NextResponse.json({
      message: 'Te has registrado con éxito!',
      error: false,
    });
  } catch (e) {
    return NextResponse.json({
      message:
        'Algo salió mal, no pudimos registrarte. Si estás teniendo problemas recurrentes, por favor contáctanos en soportequaliun@gmail.com',
      error: true,
    });
  }
}
