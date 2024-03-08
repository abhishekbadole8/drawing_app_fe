export function createShapeData(type, id, properties) {
    let shapeData = {};

    switch (type) {
        case 'rectangle':
            shapeData = {
                type: 'rectangle',
                id,
                x: properties.x,
                y: properties.y,
                width: properties.width,
                height: properties.height,
                strokeColor: properties.strokeColor,
                strokeWidth: properties.strokeWidth
            };
            break;
        case 'circle':
            shapeData = {
                type: 'circle',
                id,
                x: properties.x,
                y: properties.y,
                radius: properties.radius,
                strokeColor: properties.strokeColor,
                strokeWidth: properties.strokeWidth
            };
            break;
        case 'line':
            shapeData = {
                type: 'line',
                id,
                points: properties.points,
                strokeColor: properties.strokeColor,
                strokeWidth: properties.strokeWidth
            };
            break;
        case 'arrow':
            shapeData = {
                type: 'arrow',
                id,
                points: properties.points,
                strokeColor: properties.strokeColor,
                strokeWidth: properties.strokeWidth
            };
            break;
        default:
            throw new Error('Invalid shape type');
    }

    return shapeData;
}
