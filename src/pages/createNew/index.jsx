import React from 'react'
import './style.scss'
import { Form, Input, Button, Upload, Select, Switch, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { post } from '../../utils/axios-http/axios-http';
function CreateNew() {
    const [form] = Form.useForm();
    const { Option } = Select;

    const onFinish = async () => {
        const values = form.getFieldValue();
        const data = {
            title: values.title,
            isFeatured: values.isFeatured,
            categoryId: values.categoryId,
            destinationId: values.destinationId,
            departureId: values.departureId,
            transportationId: values.transportationId,
            information: {
                attractions: values.attractions,
                cuisine: values.cuisine,
                idealTime: values.idealTime,
                vehicle: values.vehicle,
                promotion: values.promotion
            },
            schedule: [
                {
                    day: values.day,
                    title: values.scheduleTitle,
                    information: values.schedultInfo
                }
            ],
            tour_detail: [
                {
                    adultPrice: values.adultPrice,
                    stock: values.stock,
                    dayStart: values.dayStart,
                    dayReturn: values.dayReturn
                }
            ]
        };

        try {
            const response = await post('tours/create', data);
            console.log(data);

            if (response) {
                message.success('Tạo mới tour thành công!');
                form.resetFields();
            }
        } catch (error) {
            console.error('Đã xảy ra lỗi:', error);
            message.error('Tạo mới tour thất bại, vui lòng thử lại!');
        }
    };
    return (
        <div className='creatnew-container'>
            <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
                className='creatnew-form'
            >
                {/* Title */}
                <Form.Item label="Title" name="title" rules={[{ required: true, message: 'Vui lòng nhập title' }]}>
                    <Input placeholder="Nhập title" />
                </Form.Item>

                {/* Is Featured */}
                <Form.Item label="Is Featured" name="isFeatured" valuePropName="checked">
                    <Switch />
                </Form.Item>

                {/* Category ID */}
                <Form.Item label="Category ID" name="categoryId" rules={[{ required: true, message: 'Vui lòng chọn category' }]}>
                    <Select placeholder="Chọn category">
                        <Option value="1">Category 1</Option>
                        <Option value="2">Category 2</Option>
                        {/* Thêm các Option khác nếu cần */}
                    </Select>
                </Form.Item>

                {/* Departure ID */}
                <Form.Item label="Departure ID" name="departureId" rules={[{ required: true, message: 'Vui lòng chọn điểm khởi hành' }]}>
                    <Select placeholder="Chọn điểm khởi hành">
                        <Option value="1">Điểm 1</Option>
                        <Option value="2">Điểm 2</Option>
                        {/* Thêm các Option khác nếu cần */}
                    </Select>
                </Form.Item>

                {/* Destination ID */}
                <Form.Item label="Destination ID" name="destinationId" rules={[{ required: true, message: 'Vui lòng chọn điểm đến' }]}>
                    <Select placeholder="Chọn điểm đến">
                        <Option value="1">Điểm đến 1</Option>
                        <Option value="2">Điểm đến 2</Option>
                        {/* Thêm các Option khác nếu cần */}
                    </Select>
                </Form.Item>

                {/* Transportation ID */}
                <Form.Item label="Transportation ID" name="transportationId" rules={[{ required: true, message: 'Vui lòng chọn phương tiện' }]}>
                    <Select placeholder="Chọn phương tiện">
                        <Option value="1">Phương tiện 1</Option>
                        <Option value="2">Phương tiện 2</Option>
                        {/* Thêm các Option khác nếu cần */}
                    </Select>
                </Form.Item>

                {/* Information */}
                <Form.Item label="Information: " name="information">
                    <div className="form-information">
                        <div className="if-input">
                            <p>Attractions: </p>
                            <Form.Item name="attractions">
                                <Input className='input' placeholder="Nhập thông tin" />
                            </Form.Item>
                        </div>
                        <div className="if-input">
                            <p>Cuisine: </p>
                            <Form.Item name="cuisine">
                                <Input className='input' placeholder="Nhập thông tin" />
                            </Form.Item>
                        </div>
                        <div className="if-input">
                            <p>IdealTime: </p>
                            <Form.Item name="idealTime">
                                <Input className='input' placeholder="Nhập thông tin" />
                            </Form.Item>
                        </div>
                        <div className="if-input">
                            <p>Vehicle: </p>
                            <Form.Item name="vehicle">
                                <Input className='input' placeholder="Nhập thông tin" />
                            </Form.Item>
                        </div>
                        <div className="if-input">
                            <p>Promotion: </p>
                            <Form.Item name="promotion">
                                <Input className='input' placeholder="Nhập thông tin" />
                            </Form.Item>
                        </div>
                    </div>

                </Form.Item>

                {/* Schedult */}
                <Form.Item label="Schedult" name="schedult">
                    <div className="form-schedult">
                        <div className="sh-input">
                            <p>Day: </p>
                            <Form.Item name="day">
                                <Input className='input' placeholder="Nhập thông tin" />
                            </Form.Item>
                        </div>
                        <div className="sh-input">
                            <p>Title</p>
                            <Form.Item name="title">
                                <Input className='input' placeholder="Nhập thông tin" />
                            </Form.Item>
                        </div>
                        <div className="sh-input">
                            <p>Information: </p>
                            <Form.Item name="information">
                                <Input className='input' placeholder="Nhập thông tin" />
                            </Form.Item>
                        </div>
                    </div>

                </Form.Item>

                {/* Info Image */}
                <Form.Item label="Tour detail: " name="infoImage">
                    <div className="form-tourDetail">
                        <div className="td-input">
                            <p>AdultPrice: </p>
                            <Form.Item name="adultPrice">
                                <Input className='input' placeholder="Nhập thông tin" />
                            </Form.Item>
                        </div>
                        <div className="td-input">
                            <p>Stock: </p>
                            <Form.Item name="stock">
                                <Input className='input' placeholder="Nhập thông tin" />
                            </Form.Item>
                        </div>
                        <div className="td-input">
                            <p>DayStart: </p>
                            <Form.Item name="dayStart">
                                <Input className='input' placeholder="Nhập thông tin" />
                            </Form.Item>
                        </div>
                        <div className="td-input">
                            <p>DayReturn: </p>
                            <Form.Item name="dayReturn">
                                <Input className='input' placeholder="Nhập thông tin" />
                            </Form.Item>
                        </div>
                    </div>
                </Form.Item>

                {/* Upload Image */}
                <Form.Item label="Ảnh" name="image">
                    <Upload
                        name="file"
                        listType="picture"
                        beforeUpload={() => false} // Prevent automatic upload
                    >
                        <Button icon={<UploadOutlined />}>Chọn ảnh</Button>
                    </Upload>
                </Form.Item>


                {/* Submit Button */}
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Tạo mới
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default CreateNew