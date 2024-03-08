# SpriteReference Class

The `SpriteReference` class makes it easy to modify sprite properties.

## Constructor

### `sprite(spriteName)`

Creates a `SpriteReference` instance for the sprite with the specified name.

- **Parameters:**
  - `spriteName` (string): The name of the sprite.

## Properties

### `position: { x: number, y: number }`

- **Setter:**
  - Sets the position of the sprite using various formats:
    - `{ x: number, y: number }`
    - `[x, y]` (Array)

- **Getter:**
  - Returns the current position as an object `{ x: number, y: number }`.

### `pos: { x: number, y: number }` (Alias for `position`)

### `size: number`

- **Setter:**
  - Sets the size of the sprite.
    - Can be a single number or an array `[size]`.

- **Getter:**
  - Returns the rounded size of the sprite.

## Example Usage

```javascript
// Creating a SpriteReference instance
const sprite1 = sprite("Sprite1");

// Setting position using various formats
sprite1.position = { x: 100, y: 100 };
sprite1.pos = [x, y];

// Setting the size using different formats
sprite1.size = 50;          // single number
sprite1.size = [50];        // array
sprite1.size = { size: 50 }; // object

// Retrieving sprite properties
const currentPosition = sprite1.position;
const currentSize = sprite1.size;

// Accessing individual components of the position
const xCoordinate = sprite1.position.x;
const yCoordinate = sprite1.position.y;
