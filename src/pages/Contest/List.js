
import React, { Component } from 'react';
import { connect } from 'dva';
import { Table, Modal, Form, Input, message, Button, Row, Col, Popconfirm } from 'antd';
import AnnounceEditForm from '../../components/Manage/AnnounceEditForm';
import { getUserInfoByID, submitUserInfo, getUserInfoByKeyword } from '../../services/userList';
import config from '../../configs/contest';

const FormItem = Form.Item;

const getColumns = (onEdit, onDetail) => {
    return [
        {
            title: 'ID',
            dataIndex: config.id,
            key: config.id,
        },
        {
            title: '名称',
            dataIndex: config.name,
            key: config.name,
            width: '20%',
        },
        {
            title: '时长',
            dataIndex: config.duration,
            key: config.duration,
            width: '15%',
        },
        {
            title: '开始时间',
            dataIndex: config.startTime,
            key: config.startTime,
            width: '15%',
        }, 
        {
          title: '是否公开',
          dataIndex: config.isPublic,
          key: config.isPublic,
          render: (text) => text ? '公开' : '非公开',
        },
        {
          title: '是否结束',
          dataIndex: config.isOver,
          key: config.isOver,
          render: (text) => text ? '进行中' : '已结束',
        },
        {
            title: '管理',
            dataIndex: 'action',
            key: 'action',
            width: '20%',
            render: (text, record) => {
                return (
                    <div>
                        <Button type="primary" onClick={onEdit(record)}>编辑</Button>
                        &nbsp;
                        <Button type="primary" onClick={onDetail(record)}>题目</Button>
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

@connect(({ contestList }) => ({
    ...contestList,
}))
export default class ContestList extends Component {
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

    onDetail = (record) => {
      // 跳转到详情页
    };

    fetchList = async(data = {}) => {
        const { pageIndex, pageSize } = this.state;
        const { dispatch } = this.props;
        await dispatch({
            type: 'contestList/fetchList',
            payload: {
                pageIndex,
                pageSize,
                ...data,
            },
        });
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

        return (
            <div>
              <Form>
                <Row type="flex" justify="end">
                  <Col span={10}>
                    <FormItem label="关键词" {...formItemLayout}>
                      <Input
                        value={keyword}     
                        onChange={this.handleKeywordChange}
                        placeholder="请输入关键词"
                      />
                    </FormItem>
                  </Col>

                  <Col>
                    <Button type="primary" onClick={this.handleSearch}>
                      搜索
                    </Button>
                  </Col>
                  
                </Row>
                </Form>
                <Table
                    dataSource={dataSource}
                    columns={getColumns(this.onEdit, this.onDetail)}
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
            </div>
        );
    }
}
