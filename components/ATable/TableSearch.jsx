import { Button, Form } from 'antd';
import { useState } from 'react';
import { ASelect, AInput } from '../FormItem/index.js';
import { SearchOutlined } from '@ant-design/icons';


const TableSearch = (props) => {
  const {
    formList = [],
    searchParams = {},
    setTableList,
    layout = 'inline',
    size = 'middle',
    labelAlign = 'right',
    labelCol = { span: 8 },
    wrapperCol = { span: 16 }
  } = props;

  const [values, setValues] = useState(searchParams);

  // 查询方法
  const handleSearch = async () => {
    setTableList(values);
  };

  const onValuesChange = (changedValues, allValues) => {
    setValues(allValues);
  };
  console.log('searchParams', searchParams);
  return (
    <div style={{ marginBottom: '20px' }}>
      <Form
        labelCol={labelCol}
        wrapperCol={wrapperCol}
        layout={layout}
        size={size}
        initialValues={values}
        labelAlign={labelAlign}
        onValuesChange={onValuesChange}
      >
        {formList.map((item, index) => {
          if (item.inputType === 'input') {
            // 输入框
            return (
              <AInput key={index} {...item} />
            );
          } else if (item.inputType === 'select') {
            // 选择框
            return (
              <ASelect key={index}  {...item} />
            );
          }
        })}

        <Form.Item
          wrapperCol={{
            offset: labelCol,
            span: wrapperCol
          }}
        >
          <Button onClick={handleSearch} type="primary" htmlType="submit" icon={<SearchOutlined />}>
            查询
          </Button>
          <Button style={{ marginLeft: '10px' }}> 取消 </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default TableSearch;