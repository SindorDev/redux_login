import { useState } from "react";
import { Button, Modal } from "antd";
import { ContentTitle } from "../../../utils/index";
import { useFetch } from "../../../hooks/useFetch";
import ProductFrom from "../../../components/productForm/ProductFrom";
import TableComponent from "../../../components/table/Table";
import axios from "../../../api/data";
const Products = () => {
  const [open, setOpen] = useState(false);
  const [updateProduct, setUpdateProduct] = useState(null);
  const [productImage, setProductImage] = useState(null);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState(
    "Do you really want to open the product?"
  );
  const [deleteProduct, setDeleteProduct] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const showModal = () => {
    setOpen(true);
    setUpdateProduct(null);
  };

  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 5,
    },
  });

  const handleUpdateProduct = (product) => {
    setUpdateProduct(product);
    setOpen(true);
  };

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

    {
      key: "Action",
      title: "Action",
      render: (product) => (
        <div className="flex items-center gap-2 ">
          <Button
            className="bg-yellow-400 text-white"
            onClick={() => handleUpdateProduct(product)}
          >
            Update
          </Button>
          <Button
            danger
            onClick={() => handleDeleteProduct(product._id)}
            type="primary"
          >
            Delete
          </Button>
        </div>
      ),
      with: "10%",
    },
  ];

  const handleDeleteProduct = (product) => {
    setDeleteProduct(product);
    setModalOpen(true);
  };

  const handleCancel = () => {
    setModalOpen(false);
    setOpen(false);
    setUpdateProduct(null);
  };



  const handleOk = () => {
    try {
      axios.delete(`product/${deleteProduct}`);
    } catch (error) {
      console.log(error);
    }

    setModalText("product opened successfully");
    setConfirmLoading(true);
    setTimeout(() => {
      setModalOpen(false);
      setConfirmLoading(false);
    }, 1500);
  };

  const [categoryData] = useFetch("/product/category");
  const [productType] = useFetch("/product/product-type");

  return (
    <>
      <div>
        <div className="flex items-center justify-between">
          <ContentTitle>Products</ContentTitle>
          <Button type="primary" onClick={showModal}>
            Add a new Product
          </Button>
        </div>
      </div>

      <div className="h-full">
        <TableComponent
          columns={columns}
          tableParams={tableParams}
          setTableParams={setTableParams}
          url={"/product/all"}
        />
      </div>

      <ProductFrom
        title="Add a new Product"
        open={open}
        setOpen={setOpen}
        handleCancel={handleCancel}
        updateProduct={updateProduct}
        setUpdateProduct={setUpdateProduct}
        setProductImage={setProductImage}
        productImage={productImage}
        categoryData={categoryData}
        productType={productType}
        footer={false}
        forceRender={true}

     />

      <Modal
        title="Title"
        open={modalOpen}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <p>{modalText}</p>
      </Modal>
    </>
  );
};

export default Products;
