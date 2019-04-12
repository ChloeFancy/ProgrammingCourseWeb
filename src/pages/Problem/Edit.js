import React, { Component } from 'react';
import { connect } from 'dva';
import { Table, Icon, Upload, Button, Form, Input, Row, Col, Select, Checkbox } from 'antd';
import ProbelmForm from '../../components/Problem/problemEditForm';

@connect(({ problem }) => ({
  ...problem,
}))
class ProblemEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      testCaseList: [],
    };
  }

  render() {
    const { testCaseList } = this.state;
    return (
      <div>
        <Row>
          <Button>返回</Button>
        </Row>
        <div>
          <ProbelmForm testCaseList={testCaseList} />
        </div>
      </div>
    );
  }
}

export default ProblemEdit;
