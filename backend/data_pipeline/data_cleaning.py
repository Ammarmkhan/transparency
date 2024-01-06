## To replicate, create a 'data' folder in the same directory as this file

# Upload relveant csv file
from datetime import datetime, timedelta
from dateutil import tz
import os
import pandas as pd
import re

# Specify the path to your CSV file
# csv_path = os.path.join(os.path.dirname(__file__), 'data', 'strong.csv')
# df_original = pd.read_csv(csv_path)
# df = df_original.copy()


def clean_data(df_input):

    # Use pd.read_csv with the file-like object
    df = df_input.copy()
    df_original = df.copy()

    # Convert the 'Duration' column to seconds
    def convert_to_seconds(duration):
        # Define a regex pattern to extract hr, min, and sec
        pattern = re.compile(r'(?:(\d+)h\s*)?(?:(\d+)min\s*)?(?:(\d+)s\s*)?$')

        # Extract hr, min, and sec from the duration string
        match = pattern.match(duration)
        hr, min, sec = map(int, match.groups(default=(0)))
        
        # Return the duration in seconds
        total_seconds = 3600 * hr + 60 * min + sec

        return total_seconds

    df['Duration'] = df['Duration'].apply(convert_to_seconds)

    # Convert the 'Date' column to a datetime object
    df['Date'] = pd.to_datetime(df['Date']).dt.date

    # Identify rows with the same 'Workout Name' on the same day and remove those with larger duration
    duplicate_rows = df[df.duplicated(subset=['Date', 'Workout Name'], keep=False)]

    for _, group in duplicate_rows.groupby(['Date', 'Workout Name']):
        min_duration = group['Duration'].min()
        indexes_to_remove = group[group['Duration'] > min_duration].index
        df = df.drop(indexes_to_remove)

    # Add exact time back to dataframe to prevent dataloss
    df['Date'] = pd.to_datetime(df_original['Date']) 

    # Add timezone
    native_timezone = tz.tzlocal() # Auto-detect the timezone

    # Localize the datetime to the native timezone
    df['Date'] = df['Date'].dt.tz_localize(native_timezone)

    # Add Epley formula to calculate 1RM
    def epley_formula(weight, reps):
        return float(weight) * (1 + (float(reps) / 30))

    df['1RM'] = df.apply(lambda row: int(epley_formula(row['Weight'], row['Reps'])), axis=1)

    ## Join on 'Exercise Name' to add 'Muscles Exercised' columns

    # let's import muscles data
    muscles_path = os.path.join(os.path.dirname(__file__), 'muscles_data', 'muscle_groups.csv')
    muscles_df = pd.read_csv(muscles_path)

    # We join on exercise name
    df = df.merge(muscles_df, how='left', on='Exercise Name')

    return df

# # Save the modified DataFrame to a new CSV file
# df.to_csv('data/output_file.csv', index=False)

