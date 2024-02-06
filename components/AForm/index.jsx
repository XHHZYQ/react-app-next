
import { Button, Form } from 'antd';
import { ASelect, AInput } from '../FormItem/index.js';
import styles from './AForm.module.scss';

const onValuesChange = (changedValues, allValues) => {
  console.log('onValuesChange:', changedValues, allValues);
};
const onFinish = (values) => {
  console.log('Success:', values);
};
const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo);
};


/**
 * Form 组件
 **/
const AForm = (props) => {
  const {
    formList = [],
    initialValues = {},
    layout = 'horizontal',
    size = 'middle',
    disabled = false,
    labelAlign = 'right',
    submitBtnText = '确定',
    cancelBtnText = '取消'
  } = props;

  console.log('initialValues', initialValues);
  return (
    <div className={styles.formBox} style={{ marginBottom: '40px' }}>
      {<Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        layout={layout}
        size={size}
        initialValues={initialValues}
        disabled={disabled}
        labelAlign={labelAlign}
        onValuesChange={onValuesChange}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        {
          formList.map((item, index) => {
            if (item.inputType === 'select') {
              return (
                <Form.Item
                  key={index}
                  label={item.label}
                  name={item.model}
                  rules={item.rules}
                >
                  <ASelect {...item} />
                </Form.Item>
              );
            } else if (item.inputType === 'input') {
              return (
                <Form.Item
                  key={index}
                  label={item.label}
                  name={item.model}
                  rules={item.rules}
                >
                  <AInput {...item} />
                </Form.Item>
              );
            }

          })
        }

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            {submitBtnText}
          </Button>

          <Button style={{ marginLeft: '10px' }}>
            {cancelBtnText}
          </Button>

        </Form.Item>
      </Form>}
    </div>
  );
};

export default AForm;