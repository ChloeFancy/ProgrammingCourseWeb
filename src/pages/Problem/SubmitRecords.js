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
    const { dispatch, match: { params: { id } } } = this.props;
    dispatch({
      type: 'submitRecords/setId',
      payload: {
        problemId: id,
      },
    });
    await Promise.all([
      dispatch({
        type: 'submitRecords/getLanguageMap',
      }),
      dispatch({
        type: 'submitRecords/fetchList',
      })
    ]);
  }

  getColumns = () => {
    const {
      languageMap,
    } = this.props;
    return [
        {
            title: submitRecordConfig.id.text,
            dataIndex: submitRecordConfig.id.dataIndex,
            key: submitRecordConfig.id.dataIndex,

        },
        {
            title: submitRecordConfig.submitTime.text,
            dataIndex: submitRecordConfig.submitTime.dataIndex,
            key: submitRecordConfig.submitTime.dataIndex,
            render: formatTimeFromTimeStamp('YYYY-MM-DD HH:MM:SS'),
        },
        {
            title: submitRecordConfig.language.text,
            dataIndex: submitRecordConfig.language.dataIndex,
            key: submitRecordConfig.language.dataIndex,
            render: (text) => languageMap[text],
        },
        {
            title: submitRecordConfig.runningTime.text,
            dataIndex: submitRecordConfig.runningTime.dataIndex,
            key: submitRecordConfig.runningTime.dataIndex,
        },
        {
            title: submitRecordConfig.isPass.text,
            dataIndex: submitRecordConfig.isPass.dataIndex,
            key: submitRecordConfig.isPass.dataIndex,
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


  handleSearchParamsChange = (params) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'submitRecords/changeSearchParams',
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
