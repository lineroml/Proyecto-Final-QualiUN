import PocketBase from 'pocketbase';
import { NextResponse } from 'next/server';

const pb = new PocketBase('https://qualiun.pockethost.io/');

const processType = (type) => {
  switch (type) {
    case 'NRQuestion':
      return '1-5';
    case 'MCQuestion':
      return 'multiple';
    case 'ABQuestion':
      return 'vf';
    default:
      return '1-5';
  }
};

export async function GET(request) {
  const questions = await pb.collection('quality_questions').getFullList({
    filter: 'active = true',
  });
  console.log(questions);
  const questionsList = questions.map((question) => {
    return {
      id: question.id,
      tipo: processType(question.field),
      pregunta: question.question_text,
      opciones: question.options,
    };
  });
  return NextResponse.json({ questionsList });
}
