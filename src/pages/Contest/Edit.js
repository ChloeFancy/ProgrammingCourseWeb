import React, { Component } from 'react';
import { connect } from 'dva';
import { Table, Icon, Upload, Button, Form, Input, Row, Col, Select, Checkbox } from 'antd';
import ContestDetailForm from '../../components/Contest/ContestDetail';
import ContestPaperDetailForm from '../../components/Contest/ContestPaperDetail';

// todo 
// 1. 题目数量

@connect(({ contestDetail }) => ({
  ...contestDetail, 
}))
class ProblemEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      testCaseList: [],
    };
  }

  async componentDidMount() {
    const { dispatch } = this.props;
    await dispatch({
      type: 'contestDetail/getAllOptions'
    });
  }

  render() {
    const { testCaseList } = this.state;
    const { options } = this.props;
    return (
      <div>
        <Row>
          <Button>返回</Button>
        </Row>
        <div>
          <ContestDetailForm />
          <ContestPaperDetailForm options={options} />
          <Row>
            <Button type="primary">发布比赛</Button>
          </Row>
        </div>
      </div>
    );
  }
}

export default ProblemEdit;
