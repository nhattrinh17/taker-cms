interface PropsButton {
  backgroundColor: string;
  content: string;
  disabled: boolean;
  onPress: () => void;
  color?: string;
  type?: string;
}

export function ButtonUiStyleOne({ backgroundColor, type, content, disabled, onPress, color }: PropsButton): JSX.Element {
  return (
    <div className="h-full">
      <button
        className="h-full py-2 px-3 rounded-md"
        // disabled={disabled}
        style={{
          backgroundColor: disabled ? '#ccc' : backgroundColor,
          color: color || 'white',
          cursor: disabled ? 'not-allowed' : 'pointer',
        }}
        onClick={onPress}
        type={type ? type : 'button'}>
        {content}
      </button>
    </div>
  );
}
