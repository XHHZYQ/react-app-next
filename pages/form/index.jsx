
import Link from 'next/link';
import AForm from '../../components/AForm/index.jsx';
import styles from './form.module.scss'

const formList = [
  {
    inputType: 'input',
    label: '输入框',
    model: 'name',
    placeholder: '请输入。。',
    rules: [
      {
        required: true,
        message: '请输入姓名',
      },
    ]
  },
  {
    inputType: 'select',
    label: '选择框',
    model: 'cityId',
    placeholder: '请选择。。',
    change: (value) => {
      console.log(`selected ${value}`);
    },
    rules: [
      {
        required: true,
        message: 'Please input your username!',
      },
    ],
    options: [
      {
        value: 'jack',
        label: 'Jack',
      },
      {
        value: 'lucy',
        label: 'Lucy',
      },
      {
        value: 'Yiminghe',
        label: 'yiminghe',
      },
      {
        value: 'disabled',
        label: 'Disabled',
        disabled: true,
      },
    ]
  }
]

const MyForm = () => (
  <div className={styles.formBox} style={{ marginBottom: '20px' }}>
    <h3 className={styles.title}>标题</h3>
    <Link href="/detail">跳转至详情</Link>
    <AForm
      formList={formList}
      initialValues={{ name: '我的名字', cityId: 'jack' }}
      submitBtnText="提交"
      cancelBtnText="取消"
    />
  </div>
);
export default MyForm;