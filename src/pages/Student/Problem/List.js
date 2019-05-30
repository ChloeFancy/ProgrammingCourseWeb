import React, { Component } from 'react';
import { connect } from 'dva';
import router from 'umi/router';
import { Table, Divider, Tag } from 'antd';
import SearchForm from '../../../components/Problem/ProblemSearchForm';
import problemConfig from '../../../configs/problemEdit';

@connect(({ problem }) => ({
  ...problem,
}))
class ProblemList extends Component {
  async componentDidMount() {
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
    const { difficultyOptions, tagsOptions } = this.props;
    return [
      {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
        defaultSortOrder: 'descend',
        sorter: (a, b) => - a.id + b.id,
        render: (text, record) => <a onClick={this.handleDetail(record)}>{text}</a>,
      },
      {
        title: '题目',
        dataIndex: 'title',
        key: 'title',
        render: (text, record) => <a onClick={this.handleDetail(record)}>{text}</a>,
      },
      {
        title: '通过次数/提交总数',
        dataIndex: 'ratio',
        key: 'ratio',
        render: (text, record) => `${record.acceptTime}/${record.submitTime}`,
      },
      {
        title: '知识点',
        dataIndex: 'tags',
        key: 'tags',
        render: (text) => (text || []).map(item => <Tag>{(tagsOptions.find(({ value }) => value === item) || {}).key}</Tag>),
      },
      {
        title: '难度',
        dataIndex: 'difficulty',
        key: 'difficulty',
        defaultSortOrder: 'descend',
        sorter: (a, b) => a.difficulty - b.difficulty,
        render: (text) => {
          return ((difficultyOptions || []).find(({ value }) => value === text) || {}).key;
        },
      },
    ];
  };

  fetchList = async() => {
    const { dispatch } = this.props;
    await dispatch({
        type: 'problem/fetchList',
    });
  };

  // 跳转到做题页面
  handleDetail = record => {
    return () => {
      router.push(`/student/problem/detail/${record.id}`);
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
