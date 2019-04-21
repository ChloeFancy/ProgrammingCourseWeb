import React, { Component } from 'react';

import {
    Form, Icon, Input, Button, Checkbox, Row, Col,
} from 'antd';
import router from 'umi/router';

class NormalLoginForm extends Component {
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.onSubmit(values);
            }
        });
    };

    toRegister = (e) => {
        e.preventDefault();
        router.push('/user/register');
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit} className="login-form">
                <Form.Item>
                    {getFieldDecorator('account', {
                        rules: [{ required: true, message: 'Please input your username!' }],
                    })(
                        <Input
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="Username"
                        />,
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: 'Please input your Password!' }],
                    })(
                        <Input
                            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            type="password"
                            placeholder="Password"
                        />,
                    )}
                </Form.Item>
                <Form.Item>
                    <Row type="flex" justify="center">
                        <Col>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                登陆
                            </Button>
                        </Col>
                    </Row>
                </Form.Item>
                <Row type="flex" justify="center">
                    <Col>
                        <div>
                            <a className="login-form-forgot" href="">忘记用户名/密码</a>
                            <br />
                            <a onClick={this.toRegister}>还没有帐号?点击注册</a>
                        </div>
                    </Col>
                </Row>
            </Form>
        );
    }
}

export default Form.create({ name: 'normal_login' })(NormalLoginForm);
