import classNames from 'classnames';
import { useState } from 'react';

interface PropsDto {
  data: {
    name: string;
    value: string;
  }[];
  placeholder: string;
  onValueChange: (value: string) => void;
  value?: string;
  required?: boolean;
  label?: string;
  colorLabel: string;
}

export function MultipleOptionsBox({
  //
  data,
  onValueChange,
  placeholder,
  colorLabel,
  label,
  required,
  value,
}: PropsDto): JSX.Element {
  const [dataSelect, setDataSelect] = useState<string[]>(data.filter((i) => value.includes(i.value)).map((i) => i.name));
  const [isOpenOption, setIsOpenOption] = useState(false);

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

      <div className="group relative">
        <div onClick={() => setIsOpenOption((pre) => !pre)} className="rounded-xl border py-1 px-2 cursor-pointer">
          <span>{dataSelect.length ? dataSelect.join(', ') : placeholder} </span>
        </div>

        <div
          className={classNames('absolute z-10 w-full max-h-24 overflow-y-auto bg-white', {
            hidden: !isOpenOption,
            block: isOpenOption,
          })}>
          <ul className="list-none w-full max-h-24">
            {data.map((item, index) => (
              <li key={index} className="py-1 px-2 hover:bg-gray-100 cursor-pointer">
                <input
                  id={item.value}
                  type="checkbox"
                  defaultChecked={value.includes(item.value)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setDataSelect((e) => [...e, item.name]);
                      onValueChange(value ? `${value}, ${item.value}` : item.value);
                    } else {
                      setDataSelect((e) => e.filter((i) => i !== item.name));
                      onValueChange(
                        value
                          .split(', ')
                          .filter((i) => i !== item.value)
                          .join(', '),
                      );
                    }
                    setIsOpenOption(false);
                  }}
                />
                <label htmlFor={item.value}> {item.name}</label>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
