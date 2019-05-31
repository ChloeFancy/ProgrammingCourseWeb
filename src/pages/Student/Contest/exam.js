
import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import router from 'umi/router';
import CodeMirror from '@uiw/react-codemirror';
import 'codemirror/keymap/sublime';
import 'codemirror/theme/monokai.css';
import 'codemirror/lib/codemirror.css';
import { Tag, Tabs, Radio, Button, Table, Spin, message, Alert } from 'antd';
import problemConfig, { submitRecordConfig } from '../../../configs/problemEdit';
import { formatTimeFromTimeStamp } from '../../../lib/common';
import styles from '../Problem/problem-detail.less';

const TabPane = Tabs.TabPane;
const RadioGroup = Radio.Group;

@connect(({ studentContest }) => ({
  languageOptions: studentContest.languageOptions,
  paperInfo: studentContest.paperInfo,
  paperLoading: studentContest.paperLoading,
}))
export default class ProblemDetail extends Component {
  async componentDidMount() {
    const {
      match: {
        params: {
          id,
        },
      },
      dispatch,
    } = this.props;
    const [_, validPage] = await Promise.all([
      dispatch({
        type: 'studentContest/getLanguageOptions',
      }),
      dispatch({
        type: 'studentContest/getPaperInfo',
        payload: {
          id,
        },
      }),
    ]);
    if (!validPage) {
      message.error('无效考试页面，即将返回列表页', 1.5, () => {
        router.push('/student/contest/list');
      });
    }
  }

  handleStudentSubmitInfoChange = (field) => {
    return (ev) => {
      const { dispatch } = this.props;

      dispatch({
        type: 'problemDetail/changeStudentSubmitInfo',
        payload: {
          [field]: ev.target.value,
        },
      });
    };
  };

  handleCodeChange = (instance) => {
    const code = instance.getValue();
    const { dispatch } = this.props;

    dispatch({
      type: 'problemDetail/changeStudentSubmitInfo',
      payload: {
        code,
      },
    });
  };

  checkBeforeSubmit = () => {
    const {
      studentSubmitInfo: {
        language,
        code,
      },
    } = this.props;
    let msg = '';
    if (!language) {
      msg = '请选择语言';
    } else if (!code) {
      msg = '请填写代码';
    }
    return msg;
  };

  handleSubmitCode = async() => {
    const { dispatch } = this.props;
    const error = this.checkBeforeSubmit();
    if (!error) {
      dispatch({
        type: 'problemDetail/submitCodeByStudent',
      });
    } else {
      message.error(error);
    }
  };

  handleShowSizeChange = (current, size) => {
    const {
      dispatch,
      submitRecords: {
        pageSize,
      },
      match: {
        params: {
          id,
        },
      },
    } = this.props;
    dispatch({
      type: 'problemDetail/setSubmitRecords',
      payload: {
        pageIndex: current,
        pageSize: size || pageSize,
      },
    });
    dispatch({
      type: 'problemDetail/getSubmitRecords',
      payload: {
        id,
      },
    });
  };


  renderProblemBasicInfo = (problemInfo) => {
    return (
      <div className={styles.problemBasicInfo}>
        <h1 className={styles.title}>{problemInfo[problemConfig.title.dataIndex]}</h1>
        <div className={styles.info}>
          <span>时间限制(ms):{problemInfo[problemConfig.judgeLimitTime.dataIndex]}</span>
          <span>内存限制(MB):{problemInfo[problemConfig.judgeLimitMem.dataIndex]}</span>
        </div>
      </div>
    );
  };
  renderProblemDetail = (problemInfo) => {
    // todo 重写一个表单form来填答案
    const {
      // problemInfo,
      // studentSubmitInfo: {
      //   language,
      //   code,
      // },
      languageOptions,
    } = this.props;
    return (
      <Fragment>
        {this.renderProblemBasicInfo(problemInfo)}
        <div className={styles.detailWrapper}>
          <h5>
            描述
          </h5>
          <div dangerouslySetInnerHTML={{ __html: problemInfo[problemConfig.description.dataIndex] }} />
          <h5>
            输入
          </h5>
          <div>
            {problemInfo[problemConfig.in.dataIndex]}
          </div>
          <h5>
            输出
          </h5>
          <div>
            {problemInfo[problemConfig.out.dataIndex]}
          </div>
          {
            problemInfo[problemConfig.inOutExamples.dataIndex] && problemInfo[problemConfig.inOutExamples.dataIndex].map(({ input: exampleIn, output: exampleOut }, index) => {
              return (
                <div key={index}>
                  <h5>样例输入{index + 1}</h5>
                  <div className={styles.example}>{exampleIn}</div>
                  <h5>样例输出{index + 1}</h5>
                  <div className={styles.example}>{exampleOut}</div>
                </div>
              );
            })
          }
          <h5>
            提示
          </h5>
          <div dangerouslySetInnerHTML={{ __html: problemInfo[problemConfig.hint.dataIndex] }} />
          <h5>
            选择语言
          </h5>
          <div>
            <RadioGroup onChange={this.handleStudentSubmitInfoChange('language')} value={''}>
              {
                languageOptions.map(({ key, value }) => <Radio key={value} value={value}>{key}</Radio>)
              }
            </RadioGroup>
          </div>
          <h5>
            提交代码
          </h5>

          <div className={styles['code-editor-wrapper']}>
            <CodeMirror
              value={''}
              options={{
                mode: 'c++',
                lineNumbers: true,
              }}
              onChanges={this.handleCodeChange}
            />
          </div>

        </div>
      </Fragment>
    );
  };

  render() {
    const { paperLoading, paperInfo } = this.props;
    return (
      <Spin spinning={paperLoading}>
        <Tabs defaultActiveKey="0">
          {
            paperInfo && paperInfo.problems && paperInfo.problems.length ? paperInfo.problems.map((problem, index) =>
              <TabPane
                tab={`题目${index + 1}`}
                key={index}
              >{this.renderProblemDetail(problem)}</TabPane>
            ) : []
          }
        </Tabs>
      </Spin>
    );
  }
}
