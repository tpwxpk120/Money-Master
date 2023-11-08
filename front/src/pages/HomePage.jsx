import React, { useState, useEffect } from "react";
import { Form, Input, message, Modal, Select, Table, DatePicker } from "antd";
import {
  UnorderedListOutlined,
  AreaChartOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import Layout from "../components/Layout/Layout";
import Spinner from "../components/Spinner";
import moment from "moment";
import DemoPie from "../components/Analytics";

const HomePage = () => {
  const [form] = Form.useForm();
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [allTransaction, setAllTransaction] = useState([]);
  const [type, setType] = useState("all");
  const [viewData, setViewData] = useState("table");
  const [editable, setEditable] = useState(null);
  const [editing, setEditing] = useState(false);
  const [showTransection, setTransection] = useState([]);
  // Table data
  const columns = [
    { key: "_id", title: "TransectionId", dataIndex: "_id" },
    {
      key: "date",
      title: "Date",
      dataIndex: "date",
      render: (text) => <span>{moment(text).format("YYYY-MM-DD")}</span>,
    },
    { key: "amount", title: "Amount", dataIndex: "amount" },
    { key: "type", title: "Type", dataIndex: "type" },
    { key: "category", title: "Category", dataIndex: "category" },
    {
      key: "actions",
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => (
        <div key={record._id}>
          <EditOutlined
            onClick={() => {
              setEditable(record);
              setEditing(true);
              setShowModal(true);
            }}
          />
          <DeleteOutlined
            className="mx-2"
            onClick={() => {
              handleDelete(record);
            }}
          />
        </div>
      ),
    },
  ];

  // Get all transactions
  useEffect(() => {
    const getAllTransactions = async () => {
      try {
        const response = await fetch(
          "http://localhost:7000/api/v1/transactions/get-transection?userId=" +
            JSON.parse(localStorage.getItem("user")),
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log(response);
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setAllTransaction(data);
        } else {
          message.error("Fetch Issue With Transaction");
        }

        setLoading(false);
      } catch (error) {
        console.log(error);
        message.error("Fetch Issue With Transaction");
        setLoading(false);
      }
    };
    getAllTransactions();
    setTransection(allTransaction);
  }, [type]);

  // Delete handler
  const handleDelete = (record) => {
    console.log(record);
    console.log(record["_id"]);
    try {
      fetch("http://localhost:7000/api/v1/transactions/delete-transection", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ transectionId: record["_id"] }),
      })
        .then((response) => {
          if (response.status === 201) {
            message.success("deleted");
          } else {
            throw new Error("Unable to delete");
          }
        })
        .then(() => {
          setAllTransaction((prevData) =>
            prevData.filter((item) => item !== record)
          );
          setLoading(false);
          message.success("Transaction Deleted!");
        })
        .catch((error) => {
          setLoading(false);
          console.error(error);
          message.error("Unable to delete");
        });
    } catch (error) {
      setLoading(false);
      console.log(error);
      message.error("Unable to delete");
    }
  };

  // Sumbit handling
  const handleSubmit = (values) => {
    const userId = localStorage.getItem("user");
    const parsedUserId = JSON.parse(userId);
    const item = {
      userId: parsedUserId,
      type: form.getFieldsValue([["type"]]).type,
      amount: form.getFieldsValue([["amount"]]).amount,
      date: form.getFieldsValue([["date"]]).date,
      category: form.getFieldsValue([["category"]]).category,
      description: form.getFieldsValue([["description"]]).description,
    };
    console.log(item);
    try {
      fetch("http://localhost:7000/api/v1/transactions/add-transection", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(item),
      })
        .then((response) => {
          if (response.status === 201) {
            message.success("Added");
          } else {
            throw new Error("2");
          }
        })
        .catch((error) => {
          message.error("3");
        });
    } catch (error) {
      message.error("Please fill all fields");
    }
  };

  const updateSubmit = (values) => {
    // message.success("Naaaaa");
    // setEditing(false);
    // return
    try {
      console.log(editable);
      console.log(">?<><>");
      const userId = localStorage.getItem("user");
      const parsedUserId = JSON.parse(userId);
      const item = {
        transectionId: editable._id,
        userId: parsedUserId,
        type: form.getFieldsValue([["type"]]).type,
        amount: form.getFieldsValue([["amount"]]).amount,
        date: form.getFieldsValue([["date"]]).date,
        category: form.getFieldsValue([["category"]]).category,
        description: form.getFieldsValue([["description"]]).description,
      };
      console.log(item);
      fetch("http://localhost:7000/api/v1/transactions/edit-transection", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(item),
      })
        .then((response) => {
          console.log("????");
          if (response.status === 201) {
            message.success("updated");
          } else {
            throw new Error("Please fill all fields");
          }
        })
        .catch((error) => {
          setLoading(false);
          console.error(error);
          message.error("2");
        });
    } catch (error) {
      setLoading(false);
      message.error("3");
    }
    setEditing(false);
  };

