
import { Form, Radio } from 'antd';

const ARadioGroup = (props) => {
  const { label, model, rules, options, onChange } = props;

  return (
    (label || label === ' ') ?
      (<Form.Item label={label} name={model} rules={rules}>
        <Radio.Group onChange={onChange}>
          {options.map((item, index) =>
            <Radio key={index} value={item.value}>{item.label}</Radio>)}
        </Radio.Group>
      </Form.Item>) :
      (<Radio.Group onChange={onChange}>
        {options.map((item, index) =>
          <Radio key={index} value={item.value}>{item.label}</Radio>)}
      </Radio.Group>)

  );
};
export default ARadioGroup;