import React, { Component } from 'react';
import { connect } from 'dva';
import router from 'umi/router';
import { Table, Button, message } from 'antd';
import { classMemberConfig } from '../../configs/class';

const DELETE = 0;                 // 删除小组成员
const SET_ADMINISTRATOR = 1;      // 设置成管理员
const CANCEL_ADMINISTRATOR = 2;   // 取消管理员

@connect(({ memberList }) => ({
  ...memberList,
}))
class MemberListList extends Component {
  async componentDidMount() {
    const {
        dispatch,
        match: {
            params: {
                id,
            },
        },
    } = this.props;
    dispatch({
        type: 'memberList/setId',
        payload: {
            classId: id,
        },
    });
    await dispatch({
      type: 'memberList/fetchList',
    });
  }

  onStats = ({ userId }) => {
    return () => {
      router.push(`/admin/manage/studentStatistics/${userId}`);
    };
  };

  onManage = ({ userId }, manageType) => {
    return async () => {
      const { dispatch } = this.props;
      const isSuccess = await dispatch({
        type: 'memberList/manageMember',
        payload: {
          memberId: userId,
          manageType,
        },
      });
      if (isSuccess) {
        message.success('操作成功');
        dispatch({
          type: 'memberList/fetchList',
        });
      } else {
        message.error('操作失败');
      }
    };
  };

  getColumns = () => {
    return [
        {
            title: '#',
            dataIndex: classMemberConfig.userId.dataIndex,
            key: classMemberConfig.userId.dataIndex,
            width: '10%',
        },
        {
            title: classMemberConfig.name.text,
            dataIndex: classMemberConfig.name.dataIndex,
            key: classMemberConfig.name.dataIndex,
        },
      {
        title: '查看',
        dataIndex: 'action',
        key: 'action',
        render: (text, record) => {
          return (
            <div>
              <a onClick={this.onStats(record)}>点击查看学习情况</a>
            </div>
          );
        },
      },
      {
        title: '操作',
        dataIndex: 'action',
        key: 'action',
        render: (text, record) => {
          return (
            <div>
              <Button type="primary" onClick={this.onManage(record, DELETE)}>删除小组成员</Button>
              &nbsp;&nbsp;
              {
                !record.isAdministrator ? (
                  <Button type="primary" onClick={this.onManage(record, SET_ADMINISTRATOR)}>设置成管理员</Button>
                ) : (
                  <Button onClick={this.onManage(record, CANCEL_ADMINISTRATOR)}>取消管理员</Button>
                )
              }
            </div>
          );
        },
      },
    ];
  };

  fetchList = async() => {
    const { dispatch } = this.props;
    await dispatch({
        type: 'memberList/fetchList',
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
      type: 'memberList/changeSearchParams',
      payload: params,
    });
    this.fetchList();
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
        <h1 style={{ fontSize: '30px' }}>班级成员</h1>
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

export default MemberListList;
