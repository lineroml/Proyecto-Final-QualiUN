import PocketBase from 'pocketbase';
import { NextResponse } from 'next/server';

const pb = new PocketBase('https://qualiun.pockethost.io/');

export const dynamic = 'force-dynamic';

export async function GET(request, context) {
  const { id } = context.params;

  const query = await pb.collection('courses').getOne(id, {
    expand: 'reviews(course).answers',
  });

  return NextResponse.json({ query });
}
