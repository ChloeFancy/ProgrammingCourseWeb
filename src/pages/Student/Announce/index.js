import React, { Component } from 'react';
import ReactDom from 'react-dom';
import { connect } from 'dva';
import { Spin, Card, Empty } from 'antd';
import config from '../../../configs/announce';

@connect(({ studentAnnounce }) => ({
  ...studentAnnounce,
}))
class StudentAnnounce extends Component {
  async componentDidMount() {
    const { dispatch } = this.props;
    await dispatch({
      type: 'studentAnnounce/fetchList',
    });
    this.observe();
  }

  observe = () => {
    const options = {
      // 表示重叠面积占被观察者的比例，从 0 - 1 取值，
      // 1 表示完全被包含
      threshold: 1.0,
    };
    const callback = (entries) => {
      entries.forEach(async (entry) => {
        const { isIntersecting } = entry;
        if (isIntersecting) {
          await this.loadMoreAnnouncements();
        }
      });
    };
    const observer = new IntersectionObserver(callback, options);
    const target = ReactDom.findDOMNode(this.bottomRef);
    observer.observe(target);
  };

  loadMoreAnnouncements = async() => {
    const { dispatch, pageIndex, pageSize, total } = this.props;
    if (pageIndex * pageSize < total) {
      await dispatch({
        type: 'studentAnnounce/addPageIndex',
      });
      this.fetchList();
    }
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
              <div style={{ margin: '10px 0' }}>
                <Card title={item.title}>
                  <div dangerouslySetInnerHTML={{ __html: item[config.detail] }} />
                </Card>
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
      list,
      total,
    } = this.props;
    return (
      <div ref={(ref) => { this.list = ref; }}>
        {this.renderAnnounceList()}
        <div ref={ref => { this.bottomRef = ref; }}>
          {loading && <Spin size="large" spinning />}
          {!loading && list.length === total && (
            <Empty
              description="已加载全部公告"
            />
          )}
        </div>
      </div>
    );
  }
}

export default StudentAnnounce;
