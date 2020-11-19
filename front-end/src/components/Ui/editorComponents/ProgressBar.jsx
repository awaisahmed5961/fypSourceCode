import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({

    circleProgress: {
        fill: 'none'
    },
    circleBackground: {
        stroke: '#ddd',
        fill: [theme.palette.primary.main]
    },

    circleProgress: {
        stroke: [theme.palette.primary.main],
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
    },

    circleText: {
        fontSize: '3em',
        fontWeight: 'bold',
        fill: [theme.palette.primary.main]
    }
}));
function ProgressBar(props) {
    const classes = useStyles();
    const sqSize = props.sqSize;
    // SVG centers the stroke width on the radius, subtract out so circle fits in square
    const radius = (props.sqSize - props.strokeWidth) / 2;
    // Enclose cicle in a circumscribing square
    const viewBox = `0 0 ${sqSize} ${sqSize}`;
    // Arc length at 100% coverage is the circle circumference
    const dashArray = radius * Math.PI * 2;
    // Scale 100% coverage overlay with the actual percent
    const dashOffset = dashArray - dashArray * props.percentage / 100;
    return (
        <div>
            <svg
                width={props.sqSize}
                height={props.sqSize}
                viewBox={viewBox}>
                <circle
                    className={classes.circleBackground}
                    cx={props.sqSize / 2}
                    cy={props.sqSize / 2}
                    r={radius}
                    strokeWidth={`${props.strokeWidth}px`} />
                <circle
                    className={classes.circleProgress}
                    cx={props.sqSize / 2}
                    cy={props.sqSize / 2}
                    r={radius}
                    strokeWidth={`${props.strokeWidth}px`}
                    // Start progress marker at 12 O'Clock
                    transform={`rotate(-90 ${props.sqSize / 2} ${props.sqSize / 2})`}
                    style={{
                        strokeDasharray: dashArray,
                        strokeDashoffset: dashOffset,
                        fill: '#fff'
                    }} />
                <text
                    className={classes.circleText}
                    x="50%"
                    y="50%"
                    dy=".3em"
                    textAnchor="middle">
                    {`${props.percentage}%`}
                </text>
            </svg>
        </div >
    )
}

export default ProgressBar
