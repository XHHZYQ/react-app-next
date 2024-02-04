import ATable from '../../components/ATable';
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

const MyTable = ({ list }) => {
  const data = list.map(item => ({ ...item, key: item.classLessonId }));
  console.log('table props', data);
  return <ATable dataSource={data} columns={columns} />
};

export default MyTable;


export const getStaticProps = async () => {
  let { data: { content: { list = [] } } } = await getCourseWareList();

  return {
    props: {
      list
    }
  };
};