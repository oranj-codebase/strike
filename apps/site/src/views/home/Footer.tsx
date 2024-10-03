import { StrikeLogo } from '@/assets';

export default function Footer() {
  return (
    <footer className="flex md:flex-row flex-col gap-[20px] justify-between items-center lg:py-[48px] py-[20px] lg:px-[160px] px-[20px]">
      <a className="flex items-center gap-[4.23px]" href="/">
        <StrikeLogo width={24} height={24} />
        <span className="font-bold font-syne text-[19.64px] leading-[19.64px]">
          STRIKE
        </span>
      </a>
      <div className="flex flex-row gap-[32px] text-[14px] leading-[24px] font-medium">
        <a href="/privacy">Privacy Policy</a>
        <a href="https://docs.strike.oranj.co/" target="_blank">
          Visit Oranj
        </a>
      </div>
      <div className="font-normal text-[16px] leading-[24px] text-[#717179]">
        <span>© Oranj 2024</span>
      </div>
    </footer>
  );
}
