
import React from "react";
import styles from "./List.module.scss";
import {
  Table,
  Modal,
} from "antd";
import { ButtonOption } from "components/UI";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { NavLink } from "react-router-dom";
const { confirm } = Modal;
interface IListProps {
  loading: boolean;
  pagination: any;
  dataSource:any;
  onDeleteItem: (id: string) => void;
  onEditItem: (item: any) => void;
  onChangeIndex:(item:any)=>void;
}
const List: React.FC<IListProps> = (props) => {
  const handleMenuClick = (record, e) => {
    if (e.key === "1") {
      props.onEditItem(record);
    } else if (e.key === "2") {
      confirm({
        title: "bạn muốn xóa khóa học này?",
        icon: <ExclamationCircleOutlined />,
        onOk() {
          props.onDeleteItem(record.key);;
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
      width: "5%",
      align: "center" as "center",
    },
    {
      title: "Tên khóa học",
      dataIndex: "name",
      key: "name",
      width: "15%",
      render: (text: any, record: any) => {
        return (
          <NavLink to={`/hoc_vien-khoa_hoc/${record.key}`}>{text}</NavLink>
        );
      },
    },
    {
      title: "Tên giáo viên",
      dataIndex: "nameTeacher",
      key: "nameTeacher",
      width: "20%",
    },
    {
      title: "Tên môn học",
      dataIndex: "nameSubject",
      key: "nameSubject",
       width: "15%",
    },
    {
      title: "Niên khóa",
      dataIndex: "schoolYear",
      key: "schoolYear",
       width: "15%",
    },
    {
      title: "Học kỳ",
      dataIndex: "semester",
      key: "semester",
       width: "10%",
    },
    {
      title: "Chức năng",
      key: "operation",
      align: "center" as "center",
      render:( record =>{
        return <ButtonOption
        onMenuClick={(e) => handleMenuClick(record, e)}
        buttonOptions={[
          { key: "1", name: "Cập nhật" },
          { key: "2", name: "Xóa" },
        ]}
      />
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
