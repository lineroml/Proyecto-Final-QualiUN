import { NextResponse } from 'next/server';
import PocketBase from 'pocketbase';

const pb = new PocketBase('https://qualiun.pockethost.io/');

export async function POST(request) {
  const body = await request.json();

  const { answers, courseId, userId } = body;

  const review = await pb.collection('reviews').create({
    author: userId,
    course: courseId,
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

  const newRecord = await pb.collection('reviews').update(review.id, {
    answers: answerResponses.map((answer) => answer.id),
  });

  return NextResponse.json({ newRecord });
}
