
import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import { Tabs, Radio, Input, Button, Table, Spin } from 'antd';
import { getProblemDetail, getProblemLogs } from '../../../services/student/problemDetail';
import config from '../../../configs/ProblemDetail';

const TabPane = Tabs.TabPane;
const RadioGroup = Radio.Group;
const TextArea = Input.TextArea;

@connect(({ problem }) => ({
    ...problem,
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
        this.setState({
            loading: true,
        });
        const [detail, logs] = await Promise.all([getProblemDetail(), getProblemLogs()]);
        this.setState({
            detail,
            logs: logs.list,
            loading: false,
        });
    }

    handleLanguageChange = (lang) => {
        this.setState({
            lang,
        });
    };

    handleCodeChange = (code) => {
        this.setState({
            code,
        });
    };

    handleSubmitCode = async() => {

    };

    getColumns = () => {
        return [
            {
                title: '#',
                dataIndex: config.ID,
                key: 'ID',
                width: '20%',
            },
            {
                title: '提交时间',
                dataIndex: config.submitTime,
                key: config.submitTime,
                width: '10%',
            },
            {
                title: '语言',
                dataIndex: config.language,
                key: config.language,
                width: '16%',
            },
            {
                title: '运行时间',
                dataIndex: config.runtime,
                key: config.runtime,
                width: '20%',
            },
            {
                title: '结果',
                dataIndex: config.result,
                key: config.result,
                width: '10%',
            },
        ];
    };

    renderProblemBasicInfo = () => {
        const {
            detail: {
                title,
                launchTime,
                lastModifiedTime,
                timeLimit,
                storeLimit,
            },
        } = this.state;
        return (
            <div>
                <h1>{title}</h1>
                <div>
                    <span>发布时间:{launchTime}</span>
                    <span>最后更新:{lastModifiedTime}</span>
                    <span>时间限制:{timeLimit}</span>
                    <span>内存限制:{storeLimit}</span>
                </div>
            </div>
        );
    };

    renderSubmitInfo = () => {
        const {
            logs,
        } = this.state;
        return (
            <Fragment>
                {this.renderProblemBasicInfo()}
                <Table columns={this.getColumns()} dataSource={logs} />
            </Fragment>
        );
    };

    renderProblemDetail = () => {
        const {
            detail: {
                describe,
                input,
                output,
                examples,
                tags,
                source,
            },
        } = this.state;
        return (
            <Fragment>
                {this.renderProblemBasicInfo()}
                <div>
                    <h5>
                        描述
                    </h5>
                    <div>
                        {describe}
                    </div>
                    <h5>
                        输入
                    </h5>
                    <div>{input}</div>
                    <h5>
                        输出
                    </h5>
                    <div>{output}</div>
                    {
                        examples && examples.map(({ input: exampleIn, output: exampleOut }, index) => {
                            return (
                                <div>
                                    <h5>样例输入{index + 1}</h5>
                                    <div>{exampleIn}</div>
                                    <h5>样例输出{index + 1}</h5>
                                    <div>{exampleOut}</div>
                                </div>
                            );
                        })
                    }
                    <h5>
                        选择语言
                    </h5>
                    <div>
                        <RadioGroup onChange={this.handleLanguageChange} value={this.state.lang}>
                            <Radio value={1}>C (GCC 4.8)</Radio>
                            <Radio value={2}>C++ (G++ 4.3)</Radio>
                            <Radio value={3}>Java (Oracle JDK 1.7)</Radio>
                        </RadioGroup>
                    </div>
                    <h5>
                        提交代码
                    </h5>
                    <div>
                        <TextArea value={this.code} onChange={this.handleCodeChange} />
                    </div>
                    <div>
                        <Button type="primary" onClick={this.handleSubmitCode}>提交代码</Button>
                    </div>
                </div>
            </Fragment>
        );
    };

    render() {
        const { loading } = this.state;
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
