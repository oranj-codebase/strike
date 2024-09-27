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

const StrikeSlider = dynamic(() => import('./StrikeSlider'));

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
              <div className="flex flex-row font-medium items-center text-[18px] leading-[24px] gap-[32px]">
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
                  STRIKE helps you share superlinks on social media sites such
                  as Telegram or X with embedded actions.{' '}
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
          <div>
            <div>
              <a className="text-[#3670FF] font-medium" href="/">
                Steps
              </a>
              <p className="text-[48px] font-sans">How STRIKE works</p>
            </div>
            <div className="mt-[12px]">
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
                <p className="text-[32px] font-medium font-sans">Lorem Ipsum</p>
                <p className="text-[24px] font-normal">
                  Lorem ipsum dolor sit amet consectetur. Et tortor cras massa
                  bibendum consectetur ut volutpat non massa. Cum dui aliquam
                  nam.
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
                <p className="text-[32px] font-sans font-medium">Lorem Ipsum</p>
                <p className="text-[24px] font-normal">
                  Lorem ipsum dolor sit amet consectetur. Et tortor cras massa
                  bibendum consectetur ut volutpat non massa. Cum dui aliquam
                  nam.
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
                <p className="text-[32px] font-sans font-medium">Lorem Ipsum</p>
                <p className="text-[24px] font-normal">
                  Lorem ipsum dolor sit amet consectetur. Et tortor cras massa
                  bibendum consectetur ut volutpat non massa. Cum dui aliquam
                  nam.
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
              <p className="text-[18px] leading-[27px]">
                Lorem ipsum dolor sit amet consectetur. Turpis arcu sem turpis
                dictumst euismod rhoncus. Pellentesque eget vestibulum lorem
                venenatis dictum nisl cum. Lobortis.
              </p>
            </div>
            <div className="flex flex-col gap-[16px] font-medium">
              <div className="flex gap-[12px] text-[16px] leading-[24px] items-center">
                <CheckBoxIcon height={21} width={21} />
                <span>Superfast using ICP</span>
              </div>
              <div className="flex gap-[12px] text-[16px] leading-[24px] items-center">
                <CheckBoxIcon height={21} width={21} />
                <span>Embedded actions</span>
              </div>
              <div className="flex gap-[12px] text-[16px] leading-[24px] items-center">
                <CheckBoxIcon height={21} width={21} />
                <span>Directly share to social media</span>
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
                  Embedded actions
                </button>
                <button className="border-1 rounded-[32px] py-[4px] px-[8px] bg-[#FAFAFA] text-[#3670FF] absolute top-[134px] right-[-61px] text-[10px] leading-[15px] font-medium">
                  Directly share to social media
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
            <div className="font-normal text-[18px] leading-[27px] text-center">
              <p>
                Lorem ipsum dolor sit amet consectetur. Turpis arcu sem turpis
                dictumst euismod rhoncus. Pellentesque eget vestibulum lorem
                venenatis dictum nisl cum. Lobortis.
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
            <a href="/">Visit Oranj</a>
          </div>
          <div className="font-normal text-[16px] leading-[24px] text-[#717179]">
            <span>© Oranj 2024</span>
          </div>
        </footer>
      </main>
    </div>
  );
}
