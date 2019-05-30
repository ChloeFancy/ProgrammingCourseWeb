
import React, { Component } from 'react';
import { connect } from 'dva';
import router from 'umi/router';

import { Row, Col, message } from 'antd';
import PersonalCenterComp from '../../components/PersonalCenter';
import styles from './Login.less';

@connect(({ personalCenter }) => ({
  ...personalCenter,
}))
class PersonalCenter extends Component {
    componentDidMount() {
      const { dispatch } = this.props;
      dispatch({
        type: 'personalCenter/init',
      });
    }

    submitLoginInfo = async(values) => {
        const { dispatch } = this.props;
        const isSuccess = await dispatch({
            type: 'personalCenter/submit',
            payload: values,
        });
        if (isSuccess) {
          message.success('修改成功，请重新登陆', 1.5, () => {
            router.push('/user/login');
          });
        } else {
          message.error('修改失败，请稍后再试');
        }
    };

    onChange = (fields) => {
      const { dispatch } = this.props;
      dispatch({
        type: 'personalCenter/changeInfo',
        payload: {
          ...fields,
        },
      });
    };

    onBack = () => {
      router.go(-1);
    };

    render() {
        const { info } = this.props;
        return (
          <div className={styles['login-wrapper']}>
            <h1>
                个人信息
            </h1>
            <Row type="flex" justify="center">
                <Col span={10}>
                    <PersonalCenterComp
                        info={info}
                        onSubmit={this.submitLoginInfo}
                        onChange={this.onChange}
                        onBack={this.onBack}
                    />
                </Col>
            </Row>
            </div>
        );
    }
}

export default PersonalCenter;
