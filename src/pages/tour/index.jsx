import React, { useEffect, useState } from 'react'
import { message, Space, Table, Tag, Button } from 'antd';
import { get, patch } from '../../utils/axios-http/axios-http';
import { Navigate, useNavigate } from 'react-router-dom';

function Tour() {
    const [tour, setTour] = useState([]);
    const navigate = useNavigate();
    const viewDetails = (tourID) => {
        navigate(`/tour-detail/${tourID}`);
    };
    useEffect(() => {
        const fetchDataTour = async () => {
            const respone = await get('tours/get-all-tour')
            setTour(respone);
            console.log(respone);
        };
        fetchDataTour();
    }, []);
    const removeTour = async (tourID) => {
        try {
            await patch(`tours/remove/${tourID}`);
            message.success('Xóa tour thành công');
            setTour((prevTours) => prevTours.filter((item) => item.id !== tourID));
        } catch (error) {
            message.error('Xóa tour thất bại')
        }
    }
    const columns = [
        {
            title: 'STT',
            key: 'index',
            render: (text, record, index) => <a>{index + 1}</a>,
        },
        {
            title: 'Tên tour',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Ảnh',
            dataIndex: 'source',
            key: 'source',
            render: (source) => <img src={source} alt="tour" style={{ width: 50, height: 50 }} />, // Hiển thị ảnh
        },
        {
            title: 'Mã tour',
            dataIndex: 'code',
            key: 'code',
        },
        {
            title: 'Trạng thái',
            key: 'status',
            dataIndex: 'status',
            render: (status) => (
                <Tag color={status == '1' ? 'green' : 'red'}>
                    {status == '1' ? 'Hoạt động' : 'Không hoạt động'}
                </Tag>
            ), filters: [
                {
                    text: 'Hoạt động',
                    value: '1',
                },
                {
                    text: 'Không hoạt dộng',
                    value: '0',
                },
            ],
        },
        {
            title: 'Nổi bật',
            dataIndex: 'isFeatured',
            key: 'isFeatured',
            render: (isFeatured) => (isFeatured ? 'Có' : 'Không'),
        },
        {
            title: 'Giá',
            dataIndex: 'adultPrice',
            key: 'adultPrice',
        },
        {
            title: 'Ngày khởi hành',
            dataIndex: 'dayStart',
            key: 'dayStart',
        },
        {
            title: 'Ngày trở lại',
            dataIndex: 'dayReturn',
            key: 'dayReturn',
        },
        {
            title: 'Thể loại',
            dataIndex: 'categories',
            key: 'categories',
        },
        {
            title: 'Điểm đến',
            dataIndex: 'destination',
            key: 'destination',
        },
        {
            title: 'Điểm khởi hành',
            dataIndex: 'departure',
            key: 'departure',
        },
        {
            title: 'Phương tiện',
            dataIndex: 'transportation',
            key: 'transportation',
        },
        {
            title: 'Hành động',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <a onClick={() => viewDetails(record.id)}>Xem chi tiết</a>
                    <a>Sửa</a>
                    <a onClick={() => removeTour(record.id)}>Xóa</a>
                </Space>
            ),
        },
    ];
    // const data = tour;
    return (
        <div className="tour-container">
            <Button onClick={() => navigate('/create-new')} style={{ background: 'blue', color: 'white' }}>Tạo mới</Button >
            <Table columns={columns} dataSource={tour} />
        </div>
    )
}

export default Tour