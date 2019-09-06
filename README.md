# Note

All files in this repository are moved over from c9.io which has since closed. Because this web application relies on a Raspberry pi
to get data, there is no way for me to demo this project. I also no longer have access to the physical Raspberry pi so I cannot display the code that I had on the device. This repository is purely to demonstrate the code my team and I created. 

# Screenshots
<img
    width="800"
    src="https://imgur.com/1howgQd.png"
    alt="Screenshot 1"
/>

The analytics dashboard displays the average temperature, humidity, and brightness recorded by the Raspberry pi and shows pie charts
displaying what percent of the time the environment was in a range that is comfortable depending on hot/cold and dry/humid
thresholds. The Raspberry pi has an RGB LED that can be controlled via the color bar which can also hold a preset color for the pi
to default to when turning on. The last pi chart displays what percent of the time the LED was on.
<br>


<img
    width="800"
    src="https://imgur.com/muhIzxL.png"
    alt="Screenshot 2"
/>

Hovering over the pie chart shows what percent of the time was spent in a comfortable range.
The configuration bar allows the user to set thresholds for what they consider to be comfortable and the pie chart will
accurately represent the set thresholds.

<img
    width="800"
    src="https://imgur.com/9xKkLFi.png"
    alt="Screenshot 3"
/>

The details route tracks how temperature, humidity, and brightness change over time in graph format.
