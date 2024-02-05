import ATable, { getTableList } from "../../components/ATable";
import { getCourseWareList } from "../../api/index.js";

const searchParams = {
  lessonType: undefined,
  classId: '492',
  lessonId: '3',
  startTime: undefined,
  endTime: undefined,
};

const formList = [
  {
    inputType: 'input',
    label: '输入框',
    model: 'classId',
    placeholder: '请输入。。',
    onChange: (e) => {
      console.log('输入框 change', e.target.value);
    },
    // disabled: true
  },
  {
    inputType: 'select',
    label: '选择框',
    model: 'lessonId',
    placeholder: '请选择。。',
    onChange: (value) => {
      console.log(`selected ${value}`);
    },
    options: [
      {
        "label": "图形化AI课",
        "value": "3"
      },
      {
        "label": "TDOG人工智能编程课程PYTHON版",
        "value": "6"
      }
    ]
  }
];

const rowOperationList = [
  {
    label: '开始上课',
    handle: (row) => {
      console.log('点击开始上课');
    },
    // isShow: true,
    // type: 'link'
    // disabled: false,
  },
  {
    label: '课堂口令',
    handle: (row) => {
      console.log('点击课堂口令');
    },
    // type: 'link'
    // disabled: () => false,
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
  {
    title: "操作",
    dataIndex: "action"
  }
];
const listApi = {
  requestFun: getCourseWareList,
  initFetch: true,
  resultKey: 'list',
  beforeSubmit: (params) => {
    params.lessonType = "1";
    return params;
  },
  // responseHandle: (list) => {
  //   return list.map(item => ({ ...item, key: item.classLessonId }));
  // },
  afterHandle: (content) => {
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
        rowOperationList={rowOperationList}
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
