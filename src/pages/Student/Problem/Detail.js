
import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import CodeMirror from '@uiw/react-codemirror';
import 'codemirror/keymap/sublime';
import 'codemirror/theme/monokai.css';
import 'codemirror/lib/codemirror.css';
import { Tabs, Radio, Input, Button, Table, Spin, message, Alert } from 'antd';
import { getProblemDetail, getProblemLogs } from '../../../services/student/problemDetail';
import config from '../../../configs/ProblemDetail';
import problemConfig, { modeConfig, submitRecordConfig } from '../../../configs/problemEdit';
import { formatTimeFromTimeStamp } from '../../../lib/common';
import styles from './problem-detail.less';

const TabPane = Tabs.TabPane;
const RadioGroup = Radio.Group;
const TextArea = Input.TextArea;

@connect(({ problemDetail }) => ({
    studentSubmitInfo: problemDetail.studentSubmitInfo,
    problemInfo: problemDetail.problemInfo,
    loading: problemDetail.loading,
    languageOptions: problemDetail.languageOptions,
    codeSubmitting: problemDetail.codeSubmitting,
    judgeResult: problemDetail.judgeResult,
    judgeResultsMap: problemDetail.judgeResultsMap,
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
        await Promise.all([
            dispatch({
                type: 'problemDetail/getLanguageOptions',
            }),
            dispatch({
                type: 'problemDetail/getJudgeResultsMap',
            }),
            dispatch({
                type: 'problemDetail/getInfo',
                payload: {
                    id,
                    mode: modeConfig.STUDENT,
                },
            }),
        ]);
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

    getColumns = () => {
        return [
            {
                title: '#',
                dataIndex: submitRecordConfig.id.dataIndex,
                key: submitRecordConfig.id.dataIndex,
                width: '20%',
            },
            {
                title: submitRecordConfig.submitTime.text,
                dataIndex: submitRecordConfig.submitTime.dataIndex,
                key: submitRecordConfig.submitTime.dataIndex,
                width: '10%',
            },
            {
                title: submitRecordConfig.language.text,
                dataIndex: submitRecordConfig.language.dataIndex,
                key: submitRecordConfig.language.dataIndex,
                width: '16%',
            },
            {
                title: submitRecordConfig.runningTime.text,
                dataIndex: submitRecordConfig.runningTime.dataIndex,
                key: submitRecordConfig.runningTime.dataIndex,
                width: '20%',
            },
            {
                title: submitRecordConfig.isPass.text,
                dataIndex: submitRecordConfig.isPass.dataIndex,
                key: submitRecordConfig.isPass.dataIndex,
                width: '10%',
                render: (isPass) => isPass ? '通过' : '未通过',
            },
        ];
    };

    renderProblemBasicInfo = () => {
        const {
            problemInfo,
        } = this.props;
        return (
            <div className={styles.problemBasicInfo}>
                <h1 className={styles.title}>{problemInfo[problemConfig.title.dataIndex]}</h1>
                <div className={styles.info}>
                    <span>发布时间:{formatTimeFromTimeStamp('YYYY-MM-DD HH:MM:SS')(problemInfo[problemConfig.createTime.dataIndex])}</span>
                    <span>最后更新: 暂无
                    {/* {formatTimeFromTimeStamp('YYYY-MM-DD HH:MM:SS')(problemInfo[problemConfig.createTime.dataIndex])} */}
                    </span>
                    <span>时间限制:{problemInfo[problemConfig.judgeLimitTime.dataIndex]}</span>
                    <span>内存限制:{problemInfo[problemConfig.judgeLimitMem.dataIndex]}</span>
                </div>
            </div>
        );
    };

    renderSubmitInfo = () => {
        const {
            problemInfo: {
                submitLogs = [],
            },
        } = this.props;
        return (
            <Fragment>
                {this.renderProblemBasicInfo()}
                <Table columns={this.getColumns()} dataSource={submitLogs} />
            </Fragment>
        );
    };

    renderProblemDetail = () => {
        const {
            problemInfo,
            studentSubmitInfo: {
                language,
                code,
            },
            languageOptions,
            codeSubmitting,
            judgeResult,
            judgeResultsMap,
        } = this.props;
        return (
            <Fragment>
                {this.renderProblemBasicInfo()}
                <div className={styles.detailWrapper}>
                    <h5>
                        描述
                    </h5>
                    <div>
                        {problemInfo[problemConfig.description.dataIndex]}
                    </div>
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
                        选择语言
                    </h5>
                    <div>
                        <RadioGroup onChange={this.handleStudentSubmitInfoChange('language')} value={language}>
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
                            value={code}
                            options={{
                                mode: 'c++',
                                lineNumbers: true,
                            }}
                            onChanges={this.handleCodeChange}
                        />
                    </div>
                    
                    <div>
                        <Button type="primary" onClick={this.handleSubmitCode}>提交代码</Button>
                        &nbsp;
                        &nbsp;
                        {codeSubmitting && <Spin />}
                    </div>
                    <br />
                    {
                        judgeResultsMap && judgeResultsMap[judgeResult] && 
                        <Alert
                            showIcon
                            message={judgeResultsMap[judgeResult]}
                            type={!judgeResult ? 'success' : 'error'}
                        />
                    }
                </div>
            </Fragment>
        );
    };

    render() {
        const { loading } = this.props;
        return (
            <Spin spinning={loading}>
                <Tabs defaultActiveKey="1">
                    <TabPane tab="题目" key="1">{this.renderProblemDetail()}</TabPane>
                    <TabPane tab="我的提交" key="2">{this.renderSubmitInfo()}</TabPane>
                </Tabs>
            </Spin>
        );
    }
}
