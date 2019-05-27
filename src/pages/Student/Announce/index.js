import React, { Component } from 'react';
import { connect } from 'dva';
import { Spin } from 'antd';
import config from '../../../configs/announce';
import { debounce } from '../../../lib/common';

@connect(({ studentAnnounce }) => ({
  ...studentAnnounce,
}))
class StudentAnnounce extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scrollTop: document.documentElement.scrollTop,
    };
  }

  async componentDidMount() {
    document.title = '公告';
    const { dispatch } = this.props;
    dispatch({
      type: 'studentAnnounce/fetchList',
    });
    window.addEventListener("scroll", debounce(() => {
      const afterScrollTop = document.documentElement.scrollTop;
      const delta = afterScrollTop - this.state.scrollTop;
      this.setState({
        scrollTop: afterScrollTop,
      });
      if (delta > 0) {
        this.loadMoreAnnouncements();
      }
    }, 300), false);
  }

  loadMoreAnnouncements = async() => {
    const { dispatch } = this.props;
    await dispatch({
      type: 'studentAnnounce/addPageIndex',
    });
    this.fetchList();
  };

  fetchList = async() => {
    const { dispatch } = this.props;
    await dispatch({
      type: 'studentAnnounce/fetchList',
    });
  };

  renderAnnounceList = () => {
    const { list } = this.props;
    return (
      <div>
        {
          list.map((item) => {
            return (
              <div>
                {item[config.detail]}
              </div>
            )
          })
        }
      </div>
    );
  };


  render() {
    const {
      loading,
    } = this.props;
    console.log(loading);
    return (
      <div ref={(ref) => { this.list = ref; }}>
        <h1 style={{ fontSize: '30px' }}>排名</h1>
        {this.renderAnnounceList()}
        {loading && <div><Spin size="large" spinning={true} /></div>}
      </div>
    );
  }
}

export default StudentAnnounce;
