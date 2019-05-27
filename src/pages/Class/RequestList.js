import React, { Component } from 'react';
import { connect } from 'dva';
import { Table, Button } from 'antd';
import { classMemberConfig } from '../../configs/class';

@connect(({ requestList }) => ({
  ...requestList,
}))
class RequestList extends Component {
  async componentDidMount() {
    document.title = '加入班级请求';
    const { dispatch } = this.props;
    await dispatch({
      type: 'requestList/fetchList',
    });
  }

  getColumns = (onApprove, onDecline) => {
    // todo
    return [
      {
        title: '#',
        dataIndex: classMemberConfig.userId.dataIndex,
        key: classMemberConfig.userId.dataIndex,
        width: '20%',
      },
      {
        title: classMemberConfig.name.text,
        dataIndex: classMemberConfig.name.dataIndex,
        key: classMemberConfig.name.dataIndex,
        width: '10%',
      },
      {
        title: '操作',
        dataIndex: 'action',
        key: 'action',
        width: '20%',
        render: (text, record) => {
          return (
            <div>
              <Button type="primary" onClick={onApprove(record)}>批准</Button>
              &nbsp;&nbsp;
              <Button type="primary" onClick={onDecline(record)}>拒绝</Button>
            </div>
          );
        },
      },
    ];
  };

  fetchList = async() => {
    const { dispatch } = this.props;
    await dispatch({
      type: 'requestList/fetchList',
    });
  };

  handleShowSizeChange = (current, size) => {
    const {
      pageSize,
    } = this.props;
    this.handleSearchParamsChange({
      pageIndex: current,
      pageSize: size || pageSize,
    });
  };

  handleSearchParamsChange = (params) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'requestList/changeSearchParams',
      payload: params,
    });
    this.fetchList();
  };

    // todo 补充接口
    handleApprove = ({ id }) => {
      return () => {

      };
    };

    handleDecline = ({ id }) => {
      return () => {

      };
    };

  render() {
    const {
      total,
      list,
      tableLoading,
      pageSize,
      pageIndex,
    } = this.props;
    return (
      <div>
        <h1 style={{ fontSize: '30px' }}>加入班级请求</h1>
        <Table
          loading={tableLoading}
          columns={this.getColumns()}
          dataSource={list}
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

export default RequestList;
