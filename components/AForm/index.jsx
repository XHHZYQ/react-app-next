import { useEffect } from 'react';
import { Button, Form } from 'antd';
import { ASelect, AInput, ATextarea, ARangePicker, AInputNumber, ACheckbox, ACheckboxGroup, ARadioGroup } from '../FormItem/index.js';
import styles from './AForm.module.scss';

const onFinish = (values) => {
  console.log('Success:', values);
};

/**
 * Form 组件
 **/
const AForm = (props) => {
  const {
    initialValues = {},
    formModel = {},
    formList = [],
    addParam,
    editParam,
    detailParam,
    layout = 'horizontal',
    size = 'middle',
    disabled = false,
    labelAlign = 'right',
    labelCol = { span: 8 },
    wrapperCol = { span: 16 },
    maxWidth = { maxWidth: 600 },
    submitBtnText = '确定',
    cancelBtnText = '重置'
  } = props;

  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue(formModel);
    console.log('useEffect formModel', formModel);

    // detailParam();


  });

  // 重置表单
  const resetSearch = () => {
    form.resetFields();
  };

  return (
    <div className={styles.formBox} style={{ marginBottom: '40px' }}>
      {
        // initialValues = { initialValues }
        <Form
          form={form}
          labelCol={labelCol}
          wrapperCol={wrapperCol}
          style={maxWidth}
          layout={layout}
          size={size}
          disabled={disabled}
          labelAlign={labelAlign}
          onFinish={onFinish}
        >
          {formList.map((item, index) => {
            if (item.inputType === 'input') {
              // 输入框
              return <AInput key={index} {...item} />;
            } else if (item.inputType === 'select') {
              // 选择框
              return <ASelect key={index} {...item} />;
            } else if (item.inputType === 'datePicker') {
              // 日期选择
              return <ADatePicker key={index} {...item} />;
            } else if (item.inputType === 'rangePicker') {
              // 日期范围选择
              return <ARangePicker key={index} {...item} />;
            } else if (item.inputType === 'inputNumber') {
              // 数字输入框
              return <AInputNumber key={index} {...item} />;
            } else if (item.inputType === 'checkbox') {
              // 单选框组
              return <ACheckbox key={index} {...item} />;
            } else if (item.inputType === 'checkboxGroup') {
              // 数字输入框
              return <ACheckboxGroup key={index} {...item} />;
            } else if (item.inputType === 'radioGroup') {
              // 单选框组
              return <ARadioGroup key={index} {...item} />;
            } else if (item.inputType === 'textarea') {
              // 单选框组
              return <ATextarea key={index} {...item} />;
            }
          })}

          <Form.Item
            wrapperCol={{
              offset: labelCol.span,
              span: wrapperCol.span
            }}
          >
            <Button type="primary" htmlType="submit">
              {submitBtnText}
            </Button>
            <Button onClick={resetSearch} style={{ marginLeft: '10px' }}>
              {cancelBtnText}
            </Button>
          </Form.Item>
        </Form>
      }
    </div>
  );
};

export default AForm;
