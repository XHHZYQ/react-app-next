import { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { useImmer } from 'use-immer';
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
    size = 'small',
    rowOperationWidth,
    tableLayout = true,
    sticky = true,
    scroll = { x: true, scrollToFirstRowOnChange: true },
    excludeResetKey = [],
    searchParams = {},
    formList = [],
    tableData = [],
    columns,
    rowOperationList = [],
    bordered = true,
    listApi,
    pagination = { position: 'bottomCenter' }
  } = props;

  useImperativeHandle(ref, () => ({ setTableList }));

  const [loading, setLoading] = useImmer(false);
  const [dataSource, setDataSource] = useImmer(tableData);
  const [columnList, setColumnList] = useImmer(columns);
  const [paginationConfig, setPagination] = useImmer(pagination);


  // 添加操作列
  const pushOperationItem = () => {
    if (rowOperationList.length) {
      const actions = {
        title: '操作',
        fixed: 'right',
        align: 'left',
        width: rowOperationWidth,
        render: (text, record) => {
          return rowOperationList.map((item, index) =>
            showHandle(record, item) && handleLabel(record, item) ? (
              <Button
                key={index}
                onClick={() => typeof item.handle === 'function' && item.handle(record, item)}
                disabled={disabledHandle(record, item)}
                type={item.type && item.type !== 'danger' ? item.type : 'link'}
                danger={item.type === 'danger' ? true : false}
                href={handleHref(record, item)}
                target={item.target || '_self'}
                size={item.size || 'small'}
              >
                {handleLabel(record, item)}
              </Button>
            ) : null
          );
        }
      };
      setColumnList((draft) => {
        draft[draft.length - 1] = actions;
      });
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
    const { content } = await requestFun(param);
    let list = content[resultKey];

    if (typeof responseHandle === 'function') {
      list = responseHandle(list);
    }

    list = list.map((item) => ({ ...item, key: item.id }));

    if (content.hasOwnProperty('pager')) {
      // 设置分页总数
      setPagination({ ...paginationConfig, ...{ total: +content?.pager?.totalCount }});
    }

    if (typeof afterHandle === 'function') {
      afterHandle(content);
    }

    return list;
  };

  // 设置表格数据
  const setTableList = async (values) => {
    setLoading(true);
    values = typeof values !== 'undefined' ? values : searchParams;
    const list = await getTableList(values);
    setLoading(false);
    setDataSource(() => list);
  };

  return (
    <div className={Style.ATableContainer}>
      <TableSearch
        excludeResetKey={excludeResetKey}
        formList={formList}
        searchParams={searchParams}
        setTableList={setTableList}
      />

      {/* sticky={sticky} */}
      {/* tableLayout={tableLayout} */}
      <Table
        scroll={scroll}
        columns={columnList}
        loading={loading}
        bordered={bordered}
        dataSource={dataSource}
        pagination={paginationConfig}
        size={size}
      />
    </div>
  );
});

export default ATable;
