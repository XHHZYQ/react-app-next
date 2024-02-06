import { Button, Form } from 'antd';
import { useState, useEffect } from 'react';
import { ASelect, AInput, ADatePicker, ARangePicker } from '../FormItem';
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

  const [form] = Form.useForm();
  const [formModel, setFormModel] = useState(searchParams);

  // 查询方法
  const handleSearch = () => {
    setTableList(formModel);
  };

  // 重置查询
  const resetSearch = () => {
    form.setFieldsValue({
      lessonType: undefined,
      classId: undefined,
      lessonId: undefined,
      startEndTime: undefined
    });
    setFormModel((value) => {
      const newValue = {
        ...value,
        lessonType: undefined,
        classId: undefined,
        lessonId: undefined,
        startEndTime: undefined
      };
      setTableList(newValue);
      return newValue;
    });
    console.log('formModel。。', formModel);
  };

  const onValuesChange = (changedValues, allValues) => {
    setFormModel(allValues);
  };
  return (
    <div style={{ marginBottom: '20px' }}>
      <Form
        form={form}
        labelCol={labelCol}
        wrapperCol={wrapperCol}
        layout={layout}
        size={size}
        initialValues={formModel}
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
          } else if (item.inputType === 'datePicker') {
            // 日期选择
            return (
              <ADatePicker key={index}  {...item} />
            );
          } else if (item.inputType === 'rangePicker') {
            // 日期范围选择
            return (
              <ARangePicker key={index}  {...item} />
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
          <Button onClick={resetSearch} style={{ marginLeft: '10px' }}> 重置 </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default TableSearch;