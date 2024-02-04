import { useState, useEffect } from 'react';
import { Table, Input, Button } from 'antd';
import TableSearch from './TableSearch';
import Style from './index.module.scss';

// 获取 table 数据
export const getTableList = async ({ requestFun, initFetch = true, resultKey = 'list', beforeSubmit, responseHandle, afterHandle }, params = {}) => {
  if (!initFetch) return;
  let values = { ...params };
  if (typeof beforeSubmit === 'function') {
    params = beforeSubmit(values);
  }

  const searchParams = { ...params, page: 1, limit: 10 };
  const { data: { content } } = await requestFun(searchParams);
  let list = content[resultKey];

  if (typeof responseHandle === 'function') {
    list = responseHandle(list);
  }

  list = list.map(item => ({ ...item, key: item.classLessonId }));

  if (typeof afterHandle === 'function') {
    afterHandle(content);
  }

  return list
}

const ATable = ({ searchParams = {}, formList = [], tableData = [], columns, bordered = false, listApi, pagination = { position: 'bottomCenter' } }) => {
  const [loading, setLoading] = useState(true);
  const [values, setValues] = useState(searchParams);
  const [dataSource, setDataSource] = useState(tableData);

  useEffect(() => {
    setLoading(false);
    return () => {

    };
  }, [dataSource]);

  const handleSearch = async () => {
    const list = await getTableList(listApi, values);
    setDataSource(list);
  };

  return (
    <div className={Style.ATableContainer}>
      {/* <Input
        placeholder="输入搜索条件"
        value={values.classId}
        onChange={(e) => setValues({ ...values, classId: e.target.value })}
        style={{ width: 200, marginRight: 8 }}
      />
      <Button type="primary" onClick={handleSearch} icon={<SearchOutlined />}>
        搜索
      </Button> */}

      <TableSearch
        formList={formList}
      />


      <Table dataSource={dataSource} columns={columns} loading={loading}
        bordered={bordered} pagination={pagination} />
    </div>
  );
};

export default ATable;