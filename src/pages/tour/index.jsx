import React, { useEffect, useState, useCallback } from "react";
import {
  message,
  Space,
  Table,
  Tag,
  Button,
  Select,
  DatePicker,
  Input,
} from "antd";
import { get, patch } from "../../utils/axios-http/axios-http";
import { useNavigate } from "react-router-dom";
import moment from "moment";

const { Option } = Select;
const { Search } = Input;

function Tour() {
  const [tour, setTour] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [departures, setDepartures] = useState([]);
  const [destinations, setDestinations] = useState([]);
  const [transportations, setTransportations] = useState([]);
  const [typeButtonOne, setTypeButtonOne] = useState("");
  const [typeButtonTwo, setTypeButtonTwo] = useState("");

  // Query parameters for filtering
  const [filters, setFilters] = useState({
    destinationTo: "",
    departureFrom: "",
    fromDate: "",
    transTypeId: "",
    categoryId: "",
    status: "",
    isFeatured: "",
    sortOrder: "",
    title: "",
  });

  const viewDetails = (tourID) => {
    navigate(`/tour-detail/${tourID}`);
  };

  const editTour = (tourID) => {
    navigate(`/edit-tour/${tourID}`);
  };

  const handleChangeStatus = async (tourId, status) => {
    setLoading(true);
    try {
      const option = { status: !status };
      await patch(`tours/status/${tourId}`, option);
      message.success("Cập nhật trạng thái tour thành công!");
      fetchDataTour();
    } catch (error) {
      message.error("Cập nhật trạng thái tour thất bại!");
    }
    setLoading(false);
  };

  const handleChangeFeatured = async (tourId, isFeatured) => {
    setLoading(true);
    try {
      const option = { isFeatured: !isFeatured };
      await patch(`tours/featured/${tourId}`, option);
      message.success("Cập nhật tour nổi bật thành công!");
      fetchDataTour();
    } catch (error) {
      message.error("Cập nhật tour nổi bật thất bại!");
    }
    setLoading(false);
  };

  const fetchDataTour = useCallback(async () => {
    try {
      setLoading(true);
      const [
        response,
        categoriesData,
        departuresData,
        destinationsData,
        transportationsData,
      ] = await Promise.all([
        get("tours/get-all-tour", filters),
        get("category/get-all-category"),
        get("departure/get-all-departure"),
        get("destination/get-tree"),
        get("transportation/get-all-transportation"),
      ]);
      setCategories(categoriesData.categories || []);
      setDepartures(departuresData.departures || []);
      setDestinations(destinationsData || []);
      setTransportations(transportationsData.transportations || []);
      setTour(response);
    } catch (error) {
      message.error("Lỗi khi tải dữ liệu tour!");
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchDataTour();
  }, [filters]);

  const removeTour = async (tourID) => {
    try {
      await patch(`tours/remove/${tourID}`);
      message.success("Xóa tour thành công");
      setTour((prevTours) => prevTours.filter((item) => item.id !== tourID));
    } catch (error) {
      message.error("Xóa tour thất bại");
    }
  };

  const renderDestinations = (items, level = 0) => {
    return items.map((destination) => (
      <>
        <Option key={destination.id} value={destination.id}>
          {`${"--".repeat(level)} ${destination.title}`}
        </Option>
        {destination.children && destination.children.length > 0 && (
          <>{renderDestinations(destination.children, level + 1)}</>
        )}
      </>
    ));
  };
  const fetchExpiringTours = async () => {
    setTypeButtonOne("");
    setTypeButtonTwo("primary");
    setLoading(true);
    try {
      const response = await get("tours/expired-soon", filters);
      setTour(response);
    } catch (error) {
      message.error("Lỗi khi tải dữ liệu tour sắp hết hạn!");
    } finally {
      setLoading(false);
    }
  };

  const fetchExpiredTours = async () => {
    setTypeButtonOne("primary");
    setTypeButtonTwo("");
    setLoading(true);
    try {
      const response = await get("tours/expired", filters);
      setTour(response);
    } catch (error) {
      message.error("Lỗi khi tải dữ liệu tour đã hết hạn!");
    } finally {
      setLoading(false);
    }
  };

  const clearFilters = () => {
    setTypeButtonOne("");
    setTypeButtonTwo("");
    setFilters({
      destinationTo: "",
      departureFrom: "",
      fromDate: "",
      transTypeId: "",
      categoryId: "",
      status: "",
      isFeatured: "",
      sortOrder: "",
    });
    fetchDataTour();
  };

  const columns = [
    {
      title: "STT",
      key: "index",
      render: (text, record, index) => <a>{index + 1}</a>,
    },
    {
      title: "Tên tour",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Ảnh",
      dataIndex: "source",
      key: "source",
      render: (source) => (
        <img src={source} alt="tour" style={{ width: 50, height: 50 }} />
      ),
    },
    {
      title: "Mã tour",
      dataIndex: "code",
      key: "code",
    },
    {
      title: "Trạng thái",
      key: "status",
      dataIndex: "status",
      render: (status, record) => (
        <Tag
          color={status == 1 ? "green" : "red"}
          onClick={() => handleChangeStatus(record.id, status)}
        >
          {status == 1 ? "Hoạt động" : "Không hoạt động"}
        </Tag>
      ),
    },
    {
      title: "Nổi bật",
      dataIndex: "isFeatured",
      key: "isFeatured",
      render: (isFeatured, record) => (
        <Tag
          color={isFeatured == 1 ? "green" : "red"}
          onClick={() => handleChangeFeatured(record.id, isFeatured)}
        > {isFeatured == 1 ? "Nổi bật" : "Không nổi bật"}
        </Tag>
      ),
    },
    {
      title: "Giá",
      dataIndex: "adultPrice",
      key: "adultPrice",
    },
    {
      title: "Ngày khởi hành",
      dataIndex: "dayStart",
      key: "dayStart",
      render: (dayStart) => moment(dayStart).format("DD-MM-YYYY"),
    },
    {
      title: "Ngày trở lại",
      dataIndex: "dayReturn",
      key: "dayReturn",
      render: (dayReturn) => moment(dayReturn).format("DD-MM-YYYY"),
    },
    {
      title: "Thể loại",
      dataIndex: "categories",
      key: "categories",
    },
    {
      title: "Điểm đến",
      dataIndex: "destination",
      key: "destination",
    },
    {
      title: "Điểm khởi hành",
      dataIndex: "departure",
      key: "departure",
    },
    {
      title: "Phương tiện",
      dataIndex: "transportation",
      key: "transportation",
    },
    {
      title: "Hành động",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => viewDetails(record.id)}>Xem chi tiết</a>
          <a onClick={() => editTour(record.id)}>Sửa</a>
          <a onClick={() => removeTour(record.id)}>Xóa</a>
        </Space>
      ),
    },
  ];

  return (
    <div className="tour-container">
      <div style={{ marginBottom: 20 }}>
        <Button
          onClick={() => navigate("/create-new")}
          style={{ background: "blue", color: "white" }}
        >
          Tạo mới
        </Button>
        <Button
          onClick={fetchExpiringTours}
          type={typeButtonTwo}
          style={{ marginRight: 10 }}
        >
          Tour sắp hết hạn
        </Button>
        <Button onClick={fetchExpiredTours} type={typeButtonOne}>
          Tour hết hạn
        </Button>
        <Button onClick={clearFilters}>Quay lại Quản lý Tour</Button>
        <Search
          placeholder="Nhập tour muốn tìm kiếm"
          onSearch={(value) => setFilters({ ...filters, title: value })}
          style={{ width: 200 }}
        />
      </div>

      <div style={{ marginBottom: 20 }}>
        <Select
          style={{ width: 200, marginRight: 10 }}
          placeholder="Chọn điểm đến"
          onChange={(value) => setFilters({ ...filters, destinationTo: value })}
        >
          <Option value="">Tất cả</Option>
          {renderDestinations(destinations)}
        </Select>

        <Select
          style={{ width: 200, marginRight: 10 }}
          placeholder="Chọn điểm khởi hành"
          onChange={(value) => setFilters({ ...filters, departureFrom: value })}
        >
          <Option value="">Tất cả</Option>
          {departures.map((departure) => (
            <Option key={departure.id} value={departure.id}>
              {departure.title}
            </Option>
          ))}
        </Select>

        <DatePicker
          style={{ marginRight: 10 }} placeholder="Chọn ngày bắt đầu"
          onChange={(date, dateString) =>
            setFilters({ ...filters, fromDate: dateString })
          }
        />

        <Select
          style={{ width: 200, marginRight: 10 }}
          placeholder="Chọn phương tiện"
          onChange={(value) => setFilters({ ...filters, transTypeId: value })}
        >
          <Option value="">Tất cả</Option>
          {transportations.map((transportation) => (
            <Option key={transportation.id} value={transportation.id}>
              {transportation.title}
            </Option>
          ))}
        </Select>

        <Select
          style={{ width: 200, marginRight: 10 }}
          placeholder="Chọn danh mục"
          onChange={(value) => setFilters({ ...filters, categoryId: value })}
        >
          <Option value="">Tất cả</Option>
          {categories.map((category) => (
            <Option key={category.id} value={category.id}>
              {category.title}
            </Option>
          ))}
        </Select>

        <Select
          style={{ width: 200, marginRight: 10 }}
          placeholder="Chọn trạng thái"
          onChange={(value) => setFilters({ ...filters, status: value })}
        >
          <Option value="">Tất cả</Option>
          <Option value="1">Hoạt động</Option>
          <Option value="0">Không hoạt động</Option>
        </Select>

        <Select
          style={{ width: 200, marginRight: 10 }}
          placeholder="Chọn nổi bật"
          onChange={(value) => setFilters({ ...filters, isFeatured: value })}
        >
          <Option value="">Tất cả</Option>
          <Option value="1">Nổi bật</Option>
          <Option value="0">Không nổi bật</Option>
        </Select>

        <Select
          style={{ width: 200, marginRight: 10 }}
          placeholder="Sắp xếp theo"
          onChange={(value) => setFilters({ ...filters, sortOrder: value })}
        >
          <Option value="asc">Tăng dần</Option>
          <Option value="desc">Giảm dần</Option>
        </Select>

        <Button onClick={clearFilters}>Làm mới bộ lọc</Button>
      </div>

      <Table
        rowKey="id"
        columns={columns}
        dataSource={tour}
        loading={loading}
        className="dashboard-table"
      />
    </div>
  );
}

export default Tour;