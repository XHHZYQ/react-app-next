
import { Form, Checkbox } from 'antd';

const ACheckboxGroup = (props) => {
  const { label, model, rules, options, disabled, change } = props;

  return (
    (label || label === ' ') ?
      (<Form.Item label={label} name={model} rules={rules}>
        <Checkbox.Group
          options={options}
          disabled={disabled}
          onChange={change}
        />
      </Form.Item>) :
      (<Checkbox.Group
        options={options}
        disabled={disabled}
        onChange={change}
      />)
  );
};
export default ACheckboxGroup;