useEffect(() => {if(type!= "all") {const changeData = allTransaction.filter(item => item.type === type);
  setTransection(changeData);} else {setTransection(allTransaction)}
 }, [allTransaction, type]);

  return (
    <Layout>
      {loading && <Spinner />}
      <div className="filters">
        <div className="filter-tab">
          <h6>Select Type</h6>
          <Select value={type} onChange={(value) => setType(value)}>
            <Select.Option value="all">ALL</Select.Option>
            <Select.Option value="income">INCOME</Select.Option>
            <Select.Option value="expense">EXPENSE</Select.Option>
          </Select>
        </div>
        <div className="switch-icons">
          <UnorderedListOutlined
            className={`mx-2 ${
              viewData === "table" ? "active-icon" : "inactive-icon"
            }`}
            onClick={() => setViewData("table")}
          />
          <AreaChartOutlined
            className={`mx-2 ${
              viewData === "analytics" ? "active-icon" : "inactive-icon"
            }`}
            onClick={() => setViewData("analytics")}
          />
        </div>
        <div>
          <button
            className="btn btn-primary"
            onClick={() => setShowModal(true)}
          >
            Add New
          </button>
        </div>
      </div>
      <div className="content">
        {viewData === "table" ? (
          <Table
            columns={columns}
            dataSource={showTransection.map((item) => ({
              ...item,
              key: item._id,
            }))}
          />
        ) : (
          <DemoPie data={showTransection} />
        )}
      </div>
      <Modal
        title={editable ? "Edit Transaction" : "Add Transaction"}
        open={showModal}
        onCancel={() => setShowModal(false)}
        footer={null}
      >
        <Form
          layout="vertical"
          onFinish={editing ? updateSubmit : handleSubmit}
          initialValues={editable}
          form={form}
        >
          <Form.Item
            label="Amount"
            name="amount"
            rules={[{ required: true, message: "Please enter the amount" }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item label="Type" name="type">
            <Select>
              <Select.Option value="income">Income</Select.Option>
              <Select.Option value="expense">Expense</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Category" name="category">
            <Select>
              <Select.Option value="salary">Salary</Select.Option>
              <Select.Option value="tip">Tip</Select.Option>
              <Select.Option value="project">Project</Select.Option>
              <Select.Option value="food">Food</Select.Option>
              <Select.Option value="movie">Movie</Select.Option>
              <Select.Option value="bills">Bills</Select.Option>
              <Select.Option value="medical">Medical</Select.Option>
              <Select.Option value="fee">Fee</Select.Option>
              <Select.Option value="tax">TAX</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Date" name="date">
            <Input type="date" />
          </Form.Item>
          <Form.Item
            label="Description"
            name="description"
            rules={[
              { required: true, message: "Please enter the description" },
            ]}
          >
            <Input type="text" />
          </Form.Item>
          <div className="d-flex justify-content-end">
            <button type="submit" className="btn btn-primary">
              SAVE
            </button>
          </div>
        </Form>
      </Modal>
    </Layout>
  );
};

export default HomePage;
