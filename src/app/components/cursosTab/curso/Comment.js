import Image from 'next/image';
import fs from 'fs';

export const dynamic = 'force-dynamic';

const Comment = ({ comment }) => {
  const getRandomPfp = () => {
    const files = [
      'Alligator.png',
      'Anteater.png',
      'Armadillo.png',
      'Auroch.png',
      'Axolotl.png',
      'Badger.png',
      'Bat.png',
      'Beaver.png',
      'Buffalo.png',
      'Camel.png',
      'Capybara.png',
      'Chameleon.png',
      'Cheetah.png',
      'Chinchilla.png',
      'Chipmunk.png',
      'Chupacabra.png',
      'Cormorant.png',
      'Coyote.png',
      'Crow.png',
      'Dingo.png',
      'Dinosaur.png',
      'Dolphin.png',
      'Duck.png',
      'Elephant.png',
      'Ferret.png',
      'Fox.png',
      'Frog.png',
      'Giraffe.png',
      'Gopher.png',
      'Grizzly.png',
      'Hedgehog.png',
      'Hippo.png',
      'Hyena.png',
      'Ibex.png',
      'Ifrit.png',
      'Iguana.png',
      'Jackal.png',
      'Kangaroo.png',
      'Koala.png',
      'Kraken.png',
      'Lemur.png',
      'Leopard.png',
      'Liger.png',
      'Llama.png',
      'Manatee.png',
      'Mink.png',
      'Monkey.png',
      'Moose.png',
      'Narwhal.png',
      'Orangutan.png',
      'Otter.png',
      'Panda.png',
      'Penguin.png',
      'Platypus.png',
      'Pumpkin.png',
      'Python.png',
      'Quagga.png',
      'Rabbit.png',
      'Raccoon.png',
      'Rhino.png',
      'Sheep.png',
      'Shrew.png',
      'Skunk.png',
      'Squirrel.png',
      'Tiger.png',
      'Turtle.png',
      'Walrus.png',
      'Wolf.png',
      'Wolverine.png',
      'Wombat.png',
    ];

    const random = Math.floor(Math.random() * files.length);

    // choose random number between 1 and 5
    const randomNum = Math.floor(Math.random() * 5) + 1;

    // Create an array of adjectives for me to use
    const adjectives = [
      'awesome',
      'amazing',
      'great',
      'fantastic',
      'incredible',
      'wonderful',
      'marvelous',
      'spectacular',
      'stupendous',
      'excellent',
      'outstanding',
      'terrific',
      'fabulous',
      'magnificent',
      'remarkable',
      'superb',
      'dazzling',
      'brilliant',
      'glorious',
      'splendid',
      'impressive',
      'awe-inspiring',
      'stunning',
      'astonishing',
      'astounding',
    ];

    // Choose a random adjective
    const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];

    // fetch the filename of the random image
    const filename = files[random];

    // Return the number, adjective, and filename
    return { randomNum, adjective, filename };
  };

  const color = {
    1: 'bg-comment-col-1 border-comment-col-1',
    2: 'bg-comment-col-2 border-comment-col-2',
    3: 'bg-comment-col-3 border-comment-col-3',
    4: 'bg-comment-col-4 border-comment-col-4',
    5: 'bg-comment-col-5 border-comment-col-5',
  };

  const { randomNum, adjective, filename } = getRandomPfp();
  return (
    <div className='h-fit flex w-full'>
      <div className={` relative h-11 border-4 ${color[randomNum]} w-11 rounded-full`}>
        <Image
          alt='icono de comentario'
          src={`/commentIcons/${filename}`}
          fill
          className='object-contain z-0'
          quality={100}
          priority
          sizes='100%'
        ></Image>
      </div>
      <div className='w-full flex flex-col ml-2 bg-[#F2F2F2] px-3 py-1 rounded-md'>
        <div className='font-bold text-base w-full'>
          <span className='capitalize'>{adjective}</span>{' '}
          <span>{filename.substring(0, filename.length - 4)}</span>
        </div>
        <div>
          <span className='text-sm '>{comment.comment}</span>
        </div>
      </div>
    </div>
  );
};

export default Comment;
