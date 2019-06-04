
import React, { Component } from 'react';
import { connect } from 'dva';
import router from 'umi/router';

import { Button, Spin } from 'antd';
import { contestConfig } from '../../../configs/contest';
import { formatTimeFromTimeStamp } from '../../../lib/common';
import styles from './intro.less';

@connect(({ studentContest }) => ({
  contestInfo: studentContest.contestInfo,
  contestLoading: studentContest.contestLoading,
}))
export default class ContestIntro extends Component {
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
      type: 'studentContest/getContestInfo',
      payload: {
        id,
      },
    });
  }

  enterContest = () => {
    const {
      match: {
        params: {
          id,
        },
      },
    } = this.props;
    router.push(`/student/contest/exam/${id}`)
  };

  render() {
    const { contestLoading, contestInfo } = this.props;
    return (
      <Spin spinning={contestLoading}>
        <h1 className={styles.name}>考试名称：{contestInfo[contestConfig.name.dataIndex]}</h1>
        <h1 className={styles.startTime}>
          开始时间：{formatTimeFromTimeStamp('YYYY-MM-DD HH:MM:SS')(contestInfo[contestConfig.startTime.dataIndex])}
          &nbsp;
          &nbsp;
          结束时间：{formatTimeFromTimeStamp('YYYY-MM-DD HH:MM:SS')(contestInfo[contestConfig.endTime.dataIndex])}
          </h1>

        <div className={styles.Intro}>
          考试说明：
          <div dangerouslySetInnerHTML={{ __html: contestInfo[contestConfig.introduction.dataIndex]}} />
          <br />
          <div>
            <Button type="primary" onClick={this.enterContest}>开始考试</Button>
          </div>
        </div>
      </Spin>
    );
  }
}
