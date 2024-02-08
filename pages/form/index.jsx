import Link from 'next/link';
import AForm from '../../components/AForm/index.jsx';
import styles from './form.module.scss';
import { useEffect, useState } from 'react';
import { matchAdd, matchDetail, matchEdit } from 'api/index.js';

const formModel = {
  studentName: undefined,
  sex: undefined,
  number: undefined,
  gradeId: undefined,
  classId: undefined
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
        if (value && this.formModel.enrollTime?.length) {
          const start = new Date(value).getTime();
          const enroll = new Date(this.formModel.enrollTime[1])?.getTime();
          console.log('start >= enroll', start >= enroll);
          if (start <= enroll) {
            callback(new Error('比赛时间不能小于报名截止时间'));
          } else {
            callback();
          }
        } else if (value?.length) {
          const time =
            new Date(value[1]).getTime() - new Date(value[0]).getTime() <
            this.formModel.duration * 60 * 1000;
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
  // closeBetaTest: {
  //   label: '内部测试',
  //   inputType: 'checkbox',
  //   model: 'closeBetaTest',
  //   options: { value: '此赛事仅供内部测试（勾选后仅能通过域名访问，列表中不可见）' },
  // },
  year: {
    label: '年度信息',
    inputType: 'input',
    model: 'year',
    placeholder: '请输入年度信息',
  },
  // intro: {
  //   label: '赛事简介',
  //   inputType: 'textarea',
  //   model: 'intro',
  //   placeholder: '请输入赛事简介',
  //   rows: 4,
  //   maxlength: 500,
  //   showWordLimit: true,
  // },
  // enrollSwitch: {
  //   label: '自主报名',
  //   inputType: 'checkbox',
  //   model: 'enrollSwitch',
  //   options: { key: 1, value: '开启自主报名' },
  //   change: (value) => {
  //     this.formItems.enrollTime.isHidden = value !== 1;
  //     if (value === 0) {
  //       this.formModel.enrollTime = [];
  //     }
  //   },
  // },
  enrollTime: {
    label: '报名时间',
    inputType: 'rangePicker',
    model: 'enrollTime',
    placeholder: ['开始时间', '结束时间'],
    isHidden: true, // TODO
    change: () => {
      this.formModel.startEndTime = undefined;
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
      if (this.formModel.enrollTime?.length) {
        const endTime = new Date(this.formModel.enrollTime[1]).getTime();
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
      if (value?.length && this.formModel.language?.length) {
        this.generateGroupRule(value, this.formModel.language);
      }
    },
    rules: formRules.level,
    options: [
      { value: 1, label: "学前" },
      { value: 2, label: "小学" },
      { value: 3, label: "初中" },
      { value: 4, label: "高中" },
      { value: 5, label: "职高" }
    ]
  },
  language: {
    label: '语言',
    inputType: 'checkboxGroup',
    model: 'language',
    change: (value) => {
      if (value?.length && this.formModel.level?.length) {
        this.generateGroupRule(this.formModel.level, value);
      }
    },
    rules: formRules.language,
    options: [
      { value: 1, label: "图形化" },
      { value: 2, label: "Python" },
      { value: 3, label: "C语言" },
      { value: 15, label: "不区分语言" }
    ]
  },
  groupRule: {
    label: '分组规则',
    inputType: 'radioGroup',
    model: 'groupRule',
    change: () => {
      if (this.formModel.language?.length && this.formModel.level?.length) {
        this.generateGroupRule(this.formModel.level, this.formModel.language);
      }
    },
    rules: formRules.groupRule,
    options: [
      { value: 1, label: "学段-语言" },
      { value: 2, label: "语言-学段" }
    ]
  }
};

const arr = Object.values(formItems);
arr.sort((a, b) => a.index - b.index);
const formList = arr;

const addParam = {
  requestFun: matchAdd,
  params: {},
  beforeHandle: null,
  resultHandle: null
};
const editParam = {
  requestFun: matchEdit,
  params: {},
  beforeHandle: null,
  resultHandle: null
};
const detailParam = {
  requestFun: matchDetail,
  params: { id: '' },
  initFetch: true,
  resultHandle: (data) => {
    return data;
  }
};

const MyForm = () => {
  // const [formList, setFormList] = useState([]);
  // useEffect(() => {
  // });

  return (
    <div className={styles.formBox} style={{ marginBottom: '20px' }}>
      <AForm
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
