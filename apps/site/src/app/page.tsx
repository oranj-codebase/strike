'use server';

import { StrikePage } from '@/views';

export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) {
  const actionUrl = searchParams['action'];
  return <StrikePage url={actionUrl} />;
}
