
import React, { Component } from 'react';
import { connect } from 'dva';
import { Table, Modal, Input, Form, Button, Row, Col, message } from 'antd';

const FormItem = Form.Item;

const getColumns = (onEdit) => {
  return [
    {
      title: '编号',
      dataIndex: 'id',
      key: 'ID',
    },
    {
      title: '名称',
      dataIndex: 'tag',
      key: 'nickname',
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


@connect(({ tagList }) => ({
  ...tagList,
}))
@Form.create()
class TagList extends Component {
  async componentDidMount() {
    this.fetchList();
  }

  onEdit = (record) => {
    return async() => {
      const { dispatch } = this.props;
      await dispatch({
        type: 'tagList/onEdit',
        payload: record,
      });
    };
  };

  handleAddClick = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'tagList/onAdd',
    });
  };

  fetchList = async(data = {}) => {
    const { dispatch } = this.props;
    await dispatch({
      type: 'tagList/fetchList',
      payload: {
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
      type: `tagList/${operation ? 'saveEdit' : 'saveAdd'}`,
      payload: {
        ...editingInfo,
        ...values,
      },
    });
    this.fetchList();
  };

  handleOk = async () => {
    const { form: { getFieldsValue }, operation } = this.props;
    const values = getFieldsValue();
    const {
      dispatch,
    } = this.props;
    const isSuccess = await dispatch({
      type: `tagList/${operation ? 'saveEdit' : 'saveAdd' }`,
      payload: values,
    });
    if (isSuccess) {
      message.success('操作成功');
      this.fetchList();
    } else {
      message.success('操作失败');
    }
  };

  handleCancel = async() => {
    const {
      dispatch,
    } = this.props;
    await dispatch({
      type: 'tagList/onCancel',
    });
  };

  handleShowSizeChange = (current, size) => {
    const {
      dispatch,
      pageSize,
    } = this.props;
    dispatch({
      type: 'tagList/changeTablePage',
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
      operation,
      pageIndex,
      pageSize,
      editingInfo,
      form: { getFieldDecorator },
    } = this.props;

    return (
      <div>
        <Row type="flex" justify="end">
          <Col><Button type="primary" onClick={this.handleAddClick}>新增</Button></Col>
        </Row>
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
            onShowSizeChange: this.handleShowSizeChange,
            onChange: this.handleShowSizeChange,
          }}
        />
        <Modal
          visible={visible}
          title={operation ? '编辑知识点' : '新增知识点'}
          width="700px"
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          destroyOnClose
          maskClosable={false}
        >
          <Form>
            <FormItem label={'知识点名称'}>
              {
                getFieldDecorator('tag', {
                  rules: [
                    {
                      required: true,
                      message: '知识点名称不能为空',
                    },
                  ],
                  initialValue: editingInfo.tag,
                })(<Input placeholder="请输入知识点名称" />)
              }
            </FormItem>
          </Form>
        </Modal>
      </div>
    );
  }
}

export default TagList;
