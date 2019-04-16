import React, { Component } from 'react';
import { connect } from 'dva';
import router from 'umi/router';
import { Table, Icon, Menu, Button, Row, Col, Input, Form, Divider, Select } from 'antd';
import { formatTimeFromTimeStamp } from '../../lib/common';
import SearchForm from '../../components/Problem/ProblemSearchForm';
import { submitRecordConfig } from '../../configs/problemEdit';

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const FormItem = Form.Item;
const Option = Select.Option;

const formItemLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

@connect(({ submitRecords }) => ({
  ...submitRecords,
}))
class SubmitRecordsList extends Component {
  async componentDidMount() {
    document.title = '提交列表';
    const { dispatch } = this.props;
    await dispatch({
      type: 'submitRecords/fetchList',
    });
  }

  getColumns = () => {
    return [
        {
            title: '#',
            dataIndex: submitRecordConfig.id.dataIndex,
            key: submitRecordConfig.id.dataIndex,
            width: '20%',
        },
        {
            title: submitRecordConfig.submitTime.text,
            dataIndex: submitRecordConfig.submitTime.dataIndex,
            key: submitRecordConfig.submitTime.dataIndex,
            width: '10%',
        },
        {
            title: submitRecordConfig.language.text,
            dataIndex: submitRecordConfig.language.dataIndex,
            key: submitRecordConfig.language.dataIndex,
            width: '16%',
        },
        {
            title: submitRecordConfig.runningTime.text,
            dataIndex: submitRecordConfig.runningTime.dataIndex,
            key: submitRecordConfig.runningTime.dataIndex,
            width: '20%',
        },
        {
            title: submitRecordConfig.isPass.text,
            dataIndex: submitRecordConfig.isPass.dataIndex,
            key: submitRecordConfig.isPass.dataIndex,
            width: '10%',
            render: (isPass) => isPass ? '通过' : '未通过', 
        },
    ];
  };

  fetchList = async() => {
    const { dispatch } = this.props;
    await dispatch({
        type: 'submitRecords/fetchList',
    });
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
        <h1 style={{ fontSize: '30px' }}>提交列表</h1>
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

export default SubmitRecordsList;
