import { useState } from "react";
import { ContentTitle } from "../../../utils/index";
import TableComponent from "../../../components/table/Table";
const Users = () => {

  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 5,
    },
  });


  const columns = [
    
    {
      count: 1,
      title: "No",
      key: "id",
      render: (data, current, index) =>
        tableParams.pagination.current * tableParams.pagination.pageSize -
        tableParams.pagination.pageSize +
        (index + 1),
    },
    {
      key: "name",
      title: "Product Name",
      dataIndex: "product_name",
      render: (product_name) => `${product_name}`,
      sorter: true,
    },
    {
      key: "OPrice",
      title: "Original Price",
      dataIndex: "original_price",
      render: (original_price) => `${original_price}`,
      sorter: true,
    },

    {
      key: "SPrice",
      title: "Sale Price",
      dataIndex: "sale_price",
      render: (sale_price) => `${sale_price}`,
      sorter: true,
    },

    {
      key: "stock",
      title: "Stock",
      dataIndex: "number_in_stock",
      render: (number_in_stock) => `${number_in_stock}`,
      sorter: true,
    },

    {
      key: "category",
      title: "Category",
      dataIndex: "category",
      render: (category) => `${category}`,
      sorter: true,
    },
    {
      key: "product_type",
      title: "Product Type",
      dataIndex: "product_type",
      render: (product_type) => `${product_type}`,
      sorter: true,
    },

    {
      key: "images",
      title: "Images",
      dataIndex: "product_images",
      render: (product_images) => (
        <img src={`${product_images[0]}`} width={50} alt="product_name" />
      ),
    },

  ];

  return (
    <>
      <div>
        <div className="flex items-center justify-between">
          <ContentTitle>Liked Products</ContentTitle>
        </div>
      </div>

      <div>
          <TableComponent tableParams={tableParams} setTableParams={setTableParams} columns={columns} url="/auth/profile/liked-products"/>
      </div>

    </>
  );
};

export default Users;
