import { StrikeLogo } from '@/assets';

export default function PrivacyPage() {
  return (
    <div className="max-w-[1440px] mx-auto py-[50px] px-[160px] leading-[27px]">
      <div className="flex flex-row gap-[4.36px] items-center ">
        <StrikeLogo width={24} height={24} />
        <span className="font-bold text-[19.64px] leading-[19.64px]">
          STRIKE
        </span>
      </div>
      <div className="text-center text-[48px] font-semibold">
        <p>Privacy && Policy</p>
      </div>
      <div className="max-w-[900px] mx-auto py-[20px]">
        <div className="text-[16px] font-normal py-[20px]">
          <h1 className="text-[24px] font-medium py-[10px]">Introduction</h1>
          <p>
            Oranj Base Pvt. Ltd. ("Company", "we", "us", or "our") respects your
            privacy and is committed to protecting it through compliance with
            this policy.
          </p>
          <p>This policy describes:</p>
          <ul className="list-disc pl-[40px] py-[15px]">
            <li>
              The types of information we may collect from you or that you may
              provide when you use our STRIKE application or related services.
            </li>
            <li>
              Our practices for collecting, using, maintaining, protecting, and
              disclosing that information.
            </li>
          </ul>
          <p>This policy applies to information collected:</p>
          <ul className="list-disc pl-[40px] py-[15px]">
            <li>Through our STRIKE application and related services.</li>
            <li>
              In email, text, and other electronic communications between you
              and STRIKE.
            </li>
            <li>
              Through any APIs, developer tools, or decentralized protocols
              ("Services") developed by the Company.
            </li>
          </ul>
        </div>
        <div className="text-[16px] font-normal py-[20px]">
          <h1 className="text-[24px] font-medium py-[10px]">
            Individuals Under the Age of 18
          </h1>
          <p>
            Our services are not intended for children under 18. We do not
            knowingly collect personal information from anyone under 18. If you
            believe we have collected information from a child under 18, please
            contact us at hello@oranj.co.in.
          </p>
        </div>
        <div className="text-[16px] font-normal py-[20px]">
          <h1 className="text-[24px] font-medium py-[10px]">
            Information We Collect
          </h1>
          <p>We collect information:</p>
          <ul className="list-disc pl-[40px] py-[15px]">
            <li>
              By which you may be personally identified, such as name, email
              address, wallet address, and other personal information.
            </li>
            <li>About your device, internet connection, and usage details.</li>
            <li>
              Automatically as you navigate through our application using
              technologies like cookies or similar tracking technologies.
            </li>
          </ul>
        </div>
        <div className="text-[16px] font-normal py-[20px]">
          <h1 className="text-[24px] font-medium py-[10px]">
            How We Use Your Information
          </h1>
          <p>We use your information to:</p>
          <ul className="list-disc pl-[40px] py-[15px]">
            <li>
              Provide, operate, and improve our STRIKE application and services.
            </li>
            <li>
              Process transactions and send notices about your transactions.
            </li>
            <li>Communicate with you regarding your account or inquiries.</li>
            <li>Fulfill any purpose for which you provide information.</li>
            <li>Analyze usage patterns and improve user experience.</li>
          </ul>
        </div>
        <div className="text-[16px] font-normal py-[20px]">
          <h1 className="text-[24px] font-medium py-[10px]">
            Disclosure of Your Information
          </h1>
          <p>We may disclose information:</p>
          <ul className="list-disc pl-[40px] py-[15px]">
            <li>
              To our subsidiaries, affiliates, contractors, and third-party
              service providers.
            </li>
            <li>
              To comply with legal obligations, enforce our terms of service, or
              respond to legal requests.
            </li>
            <li>
              In the event of a merger, acquisition, or sale of all or a portion
              of our assets.
            </li>
          </ul>
        </div>
        <div className="text-[16px] font-normal py-[20px]">
          <h1 className="text-[24px] font-medium py-[10px]">Data Security</h1>
          <p>
            We implement measures designed to protect your personal information.
            However, the transmission of data over the internet is not
            completely secure, and we cannot guarantee its absolute security.
          </p>
        </div>
        <div className="text-[16px] font-normal py-[20px]">
          <h1 className="text-[24px] font-medium py-[10px]">
            Your Rights and Choices
          </h1>
          <p>
            Depending on your location, you may have certain rights regarding
            your personal information, including:
          </p>
          <ul className="list-disc pl-[40px] py-[15px]">
            <li>
              The right to access and receive a copy of your personal
              information.
            </li>
            <li>The right to correct or update your personal information.</li>
            <li>The right to request deletion of your personal information.</li>
            <li>
              The right to object to or restrict certain processing of your
              information.
            </li>
          </ul>
          <p>
            To exercise these rights, please contact us using the information
            provided in the "Contact Information" section.
          </p>
        </div>
        <div className="text-[16px] font-normal py-[20px]">
          <h1 className="text-[24px] font-medium py-[10px]">
            Changes to Our Privacy Policy
          </h1>
          <p>
            We may update this policy periodically. The date of the last
            revision will be noted at the top of this page. Continued use of our
            services after changes means acceptance of the updated policy.
          </p>
        </div>
        <div className="text-[16px] font-normal py-[20px]">
          <h1 className="text-[24px] font-medium py-[10px]">
            Contact Information
          </h1>
          <p>To ask questions or comment about this policy, contact us at:</p>
          <div className="py-[15px]">
            <p>Oranj Base Pvt. Ltd.</p>
            <p>
              C-10, Royal Villas, Parsn Sesh Nestle, Nanjundapuram Road,
              Nanjundapuram, Coimbatore, Coimbatore South, Tamil Nadu, India,
              641036
            </p>
            <p>Email: hello@oranj.co.in</p>
          </div>
        </div>
      </div>
    </div>
  );
}
