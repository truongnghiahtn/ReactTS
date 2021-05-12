
import React from "react";
import styles from "./List.module.scss";
import { NavLink } from "react-router-dom";
import {
  Table,
  Modal,
} from "antd";
import { ButtonOption } from "components/UI";
import { ExclamationCircleOutlined } from "@ant-design/icons";
const { confirm } = Modal;
interface IListProps {
  loading: boolean;
  pagination: any;
  dataSource:any;
  onDeleteItem: (id: string) => void;
  onChangeIndex:(item:any)=>void;
}
const List: React.FC<IListProps> = (props) => {
  const handleMenuClick = (record, e) => {
    if (e.key === "1") {
      confirm({
        title: "Bạn muốn xóa lớp học này?",
        icon: <ExclamationCircleOutlined />,
        onOk() {
          props.onDeleteItem(record.key);
        },
        onCancel() {},
      });
    }
  };

  const columns = [
    {
      title: "",
      dataIndex: "index",
      key: "index",
      width: "15%",
      align: "center" as "center",
    },
    {
      title: "Tên học viên",
      dataIndex: "name",
      key: "name",
      width: "30%",
      render: (text: any, record: any) => {
        return (
          record.type==="teacher"?
          <NavLink to={`/khoa_hoc-giao_vien/${record.key}`}>{text}</NavLink>:`${text}`
        );
      },
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: "30%",
    },
    {
      title: "Loại",
      dataIndex: "type",
      key: "type",
      width: "20%",
    },
    {
      title: "Chức năng",
      key: "operation",
      align: "center" as "center",
      render:( record =>{
        return record.email!=="admin@gmail.com"? < ButtonOption
        onMenuClick={(e) => handleMenuClick(record, e)}
        buttonOptions={[
          { key: "1", name: "Xóa" },
        ]}
      />:("");
      })
    },
  ];
  const handleTableChange = (pagination) => {
    props.onChangeIndex(pagination);
  };


  return (
    <>
      <Table
        {...props}
        columns={columns}
        bordered
        rowClassName="editable-row"
        className={styles.table}
        scroll={{ x: 500 }}
        rowKey={(record) => record.key}
        onChange={handleTableChange}
      />
    </>
  );
};

export default List;
