import React, { PureComponent } from 'react';
import echarts from 'echarts';

class Chart extends PureComponent {
    componentDidMount() {
        this.initChart();
    }

    componentDidUpdate() {
        this.initChart();
    }

    initChart = () => {
        let myChart = echarts.init(this.pieChart);
        let options = this.props.options;
        myChart.setOption(options);
    };

    render() {
        return <div ref={(ref) => { this.pieChart = ref;}} style={{ width: "500px", height: "400px"}} />
    }
}

export default Chart;
