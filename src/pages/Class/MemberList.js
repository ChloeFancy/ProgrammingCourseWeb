import React, { Component } from 'react';
import { connect } from 'dva';
import router from 'umi/router';
import { Table, Icon, Menu, Button, Row, Col, Input, Form, Divider, Select } from 'antd';
import { formatTimeFromTimeStamp } from '../../lib/common';
import SearchForm from '../../components/Problem/ProblemSearchForm';
import { classMemberConfig } from '../../configs/class';

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const FormItem = Form.Item;
const Option = Select.Option;

const formItemLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

@connect(({ memberList }) => ({
  ...memberList,
}))
class MemberListList extends Component {
  async componentDidMount() {
    document.title = '提交列表';
    const {
        dispatch,
        match: {
            params: {
                id,
            },
        },
    } = this.props;
    dispatch({
        type: 'memberList/setId',
        payload: {
            classId: id,
        },
    });
    await dispatch({
      type: 'memberList/fetchList',
    });
  }

  getColumns = () => {
    return [
        {
            title: '#',
            dataIndex: classMemberConfig.userId.dataIndex,
            key: classMemberConfig.userId.dataIndex,
            width: '20%',
        },
        {
            title: classMemberConfig.name.text,
            dataIndex: classMemberConfig.name.dataIndex,
            key: classMemberConfig.name.dataIndex,
            width: '10%',
        },
        // {
        //     title: classMemberConfig.language.text,
        //     dataIndex: classMemberConfig.language.dataIndex,
        //     key: classMemberConfig.language.dataIndex,
        //     width: '16%',
        // },
        // {
        //     title: classMemberConfig.runningTime.text,
        //     dataIndex: classMemberConfig.runningTime.dataIndex,
        //     key: classMemberConfig.runningTime.dataIndex,
        //     width: '20%',
        // },
        // {
        //     title: classMemberConfig.isPass.text,
        //     dataIndex: classMemberConfig.isPass.dataIndex,
        //     key: classMemberConfig.isPass.dataIndex,
        //     width: '10%',
        //     render: (isPass) => isPass ? '通过' : '未通过', 
        // },
    ];
  };

  fetchList = async() => {
    const { dispatch } = this.props;
    await dispatch({
        type: 'memberList/fetchList',
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
      type: 'memberList/changeSearchParams',
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
        <h1 style={{ fontSize: '30px' }}>班级成员</h1>
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

export default MemberListList;
