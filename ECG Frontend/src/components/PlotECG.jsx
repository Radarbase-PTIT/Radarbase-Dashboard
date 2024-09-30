import Plot from 'react-plotly.js';

const PlotECGDiagram = ({x, y}) => {
    return (
        <Plot
        data={[
            {
                x: x,
                y: y,
                mode: 'lines',
                line: { color: 'blue' },
            },
        ]}
        layout={{
            title: 'ECG Signal',
            xaxis: {
                rangeslider: { visible: true },  // Enable the range slider
                rangeselector: {               // Add range selector buttons
                    buttons: [
                        {
                            count: 1,
                            label: '1s',
                            step: 'second',
                            stepmode: 'backward',
                        },
                        {
                            count: 10,
                            label: '10s',
                            step: 'second',
                            stepmode: 'backward',
                        },
                        { step: 'all', label: 'All' },
                    ],
                },
            },
            yaxis: {
                fixedrange: false,  // Allow zooming on the Y-axis
            },
            autosize: true,
        }}
        config={{ responsive: true }}
        style={{ width: "100%", height: "850px" }}
        />
    )
}

export default PlotECGDiagram