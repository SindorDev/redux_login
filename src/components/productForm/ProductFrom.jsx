/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
const {TextArea} = Input
import { Button, Modal, Form, Select, Input } from "antd"
import { useEffect } from "react"
import { useSelector } from "react-redux";

const ProductFrom = ({open, handleCancel, setOpen, setUpdateProduct, productImage, onFinishFailed, updateProduct, setProductImage, categoryData, productType}) => {
  const [form] = Form.useForm()
  const authData = useSelector((state) => state);


  useEffect(() => {
    form.setFieldsValue({
      ...updateProduct
    })
    
    if(updateProduct === null) {
      form.resetFields()
    }
  }, [updateProduct])

  const onFinish = (values) => {
    const form = new FormData();
    form.append("product_name", values.product_name);
    form.append("description", values.description);
    form.append("original_price", values.original_price);
    form.append("sale_price", values.sale_price);
    form.append("category", values.category[0]);
    form.append("product_type", values.product_type[0]);
    form.append("number_in_stock", values.number_in_stock);

    for (let i = 0; i < productImage.length; i++) {
      form.append("product_images", productImage[i]);
    }

    fetch(updateProduct ? `http://localhost:8000/product/update/${updateProduct._id}` : "http://localhost:8000/product/create", {
      method: updateProduct ? "PUT" : "POST",
      headers: {
        Authorization: "Bearer " + authData.token,
      },
      body: form,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.payload) {
            setOpen(false);
            window.location.reload();  
            setUpdateProduct(null);

          }
      })
      .catch((error) => {
        console.log(error);
      });
  };



     return (
     
    <Modal title="Add a new User" open={open} centered onCancel={handleCancel}  footer={null}>


    <Form
    form={form}
    name="basic"
    labelCol={{ span: 16 }}
    wrapperCol={{ span: 24 }}
    layout="vertical"
    initialValues={updateProduct ? updateProduct : null}
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
    <Form.Item
     name="category"
     rules={[{ required: true, message: 'Please enter  Category !' }]}
     className="w-full">
    <Select
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
    <Form.Item
     name="product_type"
     rules={[{ required: true, message: 'Please enter  Category !' }]}
     className="w-full">
    <Select
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

    <Form.Item
      label="description"
      name="description"
      rules={[{ required: true, message: 'Please enter  description !' }]}
    >
      <TextArea rows={4} 
      maxLength={200}
      style={{resize: "none"}}
      placeholder="Enter letters maximum 200"
      />
    </Form.Item>
    
        <input type="file" multiple accept="image/png, image/webp, image/jpg, image/jpeg " onChange={(e) => setProductImage(e.target.files)} />
        <div className="flex items-end justify-end">
          
    <Form.Item>
      <Button className="mt-6 p-4" type="primary" htmlType="submit">
        Add Product
      </Button>
    </Form.Item>
        </div>
  </Form>
    </Modal>
  )
}

export default ProductFrom