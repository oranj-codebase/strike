import {
  CheckBoxIcon,
  BetBTCIcon,
  TwitterIcon,
  StrikeLogo,
  TelegramIcon,
} from '@/assets';

export default function Feature() {
  return (
    <section className="flex md:flex-row flex-col gap-[64px] items-center font-normal lg:py-[96px] py-[20px] lg:px-[160px] px-[20px]">
      <div className="flex flex-col gap-[16px] w-full">
        <div className="font-medium md:text-left text-center ">
          <a className="text-[#3670FF] text-[16px] leading-[24px]" href="/">
            Features
          </a>
          <p className="font-sans text-[48px] leading-[60px]">
            Features of STRIKE
          </p>
        </div>
        <div>
          <p className="text-[18px] leading-[27px] text-justify">
            STRIKE empowers users to share actionable links that interact with
            canisters on the Internet Computer Protocol (ICP). With STRIKE,
            users can perform secure and efficient actions directly from social
            platforms, making decentralized interactions easy and accessible.
          </p>
        </div>
        <div className="flex flex-col gap-[16px] font-medium">
          <div className="flex gap-[12px] text-[16px] leading-[24px] items-center">
            <CheckBoxIcon height={21} width={21} />
            <span>Powered by ICP for fast, decentralized performance</span>
          </div>
          <div className="flex gap-[12px] text-[16px] leading-[24px] items-center">
            <CheckBoxIcon height={21} width={21} />
            <span>
              Interactive STRIKE Cards that unfurl with actionable content
            </span>
          </div>
          <div className="flex gap-[12px] text-[16px] leading-[24px] items-center">
            <CheckBoxIcon height={21} width={21} />
            <span>Embed custom actions with simple JSON integration</span>
          </div>
          <div className="flex gap-[12px] text-[16px] leading-[24px] items-center">
            <CheckBoxIcon height={21} width={21} />
            <span>
              Share directly to social media platforms like Twitter (X)
            </span>
          </div>
        </div>
      </div>
      <div className="lg:px-[88px] lg:py-[112px] lg:px-[44px] lg:py-[56px] px-[20px] py-[20px]">
        <div className="flex flex-col gap-[16px] p-[16px] rounded-[6px] bg-[#F4F4F5] w-[288px]">
          <div className="flex flex-row gap-[1px] items-center leading-[9.82px] text-[9.82px] font-medium">
            <StrikeLogo width={12} height={12} />
            <span className="font-syne font-bold">STRIKE</span>
          </div>
          <div className="flex flex-col gap-[12px] p-[12px] rounded-[6px] bg-[#FAFAFA] relative">
            <p className="font-normal text-[8px] leading-[12px]">
              Who will become the next President of the United States?
            </p>
            <div className="relative">
              <img
                src="/card0.png"
                className="rounded-[6px] max-w-[240px] max-h-[232px]"
                alt="CardImg"
              />
              <div className="flex gap-[8px] absolute right-[4px] bottom-[4px]">
                <div className="bg-[#121212] p-[4px] rounded-[4px]">
                  <BetBTCIcon width={46} height={12} />
                </div>
                <div className="bg-[#121212] p-[5px] rounded-[4px]">
                  <TelegramIcon width={10} height={10} />
                </div>
                <div className="flex  bg-[#121212] p-[4px] rounded-[4px]">
                  <TwitterIcon width={10} height={10} />
                </div>
              </div>
            </div>
            <button className="border-1 rounded-[32px] py-[4px] px-[8px] bg-[#FAFAFA] text-[#3670FF] absolute  top-[54px] left-[-44px] text-[10px] leading-[15px] font-medium">
              Powered by ICP
            </button>
            <button className="border-1 rounded-[32px] py-[4px] px-[8px] bg-[#FAFAFA] text-[#3670FF] absolute top-[181px] left-[-61px] text-[10px] leading-[15px] font-medium">
              Embedded custom actions
            </button>
            <button className="border-1 rounded-[32px] py-[4px] px-[8px] bg-[#FAFAFA] text-[#3670FF] absolute  top-[54px] right-[-81px] text-[10px] leading-[15px] font-medium">
              Interactive STRIKE Cards
            </button>
            <button className="border-1 rounded-[32px] py-[4px] px-[8px] bg-[#FAFAFA] text-[#3670FF] absolute top-[181px] right-[-52px] text-[10px] leading-[15px] font-medium">
              Share directly
            </button>
          </div>
          <button className="rounded-[6px] text-[8px] leading-[12px] bg-[#3670FF] text-white px-[9px] py-[6px] font-semibold">
            Click Here to Bet
          </button>
        </div>
      </div>
    </section>
  );
}
