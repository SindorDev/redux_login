/* eslint-disable react/prop-types */
const {TextArea} = Input
import { Button, Modal, Form, Select, Input } from "antd"

const ProductFrom = ({open, handleCancel, onFinish, onFinishFailed, updateProduct, setProductImage, categoryData, productType}) => {

     return (
     
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
    initialValue={updateProduct?.product_name}
      label="Product Name"
      name="product_name"
      rules={[{ required: true, message: 'Please enter  Product name !' }]}
    >
      <Input />
    </Form.Item>

    <div className="flex w-full gap-2 my-4 justify-between">
    <Form.Item
    initialValue={updateProduct?.original_price}
      label="original price"
      name="original_price"
      rules={[{ required: true, message: 'Please enter  original price !' }]}
    >
      <Input />
    </Form.Item>

    <Form.Item
    initialValue={updateProduct?.sale_price}
      label="sale price"
      name="sale_price"
      rules={[{ required: true, message: 'Please enter  sale price !' }]}
    >
      <Input />
    </Form.Item>

    <Form.Item
    initialValue={updateProduct?.number_in_stock}
      label="number stock"
      name="number_in_stock"
      rules={[{ required: true, message: 'Please enter  sale price !' }]}
    >
      <Input />
    </Form.Item>

    </div>

    
    <div className="flex w-full gap-4 my-4 justify-between">
    <Form.Item
    initialValue={updateProduct?.category}
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
    initialValue={updateProduct?.product_type}
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
    initialValue={updateProduct?.description}
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