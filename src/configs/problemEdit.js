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
};