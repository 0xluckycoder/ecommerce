import { useState } from "react";
import {  Table, Row } from 'antd';
import './orders.scss';

const dataSource = [
    {
      key: '1',
      orderId: '11',
      firstName: 'John',
      lastName: 'Doe',
      totalPrice: 134,

    },
  ];
  
  const columns = [
    {
      title: 'Order_id',
      dataIndex: 'orderId',
      key: 'orderId',
    },
    {
      title: 'First Name',
      dataIndex: 'firstName',
      key: 'firstName',
    },
    {
      title: 'Last Name',
      dataIndex: 'lastName',
      key: 'lastName',
    },
    {
      title: 'Total Price',
      dataIndex: 'totalPrice',
      key: 'totalPrice',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      // conditionally change button here
      render: (() => (
        <>
         <button>button</button>
        </>
      ))
    },
  ];


export default function Orders() {
    return (
        <div className="orders">
            <div className="orders-inner">
                <h2>Orders</h2>
                <Row>
                    <Table dataSource={dataSource} columns={columns} />
                </Row>
            </div>
        </div>
    );
}

/*
const dataSource = [
  {
    key: '1',
    name: 'Mike',
    age: 32,
    address: '10 Downing Street',
  },
  {
    key: '2',
    name: 'John',
    age: 42,
    address: '10 Downing Street',
  },
];

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
];

<Table dataSource={dataSource} columns={columns} />;
*/ 