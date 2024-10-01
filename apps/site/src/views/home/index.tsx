'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { ICP_BLINK_PREFIX } from '@blinks-icp/core';
import { ConnectButton, ConnectDialog } from '@blinks-icp/wallet-adapter-react';
import {
  StrikeLogo,
  TelegramIcon,
  TwitterIcon,
  Vector,
  BetBTCIcon,
  LinkIcon,
  CheckBoxIcon,
} from '@/assets';
import '@blinks-icp/core/index.css';
import '@blinks-icp/wallet-adapter-react/index.css';

const StrikeSlider = dynamic(() => import('./StrikeSlider'), { ssr: false });

export function Home() {
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
    <div>
      <main className="container max-w-[1440px] mx-auto font-inter ">
        <section className="flex flex-row gap-[64px] mt-[32px] pl-[160px]">
          <div className="flex flex-col justify-between w-full">
            <div className="flex flex-row justify-between">
              <a className="flex flex-row gap-[4.36px] items-center" href="/">
                <StrikeLogo width={24} height={24} />
                <span className="font-syne font-bold text-[19.64px] leading-[19.64px]">
                  STRIKE
                </span>
              </a>
              <div className="flex flex-row font-medium items-center text-[14px] leading-[24px] gap-[32px]">
                <a href="/">Get Chrome Extension</a>
              </div>
            </div>
            <div className="flex flex-col gap-[48px] pb-[48px]">
              <div className="flex flex-row gap-[12px] ">
                <span className="font-normal text-[18px] leading-[27px]">
                  Brought to you by
                </span>
                <BetBTCIcon width={92} height={22} />
              </div>
              <div className="flex flex-col gap-[12px] font-medium font-sans text-[72px] leading-[72px]">
                <span>Share actionable </span>
                <div className="flex flex-row justify-between items-center">
                  links
                  <button className="w-[80px] h-[52px] bg-[#3670FF] text-white rounded-[12px] py-[14px] px-[28px]">
                    <LinkIcon width={24} height={24} />
                  </button>
                  with ease
                </div>
                <span>powered by ICP.</span>
              </div>
              <div className="font-normal text-[18px] leading-[27px]">
                <p>
                  STRIKE helps users share links that convert into STRIKE Cards,
                  making it simple to interact and perform actions on social
                  media.
                </p>
              </div>
              <div className="flex flex-row justify-between">
                <input
                  type="text"
                  className="outline-none min-w-[475px] rounded-[12px] border-[1px] border-[#D4D4D8] py-[12px] px-[14px]"
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
          <div className="flex flex-row gap-[20px] w-full">
            <div className="h-[777px] w-full flex flex-row gap-[20px]">
              <StrikeSlider />
            </div>
          </div>
          <ConnectDialog />
        </section>
        <section className="flex flex-col gap-[96px] text-center font-medium py-[96px] px-[160px]">
          <div className="flex flex-col gap-[16px]">
            <div>
              <a className="text-[#3670FF] text-[16px] leading-[24px]" href="/">
                Steps
              </a>
              <p className="text-[48px] leading-[60px] font-sans">
                How STRIKE works
              </p>
            </div>
            <div>
              <p className="text-[18px] leading-[27px] font-normal">
                Let's explore how STRIKE operates to better understand its
                operation.
              </p>
            </div>
          </div>
          <div className="flex flex-row gap-[32px] font-normal">
            <div className="rounded-[12px] p-[32px] flex flex-col gap-[32px] bg-[#FFFFFF] w-1/3">
              <div className="flex justify-center items-center w-[64px] h-[64px] rounded-[12px] border-2] bg-[#F4F4F5]">
                <span className="text-[30px] leading[38px] font-sans font-medium">
                  1
                </span>
              </div>
              <div className="flex flex-col justfiy-between text-left">
                <p className="text-[24px] leading-[32px]  font-medium font-sans">
                  Install the Chrome Extension
                </p>
                <p className="text-[16px] leading-[24px] font-normal text-justify">
                  Download the STRIKE Chrome extension to authenticate and
                  interact with STRIKE-supported platforms via the Internet
                  Computer Protocol (ICP).
                </p>
              </div>
            </div>
            <div className="rounded-[12px] p-[32px] flex flex-col gap-[32px] bg-[#FFFFFF] w-1/3">
              <div className="flex justify-center items-center w-[64px] h-[64px] rounded-[12px] border-2] bg-[#F4F4F5]">
                <span className="text-[30px] leading[38px] font-sans font-medium">
                  2
                </span>
              </div>
              <div className="flex flex-col justfiy-between text-left">
                <p className="text-[24px] leading-[32px] font-sans font-medium">
                  Create and Host the Actions File
                </p>
                <p className="text-[16px] leading-[24px] font-normal text-justify">
                  Define actions in a JSON file, host it publicly, and test it
                  using the STRIKE website to preview the actions before
                  sharing.
                </p>
              </div>
            </div>
            <div className="rounded-[12px] p-[32px] flex flex-col gap-[32px] bg-[#FFFFFF] w-1/3">
              <div className="flex justify-center items-center w-[64px] h-[64px] rounded-[12px] border-2] bg-[#F4F4F5]">
                <span className="text-[30px] leading[38px] font-sans font-medium">
                  3
                </span>
              </div>
              <div className="flex flex-col justfiy-between text-left">
                <p className="text-[24px] leading-[32px] font-sans font-medium">
                  Share and Engage with STRIKE Cards
                </p>
                <p className="text-[16px] leading-[24px] font-normal text-justify">
                  Share your hosted link on platforms like X (formerly Twitter),
                  where it will unfurl into a STRIKE Card for users to interact
                  with your canister actions, powered by ICP.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="flex flex-row gap-[64px] py-[96px] items-center font-normal px-[160px]">
          <div className="flex flex-col gap-[16px] w-full">
            <div className="font-medium">
              <a className="text-[#3670FF] text-[16px] leading-[24px]" href="/">
                Features
              </a>
              <p className="font-sans text-[48px] leading-[60px]">
                Features of STRIKE
              </p>
            </div>
            <div>
              <p className="text-[18px] leading-[27px] text-justify">
                STRIKE empowers users to share actionable links that interact
                with canisters on the Internet Computer Protocol (ICP). With
                STRIKE, users can perform secure and efficient actions directly
                from social platforms, making decentralized interactions easy
                and accessible.
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
          <div className="px-[88px] py-[112px]">
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
        <section className="flex flex-col gap-[96px] py-[96px] px-[160px]">
          <div className="px-[200px] flex flex-col gap-[16px]">
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
                Unlock the full potential of STRIKE by interacting with
                canisters directly through shared links on social media. Using
                the STRIKE Chrome extension, users can engage with interactive
                STRIKE Cards to take actions like placing bets or managing
                assets—all with one click, powered by the Internet Computer
                Protocol (ICP).
              </p>
            </div>
          </div>
          <div className="flex justify-center items-center w-full h-[560px] rounded-[12px] bg-[#D4D4D8]">
            <Vector />
          </div>
        </section>
        <footer className="flex flex-row justify-between py-[48px] px-[160px]">
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
      </main>
    </div>
  );
}
