document.addEventListener('DOMContentLoaded', function() {
    const dateInput = document.getElementById('date');
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    dateInput.min = tomorrow.toISOString().split('T')[0];

    const startHour = 8;
    const endHour = 14;
    const increment = 30;

    const allowedTimes = [];
    for (let hour = startHour; hour <= endHour; hour++) {
        for (let minute = 0; minute < 60; minute += increment) {
            const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
            allowedTimes.push(time);
        }
    }

    const timeInput = document.getElementById('time');
    timeInput.type = 'time';
    timeInput.step = '1800'; // 30 minutes
    timeInput.min = allowedTimes[0];

    // Create an option for each allowed time
    const timeOptions = allowedTimes.map(time => `<option value="${time}">${time}</option>`);

    // Add the options to the time input
    timeInput.innerHTML = timeOptions.join('');

    dateInput.addEventListener('change', function() {
        const selectedDate = new Date(this.value);
        const day = selectedDate.getDay();
        if (day === 0 || day === 6) {
            alert('Weekends are not available for booking');
            this.value = '';
        }
    });

    document.getElementById('service').addEventListener('change', function() {
        document.getElementById('other-service').style.display = this.value === 'other' ? 'block' : 'none';
    });
});

