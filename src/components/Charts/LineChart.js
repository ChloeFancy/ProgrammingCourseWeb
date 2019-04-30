import React, { PureComponent } from 'react';
import Chart from './Chart';

class LineChart extends PureComponent {
    setOptions = () => {
        const { xAxis, seriesData } = this.props;
        return {
            xAxis: {
                type: 'category',
                data: xAxis,
            },
            yAxis: {
                type: 'value'
            },
            series: [{
                data: seriesData,
                type: 'bar'
            }],
        };
    };

    render() {
        const options = this.setOptions();
        return <Chart options={options} />;
    }
}

export default LineChart;
