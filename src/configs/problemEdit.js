import { Button } from 'antd';

export default {
    title: { dataIndex: 'title', text: '题目标题' },
    description: { dataIndex: 'description', text: '题目描述' },
    judgeLimitTime: { dataIndex: 'judgeLimitTime', text: '时间限制(ms, 范围1-10000ms)' },
    judgeLimitMem: { dataIndex: 'judgeLimitMem', text: '内存限制(MB, 最低16M, Java不能低于32M)' },
    difficulty: { dataIndex: 'difficulty', text: '难度' },
    tags: { dataIndex: 'tags', text: '标签' },
    in: { dataIndex: 'in', text: '输入描述' },
    out: { dataIndex: 'out', text: '输出描述' },
    inOutExamples: { dataIndex: 'inOutExamples', text: (<span>样例&nbsp;&nbsp;<Button>添加</Button></span>) },
    hint: { dataIndex: 'hint', text: '提示' },
    source: { dataIndex: 'source', text: '来源' },
    createTime: { dataIndex: 'createTime', text: '创建时间' },
    id: { dataIndex: 'id', text: 'ID' },
    submitTime: { dataIndex: 'submitTime', text: '提交总数' },
    acceptTime: { dataIndex: 'acceptTime', text: '通过次数' },
    judgeFile: { dataIndex: 'judgeFile', text: '测试数据' },
};

export const submitRecordConfig = {
    id: { dataIndex: 'id', text: 'ID' },
    submitTime: { dataIndex: 'submitTime', text: '提交时间' },
    isPass: { dataIndex: 'isPass', text: '是否通过' },
    runningMem: { dataIndex: 'runningMem', text: '运行内存' },
    runningTime: { dataIndex: 'runningTime', text: '运行时间(ms)' },
    language: { dataIndex: 'runningLan', text: '语言' },
};

export const modeConfig = {
    STUDENT: 0,
    ADMIN: 1,
};
