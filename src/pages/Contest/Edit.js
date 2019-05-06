import React, { Component } from 'react';
import { connect } from 'dva';
import { Button, Row, Spin, message} from 'antd';
import router from 'umi/router';
import ContestDetailForm from '../../components/Contest/ContestDetail';
import ContestPaperDetailForm from '../../components/Contest/ContestPaperDetail';

@connect(({ contestDetail }) => ({
  ...contestDetail,
}))
class ProblemEdit extends Component {
  async componentDidMount() {
    this.init(this.props);
  }

  async componentWillReceiveProps(nextProps) {
    const { match } = this.props;
    if(match.params.id !== nextProps.match.params.id){
      this.init(nextProps);
    }
  }

  init = async ({ dispatch, match: { params: { id } } }) => {
    await dispatch({
      type: 'contestDetail/getInfo',
      payload: {
        id,
      },
    });
  };

  handleBackToContestList = () => {
    router.push(`/admin/contest/list`);
  };

  handleContestChange = (fields) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'contestDetail/changeContestInfo',
      payload: fields,
    });
  };

  handlePaperChange = (fields) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'contestDetail/changePaperInfo',
      payload: fields,
    });
  };

  handleSubmitContestAndPaper = async () => {
    const { dispatch } = this.props;
    const isSuccess = await dispatch({
      type: 'contestDetail/submitContestWithPaper',
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
            <ContestDetailForm
              wrappedComponentRef={(ref) => { this.contestForm = ref; }}
              info={contestInfo}
              onChange={this.handleContestChange}
            />
            <ContestPaperDetailForm
              wrappedComponentRef={(ref) => { this.paperForm = ref; }}
              info={paperInfo}
              options={options}
              onChange={this.handlePaperChange}
            />
            <Row>
              <Button onClick={this.handleSubmitContestAndPaper} type="primary">发布比赛</Button>
            </Row>
          </div>
        </Spin>
      </div>
    );
  }
}

export default ProblemEdit;
