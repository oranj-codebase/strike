import StrikeLogo from '../assets/StrikeLogo';

export const Header = () => {
  return (
    <div className="flex justify-center items-center pt-[50px]">
      <div className='flex items-center gap-3'>
        <StrikeLogo />
        <h1 className='text-highlight font-bold'>STRIKE</h1>
      </div>
    </div>
  );
};
