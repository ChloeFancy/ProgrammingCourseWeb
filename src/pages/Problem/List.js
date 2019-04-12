import React, { Component } from 'react';
import { connect } from 'dva';
import { Table, Icon, Menu, Button, Row, Col, Input, Form, Divider, Select } from 'antd';

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const FormItem = Form.Item;
const Option = Select.Option;

// todo
// 1. getProblems 返回结果字段中difficulty打错了
// 2. 确定table的列字段有哪些
// 3. tags 接口确认
// 4. 题目搜索维度：tag/keyword
// 5. 题目提交列表页

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
    await dispatch({
      type: 'problem/fetchList',
    });
  }

  getColumns = () => {
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
      },
      {
        title: '作者',
        dataIndex: 'author',
        key: 'author',
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

  handleEdit = record => {
    return () => {
      window.location = `/html/problem-edit.html?id=${record.id}`;
    };
  };

  handleSubmit = record => {};

  handleSearch = () => {};

  handleKeywordChange = ev => {
    const val = ev.target.value;
    const { dispatch } = this.props;
    dispatch({
      type: 'problem/setSearchKeyword',
      payload: {
        keyword: val,
      },
    });
  };

  render() {
    const { list, keyword } = this.props;
    return (
      <div>
        <Form>
          <Row type="flex" justify="center">
            <Col span={12}>
              <FormItem label="关键词" {...formItemLayout}>
                <Input
                  value={keyword}
                  onChange={this.handleKeywordChange}
                  placeholder="请输入关键词"
                />
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem label="标签" {...formItemLayout}>
                <Select>
                  {[].map(({ key, value }) => {
                    return <Option value={value}>{key}</Option>;
                  })}
                </Select>
              </FormItem>
            </Col>
          </Row>
          <Row type="flex" justify="center">
            <Col>
              <Button type="primary" onClick={this.handleSearch}>
                搜索
              </Button>
            </Col>
          </Row>
        </Form>
        <Divider dashed />
        <Table columns={this.getColumns()} dataSource={list} />
      </div>
    );
  }
}

export default ProblemList;
