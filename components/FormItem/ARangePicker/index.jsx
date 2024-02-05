import { Form, DatePicker } from 'antd';

const { RangePicker } = DatePicker;

const handleDisabledDate = (disabledDate, currentDate) => {
  if (typeof disabledDate === 'function') {
    return disabledDate(currentDate);
  } else {
    return true;
  }
};

const ARangePicker = ({
  label,
  model,
  rules,
  placeholder,
  change,
  allowClear,
  disabled,
  showTime = true,
  disabledDate,
  format
}) => {
  return label || label === ' ' ? (
    <Form.Item label={label} name={model} rules={rules}>
      <RangePicker
        placeholder={placeholder}
        onChange={change}
        allowClear={allowClear}
        disabled={disabled}
        showTime={showTime}
        disabledDate={(currentDate) => handleDisabledDate(disabledDate, currentDate)}
        format={typeof format === 'function' ? format() : null}
      />
    </Form.Item>
  ) : (
    <RangePicker
      placeholder={placeholder}
      onChange={change}
      allowClear={allowClear}
      showTime={showTime}
      disabled={disabled}
      disabledDate={(currentDate) => handleDisabledDate(disabledDate, currentDate)}
      format={typeof format === 'function' ? format() : null}
    />
  );
};

export default ARangePicker;
