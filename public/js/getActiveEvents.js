function getOrdinalDay(day) {
    const exceptions = [11, 12, 13];
    if (exceptions.includes(day)) {
        return day + "th";
    }

    switch (day % 10) {
        case 1:
            return day + "st";
        case 2:
            return day + "nd";
        case 3:
            return day + "rd";
        default:
            return day + "th";
    }
}

function getMonthName(month) {
    const months = [
        "January", "February", "March", "April", "May", "June", "July",
        "August", "September", "October", "November", "December"
    ];

    return months[month - 1];
}

function makeDatePrettier(date) {
    splitDateArray = date.split('-');

    day = parseInt(splitDateArray[2]);
    month = parseInt(splitDateArray[1]);
    year = splitDateArray[0];


    prettyDate = getOrdinalDay(day) + " " + getMonthName(month) + ", " + year; 
        
    return prettyDate;
}

fetch('/api/data')
    .then(response => response.json())
    .then(data => {
        const list = document.getElementById('eventList');
        list.replaceChildren();
        
        const eventsHTML = data.map(item => {
            var eventImage = item.Image;
            var eventImageURL = '';

            if (!eventImage) {
                console.log('No image found for', item.Name);
                eventImageURL = 'images/default.png';  // Assign an empty image URL or handle as needed
            } else {
                console.log('Found image for', item.Name);
                eventImageURL = eventImage[0].thumbnails.large.url;
            }

            // Convert start date to human-readable format
            var date = item["Date Start"];
            date = makeDatePrettier(date);

            // Check location
            var location = item["Location"];
            if (location === undefined) {
                location = "TBA";
            }
            
            return `
                <div class="event">
                    <div class="event-image">
                        <img src=${eventImageURL}>
                    </div>
                    <div class="event-content">
                        <h2>${item["Name"]}</h2>
                        <p>${date}</p>
                        <p>${location}</p>
                    </div>
                    <div class="button-container">
                        <a class="button" href=${item["Event Page"]}>More info</a>
                    </div>
                </div>
            `;
        }).join('');

        list.innerHTML = eventsHTML;
    })
    .catch(err => console.error('Error:', err));
