import { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { Table, Button } from 'antd';
import TableSearch from './TableSearch';
import Style from './index.module.scss';

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

// 处理按钮 href 属性
const handleHref = (record, item) => {
  return typeof item.href === 'function' ? item.href(record, item) : item.href;
};

const handleLabel = (record, item) => {
  if (typeof item.label === 'function') {
    return item.label(record, item);
  } else {
    return item.label;
  }
};

/**
 * table 组件
 **/
const ATable = forwardRef((props, ref) => {
  const {
    scroll = { x: true, scrollToFirstRowOnChange: true },
    excludeResetKey = [],
    searchParams = {},
    formList = [],
    tableData = [],
    columns,
    rowOperationList = [],
    bordered = false,
    listApi,
    pagination = { position: 'bottomCenter' }
  } = props;

  useImperativeHandle(ref, () => ({ getTableList }));

  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState(tableData);
  const [columnList, setColumnList] = useState(columns);


  // 添加操作列
  const pushOperationItem = () => {
    if (rowOperationList.length) {
      const actions = {
        title: '操作',
        fixed: 'right',
        render: (text, record) => {
          return rowOperationList.map((item, index) =>
            showHandle(record, item) && handleLabel(record, item) ? (
              <Button
                key={index}
                className={index > 0 ? Style.antBtnSpace : null}
                onClick={() => typeof item.handle === 'function' && item.handle(record, item)}
                disabled={disabledHandle(record, item)}
                type={item.type && item.type !== 'danger' ? item.type : 'link'}
                danger={item.type === 'danger' ? true : false}
                href={handleHref(record, item)}
                target={item.target || '_self'}
              >
                {handleLabel(record, item)}
              </Button>
            ) : null
          );
        }
      };
      setColumnList([...columnList, actions]);
    }
  };

  useEffect(() => {
    // 表格列设置(挂载时只执行一次)
    setTableList();
    pushOperationItem();
  }, []);

  // 获取 table 数据
  const getTableList = async (params = {}) => {
    const { requestFun, initFetch = true, resultKey = 'list', beforeSubmit, responseHandle, afterHandle } = listApi;

    if (!initFetch) return;

    let values = { ...params };
    if (typeof beforeSubmit === 'function') {
      params = beforeSubmit(values);
    }

    const param = { ...params, page: 1, limit: 10 };
    const { data: { content } } = await requestFun(param);
    let list = content[resultKey];

    if (typeof responseHandle === 'function') {
      list = responseHandle(list);
    }

    list = list.map((item) => ({ ...item, key: item.id }));

    if (typeof afterHandle === 'function') {
      afterHandle(content);
    }

    return list;
  };

  // 设置表格数据
  const setTableList = async (values) => {
    setLoading(true);
    values = typeof values !== 'undefined' ? values : searchParams;
    console.log('values', values);
    const list = await getTableList(values);
    setLoading(false);
    setDataSource(list);
  };

  return (
    <div className={Style.ATableContainer}>
      <TableSearch
        excludeResetKey={excludeResetKey}
        formList={formList}
        searchParams={searchParams}
        setTableList={setTableList}
      />

      <Table
        scroll={scroll}
        columns={columnList}
        loading={loading}
        bordered={bordered}
        dataSource={dataSource}
        pagination={pagination}
      />
    </div>
  );
});

export default ATable;
