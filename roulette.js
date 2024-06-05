document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('rouletteCanvas');
    const ctx = canvas.getContext('2d');
    const radius = canvas.width / 2;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    const numbers = [
        { number: 0, color: 'green' },
        { number: 32, color: 'red' },
        { number: 15, color: 'black' },
        { number: 19, color: 'red' },
        { number: 4, color: 'black' },
        { number: 21, color: 'red' },
        { number: 2, color: 'black' },
        { number: 25, color: 'red' },
        { number: 17, color: 'black' },
        { number: 34, color: 'red' },
        { number: 6, color: 'black' },
        { number: 27, color: 'red' },
        { number: 13, color: 'black' },
        { number: 36, color: 'red' },
        { number: 11, color: 'black' },
        { number: 30, color: 'red' },
        { number: 8, color: 'black' },
        { number: 23, color: 'red' },
        { number: 10, color: 'black' },
        { number: 5, color: 'red' },
        { number: 24, color: 'black' },
        { number: 16, color: 'red' },
        { number: 33, color: 'black' },
        { number: 1, color: 'red' },
        { number: 20, color: 'black' },
        { number: 14, color: 'red' },
        { number: 31, color: 'black' },
        { number: 9, color: 'red' },
        { number: 22, color: 'black' },
        { number: 18, color: 'red' },
        { number: 29, color: 'black' },
        { number: 7, color: 'red' },
        { number: 28, color: 'black' },
        { number: 12, color: 'red' },
        { number: 35, color: 'black' },
        { number: 3, color: 'red' },
        { number: 26, color: 'black' }
    ];

    function drawRouletteWheel() {
        for (let i = 0; i < numbers.length; i++) {
            const angle = (i / numbers.length) * Math.PI * 2;
            const nextAngle = ((i + 1) / numbers.length) * Math.PI * 2;

            ctx.beginPath();
            ctx.moveTo(centerX, centerY);
            ctx.arc(centerX, centerY, radius, angle, nextAngle, false);
            ctx.closePath();

            ctx.fillStyle = numbers[i].color;
            ctx.fill();

            ctx.save();
            ctx.translate(centerX, centerY);
            ctx.rotate(angle + (nextAngle - angle) / 2);
            ctx.translate(-centerX, -centerY);

            ctx.font = '20px Arial';
            ctx.fillStyle = '#fff';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(numbers[i].number, centerX + radius / 1.5 * Math.cos(Math.PI / numbers.length), centerY + radius / 1.5 * Math.sin(Math.PI / numbers.length));

            ctx.restore();
        }
    }

    drawRouletteWheel();

    const form = document.getElementById('betForm');
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        form.submit();
    });
});
