import { Vector } from '@/assets';

export default function Demo() {
  return (
    <section className="flex flex-col gap-[96px] lg:py-[96px] py-[20px] lg:px-[160px] px-[20px]">
      <div className="flex flex-col gap-[16px]">
        <div className="flex flex-col gap-[12px] text-center font-medium">
          <a className="text-[#3670FF] text-[16px] leading-[24px]" href="/">
            Demo
          </a>
          <p className="font-sans text-[48px] leading-[60px]">
            See STRIKE in action
          </p>
        </div>
        <div className="font-normal text-[18px] leading-[27px] text-justify">
          <p>
            Unlock the full potential of STRIKE by interacting with canisters
            directly through shared links on social media. Using the STRIKE
            Chrome extension, users can engage with interactive STRIKE Cards to
            take actions like placing bets or managing assets—all with one
            click, powered by the Internet Computer Protocol (ICP).
          </p>
        </div>
      </div>
      <div className="flex justify-center items-center w-full aspect-video rounded-[12px] bg-[#D4D4D8]">
        <Vector className="lg:w-[160px] md:w-[100px] w-[80px]" />
      </div>
    </section>
  );
}
