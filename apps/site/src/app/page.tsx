'use server';

import { StrikePage } from '@/views';

export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) {
  const actionUrl = searchParams['url'];
  return <StrikePage url={actionUrl} />;
}
