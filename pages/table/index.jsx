import ATable, { getTableList } from "../../components/ATable";
import { matchList } from "../../api/index.js";

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
    }
  },
  {
    label: '编辑赛事',
    href: (row) => {
      return `/form?id=${255}`;
    }
    // handle: (row) => {
    // }
  }
];

const columns = [
  {
    title: '赛事名称',
    dataIndex: 'name',
    slot: 'matchName',
    minWidth: '180px',
    align: 'left',
    ellipsis: true,
  },
  {
    title: '年度信息',
    dataIndex: 'year',
    slot: '',
    width: '90px',
    align: 'left',
    ellipsis: true
  },
  {
    title: '学段',
    dataIndex: 'levelText',
    slot: '',
    minWidth: '190px',
    align: 'left',
    ellipsis: true
  },
  {
    title: '语言',
    dataIndex: 'languageText',
    slot: '',
    minWidth: '160px',
    align: 'left',
    ellipsis: true
  },
  {
    title: '比赛时间范围',
    dataIndex: 'startTimeText',
    slot: '',
    width: '330px',
    align: 'left',
    ellipsis: true,
    formatter: row => `${row.startTimeText} - ${row.endTimeText}`
  },
  {
    title: '答题时间(分)',
    dataIndex: 'duration',
    slot: '',
    width: '110px',
    align: 'left',
    ellipsis: true
  },
  {
    title: '状态',
    dataIndex: 'statusText',
    slot: '',
    minWidth: '110px',
    align: 'left',
    ellipsis: true,
    formatter: (row, column, cellValue) => {
      return cellValue;
    }
  },
  { title: '操作', slot: 'action', width: '255px', align: 'left', fixed: 'right' }
];
const listApi = {
  requestFun: matchList,
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

const MyTable = ({ tableData = [] }) => {
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

// export const getStaticProps = async () => {
//   const tableData = await getTableList(listApi, searchParams);

//   return {
//     props: { tableData },
//   };
// };
