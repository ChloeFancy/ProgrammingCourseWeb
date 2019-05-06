
import React, { Component } from 'react';
import { connect } from 'dva';
import router from 'umi/router';
import { Table, Form, Input, Button, Row, Col, Modal, Spin } from 'antd';
import { classConfig } from '../../configs/class';
import { formatTimeFromTimeStamp } from '../../lib/common';

const FormItem = Form.Item;

const getColumns = (onDetail, onMemberManage) => {
  return [
    {
      title: classConfig.id.text,
      dataIndex: classConfig.id.dataIndex,
      key: classConfig.id.dataIndex,
    },
    {
      title: classConfig.name.text,
      dataIndex: classConfig.name.dataIndex,
      key: classConfig.name.dataIndex,
      width: '20%',
    },
    {
      title: classConfig.createTime.text,
      dataIndex: classConfig.createTime.dataIndex,
      key: classConfig.createTime.dataIndex,
      width: '15%',
      render: formatTimeFromTimeStamp('YYYY-MM-DD HH:MM:SS'),
    },
    {
      title: classConfig.isCheck.text,
      dataIndex: classConfig.isCheck.dataIndex,
      key: classConfig.isCheck.dataIndex,
      width: '15%',
      render: (isCheck) => isCheck ? '需要导师审核' : '无需审核',
    },
    {
      title: '管理',
      dataIndex: 'action',
      key: 'action',
      width: '20%',
      render: (_, record) => {
        return (
          <div>
            <Button type="primary" onClick={onDetail(record)}>编辑班级</Button>
            &nbsp;&nbsp;
            <Button type="primary" onClick={onMemberManage(record)}>班级成员管理</Button>
          </div>
        );
      },
    },
  ];
};

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

@connect(({ classList }) => ({
  ...classList,
}))
export default class ClassList extends Component {
  async componentDidMount() {
    this.fetchList();
  }

  onDetail = ({ id }) => {
    return () => {
      const { dispatch } = this.props;
      dispatch({
        type: 'classList/openModal',
        payload: {
          id,
          operation: 1,
        },
      });
    };
  };

  // 查看编辑班级成员
  onMemberManage = (record) => {
    return () => {
      router.push(`/admin/class/member/${record.id}`);
    };
  };

  handleOk = () => {
    this.formRef.handleSubmit();
  };

  handleCancel = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'classList/closeModal',
    });
  };

  handleSubmit = (values) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'classList/classSubmit',
    });
    dispatch({
      type: 'classList/closeModal',
    });
  };

  handleModalFormChange = (fields) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'classList/changeModalForm',
      payload: {
        ...fields,
      },
    });
  };

  fetchList = async() => {
    const { dispatch } = this.props;
    await dispatch({
      type: 'classList/fetchList',
    });
  };

  handleShowSizeChange = (current, size) => {
    const {
      dispatch,
      pageSize,
    } = this.props;
    dispatch({
      type: 'classList/setSearchParams',
      payload: {
        pageIndex: current,
        pageSize: size || pageSize,
      },
    });
    this.fetchList();
  };

  render() {
    const {
      total,
      list: dataSource,
      tableLoading,
      pageIndex,
      pageSize,
      keyword,
      modalVisible,
      info,
      operation,
      modalLoading,
    } = this.props;

    return (
      <div>
        <Table
          dataSource={dataSource}
          columns={getColumns(this.onDetail, this.onMemberManage)}
          rowKey="ID"
          loading={tableLoading}
          pagination={{
            total,
            pageSize,
            current: pageIndex,
            showSizeChanger: true,
            showTotal: (t) => `共 ${t} 条`,
            onShowSizeChange: this.handleShowSizeChange,
            onChange: this.handleShowSizeChange,
          }}
        />
      </div>
    );
  }
}
