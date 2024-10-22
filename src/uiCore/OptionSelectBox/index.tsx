import classNames from 'classnames';
import { useState } from 'react';

interface PropsOptionSelect {
  placeholder: string;
  data: {
    name: string;
    value: string;
  }[];
  onFetch: (value: string) => Promise<void>;
  name: string;
}

export function OptionSelectBox({ data, onFetch, placeholder, name }: PropsOptionSelect): JSX.Element {
  const [isFocus, setIsFocus] = useState(false);

  return (
    <div className="h-full">
      <select
        className={classNames('h-full cursor-pointer border outline-none rounded-lg px-2 py-2 w-fit flex items-center', {
          'border-[#22242626]': !isFocus,
          'border-[var(--primaryColor)]': isFocus,
        })}
        //
        name={name}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}>
        <option className="cursor-pointer" value={''}>
          {placeholder}
        </option>
        {data.map((item) => (
          <option className="cursor-pointer" key={item.value} value={item.value}>
            {item.name}
          </option>
        ))}
      </select>
    </div>
  );
}
