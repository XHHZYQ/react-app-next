
import { Select } from 'antd';
import Style from './ASelect.module.scss';

const ASelect = (props) => {
  const { options, defaultValue, placeholder, onChange, showSearch = true, autoClearSearchValue = true, allowClear = true, disabled = false, popupClassName } = props;
  return (
    <div className={Style.selectBox}>
      <Select
        defaultValue={defaultValue}
        placeholder={placeholder}
        showSearch={showSearch}
        autoClearSearchValue={autoClearSearchValue}
        onChange={onChange}
        options={options}
        allowClear={allowClear}
        disabled={disabled}
        popupClassName={popupClassName}
      />
    </div>
  );
};

export default ASelect;