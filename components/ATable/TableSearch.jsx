import { Button, Form } from 'antd';
import { ASelect, AInput } from '../FormItem/index.js';
import { SearchOutlined } from '@ant-design/icons';

const onValuesChange = (changedValues, allValues) => {
  console.log('onValuesChange:', changedValues, allValues);
};

const TableSearch = (props) => {
  const {
    formList = [],
    initialValues = {},
    layout = 'inline',
    size = 'middle',
    labelAlign = 'right',
    labelCol = { span: 8 },
    wrapperCol = { span: 16 }
  } = props;

  return (
    <div style={{ marginBottom: '20px' }}>
      <Form
        labelCol={labelCol}
        wrapperCol={wrapperCol}
        layout={layout}
        size={size}
        initialValues={initialValues}
        labelAlign={labelAlign}
        onValuesChange={onValuesChange}
      >
        {
          formList.map((item, index) => {
            if (item.inputType === 'input') {
              // 输入框
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
            } else if (item.inputType === 'select') {
              // 选择框
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
            }
          })
        }

        <Form.Item
          wrapperCol={{
            offset: labelCol,
            span: wrapperCol,
          }}
        >
          <Button type="primary" htmlType="submit" icon={<SearchOutlined/>} > 查询 </Button>
          <Button style={{ marginLeft: '10px' }}> 取消 </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default TableSearch;