import React, { Component } from 'react';
import { connect } from 'dva';
import { formatMessage, FormattedMessage } from 'umi-plugin-react/locale';
import Link from 'umi/link';
import router from 'umi/router';
import { Form, Input, Button, Select, Row, Col, Popover, Progress, Radio } from 'antd';
import styles from './Register.less';
import userConfig from '../../configs/UserList';

const FormItem = Form.Item;
const { Option } = Select;
const InputGroup = Input.Group;
const RadioGroup = Radio.Group;

const passwordStatusMap = {
  ok: (
    <div className={styles.success}>
      <FormattedMessage id="validation.password.strength.strong" />
    </div>
  ),
  pass: (
    <div className={styles.warning}>
      <FormattedMessage id="validation.password.strength.medium" />
    </div>
  ),
  poor: (
    <div className={styles.error}>
      <FormattedMessage id="validation.password.strength.short" />
    </div>
  ),
};

const passwordProgressMap = {
  ok: 'success',
  pass: 'normal',
  poor: 'exception',
};

@connect(({ register, loading }) => ({
  register,
  submitting: loading.effects['register/submit'],
}))
@Form.create()
class Register extends Component {
  state = {
    count: 0,
    confirmDirty: false,
    visible: false,
    help: '',
    prefix: '86',
  };

  componentDidUpdate() {
    const { form, register } = this.props;
    const account = form.getFieldValue('mail');
    if (register.status) {
      router.push({
        pathname: '/user/register-result',
        state: {
          account,
        },
      });
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  onGetCaptcha = () => {
    let count = 59;
    this.setState({ count });
    this.interval = setInterval(() => {
      count -= 1;
      this.setState({ count });
      if (count === 0) {
        clearInterval(this.interval);
      }
    }, 1000);
  };

  getPasswordStatus = () => {
    const { form } = this.props;
    const value = form.getFieldValue('password');
    if (value && value.length > 9) {
      return 'ok';
    }
    if (value && value.length > 5) {
      return 'pass';
    }
    return 'poor';
  };

  handleSubmit = e => {
    e.preventDefault();
    const { form, dispatch } = this.props;
    form.validateFields({ force: true }, (err, values) => {
      if (!err) {
        const { prefix } = this.state;
        dispatch({
          type: 'register/submit',
          payload: {
            user: {
              ...values,
              prefix,
            },
          },
        });
      }
    });
  };

  handleConfirmBlur = e => {
    const { value } = e.target;
    const { confirmDirty } = this.state;
    this.setState({ confirmDirty: confirmDirty || !!value });
  };

  checkConfirm = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue('password')) {
      callback(formatMessage({ id: 'validation.password.twice' }));
    } else {
      callback();
    }
  };

  checkPassword = (rule, value, callback) => {
    const { visible, confirmDirty } = this.state;
    if (!value) {
      this.setState({
        help: formatMessage({ id: 'validation.password.required' }),
        visible: !!value,
      });
      callback('error');
    } else {
      this.setState({
        help: '',
      });
      if (!visible) {
        this.setState({
          visible: !!value,
        });
      }
      if (value.length < 6) {
        callback('error');
      } else {
        const { form } = this.props;
        if (value && confirmDirty) {
          form.validateFields(['confirm'], { force: true });
        }
        callback();
      }
    }
  };

  renderPasswordProgress = () => {
    const { form } = this.props;
    const value = form.getFieldValue('password');
    const passwordStatus = this.getPasswordStatus();
    return value && value.length ? (
      <div className={styles[`progress-${passwordStatus}`]}>
        <Progress
          status={passwordProgressMap[passwordStatus]}
          className={styles.progress}
          strokeWidth={6}
          percent={value.length * 10 > 100 ? 100 : value.length * 10}
          showInfo={false}
        />
      </div>
    ) : null;
  };

  render() {
    const { form, submitting } = this.props;
    const { getFieldDecorator } = form;
    const { help, visible } = this.state;
    return (
      <div className={styles.main}>
        <h3>
          <FormattedMessage id="app.register.register" />
        </h3>
        <Form onSubmit={this.handleSubmit}>
          <FormItem label={formatMessage({ id: 'form.account.placeholder' })}>
            {getFieldDecorator(userConfig.account, {
              rules: [
                {
                  required: true,
                  message: formatMessage({ id: 'validation.account.required' }),
                },
              ],
            })(
              <Input size="large" />
            )}
          </FormItem>
          <FormItem label={formatMessage({ id: 'form.name.label' })}>
            {getFieldDecorator(userConfig.name, {
              rules: [
                {
                  required: true,
                  message: formatMessage({ id: 'validation.name.required' }),
                },
              ],
            })(
              <Input size="large" />
            )}
          </FormItem>
          <FormItem label={formatMessage({ id: 'form.password.label' })} help={help}>
            <Popover
              getPopupContainer={node => node.parentNode}
              content={
                <div style={{ padding: '4px 0' }}>
                  {passwordStatusMap[this.getPasswordStatus()]}
                  {this.renderPasswordProgress()}
                  <div style={{ marginTop: 10 }}>
                    <FormattedMessage id="validation.password.strength.msg" />
                  </div>
                </div>
              }
              overlayStyle={{ width: 240 }}
              placement="right"
              visible={visible}
            >
              {getFieldDecorator(userConfig.password, {
                rules: [
                  {
                    validator: this.checkPassword,
                  },
                  {
                    required: true,
                  },
                ],
              })(
                <Input
                  size="large"
                  type="password"
                  placeholder={formatMessage({ id: 'form.password.placeholder' })}
                />
              )}
            </Popover>
          </FormItem>
          <FormItem label={formatMessage({ id: 'form.confirm-password.placeholder' })}>
            {getFieldDecorator('confirm', {
              rules: [
                {
                  required: true,
                  message: formatMessage({ id: 'validation.confirm-password.required' }),
                },
                {
                  validator: this.checkConfirm,
                },
              ],
            })(
              <Input
                size="large"
                type="password"
              />
            )}
          </FormItem>
          <FormItem label={formatMessage({ id: 'form.phone-number.placeholder' })}>
            {getFieldDecorator(userConfig.phone, {
                rules: [
                  {
                    pattern: /^\d{11}$/,
                    message: formatMessage({ id: 'validation.phone-number.wrong-format' }),
                  },
                ],
              })(
                <Input
                  size="large"
                />
              )}
          </FormItem>
          <FormItem label={formatMessage({ id: 'form.sex.label' })}>
            {getFieldDecorator(userConfig.sex)(
              <RadioGroup>
                <Radio value={0}>男</Radio>
                <Radio value={1}>女</Radio>
              </RadioGroup>
            )}
          </FormItem>
          <FormItem label={formatMessage({ id: 'form.email.placeholder' })}>
            {getFieldDecorator('mail', {
              rules: [
                {
                  type: 'email',
                  message: formatMessage({ id: 'validation.email.wrong-format' }),
                },
              ],
            })(
              <Input size="large" />
            )}
          </FormItem>

          <FormItem>
            <Button
              size="large"
              loading={submitting}
              className={styles.submit}
              type="primary"
              htmlType="submit"
            >
              <FormattedMessage id="app.register.register" />
            </Button>
            <Link className={styles.login} to="/User/Login">
              <FormattedMessage id="app.register.sign-in" />
            </Link>
          </FormItem>
        </Form>
      </div>
    );
  }
}

export default Register;
