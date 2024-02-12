import { useState, useEffect } from 'react';
import { Table, Button } from 'antd';
import TableSearch from './TableSearch';
import Style from './index.module.scss';

// 获取 table 数据
export const getTableList = async (
  { requestFun, initFetch = true, resultKey = 'list', beforeSubmit, responseHandle, afterHandle },
  params = {}
) => {
  if (!initFetch) return;
  let values = { ...params };
  console.log('getTableList params 。。', params);
  if (typeof beforeSubmit === 'function') {
    params = beforeSubmit(values);
  }

  const searchParams = { ...params, page: 1, limit: 10 };
  const {
    data: { content }
  } = await requestFun(searchParams);
  let list = content[resultKey];

  if (typeof responseHandle === 'function') {
    list = responseHandle(list);
  }

  list = list.map((item) => ({ ...item, key: item.classLessonId }));

  if (typeof afterHandle === 'function') {
    afterHandle(content);
  }

  return list;
};

// 按钮禁用判断
const disabledHandle = (record, item) => {
  if (typeof item?.disabled === 'boolean') {
    return item.disabled;
  } else if (typeof item?.disabled === 'function') {
    return item.disabled(record, item);
  }
};

// 按钮显英判断
const showHandle = (record, item) => {
  if (typeof item?.isShow === 'boolean') {
    return item.isShow;
  } else if (typeof item?.isShow === 'function') {
    return item.disabled(record, item);
  } else {
    return true;
  }
};

const handleHref = (item) => {
  return typeof item.href === 'function' ? item.href() : item.href;
};

const setColumns = (columns, rowOperationList) => {
  if (rowOperationList.length) {
    const actions = {
      title: '操作',
      render: (text, record) => {
        return rowOperationList.map((item, index) =>
          showHandle(record, item) ? (
            <Button
              key={index}
              className={index > 0 ? Style.antBtnSpace : null }
              onClick={() => item.handle(record, item)}
              disabled={disabledHandle(record, item)}
              type={item.type || 'link'}
              href={handleHref(item)}
              target={item.target || '_blank'}
            >
              {item.label}
            </Button>
          ) : null
        );
      }
    };
    columns[columns.length - 1] = actions;
  }
};


/**
 * table 组件
 **/
const ATable = ({
  excludeResetKey = [],
  searchParams = {},
  formList = [],
  tableData = [],
  columns,
  rowOperationList = [],
  bordered = false,
  listApi,
  pagination = { position: 'bottomCenter' }
}) => {
  const [loading, setLoading] = useState(true);
  const [dataSource, setDataSource] = useState(tableData);

  useEffect(() => {
    setLoading(false);
    return () => {};
  }, [dataSource]);

  setColumns(columns, rowOperationList);

  // 设置表格数据
  const setTableList = async (values) => {
    const list = await getTableList(listApi, values);
    setDataSource(list);
  };

  return (
    <div className={Style.ATableContainer}>
      <TableSearch excludeResetKey={excludeResetKey} formList={formList} searchParams={searchParams} setTableList={setTableList} />

      <Table
        columns={columns}
        loading={loading}
        bordered={bordered}
        dataSource={dataSource}
        pagination={pagination}
      />
    </div>
  );
};

export default ATable;
