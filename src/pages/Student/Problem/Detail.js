
import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import { Tabs, Radio, Input, Button, Table, Spin } from 'antd';
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
}))
export default class ProblemDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            detail: {},
            lang: 1,
            code: '',
            logs: [],
            loading: false,
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
        await dispatch({
            type: 'problemDetail/getInfo',
            payload: { 
                id,
                mode: modeConfig.STUDENT,
            },
        });
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

    handleSubmitCode = async() => {
        const { dispatch } = this.props;
        dispatch({
            type: 'problemDetail/submitCodeByStudent',
        });
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
                                <div>
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
                            <Radio value={1}>C (GCC 4.8)</Radio>
                            <Radio value={2}>C++ (G++ 4.3)</Radio>
                            <Radio value={3}>Java (Oracle JDK 1.7)</Radio>
                        </RadioGroup>
                    </div>
                    <h5>
                        提交代码
                    </h5>
                    <div>
                        <TextArea rows={10} value={code} onChange={this.handleStudentSubmitInfoChange('code')} />
                    </div>
                    <div>
                        <Button type="primary" onClick={this.handleSubmitCode}>提交代码</Button>
                    </div>
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
