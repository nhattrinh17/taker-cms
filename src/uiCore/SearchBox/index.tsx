'use client';

import { useDebounce } from '@/hooks/useDebounce';
import { faSearch, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import { useEffect, useState } from 'react';

interface PropsSechBox {
  name: string;
  onFetch: (search: string) => void;
  isFetching: boolean;
}

export function SearchBox({ onFetch, name, isFetching }: PropsSechBox): JSX.Element {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const debouncedSearchTerm = useDebounce(searchTerm, 1000);
  const [isFocus, setIsFocus] = useState(false);

  useEffect(() => {
    async function fetch() {
      if (debouncedSearchTerm) {
        onFetch(debouncedSearchTerm);
      }
    }

    fetch();
  }, [debouncedSearchTerm]);

  return (
    <div
      className={classNames(' border  rounded-lg p-2 w-fit flex items-center', {
        'border-[#22242626]': !isFocus,
        'border-[var(--primaryColor)]': isFocus,
      })}>
      <label
        htmlFor={name}
        className={classNames('cursor-pointer', {
          'animate-spin': isFetching,
        })}>
        <FontAwesomeIcon icon={isFetching ? faSpinner : faSearch} className="" />
      </label>
      <input
        //
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        id={name}
        className="outline-none h-full px-2"
        type="text"
        placeholder="Tìm kiếm"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
}
