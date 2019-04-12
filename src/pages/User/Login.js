
import React, { Component } from 'react';
import { connect } from 'dva';
import { Row, Col } from 'antd';
import LoginForm from '../../components/Login/LoginForm';
import { login } from '../../services/common/user';
import styles from './Login.less';

@connect(({ login }) => ({
  ...login,
}))
export default class LoginPage extends Component {
    submitLoginInfo = async(values) => {
        const { dispatch } = this.props;
        await dispatch({
            type: 'login/login',
            payload: values,
        });
    };

    render() {
        return (
            <div className={styles['login-wrapper']}>
                <h1>
                    登录
                </h1>
                <Row type="flex" justify="center">
                    <Col spen={10}>
                        <LoginForm
                            onSubmit={this.submitLoginInfo}
                        />
                    </Col>
                </Row>
            </div>
        );
    }
}
