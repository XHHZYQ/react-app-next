import Link from 'next/link';
import AForm from '../../components/AForm/index.jsx';
import styles from './form.module.scss';
import { useEffect, useState } from 'react';

const formModel = {
  studentName: undefined,
  sex: undefined,
  number: undefined,
  gradeId: undefined,
  classId: undefined
};

const formItems = {
  name: {
    index: 0,
    label: '赛事名称',
    inputType: 'input',
    model: 'name',
    placeholder: '请输入赛事名称',
    options: [],
    handle: null,
    slot: ''
  },
  doMain: {
    index: 1,
    label: '赛事域名',
    inputType: 'input',
    model: 'doMain',
    placeholder: '请输入赛事域名',
    options: [],
    handle: null,
    slot: ''
  },
  studentName: {
    label: '姓名',
    inputType: 'input',
    model: 'studentName',
    placeholder: '请输入姓名',
    options: [],
    maxlength: 10,
    handle: null,
    isHidden: false
  },
  sex: {
    label: '性别',
    inputType: 'radioGroup',
    model: 'sex',
    placeholder: '请选择性别',
    options: [
      { label: '男', value: '1' },
      { label: '女', value: '2' }
    ],
    handle: null,
    isHidden: false
  },
  number: {
    label: '学号',
    inputType: 'input',
    model: 'number',
    placeholder: '请输入学号',
    options: [],
    handle: null,
    isHidden: false
  },
  gradeId: {
    label: '年级',
    inputType: 'select',
    model: 'gradeId',
    placeholder: '请选择年级',
    options: [
      { label: '一年级', value: '21' },
      { label: '二年级', value: '2' },
      { label: '三年级', value: '6' },
      { label: '四年级', value: '4' }
    ],
    handle: null,
    multiple: true,
    collapseTagsTooltip: true,
    multipleLimit: 0,
    isHidden: false
  },
  classId: {
    label: '班级',
    inputType: 'select',
    model: 'classId',
    placeholder: '请选择班级',
    options: [
      { label: '一班', value: '1' },
      { label: '二班', value: '14' },
      { label: '三班', value: '3' },
      { label: '人家问题3班', value: '275' }
    ],
    handle: null,
    isHidden: false
  }
};
const arr = Object.values(formItems);
arr.sort((a, b) => a.index - b.index);
const formList = arr;
console.log('formList。。', formList);

const formRules = {
  studentName: { required: true, message: '请输入姓名' },
  sex: [{ required: true, message: '请选择性别' }],
  number: { required: true, message: '请输入学号' },
  gradeId: { required: false, message: '请选择年级' },
  classId: { required: true, message: '请选择班级' }
};

const addParam = {
  // requestFun: addStudent,
  requestFun: () => {},
  params: {},
  beforeHandle: null,
  resultHandle: null
};
const editParam = {
  // requestFun: editStudent,
  requestFun: () => { },
  params: {},
  beforeHandle: null,
  resultHandle: null
};
const detailParam = {
  // requestFun: studentDetail,
  requestFun: () => { },
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
