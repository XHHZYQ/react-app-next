"use client"
import { useEffect, useState } from 'react';
import { Modal } from 'antd';
import AForm from '@/components/AForm/index.jsx';
import { matchDisplayCtrl } from '@/api/index.js';

const DisplayCtrlModal = (props) => {
  const { isOpen, matchData, closeModal } = props;

  const displayCtrlOptions = [
    {
      value: '1',
      label: '显示在首页列表'
    },
    {
      value: '2',
      label: '显示赛事列表页'
    }
  ];

  const beforeHandle = (data) => {
    data.id = matchData.id;
    if (data.displayCtrl?.length) {
      let sum = 0;
      data.displayCtrl.forEach((item) => {
        sum = sum + +item;
      });
      data.displayCtrl = sum;
    } else {
      data.displayCtrl = 0; // 一个都未选择时传 0
    }
    console.log('data。。', data);
    return data;
  };

  // 表单参数
  const actionType = { value: 'add' };
  const [formModel, setFormModel] = useState({
    displayCtrl: []
  });
  const formRules = {
    displayCtrl: { required: false, message: '请选择需展示的选项' }
  };
  const formItems = {
    displayCtrl: {
      label: '前台列表',
      inputType: 'checkboxGroup',
      model: 'displayCtrl',
      optionCode: 'match.displayCtrl',
      options: displayCtrlOptions
    }
  };


  useEffect(() => {
    const { displayCtrl } = matchData;

    const arr = [];
    displayCtrlOptions.forEach((item) => {
      const value = +item.value;
      if ((displayCtrl & value) === value) {
        arr.push(item.value);
      }
    });
    setFormModel({...formModel, displayCtrl: arr});
  }, [matchData]);


  const addParam = {
    requestFun: matchDisplayCtrl,
    goBack: false,
    msg: '提交成功',
    beforeSubmit: beforeHandle,
    resultHandle: () => {
      closeModal();
    }
  };

  const arr = Object.values(formItems);
  arr.sort((a, b) => a.index - b.index);
  const formList = arr;
  // 表单参数

  return (
    <Modal title="前台设置" open={isOpen} footer={null} onCancel={closeModal} destroyOnClose>
      <AForm
        formModel={formModel}
        actionType={actionType}
        formRules={formRules}
        formList={formList}
        addParam={addParam}
      />
    </Modal>
  );
};

export default DisplayCtrlModal;
