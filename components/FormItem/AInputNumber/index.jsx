
import { Form, InputNumber } from 'antd';

const AInputNumber = (props) => {
  const {
    label,
    model,
    rules,
    placeholder,
    min,
    max,
    disabled,
    onChange,
    changeOnWheel = true,
    controls = true
  } = props;

  return (
    (label || label === ' ') ?
      (<Form.Item label={label} name={model} rules={rules}>
        <InputNumber
          placeholder={placeholder}
          min={min}
          max={max}
          disabled={disabled}
          onChange={onChange}
          // changeOnWheel={changeOnWheel}
          controls={controls}
        />
      </Form.Item>) :
      (<InputNumber
        placeholder={placeholder}
        min={1}
        max={10}
        disabled={disabled}
        onChange={onChange}
        // changeOnWheel={changeOnWheel}
        controls={controls}
      />)
  );
};

export default AInputNumber;