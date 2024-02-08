
import { Form, Checkbox } from 'antd';

const ACheckboxGroup = (props) => {
  const { label, model, rules, options, disabled, onChange } = props;

  return (
    (label || label === ' ') ?
      (<Form.Item label={label} name={model} rules={rules}>
        <Checkbox.Group
          options={options}
          disabled={disabled}
          onChange={onChange}
        />
      </Form.Item>) :
      (<Checkbox.Group
        options={options}
        disabled={disabled}
        onChange={onChange}
      />)
  );
};
export default ACheckboxGroup;