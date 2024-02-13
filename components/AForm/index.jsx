import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Button, Form, message } from 'antd';
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
    actionType,
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
  let [loading, setLoading] = useState(false);
  const router = useRouter();
  const { query: { id } } = router;
  const queryId = id;

  useEffect(() => {
    form.setFieldsValue(formModel);
    console.log('AForm useEffect queryId', queryId);
    if (queryId && detailParam.initFetch) {
      getDetail();
    }
  });

  const getDetail = () => {
    const { requestFun, params, resultKey, resultHandle, afterHandle } = detailParam;
    console.log('getDetail params', params);

    requestFun(params).then(({ data: { content = {} } }) => {
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

      const formData = {};
      for (let item in values) {
        if (formModel.hasOwnProperty(item) && values[item] !== null) {
          formData[item] = values[item];
        }
      }
      form.setFieldsValue(formData);

      actionType.value = 'edit';
      if (typeof afterHandle === 'function') {
        afterHandle(content);
      }
    });
  };

  // 提交表单
  const submitForm = (values) => {
    if (
      (actionType.value === 'add' && !addParam.requestFun) ||
      (actionType.value === 'edit' && !editParam.requestFun)
    ) {
      message.open({
        content: '请配置请求方法',
        type: 'error'
      });
      return;
    }

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

    actionType.value === 'edit' ? editForm(values) : addForm(values);
  };

  /** 编辑类 */
  const editForm = (values) => {
    const { requestFun, params, beforeSubmit, resultHandle, goBack = false } = editParam;

    if (typeof beforeSubmit === 'function') {
      const resultValue = beforeSubmit(values);
      if (!resultValue) {
        return;
      } else {
        values = resultValue;
      }
    }

    setLoading(true);
    requestFun({ ...values, ...params }).then((data) => {
      setLoading(false);
      message.open({
        type: 'success',
        content: editParam.msg || '编辑成功'
      });
      if (typeof resultHandle === 'function') {
        resultHandle(data);
      }
      // goBack && $router.go(-1);
    });
  }

  /** 新增类 */
  const addForm = (values) => {
    const { requestFun, beforeSubmit, resultHandle, params, goBack = true } = addParam;

    if (typeof beforeSubmit === 'function') {
      const resultValue = beforeSubmit(values);
      if (!resultValue) {
        return;
      } else {
        values = resultValue;
      }
    }

    setLoading(true);
    requestFun({ ...values, ...params }).then((data) => {
      setLoading(false);
      message.open({
        type: 'success',
        content: '新增',
      });
      if (typeof resultHandle === 'function') {
        resultHandle(data);
      }
      // goBack && $router.go(-1);
    });
  }

  // 重置表单
  const resetSearch = () => {
    form.resetFields();
  };

  return (
    <div className={styles.formBox} style={{ marginBottom: '40px' }}>
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
          <Button loading={loading} type="primary" htmlType="submit">
            {submitBtnText}
          </Button>
          <Button onClick={resetSearch} style={{ marginLeft: '10px' }}>
            {cancelBtnText}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AForm;
