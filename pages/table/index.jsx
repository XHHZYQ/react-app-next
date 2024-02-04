import ATable, { getTableList } from '../../components/ATable';
import { getCourseWareList } from '../../api/index.js';

// await getCourseWareList().then(({ data: { content }}) => { // 方便用来调试
//   const list = content.list;
//   console.log('list。。', list);
// });

const columns = [
  {
    title: '班级',
    dataIndex: 'className',
  },
  {
    title: '学生数量',
    dataIndex: 'studentCount',
  },
  {
    title: '课程',
    dataIndex: 'lessonName',
  },
];
const listApi = { requestFun: getCourseWareList };

const MyTable = ({ list }) => {
  return (
    <div>
      <ATable dataSource={list} columns={columns} listApi={listApi} />
    </div>
  )
};

export default MyTable;


export const getStaticProps = async () => {
  const list = await getTableList(listApi);

  return {
    props: { list }
  };
};