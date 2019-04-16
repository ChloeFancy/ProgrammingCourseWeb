
import React, { Component } from 'react';
import { connect } from 'dva';
import router from 'umi/router';
import { Table, Form, Input, Button, Row, Col } from 'antd';
import { contestConfig } from '../../configs/contest';
import { formatTimeFromTimeStamp } from '../../lib/common';

const FormItem = Form.Item;

const getColumns = (onEdit, onDetail) => {
    return [
        {
            title: contestConfig.id.text,
            dataIndex: contestConfig.id.dataIndex,
            key: contestConfig.id.dataIndex,
        },
        {
            title: contestConfig.name.text,
            dataIndex: contestConfig.name.dataIndex,
            key: contestConfig.name.dataIndex,
            width: '20%',
        },
        {
            title: contestConfig.startTime.text,
            dataIndex: contestConfig.startTime.dataIndex,
            key: contestConfig.startTime.dataIndex,
            width: '15%',
            render: formatTimeFromTimeStamp('YYYY-MM-DD HH:MM:SS'),
        },
        {
            title: contestConfig.endTime.text,
            dataIndex: contestConfig.endTime.dataIndex,
            key: contestConfig.endTime.dataIndex,
            width: '15%',
            render: formatTimeFromTimeStamp('YYYY-MM-DD HH:MM:SS'),
        },
        {
          title: contestConfig.isPublic.text,
          dataIndex: contestConfig.isPublic.dataIndex,
          key: contestConfig.isPublic.dataIndex,
          render: (text) => text ? '公开' : '非公开',
        },
        {
          title: contestConfig.isOver.text,
          dataIndex: contestConfig.isOver.dataIndex,
          key: contestConfig.isOver.dataIndex,
          render: (text) => text ? '已结束' : '进行中',
        },
        {
            title: '管理',
            dataIndex: 'action',
            key: 'action',
            width: '20%',
            render: (_, record) => {
                return (
                    <div>
                        <Button type="primary" onClick={onEdit(record)}>编辑</Button>
                        {/* &nbsp; */}
                        {/* <Button type="primary" onClick={onDetail(record)}>题目</Button> */}
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
            router.push(`/admin/contest/edit/${record.id}`);
        };
    };

    onDetail = (record) => {
      // 跳转到详情页
    };

    handleShowSizeChange = (current, size) => {
        const {
            dispatch,
            pageSize,
        } = this.props;
        dispatch({
            type: 'contestList/setSearchParams',
            payload: {
                pageIndex: current,
                pageSize: size || pageSize,
            },
        });
        this.fetchList();
    };

    
    handleKeywordChange = (ev) => {
        const keyword = ev.target.value;
        const { dispatch } = this.props;
        dispatch({
            type: 'contestList/setSearchParams',
            payload: {
                keyword,
            },
        });
    };

    fetchList = async() => {
        const { dispatch } = this.props;
        await dispatch({
            type: 'contestList/fetchList',
        });
    };

    handleSearch = async() => {
        const {
            keyowrd,
        } = this.state;
        this.fetchList({ keyowrd });
    };

    render() {
        const {
            total,
            list: dataSource,
            tableLoading,
            pageIndex,
            pageSize,
            keyword,
        } = this.props;

        return (
            <div>
              <Form>
                <Row type="flex" justify="end">
                  <Col span={10}>
                    <FormItem label="关键词" {...formItemLayout}>
                      <Input
                        onChange={this.handleKeywordChange}
                        placeholder="请输入关键词"
                      />
                    </FormItem>
                  </Col>

                  <Col>
                    <FormItem>
                        <Button type="primary" onClick={this.handleSearch}>
                        搜索
                        </Button>
                    </FormItem>
                  </Col>
                </Row>
                </Form>
                <Table
                    dataSource={dataSource}
                    columns={getColumns(this.onEdit, this.onDetail)}
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
