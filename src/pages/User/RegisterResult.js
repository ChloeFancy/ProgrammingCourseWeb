import React, { Component } from 'react';
import { formatMessage, FormattedMessage } from 'umi-plugin-react/locale';
import { Icon } from 'antd';
import router from 'umi/router';
import styles from './RegisterResult.less';

export default class RegisterResult extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 3,
      timeout: 0,
    };
  }

  componentDidMount() {
    const callBack = () => {
      const { count, timeout } = this.state;
      if (!count) {
        clearTimeout(timeout);
        router.push('/user/login');
      } else {
        this.setState({
          count: count - 1,
        });
        this.setState({
          timeout: setTimeout(callBack, 1000),
        });
      }
    };
    const timeout = setTimeout(callBack, 1000);
    this.setState({
      timeout,
    });
  }

  render() {
    const { count } = this.state;
    return (
      <div className={styles.registerResult}>
        <div className={styles.icon}><Icon type="check-circle" theme="twoTone" twoToneColor="#52c41a" /></div>
        <div className={styles.title}>
          注册成功
        </div>
        <div className={styles.title}>
          {count}秒之后进入登录页
        </div>
      </div>
    );
  }
};