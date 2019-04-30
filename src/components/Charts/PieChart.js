import React, { PureComponent } from 'react';
import Chart from './Chart';

class PieChart extends PureComponent {
    setOptions = () => {
        const { data } = this.props;
        return {
          title: {
              text: '完成题目数量',
              left: 'center',
              top: 20,
              textStyle: {
                  color: '#ccc'
              }
          },
          tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)"
          },
          legend: {
            orient: 'vertical',
            x: 'left',
            data: data.map(({ name }) => name),
          },
          series: [
            {
              name:'完成数量',
              type:'pie',
              radius: ['50%', '70%'],
              avoidLabelOverlap: false,
              label: {
                normal: {
                  show: false,
                  position: 'center'
                },
                emphasis: {
                  show: true,
                  textStyle: {
                    fontSize: '30',
                    fontWeight: 'bold'
                  }
                }
              },
              labelLine: {
                normal: {
                  show: false
                }
              },
              data,
            }
          ]
        };
    };

    render() {
        const options = this.setOptions();
        return <Chart options={options} />;
    }
}

export default PieChart;
