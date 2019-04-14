import React, { Component } from 'react';
import { connect } from 'dva';
import { Button, Row, Spin } from 'antd';
import router from 'umi/router';
import ContestDetailForm from '../../components/Contest/ContestDetail';
import ContestPaperDetailForm from '../../components/Contest/ContestPaperDetail';

@connect(({ contestDetail }) => ({
  ...contestDetail,
}))
class ProblemEdit extends Component {
  async componentDidMount() {
    const { dispatch, match: { params: { id } } } = this.props;
    await dispatch({
      type: 'contestDetail/getInfo',
      payload: {
        id,
      },
    });
  }

  handleBackToContestList = () => {
    router.push(`/contest/list`);
  };

  handleContestChange = () => {

  };

  handlePaperChange = () => {

  };

  render() {
    const { loading, options, contestInfo, paperInfo, match: { params: { id } } } = this.props;
    return (
      <div>
        {
          id && (
            <Row>
              <Button onClick={this.handleBackToContestList}>返回</Button>
            </Row>
          )
        }
        <Spin spinning={loading}>
          <div>
            <ContestDetailForm info={contestInfo} onChange={this.handleContestChange} />
            <ContestPaperDetailForm info={paperInfo} options={options} onChange={this.handlePaperChange} />
            <Row>
              <Button type="primary">发布比赛</Button>
            </Row>
          </div>
        </Spin>
      </div>
    );
  }
}

export default ProblemEdit;
