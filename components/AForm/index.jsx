import { useEffect } from 'react';
import { Button, Form } from 'antd';
import {
  ASelect,
  AInput,
  ATextarea,
  ARangePicker,
  AInputNumber,
  ACheckbox,
  ACheckboxGroup,
  ARadioGroup
} from '../FormItem/index.js';
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
    // getDetail(); // TODO 路由跳转添加 id 值，获取详情
  });

  const getDetail = () => {
    const { requestFun, params, resultKey, resultHandle, afterHandle } = detailParam;

    requestFun(params).then(({ data: { content = {} } }) => {
      console.log('getDetail 11。', content);
      let resValue = {};
      if (typeof resultHandle === 'function') {
        // 父组件有处理方法，但没有返回值，说明父组件处理了data，不需要再处理
        const res = resultHandle(content);
        if (res) {
          resValue = res;
        } else {
          return;
        }
      }

      let values = {};
      // 外部处理函数返回的值合并data的值
      if (resultKey) {
        values = { ...content[resultKey], ...resValue };
      } else {
        values = { ...content, ...resValue };
      }

      console.log('getDetail 22', values);
      const formData = {};
      for (let item in values) {
        if (formModel.hasOwnProperty(item) && values[item] !== null) {
          formData[item] = values[item];
        }
      }
      form.setFieldsValue(formData);
      console.log('getDetail。。 33', formData);

      if (typeof afterHandle === 'function') {
        afterHandle(content);
      }
    });
  };

  // 提交表单
  const submitForm = (values) => {
    addParam.requestFun(values);

    if (
      (actionType.value === 'add' && !addParam.requestFun) ||
      (actionType.value === 'edit' && !editParam.requestFun)
    ) {
      $message.error('请求url不能为空');
      return;
    }
    let values = { ...formModel };

    formList.forEach((el) => {
      // 日期格式转换
      let isDate = ['date', 'datetime', 'datetimerange', 'daterange'].some(
        (item) => item === el.inputType
      );
      let model = values[el.model];
      if (isDate && typeof model !== undefined) {
        if (Array.isArray(model)) {
          model = model.map((item) => new Date(item).getTime() / 1000); // 时间戳转为秒（后端约定）
          values[el.model] = model;
        } else {
          model = new Date(model).getTime() / 1000;
          values[el.model] = model;
        }
      }
    });

    /** 兼容不要删除 */
    if (addParam.beforeHandle || editParam.beforeHandle) {
      // 新增、编辑前处理
      let resultValue;
      if (addParam.beforeHandle) {
        resultValue = addParam.beforeHandle(values);
      } else if (editParam.beforeHandle) {
        resultValue = editParam.beforeHandle(values);
      }
      if (!resultValue) {
        return;
      } else {
        values = resultValue;
      }
    }
    /** 兼容不要删除 */

    // values = boolToNum(values);
    // ObjAttrArrToStr(values);
    actionType.value === 'edit' ? editForm(values) : addForm(values);
  };

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
          onFinish={(values) => submitForm(values)}
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
