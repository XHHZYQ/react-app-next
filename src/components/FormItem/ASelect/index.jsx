
import { Form, Select } from 'antd';
import Style from './ASelect.module.scss';

/**
 * 选择框 组件
 **/
const ASelect = (props) => {
  const { label, model, rules, options, defaultValue, placeholder, change, showSearch = true, autoClearSearchValue = true, allowClear = true, disabled = false, popupClassName } = props;
  return (
    (label || label === ' ') ?
      (<Form.Item label={label} name={model} rules={rules}>
        <Select
          defaultValue={defaultValue}
          placeholder={placeholder}
          showSearch={showSearch}
          autoClearSearchValue={autoClearSearchValue}
          onChange={change}
          options={options}
          allowClear={allowClear}
          disabled={disabled}
          popupClassName={popupClassName}
        />
      </Form.Item>) :
      (<Select
        defaultValue={defaultValue}
        placeholder={placeholder}
        showSearch={showSearch}
        autoClearSearchValue={autoClearSearchValue}
        onChange={change}
        options={options}
        allowClear={allowClear}
        disabled={disabled}
        popupClassName={popupClassName}
      />)
  );
};

export default ASelect;