// src/components/ChartComponent.js
import React, { useState } from 'react';
import Chart from 'chart.js/auto';
import moment from 'moment';
import { useCookies } from 'react-cookie';

/**
 * ChartComponent renders a chart based on workout data.
 * @param {Object} props - Component props containing workout data.
 * @returns {JSX.Element} ChartComponent JSX element.
 */
function ChartComponent(props) {
    const [chartInstance, setChartInstance] = useState(null);
    const [selectedWorkout, setSelectedWorkout] = useState('default');

    const createOrUpdateChart = (data_set) => {
        const data = {
            labels: data_set.labels,
            datasets: [
                {
                    label: 'Workout Counts',
                    data: data_set.data,
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1,
                    type: 'bar',
                    meta: data_set.exerciseData,
                },
                {
                    label: 'For 85% gains',
                    data: Array(data_set.labels.length).fill(10),
                    borderColor: data_set.line_color,
                    borderWidth: 1,
                    type: 'line',
                },
            ],
        };

        const config = {
            data: data,
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                    },
                }
            },
        };

        if (chartInstance) {
            chartInstance.data.labels = data_set.labels;
            chartInstance.data.datasets[0].data = data_set.data;
            chartInstance.data.datasets[1].borderColor = data_set.line_color; // Update line color
            chartInstance.update();
        } else {
            const newChartInstance = new Chart(document.getElementById('myChart'), config);
            setChartInstance(newChartInstance);
        }
    };

    /// Process the data
    const processData = (data, button) => {
        let parsed = JSON.parse(button).muscle;
        console.log(data);

        const counts = {};
        const exerciseCounts = {}; // Track counts for each exercise_name
    
        const filteredEntries = data.filter((entry) => {
            switch (parsed) {
                case 'chest':
                case 'back':
                case 'arms':
                case 'abdominals':
                case 'legs':
                case 'shoulders':
                    return entry[parsed] === true;
                default:
                    return true;
            }
        });
    
        filteredEntries.forEach((entry) => {
            const weekStart = moment(entry.date).startOf('isoWeek').format('YYYY-MM-DD');
            counts[weekStart] = (counts[weekStart] || 0) + 1;
    
            // Track counts for each exercise_name
            const exerciseName = entry.exercise_name || 'Unknown Exercise';
            exerciseCounts[weekStart] = exerciseCounts[weekStart] || [];
            const existingExercise = exerciseCounts[weekStart].find((exercise) => exercise.name === exerciseName);
    
            if (existingExercise) {
                existingExercise.count += 1;
            } else {
                exerciseCounts[weekStart].push({ name: exerciseName, count: 1 });
            }
        });
    
        const earliestWeek = moment(filteredEntries[0].date).startOf('isoWeek');
        const latestWeek = moment(filteredEntries[filteredEntries.length - 1].date).startOf('isoWeek');
    
        const allWeeks = [];
        let currentWeek = earliestWeek.clone();
    
        while (currentWeek.isSameOrBefore(latestWeek)) {
            allWeeks.push(currentWeek.format('YYYY-MM-DD'));
            currentWeek.add(1, 'week');
        }
    
        // Initialize data and exerciseData arrays with zeros for weeks with no workouts
        const dataArr = allWeeks.map(week => counts[week] || 0);
        const exerciseDataArr = allWeeks.map(week => exerciseCounts[week] || []);
        
        // For line color
        const line_color = JSON.parse(button).line_color;

        return { labels: allWeeks, data: dataArr, exerciseData: exerciseDataArr, line_color: line_color};
    };


    // For input change
    const handleInputChange = (event) => {
        setSelectedWorkout(event.target.value);
    }

    // For form submit
    const handleFormSubmit = async (event) => {
        event.preventDefault();
        
        try {
            const analyzedData = await analyzeParagraph(selectedWorkout);
            const data_set = processData(props.workouts, analyzedData);
            createOrUpdateChart(data_set);
        } catch (error) {
            console.error('Error:', error);
        }
    };


    // Fetch token from cookies
    const [token] = useCookies(['workout-token']);

    // For openAI interpretation 
    async function analyzeParagraph(input) {
        const paragraph = input;

        try {
            // Make an AJAX request to the Django backend
            const response = await fetch('http://localhost:8000/fitness_api/analyze-paragraph/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ paragraph }),
            });

            const data = await response.json();
            return data.word;
        } catch (error) {
            console.error('Error:', error);
            throw error; // Rethrow the error to be caught by the caller
        }
    };

    // To ask questions about visual
    const [subQuestion, setSubQuestion] = useState('');

    // To keep track of the follow-up question asked
    const handleSubQuestion = (event) => {
        setSubQuestion(event.target.value);
    }

    // To submit follow-up question form.
    const handleFollowupFormSubmit = async (event) => {
        event.preventDefault();
        
        try {
            // to send back json
            const analyzedData = await analyzeParagraph(selectedWorkout);
            const data_set = processData(props.workouts, analyzedData);

            const followupReply = await analyzeFollowup(data_set, subQuestion);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    // For openAI interpretation
    async function analyzeFollowup (json_object, sub_question) {
        const sub_q = sub_question;
        const json_o = json_object;

        try {
            // Make an AJAX request to the Django backend
            const response = await fetch('http://localhost:8000/fitness_api/followup-question/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(({ sub_q, json_o })),
            });

            const data = await response.json();

            // Select the DOM element where you want to display the data
            const outputElement = document.getElementById('followupResponse');

            // Update the content of the selected DOM element
            outputElement.innerHTML = data.responseR.replace(/\n/g, '<br>');

        } catch (error) {
            console.error('Error:', error);
            throw error; // Rethrow the error to be caught by the caller
        }
    };

        

    return (
        <div>
            <div>
                <form onSubmit={handleFormSubmit}> 
                    <label>
                        What kind of visualization would you like to see?
                        <input type="text" value={selectedWorkout} onChange={handleInputChange} />
                    </label>
                    <button type="submit">Submit</button>
                </form>
            </div>
            {/* Render the chart canvas */}
            <canvas id="myChart"></canvas>
            <div>
            <form onSubmit={handleFollowupFormSubmit}> 
                <label>
                    What would you like to ask of the visualization?
                    <input type="text" value={subQuestion} onChange={handleSubQuestion} />
                </label>
                <button type="submit">Submit</button>
            </form>
            <p id="followupResponse"></p>
            </div>
        </div>
    );
}

export default ChartComponent;



///// To make versatile
// Output of the prompt
// A processed_data function
// A data json
// A config json
// We then divvy into 3 parts and assign respectively.

/// Sample
//// Show me the growth of abc muscle over time
// Status quo
// Output of the prompt

