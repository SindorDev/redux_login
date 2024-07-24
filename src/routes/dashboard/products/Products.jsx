import { useState } from "react";
import { Button, Modal, Form, Select, Input } from "antd"
import { ContentTitle } from "../../../utils/index"
import {useFetch} from "../../../hooks/useFetch"
import { useSelector } from "react-redux";
import TableProduct from "../../../components/table/Table"
const {TextArea} = Input

const Products = () => {
  const authData = useSelector(state => state)
  const [open, setOpen] = useState(false);
  const [productImage, setProductImage] = useState(null)
  const showModal = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const onFinish = (values) => {
    console.log(values);
    if(!authData.productID) {
      const form = new FormData()
      form.append("product_name", values.product_name)
      form.append("description", values.description)
      form.append("original_price", values.original_price)
      form.append("sale_price", values.sale_price)
      form.append("category", values.category[0])
      form.append("product_type", values.product_type[0])
      form.append("number_in_stock", values.number_in_stock)
  
      for(let i = 0; i < productImage.length; i++) {
        form.append("product_images", productImage[i])
      }
  
      fetch("http://localhost:8000/product/create", {
        method: "POST",
        headers: {
          "Authorization" : "Bearer " + authData.state.token
        },
        body: form
      })
      
      .then(response => response.json())
      .then(data => {
        console.log(data);
      })
      .catch(error => {
        console.log(error);
      }) 
    } 
    else {
      const form = new FormData()
      form.append("product_name", values.product_name)
      form.append("description", values.description)
      form.append("original_price", values.original_price)
      form.append("sale_price", values.sale_price)
      form.append("category", values.category[0])
      form.append("product_type", values.product_type[0])
      form.append("number_in_stock", values.number_in_stock)
  
      for(let i = 0; i < productImage.length; i++) {
        form.append("product_images", productImage[i])
      }
      fetch(`http://localhost:8000/product/update/${authData.productID}`, {
        method: "PUT",
        headers: {
          "Authorization" : "Bearer " + authData.state.token
        },
        body: form
      })
      .then(response => response.json())
      .then(data => {
        console.log(data);
      })
      .catch(error => {
        console.log(error);
      }) 
    } 


    }
  
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const [categoryData] = useFetch("/product/category")
  const [productType] = useFetch("/product/product-type")
  return (
    <>
    

    
    <div>
      <div className="flex items-center justify-between">
      <ContentTitle>Products</ContentTitle>     
      <Button type="primary" onClick={showModal}>Add a new Product</Button>
      </div>
    </div>

      <div className="h-full">
        <TableProduct showModal={showModal} />
      </div>
    

    
    <Modal title="Add a new User" open={open} centered onCancel={handleCancel}  footer={null}>


    <Form

    name="basic"
    labelCol={{ span: 16 }}
    wrapperCol={{ span: 24 }}
    layout="vertical"
    style={{ maxWidth: 800, marginTop: "20px" }}
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
    autoComplete="off"
  >
    <Form.Item
      label="Product Name"
      name="product_name"
      rules={[{ required: true, message: 'Please enter  Product name !' }]}
    >
      <Input />
    </Form.Item>

    <div className="flex w-full gap-2 my-4 justify-between">
    <Form.Item
      label="original price"
      name="original_price"
      rules={[{ required: true, message: 'Please enter  original price !' }]}
    >
      <Input />
    </Form.Item>

    <Form.Item
      label="sale price"
      name="sale_price"
      rules={[{ required: true, message: 'Please enter  sale price !' }]}
    >
      <Input />
    </Form.Item>

    <Form.Item
      label="number stock"
      name="number_in_stock"
      rules={[{ required: true, message: 'Please enter  sale price !' }]}
    >
      <Input />
    </Form.Item>

    </div>

    
    <div className="flex w-full gap-4 my-4 justify-between">
    <Form.Item name="category" className="w-full">
    <Select
        rules={[{ required: true, message: 'Please enter  Category !' }]}
        placeholder="Enter category"
        mode="tags"
        maxCount={1}
        variant="filled"
        style={{
          width: "100%"
        }}
        options={categoryData.payload?.map((category) => ({key: category, value: category, label: category}))}
      />
    </Form.Item>
    <Form.Item name="product_type" className="w-full">
    <Select
      rules={[{ required: true, message: 'Please enter  Category !' }]}
      placeholder="Enter sub category"
        mode="tags"
        maxCount={1}
        variant="filled"
        style={{
          width: "100%"
        }}
        options={productType.payload?.map((productTypeData) => ({key: productTypeData, value: productTypeData, label: productTypeData}))}
      />
    </Form.Item>
    </div>

    <TextArea
    style={{resize: "none"}}
      maxLength={200}
      rows={3}
      placeholder="Enter letters maximum 200"
      label="Description"
      name="description"
      rules={[{ required: true, message: 'Please enter description!' }]}
    >
    </TextArea>
        <input type="file" multiple accept="image/png image/webp image/jpg image/jpeg " onChange={(e) => setProductImage(e.target.files)} />
        <div className="flex items-end justify-end">
          
    <Form.Item>
      <Button className="mt-6 p-4" type="primary" htmlType="submit">
        Add Product
      </Button>
    </Form.Item>
        </div>
  </Form>
    </Modal>
    </>
  )
};

export default Products