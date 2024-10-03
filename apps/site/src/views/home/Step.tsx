export default function Step() {
  return (
    <section className="flex flex-col gap-[96px] text-center font-medium lg:py-[96px] py-[20px] lg:px-[160px] px-[20px]">
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
      <div className="flex md:flex-row flex-col gap-[32px] font-normal">
        <div className="rounded-[12px] p-[32px] flex flex-col gap-[32px] bg-[#FFFFFF] md:w-1/3 w-full ">
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
              Download the STRIKE Chrome extension to authenticate and interact
              with STRIKE-supported platforms via the Internet Computer Protocol
              (ICP).
            </p>
          </div>
        </div>
        <div className="rounded-[12px] p-[32px] flex flex-col gap-[32px] bg-[#FFFFFF] md:w-1/3 w-full">
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
              Define actions in a JSON file, host it publicly, and test it using
              the STRIKE website to preview the actions before sharing.
            </p>
          </div>
        </div>
        <div className="rounded-[12px] p-[32px] flex flex-col gap-[32px] bg-[#FFFFFF] md:w-1/3 w-full">
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
              where it will unfurl into a STRIKE Card for users to interact with
              your canister actions, powered by ICP.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
