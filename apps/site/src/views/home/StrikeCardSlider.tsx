'use client';
import { useState, useEffect } from 'react';

export default function StrikeCardSlider({
  direction,
  children,
}: {
  direction: string;
  readonly children: React.ReactElement[];
}) {
  const [cardList, setCardList] = useState<Array<React.ReactElement>>([
    ...children,
  ]);
  const [position, setPosition] = useState<number>(0);
  useEffect(() => {
    const increase = () => {
      setPosition((current) => current - 1);
    };
    const insert = () => {
      const count = cardList.length;
      if (direction == 'up') {
        setCardList([...cardList.slice(1), ...cardList.slice(0, 1)]);
      }
      if (direction == 'down') {
        setCardList([
          ...cardList.slice(count - 1),
          ...cardList.slice(0, count - 1),
        ]);
      }
    };
    const increaseInterval = setInterval(increase, 250);
    const insertInterval = setInterval(insert, 92000);
    return () => {
      clearInterval(increaseInterval);
      clearInterval(insertInterval);
    };
  }, []);

  return (
    <div
      className={
        'flex flex-col gap-[40px] absolute ' +
        (direction == 'up' ? 'left-[0px]' : 'right-[0px]')
      }
      style={direction === 'up' ? { top: position } : { bottom: position }}
    >
      {cardList}
    </div>
  );
}
