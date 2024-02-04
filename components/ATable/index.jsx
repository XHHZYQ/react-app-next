import { useState, useEffect } from 'react';
import { Table, Button } from 'antd';
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

// 按钮禁用判断
const disabledHandle = (item) => {
  if (typeof item.disabled === 'boolean') {
    return item.disabled;
  } else if (item.disabled === 'function') {
    return item.disabled(row, item);
  }
};

// 按钮显英判断
const showHandle = (item) => {
  if (typeof item.isShow === 'boolean') {
    return item.isShow;
  } else if (item.isShow === 'function') {
    return item.disabled(row, item);
  } else {
    return true;
  }
};

const setColumns = (columns, rowOperationList) => {
  if (rowOperationList.length) {
    const actions = {
      title: '操作',
      render: (text, record) => (
        rowOperationList.map(item => (
          showHandle(item) ?
            <Button
              onClick={() => item.handle(record, item)}
              disabled={disabledHandle(item)}
              type={item.type || 'primary'}
            >{item.label}</Button> : null
        ))
      )
    };

    columns[columns.length - 1] = actions;
  }
};

const ATable = ({ searchParams = {}, formList = [], tableData = [], columns, rowOperationList = [], bordered = false, listApi, pagination = { position: 'bottomCenter' } }) => {
  const [loading, setLoading] = useState(true);
  const [values, setValues] = useState(searchParams);
  const [dataSource, setDataSource] = useState(tableData);

  useEffect(() => {
    setLoading(false);
    return () => {

    };
  }, [dataSource]);

  setColumns(columns, rowOperationList);

  const handleSearch = async () => {
    const list = await getTableList(listApi, values);
    setDataSource(list);
  };

  return (
    <div className={Style.ATableContainer}>
      <TableSearch
        formList={formList}
      />


      <Table dataSource={dataSource} columns={columns} loading={loading}
        bordered={bordered} pagination={pagination} />
    </div>
  );
};

export default ATable;