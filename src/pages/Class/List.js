
import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import router from 'umi/router';
import { message, Table, Form, Input, Button, Row, Col, Modal, Spin, Popconfirm } from 'antd';
import { classConfig } from '../../configs/class';
import { formatTimeFromTimeStamp } from '../../lib/common';
import ClassInfoForm from '../../components/Class/ClassInfoForm';
import { getAuthority } from '../../utils/authority';
import { STUDENT } from '../../configs/UserList';

const FormItem = Form.Item;

const getColumns = (auth, onDetail, onMemberManage, onApply, onRequest) => {
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
        },
        {
            title: classConfig.createTime.text,
            dataIndex: classConfig.createTime.dataIndex,
            key: classConfig.createTime.dataIndex,
            render: formatTimeFromTimeStamp('YYYY-MM-DD HH:MM:SS'),
        },
      ...(auth !== STUDENT ? (
          [
            {
              title: classConfig.isCheck.text,
              dataIndex: classConfig.isCheck.dataIndex,
              key: classConfig.isCheck.dataIndex,
              render: (isCheck) => isCheck ? '需要导师审核' : '无需审核',
            },
            {
              title: '管理',
              dataIndex: 'action',
              key: 'action',
              render: (_, record) => {
                return (
                  <div>
                    <Button type="primary" onClick={onDetail(record, 1)}>编辑班级</Button>
                    <br />
                    <br />
                    <Button type="primary" onClick={onMemberManage(record)}>班级成员管理</Button>
                    {
                      record.isCheck && <Fragment>
                        <br />
                        <br />
                        <Button type="primary" onClick={onRequest(record)}>查看加入班级申请</Button>
                      </Fragment>
                    }
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
              render: (_, record) => {
                return (
                  <div>
                    <Popconfirm title="确认加入此班级？" onConfirm={onApply(record)}>
                      <Button type="primary">申请加入</Button>
                    </Popconfirm>
                  </div>
                );
              },
            }]
        )),
    ];
};

const myClassColumns = (onQuit) => {
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
    },
    {
      title: '管理',
      dataIndex: 'action',
      key: 'action',
      render: (_, record) => {
        return (
          <div>
            <Popconfirm title="确认退出此班级？" onConfirm={onQuit(record)}>
              <Button type="primary">退出</Button>
            </Popconfirm>
          </div>
        );
      },
    }
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
class ClassList extends Component {
    async componentDidMount() {
        this.fetchList();
    }

    onDetail = ({ id }, operation) => {
      return () => {
        const { dispatch } = this.props;
        dispatch({
          type: 'classList/openModal',
          payload: {
            id,
            operation,
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

    // 查看加入班级请求
    onRequest = (record) => {
      return () => {
        router.push(`/admin/class/request/${record.id}`);
      };
    };

  onApply = ({ id }) => {
      return async () => {
        const { dispatch } = this.props;
        const isSuccess = await dispatch({
          type: 'classList/applyJoinClass',
          payload: {
            id,
          },
        });
        if (isSuccess) {
          message.success('申请成功');
        } else {
          message.error('申请失败');
        }
      };
    };

    handleOk = () => {
      this.formRef.handleSubmit();
      this.fetchList();
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

    showMyClass = () => {
      const { dispatch } = this.props;
      dispatch({
        type: 'classList/showMyClass',
      });
    };

    closeMyClass = () => {
      const { dispatch } = this.props;
      dispatch({
        type: 'classList/closeMyClass',
      });
    };

    onQuit = ({ id }) => {
      return async () => {
        const { dispatch } = this.props;
        const isSuccess = await dispatch({
          type: 'classList/quitMyClass',
          payload: {
            id,
          },
        });
        if (isSuccess) {
          message.success('退出成功');
          this.showMyClass();
        } else {
          message.error('退出成功');
        }
      };
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
            myClassVisible,
          myClassLoading,
          myClassDataSource,

        } = this.props;
      const auth = getAuthority();

      return (
            <div>
              <Form>
                <Row type="flex" justify="space-between">

                  <Col>
                    <FormItem>
                      {
                        auth === STUDENT ? (
                          <Button type="primary" onClick={this.showMyClass}>我的班级</Button>
                        ) : (
                          <Button type="primary" onClick={this.onDetail({}, 0)}>新增班级</Button>
                        )
                      }
                    </FormItem>
                  </Col>
                  <Col span={10}>
                    <Row type="flex" justify="end">
                      <Col>
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
                  </Col>
                </Row>
                </Form>
                <Table
                    dataSource={dataSource}
                    columns={getColumns(auth, this.onDetail, this.onMemberManage, this.onApply, this.onRequest)}
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

                <Modal
                  title="我的班级"
                  visible={myClassVisible}
                  onOk={this.closeMyClass}
                  onCancel={this.closeMyClass}
                  maskClosable={false}
                >
                  <Table
                    dataSource={myClassDataSource}
                    columns={myClassColumns(this.onQuit)}
                    rowKey="ID"
                    loading={myClassLoading}
                  />
                </Modal>
            </div>
        );
    }
}

export default ClassList;
