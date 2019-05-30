
import React, { Component } from 'react';
import { connect } from 'dva';
import router from 'umi/router';
import { message, Table, Modal, Popconfirm } from 'antd';
import EditModalForm from '../../components/UserList/EditModalForm';
import SearchForm from '../../components/UserList/SearchForm';
import { formatTimeFromTimeStamp } from '../../lib/common';
import config from '../../configs/UserList';

const getColumns = (userTypeOptions, onEdit, onDetail, onDelete) => {
    return [
        {
            title: 'ID',
            dataIndex: config.ID,
            key: config.ID,
        },
        {
            title: '登录名',
            dataIndex: config.account,
            key: config.account,
        },
        {
            title: '注册时间',
            dataIndex: config.registerTime,
            key: 'registerTime',
            render: formatTimeFromTimeStamp(),
        },
        {
            title: '最后登录时间',
            dataIndex: config.lastLoginTime,
            key: config.lastLoginTime,
            render: formatTimeFromTimeStamp(),
        },
        {
            title: '真实姓名',
            dataIndex: config.name,
            key: 'name',
        },
        {
            title: '电子邮箱',
            dataIndex: config.email,
            key: 'email',
        },
        {
            title: '用户类型',
            dataIndex: config.type,
            key: 'type',
            render: (text) => userTypeOptions.find(({ value }) => `${value}` === `${text}`).key,
        },
        {
            title: '管理',
            dataIndex: 'action',
            key: 'action',
            render: (text, record) => {
                return (
                    <div>
                        <a onClick={onEdit(record)}>编辑</a>
                        <br />
                      <Popconfirm title={`确定删除用户${record.name}吗？`} onConfirm={onDelete(record)}>
                        <a>删除</a>
                      </Popconfirm>
                        <br />
                      {record.role === 1 && <a onClick={onDetail(record)}>查看学习情况</a>}
                    </div>
                );
            },
        },
    ];
};


@connect(({ userList }) => ({
    ...userList,
}))
class UserList extends Component {
    async componentDidMount() {
        const { dispatch } = this.props;
        await dispatch({
            type: 'userList/getUserRoleOptions',
        });
        this.fetchList();
    }

    onDetail = (record) => {
        return () => {
            router.push(`/admin/manage/studentStatistics/${record.id}`);
        };
    };

    onEdit = (record) => {
        return async() => {
            const { dispatch } = this.props;
            dispatch({
                type: 'userList/handleEdit',
                payload: {
                    editingUser: record,
                },
            });
        };
    };

    onDelete = (record) => {
      return async() => {
        const { dispatch } = this.props;
        const isSuccess = await dispatch({
          type: 'userList/handleDelete',
          payload: {
            deleteUser: record,
          },
        });
        if (isSuccess) {
          message.success('删除成功');
          this.fetchList();
        } else {
          message.error('删除失败');
        }
      };
    };

    fetchList = async(data = {}) => {
        const { dispatch } = this.props;
        await dispatch({
            type: 'userList/fetchList',
            payload: {
                ...data,
            },
        });
    };

    handleModalFormChange = (fields) => {
        const { dispatch } = this.props;
        dispatch({
            type: 'userList/changeModalForm',
            payload: {
                ...fields,
            },
        });
    };

    handleSubmit = async(values) => {
        const { dispatch } = this.props;
        const isSuccess = await dispatch({
            type: 'userList/handleSubmit',
            payload: values,
        });
        if (isSuccess) {
          dispatch({
            type: 'userList/closeEdit',
          });
          this.fetchList();
        }
    };

    handleSearch = async(data) => {
        this.fetchList(data);
    };

    handleOk = () => {
        this.formRef.handleSubmit();
    };

    handlePageChange = (current) => {
        const { dispatch } = this.props;
        dispatch({
            type: 'userList/changeTablePage',
            payload: {
                pageIndex: current,
            },
        });
        this.fetchList({
            pageIndex: current,
        });
    };

    handleShowSizeChange = (current, size) => {
        const { dispatch } = this.props;
        dispatch({
            type: 'userList/changeTablePage',
            payload: {
                pageIndex: current,
                pageSize: size,
            },
        });
        this.fetchList({
            pageIndex: current,
            pageSize: size,
        });
    };

    handleCancel = () => {
        const { dispatch } = this.props;
        dispatch({
            type: 'userList/closeEdit',
        });
    };

    render() {
        const {
            total,
            list: dataSource,
            tableLoading,
            editingInfo,
            modalVisible,
            pageIndex,
            pageSize,
            userTypeOptions,
        } = this.props;

        return (
            <div>
                <SearchForm userTypeOptions={userTypeOptions} onSubmit={this.handleSearch} />
                <Table
                    dataSource={dataSource}
                    columns={getColumns(userTypeOptions, this.onEdit, this.onDetail, this.onDelete)}
                    rowKey="ID"
                    loading={tableLoading}
                    pagination={{
                        total,
                        pageSize,
                        current: pageIndex,
                        showSizeChanger: true,
                        showTotal: (t) => `共 ${t} 条`,
                        onShowSizeChange: this.handleShowSizeChange,
                        onChange: this.handlePageChange,
                    }}
                />
                <Modal
                    visible={modalVisible}
                    title="修改用户信息"
                    width="800px"
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <EditModalForm
                        wrappedComponentRef={(ref) => { this.formRef = ref; }}
                        info={editingInfo}
                        userTypeOptions={userTypeOptions}
                        onChange={this.handleModalFormChange}
                        onSubmit={this.handleSubmit}
                    />
                </Modal>
            </div>
        );
    }
}

export default UserList;
