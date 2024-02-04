import { Table } from 'antd';

const ATable = (props) => {
  const { dataSource, columns } = props;
  return (
    <Table dataSource={dataSource} columns={columns} />
  );
};

export default ATable;