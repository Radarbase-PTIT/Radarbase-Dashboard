import { useEffect, useState } from 'react';

import Plot from 'react-plotly.js';
import insertUrlParams from 'inserturlparams';
import { localAxiosInstance } from '../../_api/axiosInstance';
import routes from '../routes';

// eslint-disable-next-line react/prop-types
const PlotECGDiagram = ({params}) => {

    const [measurementData, setMeasurementData] = useState({})

    const [loading, setLoading] = useState(false);

    const [, setMeasurementEcgLength] = useState(0)

    const [needUpdateInterval, setNeedUpdateInterval] = useState(true);

    useEffect(() => {
        const fetchTest = async () => {
            setLoading(true);
            const response = await localAxiosInstance.get(
                // eslint-disable-next-line react/prop-types
                insertUrlParams(routes.api.measurements.show, {patientId: params.patientId, measurement: params.measurement})
            );

            if (response.success) {
                setLoading(false);
                setMeasurementData(response.data);
                //check need to update or not
                setMeasurementEcgLength(prevState => {
                    if (response.data.heartRates.length === prevState) {
                        setNeedUpdateInterval(false)
                        return prevState;
                    } else {
                        return response.data.heartRates.length 
                    }
                })

            }
        };

        if (needUpdateInterval) { // Only set interval if updates are needed
            const updateInterval = setInterval(() => {
                fetchTest();
            }, 1500);

            return () => clearInterval(updateInterval);
        }

    }, [needUpdateInterval]);
    
    return (
        <>
        {loading ? <div>Loading...</div> :
        <Plot
            data={[
                {
                    x: [...Array(measurementData?.ecg.length).keys().map(item => item + 1)],
                    y: measurementData?.ecg,
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
            }
        </>
    )
}

export default PlotECGDiagram