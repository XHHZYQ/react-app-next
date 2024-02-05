
import { Form, Input } from 'antd';


const AInput = (props) => {
  const { label, model, rules, placeholder, onChange, allowClear = true, disabled = false } = props;
  return (
    <Form.Item label={label} name={model} rules={rules}>
    <Input
      placeholder={placeholder}
      onChange={onChange}
      allowClear={allowClear}
      disabled={disabled}
      />
    </Form.Item>
  );
};

export default AInput;