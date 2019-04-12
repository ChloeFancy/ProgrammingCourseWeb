
import React, { Component } from 'react';
import { connect } from 'dva';
import { Table, Modal, Form, Input, message, Button } from 'antd';
import EditModalForm from '../../components/UserList/EditModalForm';
import { getUserInfoByID, submitUserInfo, getUserInfoByKeyword } from '../../services/userList';
import config, { userTypeOptions } from '../../configs/UserList';

const getColumns = (onEdit) => {
    return [
        {
            title: 'ID',
            dataIndex: config.ID,
            key: 'ID',
            width: '20%',
        },
        {
            title: '用户名',
            dataIndex: config.nickname,
            key: 'nickname',
            width: '10%',
        },
        {
            title: '注册时间',
            dataIndex: config.registerTime,
            key: 'registerTime',
            width: '16%',
        },
        {
            title: '真实姓名',
            dataIndex: config.name,
            key: 'name',
            width: '20%',
        },
        {
            title: '电子邮箱',
            dataIndex: config.email,
            key: 'email',
            width: '10%',
        },
        {
            title: '用户类型',
            dataIndex: config.type,
            key: 'type',
            width: '16%',
            render: (text) => userTypeOptions.find(({ value }) => value === text).key,
        },
        {
            title: '管理',
            dataIndex: 'action',
            key: 'action',
            width: '10%',
            render: (text, record) => {
                return (
                    <div>
                        <a onClick={onEdit(record)}>编辑</a>
                    </div>
                );
            },
        },
    ];
};


@connect(({ userList }) => ({
    ...userList,
}))
export default class UserList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pageIndex: 1,
            pageSize: 10,
            keyword: '',

            visible: false,
            editingInfo: {},
        };
    }

    async componentDidMount() {
        this.fetchList();
    }

    onEdit = (record) => {
        return async() => {
            const {
                id,
            } = record;

            try {
                const editingInfo = await getUserInfoByID({ id });
                this.setState({
                    editingInfo,
                    visible: true,
                });
            } catch (e) {
                message.error(e);
            }
        };
    };

    fetchList = async(data = {}) => {
        const { pageIndex, pageSize } = this.state;
        const { dispatch } = this.props;
        await dispatch({
            type: 'userList/fetchList',
            payload: {
                pageIndex,
                pageSize,
                ...data,
            },
        });
    };

    handleSubmit = async(values) => {
        await submitUserInfo(values);

        this.setState({
            visible: false,
        });
        this.fetchList();
    };

    handleSearch = async() => {
        const {
            keyowrd,
        } = this.state;
        this.fetchList({ keyowrd });
    };

    handleOk = () => {
        this.formRef.handleSubmit();
    };

    handleCancel = async() => {
        this.setState({
            visible: false,
        });
    };

    handleInputChange = (ev) => {
        this.setState({
            keyword: ev.target.value,
        });
    };

    render() {
        const {
            total,
            list: dataSource,
            loadingList,
        } = this.props;

        const {
            pageIndex,
            pageSize,
            visible,
            keyword,
            editingInfo,
        } = this.state;

        return (
            <div style={{ width: '1000px', margin: '20px auto' }}>
                <div style={{ textAlign: 'right' }}>
                    <Input style={{ width: '200px' }} placeholder="请输入关键词" value={keyword} onChange={this.handleInputChange} />
                    <Button onClick={this.handleSearch}>搜索</Button>
                </div>
                <Table
                    dataSource={dataSource}
                    columns={getColumns(this.onEdit)}
                    rowKey="ID"
                    loading={loadingList}
                    pagination={{
                        total,
                        pageSize,
                        current: pageIndex,
                        showSizeChanger: true,
                        showTotal: (t) => `共 ${t} 条`,
                        onShowSizeChange: (current, size) => {
                            this.setState(
                                {
                                    pageIndex: current,
                                    pageSize: size,
                                },
                                () => {
                                    this.fetchList();
                                },
                            );
                        },
                        onChange: (current) => {
                            this.setState(
                                {
                                    pageIndex: current,
                                },
                                () => {
                                    this.fetchList();
                                },
                            );
                        },
                    }}
                />
                <Modal
                    visible={visible}
                    title="修改用户信息"
                    width="700px"
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <EditModalForm
                        wrappedComponentRef={(ref) => { this.formRef = ref; }}
                        info={editingInfo}
                        onSubmit={this.handleSubmit}
                    />
                </Modal>
            </div>
        );
    }
}
