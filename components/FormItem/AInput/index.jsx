
import { Form, Input } from 'antd';

/**
 * 输入框 组件
 **/
const AInput = (props) => {
  const { label, model, rules, placeholder, change, allowClear = true, disabled = false } = props;
  return (
    (label || label === ' ') ?
      (<Form.Item label={label} name={model} rules={rules}>
        <Input
          placeholder={placeholder}
          onChange={change}
          allowClear={allowClear}
          disabled={disabled}
        />
      </Form.Item>) :
      (<Input
        placeholder={placeholder}
        onChange={change}
        allowClear={allowClear}
        disabled={disabled}
      />)
  );
};

export default AInput;