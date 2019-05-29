import React, { PureComponent } from 'react';
import { FormattedMessage } from 'umi-plugin-react/locale';
import { Tag, Menu, Icon } from 'antd';
import moment from 'moment';
import router from 'umi/router';
import groupBy from 'lodash/groupBy';
import HeaderDropdown from '../HeaderDropdown';
import styles from './index.less';
import { getAuthority } from '../../utils/authority';
import { TEACHER, ADMIN } from '../../configs/UserList';

export default class GlobalHeaderRight extends PureComponent {
  getNoticeData() {
    const { notices = [] } = this.props;
    if (notices.length === 0) {

      return {};
    }
    const newNotices = notices.map(notice => {
      const newNotice = { ...notice };
      if (newNotice.datetime) {
        newNotice.datetime = moment(notice.datetime).fromNow();
      }
      if (newNotice.id) {
        newNotice.key = newNotice.id;
      }
      if (newNotice.extra && newNotice.status) {
        const color = {
          todo: '',
          processing: 'blue',
          urgent: 'red',
          doing: 'gold',
        }[newNotice.status];
        newNotice.extra = (
          <Tag color={color} style={{ marginRight: 0 }}>
            {newNotice.extra}
          </Tag>
        );
      }
      return newNotice;
    });
    return groupBy(newNotices, 'type');
  }

  getUnreadData = noticeData => {
    const unreadMsg = {};
    Object.entries(noticeData).forEach(([key, value]) => {
      if (!unreadMsg[key]) {
        unreadMsg[key] = 0;
      }
      if (Array.isArray(value)) {
        unreadMsg[key] = value.filter(item => !item.read).length;
      }
    });
    return unreadMsg;
  };

  changeReadState = clickedItem => {
    const { id } = clickedItem;
    const { dispatch } = this.props;
    dispatch({
      type: 'global/changeNoticeReadState',
      payload: id,
    });
  };

  handleLogin = () => {
    router.push('/user/login');
  };

  handleRegister = () => {
    router.push('/user/register');
  };

  render() {
    const {
      currentUser,
      onMenuClick,
      theme,
    } = this.props;
    const role = getAuthority();
    const menu = (
      <Menu className={styles.menu} selectedKeys={[]} onClick={onMenuClick}>
        <Menu.Item key="homePage">
          <Icon type="home" />
          首页
        </Menu.Item>
        {
          [TEACHER, ADMIN].includes(role) && (
            <Menu.Item key="enterAdmin">
              <Icon type="profile" />
              后台管理系统
            </Menu.Item>
          )
        }
        <Menu.Item key="logout">
          <Icon type="logout" />
          <FormattedMessage id="menu.account.logout" defaultMessage="logout" />
        </Menu.Item>
      </Menu>
    );
    let className = styles.right;
    if (theme === 'dark') {
      className = `${styles.right}  ${styles.dark}`;
    }
    return (
      <div className={className}>
        { currentUser.name ? (
          <HeaderDropdown overlay={menu}>
            <span className={`${styles.action} ${styles.account}`}>
              <span className={styles.name}>{currentUser.name}</span>
            </span>
          </HeaderDropdown>
        ) : (
          <div>
            <a onClick={this.handleLogin}>
              <Icon type="user" />
              登陆
            </a>
            &nbsp;
            &nbsp;
            &nbsp;
            <a onClick={this.handleRegister}>
            <Icon type="user" />
              注册
            </a>
            &nbsp;
            &nbsp;
          </div>
        )
        }
      </div>
    );
  }
}
