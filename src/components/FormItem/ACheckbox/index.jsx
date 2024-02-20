
import { Form, Checkbox } from 'antd';

const ACheckbox = (props) => {
  const { label, model, options, rules, checked = "checked", disabled, change } = props;

  return (
    (label || label === ' ') ?
      (<Form.Item label={label} name={model} rules={rules} valuePropName={checked}>
        <Checkbox
          disabled={disabled}
          onChange={change}
        >{options.label}</Checkbox>
      </Form.Item>) :
      (<Checkbox
        disabled={disabled}
        onChange={change}
      >{options.label}</Checkbox>)
  );
};
export default ACheckbox;