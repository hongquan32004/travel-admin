import React, { useEffect, useState } from 'react'
import './style.scss'
import { Table } from 'antd';
import { get } from '../../utils/axios-http/axios-http';
import { useParams } from 'react-router-dom';
import Diadiem from '../../assets/images/diadiem.png'
import Amthuc from '../../assets/images/amthuc.png'
import Doituong from '../../assets/images/doituong.png'
import Thoigian from '../../assets/images/thoigian.png'
import Phuongtien from '../../assets/images/phuongtien.png'
import Khuyenmai from '../../assets/images/khuyenmai.png'

function TourDetail() {
    const [tourDetail, setTourDetail] = useState();
    const { tourID } = useParams();
    useEffect(() => {
        const fetchData = async () => {
            const respone = await get(`tours/detail/${tourID}`);
            setTourDetail(respone);
            console.log(tourID);

        };
        fetchData();
    }, [tourID]);

    const columns = [
        {
            title: 'STT',
            key: 'index',
            render: (text, record, index) => index + 1, // Đánh số thứ tự
        },
        {
            title: 'Tên tour',
            dataIndex: ['tour', 'title'],
            key: 'title',
        },
        {
            title: 'Mã tour',
            dataIndex: ['tour', 'code'],
            key: 'code',
        },
        {
            title: 'Trạng thái',
            dataIndex: ['tour', 'status'],
            key: 'status',
            render: (status) => (status ? 'Hoạt động' : 'Không hoạt động'),
        },
        {
            title: 'Slug',
            dataIndex: ['tour', 'slug'],
            key: 'slug',
        },
        {
            title: 'Nổi bật',
            dataIndex: ['tour', 'isFeatured'],
            key: 'isFeatured',
            render: (isFeatured) => (isFeatured ? 'Có' : 'Không'),
        },
        {
            title: 'Destination ID',
            dataIndex: ['tour', 'destinationId'],
            key: 'destinationId',
        },
        {
            title: 'Transportation ID',
            dataIndex: ['tour', 'transportationId'],
            key: 'transportationId',
        },
        {
            title: 'Departure ID',
            dataIndex: ['tour', 'departureId'],
            key: 'departureId',
        },
        {
            title: 'Người tạo',
            dataIndex: ['tour', 'createdBy'],
            key: 'createdBy',
        },
    ];
    return (
        <div className='tourdetail-container'>
            <div className="tourdetail-content">
                <Table
                    columns={columns}
                    dataSource={tourDetail ? [tourDetail] : []}
                    rowKey={(record) => record.tour.id}
                    pagination={false}
                />
                <div className="tour-information">
                    <h1>Thông tin thêm về chuyến đi</h1>
                    <div className="tour-information-item">
                        <div className="item">
                            <img src={Diadiem} alt="" />
                            <h2>Điểm tham quan</h2>
                            <p>{tourDetail?.information?.attractions}</p>
                        </div>
                        <div className="item">
                            <img src={Amthuc} alt="" />
                            <h2>Ẩm thực</h2>
                            <p>{tourDetail?.information?.cuisine}</p>
                        </div>
                        <div className="item">
                            <img src={Doituong} alt="" />
                            <h2>Đối tượng thích hợp</h2>
                            <p>{tourDetail?.information?.suitableObject}</p>
                        </div>
                        <div className="item">
                            <img src={Thoigian} alt="" />
                            <h2>Thời gian lý tưởng</h2>
                            <p>{tourDetail?.information?.idealTime}</p>
                        </div>
                        <div className="item">
                            <img src={Phuongtien} alt="" />
                            <h2>Phương tiện</h2>
                            <p>{tourDetail?.information?.vehicle}</p>
                        </div>
                        <div className="item">
                            <img src={Khuyenmai} alt="" />
                            <h2>Khuyến mãi</h2>
                            <p>{tourDetail?.information?.promotion}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TourDetail;