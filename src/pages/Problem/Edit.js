import React, { Component } from 'react';
import { connect } from 'dva';
import router from 'umi/router';
import { Spin, Table, Icon, Upload, Button, Form, Input, Row, Col, Select, Checkbox } from 'antd';
import ProbelmForm from '../../components/Problem/problemEditForm';

@connect(({ problemEdit }) => ({
  ...problemEdit,
}))
class ProblemEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      testCaseList: [],
    };
  }

  async componentDidMount() {
    const {
      match: {
        params: {
          id,
        },
      },
      dispatch,
    } = this.props;
    dispatch({
      type: 'problemEdit/getInfo',
      payload: { id },
    });
  }

  // 返回列表页
  handleBackToProblemList = () => {
    router.go(-1);
  };

  handleProblemInfoChange = (fields) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'problemEdit/changeProblemInfo',
      payload: fields,
    });
  };

  render() {
    const {
      match: {
        params: {
          id,
        },
      },
      problemInfo,
      loading,
      options,
    } = this.props;
    return (
      <div>
        {/* 编辑页，page参数不为空，显示返回列表页按钮 */}
        {id && <Row><Button onClick={this.handleBackToProblemList}>返回</Button></Row>}
        <Row>
          <Spin spinning={loading}>
            <ProbelmForm 
              options={ options } 
              onChange={this.handleProblemInfoChange} 
              problemInfo={problemInfo} 
            />
          </Spin>
        </Row>
      </div>
    );
  }
}

export default ProblemEdit;
