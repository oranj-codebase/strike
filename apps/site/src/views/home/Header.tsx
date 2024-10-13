'use client';
import { useState } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { ConnectButton, ConnectDialog } from '@blinks-icp/wallet-adapter-react';
import { ICP_BLINK_PREFIX } from '@blinks-icp/core';
import { StrikeLogo, BetBTCIcon, LinkIcon } from '@/assets';
import '@blinks-icp/core/index.css';
import '@blinks-icp/wallet-adapter-react/index.css';

const StrikeSlider = dynamic(() => import('./StrikeSlider'), { ssr: false });

export default function Header() {
  const router = useRouter();

  const [tempUrl, setTempUrl] = useState('');

  const handlerUnFurlBtnClick = () => {
    if (!tempUrl) return;
    if (ICP_BLINK_PREFIX.test(new URL(tempUrl).searchParams.get('url') ?? '')) {
      const url =
        window.location.origin +
        '/action?url=' +
        new URL(tempUrl).searchParams.get('url');
      router.push(url);
    }
  };

  return (
    <section className="flex md:flex-row flex-col gap-[64px] mt-[32px] lg:pl-[160px] px-[20px]">
      <div className="flex flex-col justify-between w-full">
        <div className="flex flex-row justify-between lg:py-[0px] py-[20px]">
          <a className="flex flex-row gap-[4.36px] items-center" href="/">
            <StrikeLogo width={24} height={24} />
            <span className="font-syne font-bold text-[19.64px] leading-[19.64px]">
              STRIKE
            </span>
          </a>
          <div className="flex flex-row font-medium items-center text-[14px] leading-[24px] gap-[32px]">
            <a
              href="https://chromewebstore.google.com/detail/strike-by-oranj/iomlailejogiahpdlmckpjdkipgpfccm "
              target="_blank"
            >
              Get Chrome Extension
            </a>
          </div>
        </div>
        <div className="flex flex-col gap-[48px] pb-[48px]">
          <div className="flex flex-row gap-[12px] xs:py-[10px]">
            <span className="font-normal text-[18px] leading-[27px]">
              Brought to you by
            </span>
            <BetBTCIcon width={92} height={22} />
          </div>
          <div className="flex flex-col gap-[12px] font-medium font-sans text-[65px] leading-[69px] lg:text-left text-center">
            <span>Share actionable </span>
            <div className="lg:flex md:hidden sm:flex hidden flex flex-row lg:justify-between justify-center items-center">
              links
              <button className="w-[80px] h-[52px] bg-[#3670FF] text-white rounded-[12px] py-[14px] px-[28px] lg:mx-[0px] mx-[14px]">
                <LinkIcon width={24} height={24} />
              </button>
              with ease
            </div>
            <div className="lg:hidden md:block sm:hidden block">
              <div className="flex flex-row lg:justify-between justify-center items-center">
                links
                <button className="w-[80px] h-[52px] bg-[#3670FF] text-white rounded-[12px] py-[14px] px-[28px] lg:mx-[0px] mx-[14px]">
                  <LinkIcon width={24} height={24} />
                </button>
                with
              </div>
              <span>ease</span>
            </div>
            <span>powered by ICP.</span>
          </div>
          <div className="font-normal text-[18px] leading-[27px]">
            <p className="text-justify">
              STRIKE helps users share links that convert into STRIKE Cards,
              making it simple to interact and perform actions on social media.
            </p>
          </div>
          <div className="flex sm:flex-row flex-col justify-between sm:gap-[48px] gap-[10px]">
            <input
              type="text"
              className="outline-none w-full sm:rounded-[12px] rounded-t-[12px] border-[#D4D4D8] py-[12px] px-[14px]"
              placeholder="Enter URL to unfurl"
              value={tempUrl}
              onChange={(e) => setTempUrl(e.target.value)}
            />
            <button
              className="bg-[#3670FF] text-white py-[12px] px-[18px] border-1 rounded-[12px] border-[#2B5ACC] font-semibold text-[16px] leading-[24px]"
              onClick={handlerUnFurlBtnClick}
            >
              Unfurl
            </button>
          </div>
        </div>
      </div>
      <div className="w-full">
        <div className="lg:h-[777px] w-full flex md:flex-row flex-col gap-[20px] w-full">
          <StrikeSlider />
        </div>
      </div>
      <ConnectDialog />
    </section>
  );
}
