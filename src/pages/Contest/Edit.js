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

  handleModifyPaper = async (param, problemList) => {
    const { dispatch } = this.props;
    const result = await dispatch({
      type: 'contestDetail/handleModifyPaper',
      payload: {
        param,
        problemList,
      },
    });
    if (result) {
      message.success('操作成功');
    } else {
      message.error('操作失败，请重试');
    }
  };

  generatePaper = (values) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'contestDetail/generatePaper',
      payload: values,
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
    const { dispatch, paperInfo } = this.props;
    this.contestForm.props.form.validateFieldsAndScroll(async (err) => {
      if (!err) {
        if (paperInfo && paperInfo.id && paperInfo.id.value) {
          const isSuccess = await dispatch({
            type: 'contestDetail/submitContestWithPaper',
          });
          if (isSuccess) {
            message.success('发布考试成功，即将返回列表页', 3, () => {
              router.go(-1);
            });
          } else {
            message.error('发布失败，请重试');
          }
        } else {
          message.error('请先生成试卷在发布考试');
        }
      }
    });
  };

  render() {
    const {
      problemList,
      paperTableLoading,
      loading,
      options,
      contestInfo,
      paperInfo,
      match: { params: { id } },
    } = this.props;
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
              problemList={problemList}
              generatePaper={this.generatePaper}
              handleModifyPaper={this.handleModifyPaper}
              paperTableLoading={paperTableLoading}
              options={options}
              onChange={this.handlePaperChange}
            />
            <Row>
              <Button onClick={this.handleSubmitContestAndPaper} type="primary">发布考试</Button>
            </Row>
          </div>
        </Spin>
      </div>
    );
  }
}

export default ProblemEdit;
