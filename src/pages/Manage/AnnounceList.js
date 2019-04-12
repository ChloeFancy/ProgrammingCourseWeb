
import React, { Component } from 'react';
import { connect } from 'dva';
import { Table, Modal, Form, Input, message, Button, Row, Col, Popconfirm, Spin } from 'antd';
import AnnounceEditForm from '../../components/Manage/AnnounceEditForm';
import { getUserInfoByID, submitUserInfo, getUserInfoByKeyword } from '../../services/userList';
import config from '../../configs/announce';
import { formatTimeFromTimeStamp } from '../../lib/common';

const getColumns = (onEdit, onDelete) => {
    return [
        {
            title: '编号',
            dataIndex: config.ID,
            key: 'ID',
        },
        {
            title: '标题',
            dataIndex: config.title,
            key: 'nickname',
        },
        {
            title: '创建时间',
            dataIndex: config.create_time,
            key: 'registerTime',
            render: formatTimeFromTimeStamp,
        },
        {
            title: '更新时间',
            dataIndex: config.last_update_time,
            key: 'name',
            render: formatTimeFromTimeStamp,
        },
        {
            title: '创建者',
            dataIndex: config.publisher,
            key: 'email',
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
        const { dispatch } = this.props;
        await dispatch({
            type: 'announce/fetchList',
            payload: {
                ...data,
            },
        });
    };

    handleModalFormChange = (fields) => {
        const { dispatch } = this.props;
        dispatch({
            type: 'announce/changeModalForm',
            payload: {
                ...fields,
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
                ...editingInfo,
                ...values,
            },
        });
        this.fetchList();
    };

    handleOk = () => {
        this.formRef.handleSubmit();
    };

    handleCancel = async() => {
        const {
            dispatch,
        } = this.props;
        await dispatch({
            type: 'announce/onCancel',
        });
    };

    handleShowSizeChange = (current, size) => {
        const {
            dispatch,
            pageSize,
        } = this.props;
        dispatch({
            type: 'announce/changeTablePage',
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
            loadingList,
        } = this.props;

        const {
            visible,
            editingInfo,
            operation,
            loading,
            pageIndex,
            pageSize,
        } = this.props;

        return (
            <div>
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
                        onShowSizeChange: this.handleShowSizeChange,
                        onChange: this.handleShowSizeChange,
                    }}
                />
                <Modal
                    visible={visible}
                    title={operation ? '编辑公告' : '新增公告'}
                    width="700px"
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    destroyOnClose
                    maskClosable={false}
                >
                    <Spin spinning={loading}>
                        <AnnounceEditForm
                            wrappedComponentRef={(ref) => { this.formRef = ref; }}
                            info={editingInfo}
                            onSubmit={this.handleSubmit}
                            onChange={this.handleModalFormChange}
                        />
                    </Spin>
                </Modal>
            </div>
        );
    }
}
