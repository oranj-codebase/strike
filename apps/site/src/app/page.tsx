'use server';
import { Metadata } from 'next';
import { Home } from '@/views';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Empowering Actionable Links on ICP',
    description:
      'Strike enables seamless interaction with canisters via actionable links on the Internet Computer Protocol.',
  };
}

export default async function HomePage() {
  return <Home />;
}
