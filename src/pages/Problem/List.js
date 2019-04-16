import React, { Component } from 'react';
import { connect } from 'dva';
import router from 'umi/router';
import { Table, Icon, Menu, Button, Row, Col, Input, Form, Divider, Select } from 'antd';
import { formatTimeFromTimeStamp } from '../../lib/common';
import SearchForm from '../../components/Problem/ProblemSearchForm';

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const FormItem = Form.Item;
const Option = Select.Option;

const formItemLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

@connect(({ problem }) => ({
  ...problem,
}))
class ProblemList extends Component {
  async componentDidMount() {
    document.title = '题库';
    const { dispatch } = this.props;
    Promise.all([
      dispatch({
        type: 'problem/getTagOptions',
      }),
      dispatch({
        type: 'problem/fetchList',
      }),
    ]);
  }

  getColumns = () => {
    const { difficultyOptions } = this.props;
    return [
      {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
        defaultSortOrder: 'descend',
        sorter: (a, b) => a.id - b.id,
      },
      {
        title: '题目',
        dataIndex: 'title',
        key: 'title',
      },
      {
        title: '创建时间',
        dataIndex: 'createTime',
        key: 'createTime',
        render: formatTimeFromTimeStamp(),
      },
      {
        title: '作者',
        dataIndex: 'publisher',
        key: 'publisher',
      },
      {
        title: '通过次数/提交总数',
        dataIndex: 'ratio',
        key: 'ratio',
        render: (text, record) => `${record.acceptTime}/${record.submitTime}`,
      },
      {
        title: '难度',
        dataIndex: 'difficulty',
        key: 'difficulty',
        defaultSortOrder: 'descend',
        sorter: (a, b) => a.difficulty - b.difficulty,
        render: text => difficultyOptions.find(({ value }) => value === text).key,
      },
      {
        title: '操作',
        key: 'operation',
        render: (_, record) => (
          <div>
            <Button onClick={this.handleEdit(record)} type="primary">
              编辑
            </Button>
            &nbsp; &nbsp; &nbsp;
            <Button onClick={this.handleSubmit(record)}>提交</Button>
          </div>
        ),
      },
    ];
  };

  fetchList = async() => {
    const { dispatch } = this.props;
    await dispatch({
        type: 'problem/fetchList',
    });
  };

  // 跳转到题目编辑页面
  handleEdit = record => {
    return () => {
      router.push(`/admin/problem/edit/${record.id}`);
    };
  };

  // 跳转到题目提交记录页面
  handleSubmit = record => {
    return () => {
      router.push(`/admin/problem/submit/${record.id}`);
    };
  };

  handleSearch = (values) => {
    const {
        dispatch,
    } = this.props;
    this.handleSearchParamsChange(values);
  };

  handleShowSizeChange = (current, size) => {
    const {
        dispatch,
        pageSize,
    } = this.props;
    this.handleSearchParamsChange({
        pageIndex: current,
        pageSize: size || pageSize,
    });
  };

  handleSearchParamsChange = (params) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'problem/changeSearchParams',
      payload: params,
    });
    this.fetchList();
  };

  render() {
    const {
      total,
      list,
      keyword,
      tableLoading,
      pageSize,
      pageIndex,
      tagsOptions,
    } = this.props;
    return (
      <div>
        <SearchForm tagOptions={tagsOptions} onSubmit={this.handleSearch} />
        <Divider dashed />
        <Table
          loading={tableLoading}
          columns={this.getColumns()}
          dataSource={list}
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

export default ProblemList;
