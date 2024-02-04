import ATable, { getTableList } from "../../components/ATable";
import { getCourseWareList } from "../../api/index.js";

const searchParams = {
  lessonType: undefined,
  classId: undefined,
  lessonId: undefined,
  startTime: undefined,
  endTime: undefined,
};

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
    onChange: (value) => {
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
];

const columns = [
  {
    title: "班级",
    dataIndex: "className",
  },
  {
    title: "学生数量",
    dataIndex: "studentCount",
  },
  {
    title: "课程",
    dataIndex: "lessonName",
  },
];
const listApi = {
  requestFun: getCourseWareList,
  initFetch: true,
  resultKey: 'list',
  beforeSubmit: (params) => {
    params.lessonType = "1";
    // console.log("beforeSubmit。。", params);
    return params;
  },
  // responseHandle: (list) => {
  //   console.log("responseHandle。。", list);
  //   return list.map(item => ({ ...item, key: item.classLessonId }));
  // },
  afterHandle: (content) => {
    // console.log("afterHandle。。", content);
  },
};

const MyTable = ({ tableData }) => {
  return (
    <div>
      <ATable
        searchParams={searchParams}
        formList={formList}
        tableData={tableData}
        columns={columns}
        listApi={listApi}
      />
    </div>
  );
};

export default MyTable;

export const getStaticProps = async () => {
  const tableData = await getTableList(listApi, searchParams);

  return {
    props: { tableData },
  };
};
