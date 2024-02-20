"use client"
import { useSearchParams } from 'next/navigation';
import AForm from '@/components/AForm/index.jsx';
import styles from './form.module.scss';
import { useEffect, useState } from 'react';
import { matchAdd, matchDetail, matchEdit } from '@/api/index.js';
import dayjs from 'dayjs';

let actionType = { value: 'add' };

const formModel = {
  name: '测试一下',
  domain: undefined,
  year: undefined,
  intro: undefined,
  enrollSwitch: undefined,
  enrollTime: [],
  startTime: undefined,
  endTime: undefined,
  startEndTime: undefined,
  duration: undefined,
  warnNumber: undefined,
  level: [],
  language: [],
  groupRule: undefined,
  closeBetaTest: undefined
};

const formRules = {
  name: [{ required: true, message: '请输入赛事名称' }],
  domain: [
    { required: true, message: '请输入赛事域名' },
    { pattern: /^[a-zA-Z0-9]*$/, message: '域名为字母、数字组成' }
  ],
  enrollTime: [{ required: true, message: '请输入报名时间' }],
  startEndTime: [
    { required: true, message: '请选择比赛时间' },
    {
      validator: (rule, value, callback) => {
        if (value && formModel.enrollTime?.length) {
          const start = new Date(value).getTime();
          const enroll = new Date(formModel.enrollTime[1])?.getTime();
          if (start <= enroll) {
            callback(new Error('比赛时间不能小于报名截止时间'));
          } else {
            callback();
          }
        } else if (value?.length) {
          const time =
            new Date(value[1]).getTime() - new Date(value[0]).getTime() <
            formModel.duration * 60 * 1000;
          if (time) {
            callback(new Error('比赛时间范围必须大于等于答题时长'));
          } else {
            callback();
          }
        } else {
          callback();
        }
      }
    }
  ],
  duration: [{ required: true, message: '请输入答题时长' }],
  warnNumber: [{ required: true, message: '请输入防作弊次数' }],
  level: [{ required: true, message: '请选择学段' }],
  language: [{ required: true, message: '请选择语言' }],
  groupRule: [{ required: true, message: '请选择分组规则' }]
};

