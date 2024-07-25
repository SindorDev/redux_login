/* eslint-disable react-hooks/exhaustive-deps */
import { Flex, Button, Table } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from "../../api/data";

const getRandomUserParams = (params) => ({
  pageSize: params.pagination?.pageSize,
  page: params.pagination?.current,
  sortField: params.sortField,
  sortOrder: params.sortOrder,
  ...params,
});

const TableProduct = ({ showModal, columns }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 5,
    },
  });
  const dispatch = useDispatch();
  const handleTableChange = (pagination, filters, sorter) => {
    setTableParams({
      pagination,
      filters,
      sortField: sorter.field,
      sortOrder: sorter.order,
    });
  };




  const fetchData = () => {
    setLoading(true);
    axios.get("/product/all", {
      params: getRandomUserParams(tableParams),
    })
    .then(response => {
      const { payload } = response.data;
      setData(payload);
      setLoading(false);
      setTableParams({
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
  const handleDelete = async (id) => {
    try {
      await axios.delete(`/product/${id}`);
      fetchData()
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = (id) => {
    showModal();
    dispatch({ type: "PRODUCT_ID", id });
  };

  const dataSource = data?.map((item) => ({
    key: item._id,
    name: item.product_name,
    original_price: "$" + item.original_price,
    sale_price: "$" + item.sale_price,
    number_in_stock: item.number_in_stock,
    category: item.category,
    product_type: item.product_type,
    update: <Button className='bg-yellow-500 text-white' onClick={() => handleUpdate(item._id)}>Update</Button>,
    delete: <Button danger type="primary" onClick={() => handleDelete(item._id)}>Delete</Button>,
  }));

  return (
    <Flex gap="middle" vertical>
      <Table 
        loading={loading} 
        columns={columns} 
        dataSource={dataSource} 
        pagination={tableParams.pagination} 
        onChange={handleTableChange} 
      />
    </Flex>
  );
};

export default TableProduct;