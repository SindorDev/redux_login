/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { Table } from 'antd';
import axios from "../../api/data"

const getRandomuserParams = (params) => ({
     pageSize: params.pagination?.pageSize,
     page: params.pagination?.current,
     ...params,
   });
const TableComponent = ({tableParams, setTableParams, columns, url}) => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);


  const fetchData = () => {
    setLoading(true);
     axios(url, {
          params: getRandomuserParams(tableParams),
     })
      .then(response =>{
      setLoading(false);
      setData(response.data.payload);
      setTableParams({
          ...tableParams,
          pagination: {
            ...tableParams.pagination,
            total: response.data.total,
          },
        });
     })
  };

  useEffect(() => {
    fetchData();
  }, [
    tableParams.pagination?.current,
    tableParams.pagination?.pageSize,
    tableParams?.sortOrder,
    tableParams?.sortField,
    JSON.stringify(tableParams.filters),
  ]);
  const handleTableChange = (pagination, filters, sorter) => {
    setTableParams({
      pagination,
      filters,
      sortOrder: Array.isArray(sorter) ? undefined : sorter.order,
      sortField: Array.isArray(sorter) ? undefined : sorter.field,
    });

    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      setData([]);
    }
    console.log(sorter);
  };
  return (
    <Table
      columns={columns}
      rowKey={(product) => product._id}
      dataSource={data?.map((product) => ({key: product._id, ...product}))}
      pagination={tableParams.pagination}
      loading={loading}
      onChange={handleTableChange}
    />
  );
};
export default TableComponent;