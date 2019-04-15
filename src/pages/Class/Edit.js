
import React, { Component } from 'react';
import { connect } from 'dva';
import router from 'umi/router';
import { Table, Form, Input, Button, Row, Col } from 'antd';
import { classConfig } from '../../configs/class';
import { formatTimeFromTimeStamp } from '../../lib/common';

const FormItem = Form.Item;

const getColumns = (onDetail, onMemberManage) => {
    return [
        {
            title: classConfig.id.text,
            dataIndex: classConfig.id.dataIndex,
            key: classConfig.id.dataIndex,
        },
        {
            title: classConfig.name.text,
            dataIndex: classConfig.name.dataIndex,
            key: classConfig.name.dataIndex,
            width: '20%',
        },
        {
            title: classConfig.createTime.text,
            dataIndex: classConfig.createTime.dataIndex,
            key: classConfig.createTime.dataIndex,
            width: '15%',
            render: formatTimeFromTimeStamp('YYYY-MM-DD HH:MM:SS'),
        },
        {
            title: classConfig.isCheck.text,
            dataIndex: classConfig.isCheck.dataIndex,
            key: classConfig.isCheck.dataIndex,
            width: '15%',
            render: (isCheck) => isCheck ? '需要导师审核' : '无需审核',
        },
        {
            title: '管理',
            dataIndex: 'action',
            key: 'action',
            width: '20%',
            render: (text, record) => {
                return (
                    <div>
                      <Button type="primary" onClick={onDetail(record)}>编辑班级</Button>
                      &nbsp;&nbsp;
                      <Button type="primary" onClick={onMemberManage(record)}>班级成员管理</Button>
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

@connect(({ classList }) => ({
    ...classList,
}))
export default class ClassList extends Component {
    async componentDidMount() {
        this.fetchList();
    }

    onDetail = (record) => {
      return () => {
        // router.push(`/class/detail/${record.id}`);
      };
    };

    onMemberManage = () => {

    };

    fetchList = async() => {
        const { dispatch } = this.props;
        await dispatch({
            type: 'classList/fetchList',
        });
    };

    handleKeywordChange = (ev) => {
      const keyword = ev.target.value;
      const { dispatch } = this.props;
      dispatch({
        type: 'classList/setSearchParams',
        payload: {
          keyword,
        },
      });
    }

    handleShowSizeChange = (current, size) => {
      const {
          dispatch,
          pageSize,
      } = this.props;
      dispatch({
          type: 'classList/setSearchParams',
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
            loading,
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
                        value={keyword}
                        onChange={this.handleKeywordChange}
                        placeholder="请输入关键词"
                      />
                    </FormItem>
                  </Col>

                  <Col>
                    <Button type="primary" onClick={this.fetchList}>
                      搜索
                    </Button>
                  </Col>

                </Row>
                </Form>
                <Table
                    dataSource={dataSource}
                    columns={getColumns(this.onDetail, this.onMemberManage)}
                    rowKey="ID"
                    loading={loading}
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
