
import React, { Component } from 'react';
import { connect } from 'dva';
import { Table, Modal, Form, Input, message, Button } from 'antd';
import config, { userTypeOptions } from '../../configs/UserList';

const TextArea = Input.TextArea;

const getColumns = () => {
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
            title: '密码',
            dataIndex: config.type,
            key: 'type',
            width: '16%',
            render: (text) => userTypeOptions.find(({ value }) => value === text).key,
        },
        {
            title: '电子邮箱',
            dataIndex: config.email,
            key: 'email',
            width: '10%',
        },
    ];
};



@connect(({ problem }) => ({
    ...problem,
}))
export default class UserAdd extends Component {
    constructor(props) {
        super(props);
        this.state = {
            group: '',
            prefix: '',
            number: 0,
            batchValue: '',
            dataSource: [],
        };
    }

    handleFormChange = (key) => {
        return (value) => {
            this.setState({
                [key]: value,
            });
        };
    };

    handleGenerate = () => {
        const {
            group,
            prefix,
            number,
        } = this.state;
        // 调接口
    };

    handleUpload = () => {
        const {
            batchValue,
        } = this.state;
        // 调接口
    };

    render() {
        const {
            group,
            prefix,
            number,
            batchValue,
            dataSource,
        } = this.state;
        return (
            <div>
                <Form layout="inline">
                    <Form.Item label="小组名">
                        <Input onChange={this.handleFormChange('group')} value={group} placeholder="留空表示不添加小组" />
                    </Form.Item>
                    <Form.Item label="前缀生成">
                        <Input onChange={this.handleFormChange('prefix')} value={prefix} placeholder="请输入前缀" />
                    </Form.Item>
                    <Form.Item label="数量">
                        <Input onChange={this.handleFormChange('number')} value={number} placeholder="请输入一个合理的值(1~99)" />
                    </Form.Item>
                    <Button onClick={this.handleGenerate}>generate</Button>
                </Form>
                <Table
                    dataSource={dataSource}
                    columns={getColumns()}
                    rowKey="ID"
                    // loading={loadingList}
                    // pagination={{
                    //     total,
                    //     pageSize,
                    //     current: pageIndex,
                    //     showSizeChanger: true,
                    //     showTotal: (t) => `共 ${t} 条`,
                    //     onShowSizeChange: (current, size) => {
                    //         this.setState(
                    //             {
                    //                 pageIndex: current,
                    //                 pageSize: size,
                    //             },
                    //             () => {
                    //                 this.fetchList();
                    //             },
                    //         );
                    //     },
                    //     onChange: (current) => {
                    //         this.setState(
                    //             {
                    //                 pageIndex: current,
                    //             },
                    //             () => {
                    //                 this.fetchList();
                    //             },
                    //         );
                    //     },
                    // }}
                />
                <div>
                    生成格式1：用户名 密码
                </div>
                <div>
                    后台没有很好地进行错误检查！所以请保证输入正确性，空格、回车和Tab是用户名和密码之间的分隔符
                </div>
                <div>
                    <TextArea value={batchValue} />
                    <Button onClick={this.handleUpload}>upload</Button>
                </div>
            </div>
        );
    }
}
