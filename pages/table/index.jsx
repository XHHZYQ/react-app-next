import { useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { Button, message } from 'antd';
import ATable from '../../components/ATable';
import DisplayCtrlModal from './modal';
import { matchList, matchStop, matchPublish } from '../../api/index.js';

const MyTable = ({ tableData = [] }) => {
  const tableRef = useRef(null);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [matchData, setMatchData] = useState({});
  const router = useRouter();

  // 发布、停止赛事
  const handleMatchPublish = (row) => {
    // 状态 => 1：草稿, 2：待发布, 3：已发布
    let request;
    if (+row.status === 3) {
      request = matchStop;
    } else if (+row.status === 2) {
      request = matchPublish;
    }
    const params = { id: row.id };

    request(params).then(() => {
      message.open({
        content: `${+row.status === 3 ? '停止' : '发布'}赛事成功`,
        type: 'success'
      });

      tableRef.current.setTableList(searchParams);
    });
  };

  const isEnd = (row) => {
    // 经过沟通：后端返回 nowTime 和 endTime 且 nowTime > endTime && status === 3 时，为已结束
    // status => 1:草稿, 2:待发布, 3:已发布
    return [3].includes(+row.status) && +row.nowTime >= +row.endTime;
  };

  const listApi = {
    requestFun: matchList,
    initFetch: true,
    resultKey: 'list',
    beforeSubmit: (params) => {
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
    afterHandle: (content) => {}
  };

  const searchParams = {
    name: undefined,
    year: undefined,
    domain: undefined,
    level: undefined,
    language: undefined,
    startTime: ''
  };

  // const formList = [
  //   {
  //     inputType: 'input',
  //     label: '输入框',
  //     model: 'classId',
  //     placeholder: '请输入。。',
  //     change: (e) => {
  //       console.log('输入框 change', e.target.value);
  //     }
  //     // disabled: true
  //   },
  //   {
  //     inputType: 'select',
  //     label: '选择框',
  //     model: 'lessonId',
  //     placeholder: '请选择。。',
  //     change: (value) => {
  //       console.log(`selected ${value}`);
  //     },
  //     options: [
  //       {
  //         label: '图形化AI课',
  //         value: '3'
  //       },
  //       {
  //         label: 'TDOG人工智能编程课程PYTHON版',
  //         value: '6'
  //       }
  //     ]
  //   },
  //   {
  //     inputType: 'rangePicker',
  //     picker: '',
  //     label: '日期',
  //     model: 'startEndTime',
  //     placeholder: ['开始日期', '结束日期'],
  //     // disabled: true
  //     // change: (date, dateString) => {
  //     //   console.log('输入框 change', date, dateString);
  //     // },
  //     format: () => 'YYYY-MM-DD HH:mm:ss',
  //     disabledDate: (currentDate) => {
  //       const oneDay = 1000 * 60 * 60 * 24;
  //       if (currentDate < Date.now() - oneDay * 2) {
  //         return true;
  //       } else if (currentDate > Date.now() + oneDay * 5) {
  //         return true;
  //       } else {
  //         return false;
  //       }
  //     }
  //   }
  // ];
  const formItems = {
    name: {
      index: 0,
      label: '赛事名称',
      inputType: 'input',
      model: 'name',
      placeholder: '请输入赛事名称',
      options: []
    },
    year: {
      index: 1,
      label: '赛事年度',
      inputType: 'input',
      model: 'year',
      placeholder: '请输入赛事年度',
      options: []
    },
    domain: {
      index: 2,
      label: '赛事域名',
      inputType: 'input',
      model: 'domain',
      placeholder: '请输入赛事域名',
      options: []
    },
    level: {
      index: 3,
      label: '学段',
      inputType: 'select',
      model: 'level',
      placeholder: '请选择学段',
      options: []
    },
    language: {
      index: 4,
      label: '语言',
      inputType: 'select',
      model: 'language',
      placeholder: '请选择语言',
      options: []
    },
    startTime: {
      index: 5,
      label: '比赛日期',
      inputType: 'datePicker',
      model: 'startTime',
      placeholder: '请选择比赛日期',
      valueFormat: 'x',
      format: 'YYYY-MM-DD',
      options: []
    }
  };

  const arr = Object.values(formItems);
  arr.sort((a, b) => a.index - b.index);
  const formList = arr;

  const columns = [
    {
      title: '赛事名称',
      dataIndex: 'name',
      width: '180px',
      align: 'left',
      ellipsis: true,
      render: (text, record, index) => (
        <Button type="link" href={record.domain} target="_blank">
          {text}
        </Button>
      )
    },
    {
      title: '年度信息',
      dataIndex: 'year',
      width: '90px',
      align: 'left',
      ellipsis: true
    },
    {
      title: '学段',
      dataIndex: 'levelText',
      width: '190px',
      align: 'left',
      ellipsis: true
    },
    {
      title: '语言',
      dataIndex: 'languageText',
      width: '160px',
      align: 'left',
      ellipsis: true
    },
    {
      title: '比赛时间范围',
      dataIndex: 'startTimeText',
      width: '330px',
      align: 'left',
      ellipsis: true,
      render: (text, record) =>
        record.startTimeText ? `${record.startTimeText} - ${record.endTimeText}` : null
    },
    {
      title: '答题时间(分)',
      dataIndex: 'duration',
      width: '150px',
      align: 'left',
      ellipsis: true
    },
    {
      title: '状态',
      dataIndex: 'statusText',
      width: '110px',
      align: 'left',
      ellipsis: true
    }
  ];

  const rowOperationList = [
    {
      label: (row) => {
        // status => 1:草稿, 2:待发布, 3:已发布
        if ([2].includes(+row.status)) {
          return '发布赛事';
        } else if ([3].includes(+row.status) && !(+row.nowTime >= +row.endTime)) {
          return '停止赛事';
        }
        return '';
      },
      handle: handleMatchPublish
    },
    {
      label: '编辑',
      type: 'link',
      // auth: ['edit'],
      handle: (row) => {
        const end = isEnd(row);
        router.push(`/form?id=${row.id}&isEnd= ${end}`);
      }
    },
    {
      label: '前台展示',
      handle: (row) => {
        const { id, displayCtrl } = row;
        setMatchData({ ...matchData, id, displayCtrl });
        setDialogVisible(true);
      }
    },
    {
      label: '删除',
      type: 'danger',
      handle: (row) => {
        const param = { title: row.name, params: { id: row.id }, request: matchDelete };
        // $refs.table.handleDelete(param);
      }
    },
    {
      label: '复制',
      // auth: [],
      handle: (row) => {
        // onCopy(row);
      }
    }
  ];

  const closeModal = () => {
    setDialogVisible(false);
    tableRef.current.setTableList(searchParams);
  };

  return (
    <>
      <ATable
        ref={tableRef}
        excludeResetKey={[]}
        searchParams={searchParams}
        formList={formList}
        tableData={tableData}
        columns={columns}
        rowOperationList={rowOperationList}
        listApi={listApi}
      />

      <DisplayCtrlModal isOpen={dialogVisible} matchData={matchData} closeModal={closeModal} />
    </>
  );
};

export default MyTable;

// export const getStaticProps = async () => {
//   const tableData = await getTableList(listApi, searchParams);

//   return {
//     props: { tableData },
//   };
// };
