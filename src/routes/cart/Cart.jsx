import { Button, Table} from "antd";
import { useState } from "react";
import { useSelector } from "react-redux";
import { ContentTitle } from "../../utils/index";
import { useDispatch } from "react-redux";

const CartPage = () => {
  const productCart = useSelector((state) => state.productCart);
  const dispatch = useDispatch();

  // eslint-disable-next-line no-unused-vars
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 5,
    },
  });
  console.log(productCart);

  const handleDelete = (product) => {
    dispatch({type: "REMOVE_FROM_CART", product: product})
  }

  const columns = [

    
    
    {
      count: 1,
      title: "No",
      render: (data, current, index) =>
        tableParams.pagination.current * tableParams.pagination.pageSize -
        tableParams.pagination.pageSize +
        (index + 1),
    },
    {
      title: "Product Name",
      dataIndex: "product_name",
      render: (product_name) => `${product_name}`,
    
    },
    {
      title: "Original Price",
      dataIndex: "original_price",
      render: (original_price) => `${original_price}`,
    
    },

    {
      title: "Sale Price",
      dataIndex: "sale_price",
      render: (sale_price) => `${sale_price}`,
    
    },

    {
      title: "Stock",
      dataIndex: "number_in_stock",
      render: (number_in_stock) => `${number_in_stock}`,
    
    },

    {
      title: "Category",
      dataIndex: "category",
      render: (category) => `${category}`,
    
    },
    {
      title: "Product Type",
      dataIndex: "product_type",
      render: (product_type) => `${product_type}`,
    
    },

    {
      title: "Images",
      dataIndex: "product_images",
      render: (product_images) => (
        <img src={`${product_images[0]}`} width={50} alt="product_name" />
      ),
    },
    {
      title: "Action",
      render: (product) => (
        <Button onClick={() => handleDelete(product)} danger type="primary">Delete</Button>
      ),
    },
  ];

  const dataSource = productCart.map((product) => ({
    ...product,
  }));

  return (
    <div>
      <ContentTitle>Shopping</ContentTitle>
      <Table columns={columns} dataSource={dataSource} pagination={true} />
    </div>
  );
};

export default CartPage;
