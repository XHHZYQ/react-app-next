
import { Input } from 'antd';

const AInput = (props) => {
  const { placeholder, onChange, allowClear = true, disabled = false } = props;
  return (
    <div>
      <Input
        placeholder={placeholder}
        onChange={onChange}
        allowClear={allowClear}
        disabled={disabled}
      />
    </div>
  );
};

export default AInput;