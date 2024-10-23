import classNames from 'classnames';
import { useState } from 'react';

interface PropsOptionSelect {
  placeholder: string;
  data: {
    name: string;
    value: string;
  }[];
  onChange: (value: string) => Promise<void>;
  name: string;
  label?: string;
  colorLabel?: string;
  required?: boolean;
}

export function OptionSelectBox({ data, onChange, placeholder, name, required, colorLabel, label }: PropsOptionSelect): JSX.Element {
  const [isFocus, setIsFocus] = useState(false);

  return (
    <div className="h-full w-full">
      {label ? (
        <label
          className="text-sm flex items-center font-semibold mb-1"
          style={{
            color: colorLabel || '#575962',
          }}>
          <span>{label}</span>
          <span
            className={classNames(' ml-1 mt-1 text-red-600', {
              block: required,
              hidden: !required,
            })}>
            *
          </span>
        </label>
      ) : (
        <></>
      )}

      <select
        onChange={(e) => onChange(e.target.value)}
        className={classNames('h-full cursor-pointer border outline-none rounded-lg px-2 py-2 flex items-center w-full', {
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
