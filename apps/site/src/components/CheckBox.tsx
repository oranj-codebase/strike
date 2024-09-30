import { useState } from 'react';
import { CheckBoxIcon } from '@/assets';

export default function CheckBox({ value }: { value?: boolean }) {
  const [checked, setChecked] = useState<boolean>(value ? value : false);

  return (
    <div>
      {checked ? (
        <CheckBoxIcon
          width={21}
          height={21}
          onClick={() => {
            setChecked(!checked);
          }}
        />
      ) : (
        <div
          className="h-[21px] w-[21px] border-2 border-[#3670FF] rounded-[5px]"
          onClick={() => {
            setChecked(!checked);
          }}
        />
      )}
    </div>
  );
}
