import React, { useState } from 'react';
import { Button, Col, DatePicker, Drawer, Form, Input, Row, Select, Space } from 'antd';
import useAuthStore from '../../../auth/auth';
import { createCalendar } from '../../../api/CalendarApiService';
import { Navigate, useNavigate } from 'react-router-dom';

const { Option } = Select;

export default function Calendarpop({ open, setOpen, refresh, setRefresh }) {

  const { userId } = useAuthStore();
  const [isSubmit, setIsSubmit] = useState(false);
  const navigate = useNavigate();

  const onFinish = (values) => {

    const data = {
      ...values,
      write_date: new Date(),
      start_date: new Date(values.dateTime[0].$d),
      end_date: new Date(values.dateTime[1].$d),
      writer_id: userId,
      group_id: values.groupId === "private" ? 0 : parseInt(values.groupId),
      // writeDate: new Date(),
      // startDate: new Date(values.dateTime[0].$d),
      // endDate: new Date(values.dateTime[1].$d),
      // writerId: userId,
      // groupId: values.groupId === "private" ? 0 : parseInt(values.groupId),
    }

    delete data.dateTime

    createCalendar(data)
      .then(() => {
        setIsSubmit(prev => !prev);
        onClose();
        setRefresh(prev => !prev);
        navigate('/Calendar')
      })
  };

  const onClose = () => {
    setOpen(false)
  };

  return (
    <>
      <Drawer key={isSubmit}
        title="Create a new Schedule"
        width={700}
        onClose={onClose}
        open={open}
        styles={{
          body: {
            paddingBottom: 80,
          },
        }}
        extra={
          <Space>
            <Button onClick={onClose}>취소</Button>
          </Space>
        }
      >
        <Form layout="vertical"
          onFinish={onFinish}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="title"
                label="일정"
                rules={[{ required: true, message: 'Please enter user name' }]}
              >
                <Input placeholder="Please enter user name" />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                name="place"
                label="장소"
                rules={[{ required: true, message: 'Please enter place' }]}
              >
                <Input placeholder="Please enter user name" />
              </Form.Item>
            </Col>

          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="index_color"
                label="유형"
                rules={[{ required: true, message: 'Please select an index' }]}
              >
                <Select placeholder="Please select an index">
                  <Option value="warning">warning</Option>
                  <Option value="success">success</Option>
                  <Option value="error">error</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="type"
                label="월간/연간"
                rules={[{ required: true, message: 'Please choose the type' }]}
              >
                <Select placeholder="Please choose the type">
                  <Option value="month">month</Option>
                  <Option value="year">year</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="dateTime"
                label="DateTime"
                rules={[{ required: true, message: 'Please choose the dateTime' }]}
              >
                <DatePicker.RangePicker
                  style={{ width: '100%' }}
                  getPopupContainer={(trigger) => trigger.parentElement}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="group_id"
                label="개인/그룹"
                rules={[{ required: true, message: 'Please choose the approver' }]}
              >
                <Select placeholder="Please choose the place">
                  {
                    //그룹뜨게 
                  }
                  <Option value="private">개인</Option>
                  <Option value="1">Tom Liu</Option>
                </Select>
              </Form.Item>
            </Col>

          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="content"
                label="content"
                rules={[
                  {
                    required: false,
                    message: 'please enter url description',
                  },
                ]}
              >
                <Input.TextArea rows={4} placeholder="please enter url description" />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item label={null} style={{ display: 'flex', justifyContent: 'center' }}>
            <Button type="primary" htmlType="submit">
              등록
            </Button>

          </Form.Item>

        </Form>
      </Drawer>
    </>
  );
};

