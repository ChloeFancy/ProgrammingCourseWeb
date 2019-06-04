import React, { Component } from 'react';
import { connect } from 'dva';
import { Select, DatePicker, Form, Divider } from 'antd';
import LineChart from '../../../components/Charts/LineChart';
import PieChart from '../../../components/Charts/PieChart';
import { formatOptionsFromMap } from '../../../lib/common';

const { RangePicker } = DatePicker;
const dateFormat = 'YYYY/MM/DD';
const { Option } = Select;
const { Item: FormItem } = Form;

const formItemLayout = {
  labelCol: { span: 1 },
  wrapperCol: { span: 10 },
};

@connect(({ statistics, login }) => ({
  ...statistics,
  currentUser: login.user,
}))
class Statistics extends Component {
    async componentDidMount() {
        const {
            dispatch,
            match: {
                params: {
                    id,
                },
            },
            currentUser,
        } = this.props;
        const payload = {
            userId: id || currentUser.id,
        };
        await dispatch({
          type: 'statistics/initInfo',
          payload,
        });

        Promise.all([
            dispatch({
                type: 'statistics/fetchAnalysisByDifficulty',
            }),
            dispatch({
                type: 'statistics/fetchAnalysisByTags',
            }),
        ]);
    }

    handleTagsChange = async (tags) => {
      const { dispatch } = this.props;
      dispatch({
        type: 'statistics/setSearchParams',
        payload: {
          tags,
        },
      });
      dispatch({
        type: 'statistics/fetchAnalysisByTags',
      });
    };

    handleDateRangeChange = async ([startTime, endTime]) => {
        const { dispatch } = this.props;
        dispatch({
            type: 'statistics/setSearchParams',
            payload: {
                startTime,
                endTime,
            },
        });
        await Promise.all([
            dispatch({
                type: 'statistics/fetchAnalysisByDifficulty',
            }),
            dispatch({
                type: 'statistics/fetchAnalysisByTags',
            }),
        ]);
    };

    renderChart = (map, { line, pie }) => {
      const XAxis = Object.keys(line).map(key => map[key]);
      const seriesData = Object.keys(map).map(key => line[key]);
      const pieData = Object.keys(pie).map(key => ({
        value: pie[key],
        name: map[key],
      }));
      // console.log(XAxis, seriesData);
      return (
        <div>
          <LineChart xAxis={XAxis} seriesData={seriesData} />
          <PieChart data={pieData} />
        </div>
      );
    };

    render() {
        const {
            searchParams: {
                startTime,
                endTime,
                tags,
            },
            options: {
                difficulty,
                tags: tagsMap,
            },
            difficultyData,
            tagsData,
        } = this.props;

        return (
            <div>
                <h1 style={{ fontSize: '30px' }}>学习情况统计</h1>
                <RangePicker
                    value={[startTime, endTime]}
                    format={dateFormat}
                    onChange={this.handleDateRangeChange}
                />
                <Divider orientation="left">完成题目难度分析</Divider>
                {this.renderChart(difficulty, difficultyData)}
                <Divider orientation="left">完成题目标签类型分析</Divider>
                <Form>
                  <FormItem {...formItemLayout} label="标签">
                    <Select value={tags} onChange={this.handleTagsChange} mode="multiple">
                      {formatOptionsFromMap(tagsMap).map(({ key, value }) => {
                        return <Option value={value} key={value}>{key}</Option>;
                      })}
                    </Select>
                  </FormItem>
                </Form>
                {this.renderChart(tagsMap, tagsData)}
            </div>
        );
    }
}

export default Statistics;
