import React, { Component } from 'react';
import { connect } from 'dva';
import router from 'umi/router';
import { Table, Icon, Menu, Button, Row, Col, Input, Form, Divider, Select } from 'antd';
import rankConfig from '../../../configs/rank';

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const FormItem = Form.Item;
const Option = Select.Option;

const formItemLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

@connect(({ rankList }) => ({
  ...rankList,
}))
class RankList extends Component {
  async componentDidMount() {
    document.title = '排名';
    const { dispatch } = this.props;
    dispatch({
      type: 'rankList/fetchList',
    });
  }

  getColumns = () => {
    return [
        {
            title: rankConfig.ranking.text,
            dataIndex: rankConfig.ranking.dataIndex,
            key: rankConfig.ranking.dataIndex,
            width: '20%',
        },
        {
            title: rankConfig.name.text,
            dataIndex: rankConfig.name.dataIndex,
            key: rankConfig.name.dataIndex,
            width: '10%',
        },
        {
            title: rankConfig.passNum.text,
            dataIndex: rankConfig.passNum.dataIndex,
            key: rankConfig.passNum.dataIndex,
            width: '16%',
        },
        {
            title: rankConfig.submitNum.text,
            dataIndex: rankConfig.submitNum.dataIndex,
            key: rankConfig.submitNum.dataIndex,
            width: '20%',
        },
        {
            title: rankConfig.ratio.text,
            dataIndex: rankConfig.ratio.dataIndex,
            key: rankConfig.ratio.dataIndex,
            width: '10%',
            render: (_, record) => (100.0 * record[rankConfig.passNum.dataIndex] / record[rankConfig.submitNum.dataIndex]).toFixed(2) + '%', 
        },
    ];
  };

  fetchList = async() => {
    const { dispatch } = this.props;
    await dispatch({
        type: 'rankList/fetchList',
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
      type: 'rankList/changeSearchParams',
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
        <h1 style={{ fontSize: '30px' }}>排名</h1>
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

export default RankList;