const formItems = {
  name: {
    label: '赛事名称',
    inputType: 'input',
    model: 'name',
    placeholder: '请输入赛事名称',
    rules: formRules.name
  },
  domain: {
    label: '赛事域名',
    inputType: 'input',
    model: 'domain',
    placeholder: '请输入赛事域名',
    rules: formRules.domain
  },
  closeBetaTest: {
    label: '内部测试',
    inputType: 'checkbox',
    model: 'closeBetaTest',
    options: { label: '此赛事仅供内部测试（勾选后仅能通过域名访问，列表中不可见）' }
  },
  year: {
    label: '年度信息',
    inputType: 'input',
    model: 'year',
    placeholder: '请输入年度信息'
  },
  intro: {
    label: '赛事简介',
    inputType: 'textarea',
    model: 'intro',
    placeholder: '请输入赛事简介',
    rows: 4,
    maxlength: 500,
    showWordLimit: true
  },
  enrollSwitch: {
    label: '自主报名',
    inputType: 'checkbox',
    model: 'enrollSwitch',
    options: { label: '开启自主报名' },
    change: (value) => {
      formItems.enrollTime.isHidden = value !== 1;
      if (value === 0) {
        formModel.enrollTime = [];
      }
    }
  },
  enrollTime: {
    label: '报名时间',
    inputType: 'rangePicker',
    model: 'enrollTime',
    placeholder: ['开始时间', '结束时间'],
    isHidden: true, // TODO
    change: () => {
      formModel.startEndTime = undefined;
    },
    rules: formRules.enrollTime
  },
  startEndTime: {
    label: '比赛时间范围',
    inputType: 'rangePicker',
    model: 'startEndTime',
    placeholder: ['开始时间', '结束时间'],
    valueFormat: 'YYYY-MM-DD HH:mm',
    format: 'YYYY-MM-DD HH:mm',
    disabledDate: (time) => {
      if (formModel.enrollTime?.length) {
        const endTime = new Date(formModel.enrollTime[1]).getTime();
        return time.getTime() < endTime - 1000 * 60 * 60 * 24; // 小于于报名结束时间为禁用
      } else {
        return false;
      }
    },
    rules: formRules.startEndTime
  },
  duration: {
    label: '答题时长(分钟)',
    inputType: 'inputNumber',
    model: 'duration',
    placeholder: '答题时长',
    min: 0,
    max: 7200,
    rules: formRules.duration
  },
  warnNumber: {
    label: '防作弊',
    inputType: 'input',
    model: 'warnNumber',
    placeholder: '考生浏览器被最小化或失去焦点的最大警告次数，填0表示不限制',
    rules: formRules.warnNumber
  },
  level: {
    label: '学段',
    inputType: 'checkboxGroup',
    model: 'level',
    change: (value) => {
      if (value?.length && formModel.language?.length) {
        generateGroupRule(value, formModel.language);
      }
    },
    rules: formRules.level,
    options: [
      { value: 1, label: '学前' },
      { value: 2, label: '小学' },
      { value: 3, label: '初中' },
      { value: 4, label: '高中' },
      { value: 5, label: '职高' }
    ]
  },
  language: {
    label: '语言',
    inputType: 'checkboxGroup',
    model: 'language',
    change: (value) => {
      if (value?.length && formModel.level?.length) {
        generateGroupRule(formModel.level, value);
      }
    },
    rules: formRules.language,
    options: [
      { value: 1, label: '图形化' },
      { value: 2, label: 'Python' },
      { value: 3, label: 'C语言' },
      { value: 15, label: '不区分语言' }
    ]
  },
  groupRule: {
    label: '分组规则',
    inputType: 'radioGroup',
    model: 'groupRule',
    change: () => {
      if (formModel.language?.length && formModel.level?.length) {
        generateGroupRule(formModel.level, formModel.language);
      }
    },
    rules: formRules.groupRule,
    options: [
      { value: 1, label: '学段-语言' },
      { value: 2, label: '语言-学段' }
    ]
  }
};

const arr = Object.values(formItems);
arr.sort((a, b) => a.index - b.index);
const formList = arr;

const MyForm = () => {
  const searchParams = useSearchParams()
  const queryId = searchParams.get('id')

  const addParam = {
    requestFun: matchAdd,
    params: { act: 'info' },
    beforeHandle: null,
    resultHandle: null
  };

  const detailParam = {
    requestFun: matchDetail,
    params: { id: queryId, act: 'info' },
    initFetch: true,
    resultHandle: (data) => {
      if (data.enrollStartTimeText && data.enrollEndTimeText) {
        data.enrollTime = [dayjs(data.enrollStartTime * 1000), dayjs(data.enrollEndTime * 1000)];
      }
      if (data.startTime && data.endTime) {
        data.startEndTime = [dayjs(data.startTime * 1000), dayjs(data.endTime * 1000)];
      }
      return data;
    }
  };

  const editParam = {
    requestFun: matchEdit,
    params: { id: queryId, act: 'info' },
    beforeHandle: null,
    resultHandle: null
  };
  console.log('父组件。。');

  useEffect(() => {
    console.log('父组件 effect', queryId);
  }, []);

  return (
    <div className={styles.formBox} style={{ marginBottom: '20px' }}>
      <AForm
        maxWidth={{ maxWidth: 670 }}
        actionType={actionType}
        formModel={formModel}
        initialValues={{}}
        formList={formList}
        formRules={formRules}
        addParam={addParam}
        editParam={editParam}
        detailParam={detailParam}
      />
    </div>
  );
};

export default MyForm;
