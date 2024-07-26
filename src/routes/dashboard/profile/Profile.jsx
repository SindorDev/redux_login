import { Card, Typography, Row, Col, Divider, Image  } from 'antd';
import { useFetch } from '../../../hooks/useFetch';
import avatar from "../../../images/avatarImage.webp"
const { Title, Paragraph, Text } = Typography;

const ProfilePage = () => {
  const [data] = useFetch('/auth/profile')
  
  return (
    <div style={{ padding: '20px' }}>
      <Card
        style={{ maxWidth: 1100, margin: '0 auto', borderRadius: '10px' }}
        
      >
        <div className='flex items-center justify-center'>
         <Image
            width={200}
            height={200}
            src="error"
            fallback={avatar}
            style={{marginBottom: "50px", borderRadius: "50%"}}
/>
        </div>
        <Title level={2} style={{ textAlign: 'center' }}>{data.payload?.first_name}</Title>
        <Paragraph style={{ textAlign: 'center' }}>
          Full Stack Developer | Tech Enthusiast | Frontend Developer
        </Paragraph>
        <Divider />
        <Row className='ml-[100px]'>
          <Col span={9}>
            <Text strong>UserName</Text>
            <Paragraph>{data.payload?.username}</Paragraph>
          </Col>
          <Col span={7}>
            <Text strong>Role</Text>
            <Paragraph>{data.payload?.role}</Paragraph>
          </Col>
          
          <Col span={8}>
            <Text strong>ID</Text>
            <Paragraph>{data.payload?._id}</Paragraph>
          </Col>
        </Row>
        <Divider />
      </Card>
    </div>
  );
};

export default ProfilePage;