import React from 'react';

function Workouts(props) {
    return (
            <div className="App-header">
                {props.workouts && props.workouts.map((workout) => (
                    <h2>{workout.duration}</h2>
                ))}
            </div>

            // To add chart.js code here


    )
}

export default Workouts;