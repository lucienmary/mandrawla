$(function () {
    const canvas = $('#mandrawla-canvas')[0];
    const ctx = canvas.getContext('2d');

    const color = {
        construct: 'blue',
        render: 'turquoise',
        test: 'red',
        bg: window.getComputedStyle(document.documentElement).getPropertyValue('--panel-color')
    };

    const pi2 = 2 * Math.PI;

    const minRadius = 60;
    const maxRadius = 360;

    function init() {
        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.fillPath = color.construct;
        ctx.beginPath();
        ctx.arc(0, 0, 1, 0, pi2);
        ctx.fill();

        drawCircle(minRadius, color.test);
        drawCircle(maxRadius, color.test);

        let steps = generateSteps(3);
        drawMandrawla(steps);
        drawCenterShape();
    }

    function generateSteps(nbOfStep) {
        let randomDists = [];

        while (randomDists.length < nbOfStep) {
            var randomNb = getRandomNumber(minRadius + 40, maxRadius - 40);
            var validGap = randomDists.every(dist => Math.abs(randomNb - dist) >= 40);

            if (validGap) {
                randomDists.push(randomNb);
                drawCircle(randomNb, color.construct);
            }
        }

        randomDists.push(minRadius, maxRadius);
        return randomDists.sort((a, b) => b - a);
    }

    function calculateFarthestIntersectionDistance(radius1, radius2, rotationAngle) {
        const angleIncrement = (2 * Math.PI) / 12;
    
        const x1 = radius1 * Math.cos(rotationAngle);
        const y1 = radius1 * Math.sin(rotationAngle);
    
        const x2 = radius2 * Math.cos(rotationAngle);
        const y2 = radius2 * Math.sin(rotationAngle);
    
        let maxDistanceSquared = Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2);
    
        for (let i = 1; i <= 11; i++) {
            const newRotationAngle = i * angleIncrement + rotationAngle;
    
            const newX1 = radius1 * Math.cos(newRotationAngle);
            const newY1 = radius1 * Math.sin(newRotationAngle);
    
            const newX2 = radius2 * Math.cos(newRotationAngle);
            const newY2 = radius2 * Math.sin(newRotationAngle);
    
            const newDistanceSquared = Math.pow(newX2 - newX1, 2) + Math.pow(newY2 - newY1, 2);
    
            if (newDistanceSquared > maxDistanceSquared) {
                maxDistanceSquared = newDistanceSquared;
            }
        }
    
        return Math.sqrt(maxDistanceSquared);
    }  

    function drawMandrawla(steps) {
    
        steps.forEach((step) => {
            ctx.strokeStyle = color.render;
            const radiusX = step;
            const radiusY = step / 4;
    
            drawEllipse(radiusX, radiusY, 0);
    
            const angleIncrement = (2 * Math.PI) / 12;
            let farthestDistance = 0; // Variable pour stocker la distance la plus éloignée
    
            for (let i = 1; i <= 11; i++) {
                const rotationAngle = i * angleIncrement;
                drawEllipse(radiusX, radiusY, rotationAngle);
    
                // Calcul de la distance entre les points d'intersection les plus éloignés
                const distance = calculateFarthestIntersectionDistance(radiusX, radiusY, rotationAngle);
                if (distance > farthestDistance) {
                    farthestDistance = distance;
                }
            }
    
            console.log('Farthest intersection distance for step', step, ':', farthestDistance);
            drawCircle(farthestDistance - (farthestDistance * 0.06), 'transparent', 'transparent');
        });
    }

    // Dessine une forme centrale aléatoire
    function drawCenterShape() {
        ctx.strokeStyle = color.render;
        ctx.fillStyle = color.bg;
        const shapes = [
            { type: 'circle', radius: 30 },
            { type: 'rectangle', sideLength: 55 },
            { type: 'triangle', sideLength: 70 },
            { type: 'pentagon', sideLength: 35 }
        ];

        const shape = getRandomElement(shapes);
        const rotationAngles = [0, 22.5, 45];
        const deg = (getRandomElement(rotationAngles) * Math.PI) / 180;

        switch (shape.type) {
            case 'circle':
                drawCircle(shape.radius, color.render, color.bg);
                break;

            case 'rectangle':
                const x1Rect = -shape.sideLength / 2;
                const y1Rect = -shape.sideLength / 2;

                ctx.rotate(deg);
                ctx.beginPath();
                ctx.rect(x1Rect, y1Rect, shape.sideLength, shape.sideLength);
                ctx.fillPath = color.bg;
                ctx.fill();
                ctx.stroke();
                ctx.rotate(-deg);
                break;

            case 'triangle':
                const height = (Math.sqrt(3) / 2) * shape.sideLength;
                const x1Tri = -shape.sideLength / 2;
                const y1Tri = -height / 3;
                const x2Tri = shape.sideLength / 2;
                const y2Tri = -height / 3;
                const x3Tri = 0;
                const y3Tri = (2 * height) / 3;
                
                ctx.beginPath();
                ctx.moveTo(x1Tri, y1Tri);
                ctx.lineTo(x2Tri, y2Tri);
                ctx.lineTo(x3Tri, y3Tri);
                ctx.closePath();
                ctx.fillPath = color.bg;
                ctx.fill();
                ctx.stroke();                
                break;

            case 'pentagon':
                const rotationAngle = 270;
                const vertices = [];

                for (let i = 0; i < 5; i++) {
                    const angle = ((i * 2 * Math.PI) / 5) + (rotationAngle * Math.PI) / 180;
                    const x = shape.sideLength * Math.cos(angle);
                    const y = shape.sideLength * Math.sin(angle);
                    vertices.push({ x, y });
                }

                ctx.beginPath();
                ctx.moveTo(vertices[0].x, vertices[0].y);
                for (let i = 1; i < vertices.length; i++) {
                    ctx.lineTo(vertices[i].x, vertices[i].y);
                }
                ctx.closePath();
                ctx.fillPath = color.bg;
                ctx.fill();
                ctx.stroke();
                break;

            default:
                drawCircle(30);
                break;
        }
    }
    
    function drawEllipse(radiusX, radiusY, rotationAngle) {
        ctx.fillStyle = color.bg;
        ctx.save();
        ctx.rotate(rotationAngle);
    
        ctx.beginPath();
        ctx.ellipse(0, 0, radiusX, radiusY, 0, 0, pi2);
        ctx.stroke();
        ctx.fill();
    
        ctx.restore();
    }

    function drawCircle(radius, color, bg) {
        ctx.strokeStyle = color;
        ctx.beginPath();
        ctx.arc(0, 0, radius, 0, pi2);
        if (bg) {
            ctx.fillPath = color.bg;
            ctx.fill();
        }
        ctx.stroke();
    }

    // Génère un nombre aléatoire dans l'intervalle spécifié
    function getRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    // Récupère un élément aléatoire d'un tableau
    function getRandomElement(array) {
        return array[Math.floor(Math.random() * array.length)];
    }

    init();
});
