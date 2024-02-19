

import { Form, DatePicker } from 'antd';

const handleDisabledDate = (disabledDate, currentDate) => {
  if (typeof disabledDate === 'function') {
    return disabledDate(currentDate);
  } else {
    return false;
  }
};

/**
 * 日期选择 组件
 **/
const ADatePicker = ({ label, model, rules, placeholder, picker, change, allowClear, disabled, disabledDate }) => {
  // picker 可选择范围：date | week | month | quarter | year
  return (label || label === ' ') ?
    (<Form.Item label={label} name={model} rules={rules}>
      <DatePicker
        picker={picker ? picker : 'date'}
        placeholder={placeholder}
        onChange={change}
        allowClear={allowClear}
        disabled={disabled}
        disabledDate={(currentDate) => handleDisabledDate(disabledDate, currentDate)}
      />
    </Form.Item>) :
    (<DatePicker
      placeholder={placeholder}
      onChange={change}
      allowClear={allowClear}
      disabled={disabled}
      disabledDate={(currentDate) => handleDisabledDate(disabledDate, currentDate)}
    />)
};

export default ADatePicker;