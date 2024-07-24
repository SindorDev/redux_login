import { Flex, Button, Table } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from "../../api/data"
const columns = [
    
  {
    title: 'Name',
    dataIndex: 'name',
  },
  
  {
    title: 'original_price',
    dataIndex: 'original_price',
  },
  
  {
   title: 'Sale Price',
   dataIndex: 'sale_price',
 },
  {
   title: 'stock',
   dataIndex: 'number_in_stock',
 },
 
 {
   title: 'Category',
   dataIndex: 'category',
 },
 {
   title: "product type",
   dataIndex: "product_type",
 },

 {
  title: 'Update',
  dataIndex: 'update',
 }, 
{
 title: 'Delete',
 dataIndex: 'delete',
},

 
];

const TableProduct =  ({showModal}) => {
  const [data, setData] = useState(null)
  const dispatch = useDispatch()
  useEffect(() => {

  fetch("http://localhost:8000/product/all", {
    method: "GET",
  })
  .then(response => response.json())
  .then(data => setData(data.payload))
  .catch(error => {
    console.log(error);
  })
  
}, [])


  const handleDelete = async (id) => {
    const response = await axios.delete(`/product/${id}`)
    window.location.reload()
  }

  const handleUpdate = (id) => {
    console.log(id);
    showModal()
    dispatch({type: "PRODUCT_ID", id})
  }



   const dataSource = data?.map((item) => ({
     key: item._id,
     name: item.product_name,
     original_price: "$"+item.original_price,
     sale_price: "$"+item.sale_price,
     number_in_stock: item.number_in_stock,
     category: item.category,
     product_type: item.product_type,
     update: <Button className='bg-yellow-500 text-white' onClick={() => handleUpdate(item._id)}>Update</Button>,
    delete: <Button danger type="primary"  onClick={() => handleDelete(item._id)}>Delete</Button>,
    }));


     return (
    <>

    <Flex gap="middle" vertical>
      <Table columns={columns} dataSource={dataSource} />
    </Flex>
    </>
  )
}

export default TableProduct