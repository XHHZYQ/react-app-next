import ATable, { getTableList } from "../../components/ATable";
import { TeachingList } from "../../api/index.js";

const searchParams = {
  lessonType: '1',
  classId: undefined,
  lessonId: undefined,
  startTime: undefined,
  endTime: undefined,
};

const formList = [
  {
    inputType: 'input',
    label: '输入框',
    model: 'classId',
    placeholder: '请输入。。',
    change: (e) => {
      console.log('输入框 change', e.target.value);
    },
    // disabled: true
  },
  {
    inputType: 'select',
    label: '选择框',
    model: 'lessonId',
    placeholder: '请选择。。',
    change: (value) => {
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
  },
  {
    inputType: 'rangePicker',
    picker: '',
    label: '日期',
    model: 'startEndTime',
    placeholder: ['开始日期', '结束日期'],
    // disabled: true
    // change: (date, dateString) => {
    //   console.log('输入框 change', date, dateString);
    // },
    format: () => 'YYYY-MM-DD HH:mm:ss',
    disabledDate: (currentDate) => {
      const oneDay = 1000 * 60 * 60 * 24;
      if (currentDate < Date.now() - oneDay * 2) {
        return true;
      } else if (currentDate > Date.now() + oneDay * 5) {
        return true;
      } else {
        return false;
      }
    }
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
  requestFun: TeachingList,
  initFetch: true,
  resultKey: 'list',
  beforeSubmit: (params) => {
    params.lessonType = "1";
    const { startEndTime } = params;
    if (startEndTime?.length) {
      params.startTime = startEndTime[0];
      params.endTime = startEndTime[1];
    }
    delete params.startEndTime;

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
        excludeResetKey={['lessonType']}
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
