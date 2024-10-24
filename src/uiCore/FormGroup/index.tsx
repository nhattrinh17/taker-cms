import classNames from 'classnames/bind';
import style from './styles.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition, faUser } from '@fortawesome/free-solid-svg-icons';

interface PropsDto {
  value: any;
  onChange: (value: any) => void;
  label: string;
  placeholder: string;
  typeInput: string;
  colorLabel?: string;
  onBlur?: () => {};
  iconInput?: IconDefinition;
  required?: boolean;
  minValue?: any;
  step?: any;
}

const cx = classNames.bind(style);

export function FormGroup2({ label, onBlur, placeholder, step, onChange, minValue, colorLabel, required, typeInput, value, iconInput }: PropsDto): JSX.Element {
  return (
    <div className={cx('fromGroup__wrapper')}>
      <label
        className={cx('fromGroup__label')}
        style={{
          color: colorLabel || '#575962',
        }}>
        <span>{label}</span>
        <span
          className={cx('fromGroup__label--required', {
            ['fromGroup__label--required--active']: required,
          })}>
          *
        </span>
      </label>
      <div className={cx('fromGroup__body')}>
        {typeInput !== 'textarea' ? (
          <input
            step={step}
            min={minValue}
            defaultChecked={Boolean(value)}
            type={typeInput}
            placeholder={placeholder}
            className={cx('fromGroup__body--input')}
            value={value}
            required={required}
            onChange={(e) => {
              if (typeInput !== 'checkbox') {
                onChange(e.target.value);
              } else {
                onChange(e.target.checked);
              }
            }}
          />
        ) : (
          <textarea placeholder={placeholder} className={cx('fromGroup__body--input')} value={value} onChange={(e) => onChange(e.target.value)} />
        )}
        {iconInput ? <FontAwesomeIcon icon={iconInput} className={cx('fromGroup__body--icon')} /> : <></>}
      </div>
    </div>
  );
}
