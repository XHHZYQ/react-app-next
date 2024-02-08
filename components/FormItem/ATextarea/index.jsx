
import { Form, Input } from 'antd';

const { TextArea } = Input;

/**
 * 输入框 组件
 **/
const AInput = (props) => {
  const { label, model, rules, placeholder, autoSize = { minRows: 2, maxRows: 4 }, change, disabled = false } = props;
  return (
    (label || label === ' ') ?
      (<Form.Item label={label} name={model} rules={rules}>
        <TextArea
          placeholder={placeholder}
          onChange={change}
          autoSize={autoSize}
          disabled={disabled}
        />
      </Form.Item>) :
      (<TextArea
        placeholder={placeholder}
        onChange={change}
        autoSize={autoSize}
        disabled={disabled}
      />)
  );
};

export default AInput;