import { Card, Col, Row, Form, Input, Button, Checkbox, Spin } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { openNotification } from '../Helpers/Notification';
import { AppContext } from '../store';

const AboutUs = () => {
  const { setUser, getListStores } = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const [stores, setStores] = useState([]);

  useEffect(() => {
    getListStores().then((response) => {
      setStores(response.data.data)
    })
  }, [])

  return (
    <Row>
      <Col xs={{ span: 20, offset: 2 }} lg={{ span: 16, offset: 4 }}>
        <br />
        <Card bordered={false}>
          <Spin tip="Loading..." spinning={loading}>
            <h1>Giới thiệu</h1>
            <p style={{fontSize: '16px'}}>Kính chào Quý Khách Hàng!</p>

            <p style={{fontSize: '16px'}}>Việc ăn uống luôn là một chủ đề quan trọng trong cuộc sống của mỗi chúng ta. Có câu: “Bạn là những gì bạn ăn”. Thật vậy! Thực phẩm mà chúng ta ăn vào ảnh hưởng trực tiếp đến sức khỏe thể chất lẫn tinh thần. Sự thật là một bữa ăn thực vật sẽ khiến thân và tâm ta nhẹ nhàng hơn. Đơn giản  vì thực vật rất dễ tiêu hóa. Trong thực vật chứa nhiều chất xơ, chất béo không no…giúp giảm cân, giảm cholesterol, giảm bệnh tim mạch, giảm tỉ lệ đái tháo đường...

            Những bữa ăn thực vật ngày càng được khuyến khích và đang trở thành xu hướng trên toàn thế giới. Việc ăn chay với nhiều người đơn thuần là chuyện thuận theo tự nhiên, thuận theo nhu cầu của cơ thể. Ăn chay không chỉ mang đến nhiều lợi ích tuyệt vời cho sức khoẻ, mà  thói quen ăn chay còn góp phần bảo vệ môi trường, giúp con người nuôi dưỡng tâm từ bi, tấm lòng yêu thương động vật.

            Nhà hàng Chay Xanh tọa lạc tại địa chỉ 50 Lê Văn Thịnh, phường Bình Trưng Tây, Quận 2.  CHAY XANH mong muốn mang đến cho quý khách những bữa ăn thực vật ngon, trọn vẹn và tốt cho sức khỏe, góp phần mang tới một cuộc sống An Lành và Hạnh Phúc cho mọi người. Thông qua đó, CHAY XANH muốn lan tỏa phong cách sống lành mạnh, hòa hợp với tự nhiên.

            Các món ăn được thiết kế theo tiêu chí giữ vị tươi, thanh đạm, nhẹ nhàng. Tất cả các món ăn ở CHAY XANH đều được chế biến từ nguồn thực vật tươi mới, hoàn toàn không sử dụng bột ngọt và đồ chay giả mặn. Vị ngọt thanh, tự nhiên đến từ các loại rau - củ - nấm - đậu - hạt.

            Đặc biệt cơm CHAY XANH được nấu từ loại gạo xát dối, ăn ngọt cơm, dẻo mềm. Gạo được trồng tại huyện Núi Thành, Quảng Nam, không sử dụng chất bảo quản và chất tẩy trắng. Cơm từ  gạo lứt nâu (gạo trồng vụ 6 tháng), vừa dễ ăn lại vừa thơm ngon được nhiều khách hàng yêu thích. CHAY XANH mang đến quý khách bữa cơm chay tròn vị như cơm nhà mẹ nấu.

            Đến CHAY XANH quý khách không chỉ được thưởng thức bữa ăn chất lượng, mà còn được thả hồn vào một không gian XANH. Màu xanh lá dịu dưới ánh đèn vàng ấm cúng, thoang thoảng hương tinh dầu sả chanh hòa trong tiếng nhạc không lời du dương. Không gian của Chay Xanh còn có những chậu cây bé xinh, xanh tươi mang đến cho quý khách thêm năng lượng tích cực.

            Trước khi rời nhà hàng, quý khách còn có thể chọn mua những sản phẩm tốt cho sức khoẻ bên kệ trưng bày.

            Hãy cùng CHAY XANH xây dựng nên cuộc sống An Lành và Hạnh Phúc bạn nhé!

            Để CHAY XANH được phục vụ quý khách tốt nhất, vui lòng lưu ý đến nhân viên nếu:

            -Bạn dị ứng bất kì một nguyên liệu nào hoặc bạn có những lưu ý đặc biệt đối với món ăn của mình.</p>

            <p style={{fontSize: '16px'}}>Cảm ơn và kính chúc quý khách có những trải nghiệm tốt nhất!</p>



            Trân trọng!

            <p>Tập Thể CHAY XANH</p>
            <h1>Các chi nhánh của chúng tôi</h1>
            {stores.map((item, index) => {
              return <div key={index}>
                <h2>-{item.name}</h2>
                <p>&#9743; Phone: {item.phone}</p>
                <p>Địa chỉ: {item.address}</p>
              </div>
            })}
          </Spin>
        </Card>
      </Col>
    </Row>
  )
}

export default AboutUs