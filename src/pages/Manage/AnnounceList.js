
import React, { Component } from 'react';
import { connect } from 'dva';
import { Table, Modal, Form, Input, message, Button, Row, Col, Popconfirm } from 'antd';
import AnnounceEditForm from '../../components/Manage/AnnounceEditForm';
import { getUserInfoByID, submitUserInfo, getUserInfoByKeyword } from '../../services/userList';
import config from '../../configs/announce';

const getColumns = (onEdit, onDelete) => {
    return [
        {
            title: '编号',
            dataIndex: config.ID,
            key: 'ID',
            width: '20%',
        },
        {
            title: '标题',
            dataIndex: config.title,
            key: 'nickname',
            width: '10%',
        },
        {
            title: '创建时间',
            dataIndex: config.create_time,
            key: 'registerTime',
            width: '16%',
        },
        {
            title: '更新时间',
            dataIndex: config.last_update_time,
            key: 'name',
            width: '20%',
        },
        {
            title: '创建者',
            dataIndex: config.publisher,
            key: 'email',
            width: '10%',
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
                        &nbsp;
                        <Popconfirm title="Are you sure delete this task?" onConfirm={onDelete(record)}>
                            <a>删除</a>
                        </Popconfirm>
                    </div>
                );
            },
        },
    ];
};


@connect(({ announce }) => ({
    ...announce,
}))
export default class AnnounceList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pageIndex: 1,
            pageSize: 10,
            keyword: '',
        };
    }

    async componentDidMount() {
        this.fetchList();
    }

    onDelete = (record) => {
        return async() => {
            const {
                id,
            } = record;

            try {
                const { dispatch } = this.props;
                await dispatch({
                    type: 'announce/deleteItem',
                    payload: {
                       id,
                    },
                });
                this.fetchList();
            } catch (e) {
                message.error(e);
            }
        };
    };

    onEdit = (record) => {
        return async() => {
            const {
                id,
            } = record;

            const { dispatch } = this.props;
            await dispatch({
                type: 'announce/onEdit',
                payload: {
                    id,
                },
            });
        };
    };

    handleAddClick = () => {
        const { dispatch } = this.props;
        dispatch({
            type: 'announce/onAdd',
        });
    };

    fetchList = async(data = {}) => {
        const { pageIndex, pageSize } = this.state;
        const { dispatch } = this.props;
        await dispatch({
            type: 'announce/fetchList',
            payload: {
                pageIndex,
                pageSize,
                ...data,
            },
        });
    };

    handleSubmit = async(values) => {
        const {
            editingInfo,
            operation,
            dispatch,
        } = this.props;
        await dispatch({
            type: `announce/${operation ? 'saveEdit' : 'saveAdd'}`,
            payload: {
                announcement: {
                    ...editingInfo,
                    ...values,
                },
            },
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
        const {
            editingInfo,
            operation,
            dispatch,
        } = this.props;
        await dispatch({
            type: 'announce/onCancel',
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
            keyword,
        } = this.state;

        const {
            visible,
            editingInfo,
            operation,
        } = this.props;

        return (
            <div style={{ width: '1000px', margin: '20px auto' }}>
                <Row type="flex" justify="end">
                    <Col><Button type="primary" onClick={this.handleAddClick}>新增</Button></Col>
                </Row>
                <Table
                    dataSource={dataSource}
                    columns={getColumns(this.onEdit, this.onDelete)}
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
                    title={operation ? '编辑公告' : '新增公告'}
                    width="700px"
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <AnnounceEditForm
                        wrappedComponentRef={(ref) => { this.formRef = ref; }}
                        info={editingInfo}
                        onSubmit={this.handleSubmit}
                    />
                </Modal>
            </div>
        );
    }
}
