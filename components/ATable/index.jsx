import { useState, useEffect } from 'react';
import { Table, Input, Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

// 获取 table 数据
export const getTableList = async ({ requestFun, beforeSubmit, responseHandle }, params = {}) => {
  let values = { ...params };
  if (typeof beforeSubmit === 'function') {
    params = beforeSubmit(values);
  }

  const searchParams = { ...params, page: 1, limit: 10 };
  const { data: { content } } = await requestFun(searchParams);
  let list = content.list

  if (typeof responseHandle === 'function') {
    list = responseHandle(list);
  }

  list = list.map(item => ({ ...item, key: item.classLessonId }));

  if (typeof afterHandle === 'function') {
    afterHandle(content);
  }

  return list
}

const ATable = ({ dataSource, columns, bordered = false, listApi, pagination = { position: 'bottomCenter' } }) => {
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [tableData, setTableData] = useState(dataSource);

  useEffect(() => {
    // console.log('table props', loading, Date.now());
    setLoading(false);
    return () => {

    };
  }, [dataSource]);

  const handleSearch = async () => {
    const params = { classId: searchText };
    const list = await getTableList(listApi, params);
    setTableData(list);
  };

  console.log('调用了 ATable。。');
  return (
    <div style={{ marginBottom: 16 }}>
      <Input
        placeholder="输入搜索条件"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        style={{ width: 200, marginRight: 8 }}
      />
      <Button type="primary" onClick={handleSearch} icon={<SearchOutlined />}>
        搜索
      </Button>


      <Table dataSource={tableData} columns={columns} loading={loading}
        bordered={bordered} pagination={pagination} />
    </div>
  );
};

export default ATable;

// export const getStaticProps = async () => {
//   let { data: { content: { list = [] } } } = await getCourseWareList();

//   return {
//     props: {
//       list
//     }
//   };
// };