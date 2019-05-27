
import React, { Component } from 'react';
import { connect } from 'dva';
import router from 'umi/router';
import { Table, Form, Input, Button, Row, Col, Modal, Spin, Popconfirm } from 'antd';
import { classConfig } from '../../configs/class';
import { formatTimeFromTimeStamp } from '../../lib/common';
import ClassInfoForm from '../../components/Class/ClassInfoForm';
import { getAuthority } from '../../utils/authority';
import { STUDENT } from '../../configs/UserList';

const FormItem = Form.Item;

const getColumns = (onDetail, onMemberManage, onApply) => {
    const auth = getAuthority();
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
      ...(auth !== STUDENT ? (
          [
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
              render: (_, record) => {
                return (
                  <div>
                    <Button type="primary" onClick={onDetail(record)}>编辑班级</Button>
                    &nbsp;&nbsp;
                    <Button type="primary" onClick={onMemberManage(record)}>班级成员管理</Button>
                  </div>
                );
              },
            },
          ]
        ) : (
            [{
              title: '管理',
              dataIndex: 'action',
              key: 'action',
              width: '20%',
              render: (_, record) => {
                return (
                  <div>
                    <Popconfirm title="确认加入此班级？" onConfirm={() => onApply(record)}>
                      <Button type="primary">申请加入</Button>
                    </Popconfirm>
                  </div>
                );
              },
            }]
        )),
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

    onDetail = ({ id }) => {
      return () => {
        const { dispatch } = this.props;
        dispatch({
          type: 'classList/openModal',
          payload: {
            id,
            operation: 1,
          },
        });
      };
    };

    // 查看编辑班级成员
    onMemberManage = (record) => {
      return () => {
        router.push(`/admin/class/member/${record.id}`);
      };
    };

    onApply = ({ id }) => {
      return () => {
        const { dispatch } = this.props;
        dispatch({
          type: 'classList/applyJoinClass',
          payload: {
            id,
          },
        });
      };
    };

    handleOk = () => {
      this.formRef.handleSubmit();
    };

    handleCancel = () => {
      const { dispatch } = this.props;
      dispatch({
        type: 'classList/closeModal',
      });
    };

    handleSubmit = (values) => {
      const { dispatch } = this.props;
      dispatch({
        type: 'classList/classSubmit',
      });
      dispatch({
        type: 'classList/closeModal',
      });
    };

    handleModalFormChange = (fields) => {
      const { dispatch } = this.props;
      dispatch({
        type: 'classList/changeModalForm',
        payload: {
            ...fields,
        },
      });
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
            tableLoading,
            pageIndex,
            pageSize,
            keyword,
            modalVisible,
            info,
            operation,
            modalLoading,
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
                    <FormItem>
                      <Button type="primary" onClick={this.fetchList}>
                        搜索
                      </Button>
                    </FormItem>
                  </Col>

                </Row>
                </Form>
                <Table
                    dataSource={dataSource}
                    columns={getColumns(this.onDetail, this.onMemberManage, this.onApply)}
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
                <Modal
                    visible={modalVisible}
                    title={operation ? '编辑班级' : '新增班级'}
                    width="700px"
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    destroyOnClose
                    maskClosable={false}
                >
                    <Spin spinning={modalLoading}>
                        <ClassInfoForm
                            wrappedComponentRef={(ref) => { this.formRef = ref; }}
                            info={info}
                            onSubmit={this.handleSubmit}
                            onChange={this.handleModalFormChange}
                        />
                    </Spin>
                </Modal>
            </div>
        );
    }
}
