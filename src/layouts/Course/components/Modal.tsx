import React from 'react'
import { Form, Input, Modal, Button, DatePicker, Select,ConfigProvider } from "antd";
import viVN from 'antd/lib/locale/vi_VN';
import moment from 'moment';

const FormItem = Form.Item;
const { Option } = Select;
const dateFormat = 'DD-MM-YYYY';
const formItemLayout = {
    labelCol: {
        span: 6,
    },
    wrapperCol: {
        span: 14,
    },
};
interface IModalProps {
    item: any;
    loading: boolean;
    onOk: (data: any) => void;
    onCancel: () => void;
    dataTeacher: any;
    dataSubject: any;
    checkupdate:boolean;
}

const ModalCourse: React.FC<IModalProps> = (props) => {
    const formRef = React.useRef<any>();
    const { item = {}, onOk, ...modalProps } = props;
    const [dateValue, setdateValue] = React.useState<any>();
    const [nameTeacher,setNameTeacher]=React.useState<string>("");
    const [nameSubject,setNameSubject]=React.useState<string>("");
    const handleOk = () => {
        formRef.current
            .validateFields()
            .then((values: any) => {
                var data = {
                    ...values,
                };
                data = { ...data, dateBegin: dateValue };
                 onOk(data);
            })
            .catch((errorInfo: any) => {
                console.log(errorInfo);
            });
    };
    const checkdate = (date, dateString) => {
        setdateValue(dateString);
    }
    React.useEffect(() => {
        if(props.checkupdate===true){
            var dataTeacher=props.dataTeacher.find(items=>{
                return items.name==item.nameTeacher
            })
            console.log(dataTeacher.key);
            var dataSubject=props.dataSubject.find(items=>{
                return items.name==item.nameSubject
            })
            console.log(dataSubject);
            setNameTeacher(dataTeacher.key);
            setNameSubject(dataSubject.key);
            setdateValue(item.dateBegin);
        }
        else{
            setNameTeacher("");
            setNameSubject("");
            setdateValue("2021-01-01T00:00:00");
        }
      }, [item]);

    const Year = [
        { name: "2019-2020", key: "2019-2020" },
        { name: "2020-2021", key: "2020-2021" },
        { name: "2021-2022", key: "2021-2022" },
        { name: "2022-2023", key: "2022-2023" },
    ]
    const semeterList = [
        { name: "1", key: 1 },
        { name: "2", key: 2 },
        { name: "H???c k??? h??", key: 3 },
    ]
    const OptionTeacher = () => {
        return props.dataTeacher.map((item: any, index: number) => {
            return <Option value={item.key} key={index}>{item.name}</Option>
        })
    }
    const OptionSubject = () => {
        return props.dataSubject.map((item: any, index: number) => {
            return <Option value={item.key} key={index}>{item.name}</Option>
        })
    }
    const OptionYear = () => {
        return Year.map((item: any, index: number) => {
            return <Option value={item.key} key={index}>{item.name}</Option>
        })
    }
    const OptionSemeter = () => {
        return semeterList.map((item: any, index: number) => {
            return <Option value={item.key} key={index}>{item.name}</Option>
        })
    }
    return (
        <Modal
            {...modalProps}
            footer={[
                <Button key="cancel" onClick={props.onCancel}>
                    Tho??t
          </Button>,
                <Button
                    key="Ok"
                    type="primary"
                    loading={props.loading}
                    onClick={handleOk}
                >
                    T???o
          </Button>,
            ]}
        >
            <Form
                ref={formRef}
                name="control-ref"
                layout="horizontal"
            >
                <FormItem
                    name="name"
                    rules={[{ required: true, message: "Nh???p t??n kh??a h???c!" }]}
                    label="T??n kh??a h???c"
                    hasFeedback
                    initialValue={item.name}
                    {...formItemLayout}
                >
                    <Input value={item.name} />
                </FormItem>
                <FormItem
                    name="id_Teacher"
                    label="Gi??o vi??n"
                    rules={[{ required: true, message: "Ch???n gi??o vi??n!" }]}
                    hasFeedback
                    initialValue={nameTeacher}
                    {...formItemLayout}
                >
                    <Select
                        placeholder="L???a ch???n gi??o vi??n"
                        allowClear
                    >
                        {
                            OptionTeacher()
                        }
                    </Select>
                </FormItem>
                <FormItem
                    name="id_Subject"
                    label="M??n h???c"
                    rules={[{ required: true, message: "Ch???n M??n h???c!" }]}
                    hasFeedback
                    initialValue={nameSubject}
                    {...formItemLayout}
                >
                    <Select
                        placeholder="L???a ch???n m??n h???c"
                        allowClear
                    >
                        {
                            OptionSubject()
                        }
                    </Select>
                </FormItem>

                <FormItem
                    name="schoolYear"
                    label="N??m h???c"
                    rules={[{ required: true, message: "Ch???n n??m h???c!" }]}
                    hasFeedback
                    initialValue={item.schoolYear}
                    {...formItemLayout}
                >
                    <Select
                        placeholder="L???a ch???n n??m h???c"
                        allowClear
                    >
                        {
                            OptionYear()
                        }
                    </Select>
                </FormItem>

                <FormItem
                    name="semester"
                    label="H???c k???"
                    rules={[{ required: true, message: "Ch???n h???c k???!" }]}
                    hasFeedback
                    initialValue={item.semester}
                    {...formItemLayout}
                >
                    <Select
                        placeholder="L???a ch???n h???c k???"
                        allowClear
                    >
                        {
                            OptionSemeter()
                        }
                    </Select>
                </FormItem>
                <ConfigProvider locale={viVN}>
                <FormItem
                    name="dateBegin"
                    label="Ng??y b???t ?????u"
                    rules={[{ required: !props.checkupdate, message: "Ch???n ng??y b???t ?????u !" }]}
                    {...formItemLayout}>
                    <DatePicker style={{width:"100%"}} defaultValue={moment(`${dateValue}`, dateFormat)} onChange={checkdate} />
                </FormItem>
                </ConfigProvider>

            </Form>
        </Modal>
    )
}

export default ModalCourse;
