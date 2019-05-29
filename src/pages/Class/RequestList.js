import React, { Component } from 'react';
import { connect } from 'dva';
import router from 'umi/router';
import { message, Table, Button } from 'antd';
import { classMemberConfig } from '../../configs/class';

@connect(({ requestList }) => ({
  ...requestList,
}))
class RequestList extends Component {
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
        type: 'requestList/setId',
        payload: {
          classId: id,
        },
      });
      await dispatch({
        type: 'requestList/fetchList',
      });
    }

    getColumns = (onApprove, onDecline) => {
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

    handleBack = () => {
      router.go(-1);
    };

    handleReply = async (userId, isApply) => {
      const { dispatch } = this.props;
      const isSuccess = await dispatch({
        type: 'requestList/replyRequest',
        payload: {
          userId,
          isApply,
        }
      });
      if (isSuccess) {
        message.success('操作成功');
        dispatch({
          type: 'requestList/fetchList',
        });
      } else {
        message.error('操作失败');
      }
    };

    handleApprove = ({ userId }) => {
      return () => {
        this.handleReply(userId, true);
      };
    };

    handleDecline = ({ userId }) => {
      return () => {
        this.handleReply(userId, false);
      };
    };

  render() {
    const {
      list,
      tableLoading,
    } = this.props;
    return (
      <div>
        <h1 style={{ fontSize: '30px' }}>加入班级请求</h1>
        <Button onClick={this.handleBack}>返回</Button>
        <Table
          loading={tableLoading}
          columns={this.getColumns(this.handleApprove, this.handleDecline)}
          dataSource={list}
          locale={{ emptyText: '暂无请求' }}
        />
      </div>
    );
  }
}

export default RequestList;
