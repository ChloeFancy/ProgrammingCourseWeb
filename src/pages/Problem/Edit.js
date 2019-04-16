import React, { Component } from 'react';
import { connect } from 'dva';
import router from 'umi/router';
import { Spin, Table, Icon, Upload, Button, Form, Input, Row, Col, Select, Checkbox, message } from 'antd';
import ProbelmForm from '../../components/Problem/problemEditForm';

@connect(({ problemDetail }) => ({
  ...problemDetail,
}))
class ProblemEdit extends Component {
  async componentDidMount() {
    const {
      match: {
        params: {
          id,
        },
      },
      dispatch,
    } = this.props;
    await dispatch({
      type: 'problemDetail/getInfo',
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
      type: 'problemDetail/changeProblemInfo',
      payload: fields,
    });
  };

  handleSubmit = (values) => {
    const { dispatch } = this.props;
    const isSuccess = dispatch({
      type: 'problemDetail/submitEditProblem',
      payload: values,
    });
    if (isSuccess) {
      message.success('编辑成功，即将返回', 3, () => {
        router.go(-1);
      });
    } else {
      message.error('编辑失败，请重试');
    }
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
              wrappedComponentRef={(ref) => { this.formRef = ref; }}
              options={ options } 
              onChange={this.handleProblemInfoChange} 
              problemInfo={problemInfo} 
              onSubmit={this.handleSubmit}
            />
          </Spin>
        </Row>
      </div>
    );
  }
}

export default ProblemEdit;
