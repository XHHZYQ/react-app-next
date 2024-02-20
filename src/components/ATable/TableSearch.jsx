import { Button, Form } from 'antd';
import { useState, useEffect } from 'react';
import { ASelect, AInput, ADatePicker, ARangePicker } from '../FormItem';
import { SearchOutlined } from '@ant-design/icons';
import Style from './tableSearch.scss';

/**
 * 清空搜索条件
 * @param sourceData 重置对象
 * @param excludeKey 不重置的字段
 */
const resetData = (sourceData, excludeKey = []) => {
  const source = { ...sourceData };
  if (source && Object.keys(source).length) {
    let exclude = ['limit', 'page'];
    excludeKey.length && (exclude = [...excludeKey, ...exclude]);
    for (let key in source) {
      if (exclude.every((el) => el !== key)) {
        if (Array.isArray(source[key])) {
          // 数组
          source[key] = [];
        } else if (typeof source[key] !== 'undefined') {
          source[key] = undefined;
        }
      }
    }
  }
  return source;
};

/**
 * 搜索 组件
 **/
const TableSearch = (props) => {
  const {
    excludeResetKey,
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
  const handleSearch = (values) => {
    const defaultValue = {};
    excludeResetKey.forEach(item => defaultValue[item] = searchParams[item]);

    setTableList({ ...values, ...defaultValue });
  };

  // 重置查询
  const resetSearch = () => {
    const data = resetData(formModel, excludeResetKey);
    form.setFieldsValue(data); // 重置表单
    setTableList(data);
    console.log('formModel。。', data);
  };

  const onValuesChange = (changedValues, allValues) => {
    setFormModel(allValues);
  };

  return (
    <div style={{ marginBottom: '5px' }}>
      <Form
        form={form}
        labelCol={labelCol}
        wrapperCol={wrapperCol}
        layout={layout}
        size={size}
        initialValues={formModel}
        labelAlign={labelAlign}
        onValuesChange={onValuesChange}
        onFinish={handleSearch}
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
            offset: labelCol.span,
            span: wrapperCol.span
          }}
        >
          <Button type="primary" htmlType="submit" icon={<SearchOutlined />}>
            查询
          </Button>
          <Button onClick={resetSearch} style={{ marginLeft: '10px' }}> 重置 </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default TableSearch;