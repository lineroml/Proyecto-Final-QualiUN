import { NextResponse } from 'next/server';
import PocketBase from 'pocketbase';

const pb = new PocketBase('https://qualiun.pockethost.io/');

export const dynamic = 'force-dynamic';

export async function POST(request) {
  console.log(
    '==================================== START API CALL ===================================='
  );

  const body = await request.json();
  console.log('body --- ', body);

  const { answers, courseId, userId, comment } = body;

  const review = await pb.collection('reviews').create({
    author: userId,
    course: courseId,
    review_text: comment,
  });

  const answerResponses = [];
  for (let answer of answers) {
    let data = {
      question_answered: answer.pregunta,
      user_review: review.id,
      answer_value: {
        type: 'numeric',
        value: answer.respuesta,
      },
    };
    const res = await fetch('https://qualiun.pockethost.io/api/collections/user_answers/records', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
      cache: 'no-store',
    });
    const json = await res.json();
    answerResponses.push(json);
  }

  console.log('answerResponses --- ', answerResponses);

  const newRecord = await pb.collection('reviews').update(review.id, {
    answers: answerResponses.map((answer) => answer.id),
  });

  console.log('newRecord --- ', newRecord);

  return NextResponse.json({ newRecord });
}
